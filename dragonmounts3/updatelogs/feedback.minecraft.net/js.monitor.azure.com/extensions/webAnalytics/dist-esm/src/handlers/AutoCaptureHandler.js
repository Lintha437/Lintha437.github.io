/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * AutoCaptureHandler.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
import dynamicProto from "@microsoft/dynamicproto-js";
import {
    addPageHideEventListener,
    addPageUnloadEventListener,
    createUniqueNamespace,
    eventOff,
    eventOn,
    getDocument,
    getWindow,
    mergeEvtNamespace,
    removePageHideEventListener,
    removePageUnloadEventListener
} from "@microsoft/1ds-core-js";
import {
    onDomLoaded
} from "../DataCollector";
import {
    ActionType
} from "../Enums";
import {
    _debounce,
    _getScrollOffset,
    _isKeyboardEnter,
    _isKeyboardSpace,
    _isLeftClick,
    _isMiddleClick,
    _isRightClick
} from "../common/Utils";
var clickCaptureInputTypes = {
    BUTTON: true,
    CHECKBOX: true,
    RADIO: true,
    RESET: true,
    SUBMIT: true
};
var AutoCaptureHandler = /** @class */ (function() {
    /**
     * @param analyticsPlugin - WebAnalytics plugin
     * @param traceLogger - Trace logger to log to console.
     */
    function AutoCaptureHandler(_analyticsPlugin, _traceLogger) {
        var _this = this;
        var _evtNamespace = mergeEvtNamespace(createUniqueNamespace("AutoCaptureHandler"), _analyticsPlugin._evtNamespace);
        dynamicProto(AutoCaptureHandler, this, function(_self) {
            _self.pageView = function() {
                _analyticsPlugin.capturePageView({
                    isAuto: true
                });
            };
            _self.onLoad = function() {
                onDomLoaded(function() {
                    _analyticsPlugin.capturePageViewPerformance({
                        isAuto: true
                    });
                    _analyticsPlugin.captureContentUpdate({
                        isAuto: true,
                        isDomComplete: true
                    });
                }, _evtNamespace);
            };
            // handle automatic event firing on user click
            _self.click = function() {
                var win = getWindow();
                var doc = getDocument();
                if (win && win.addEventListener) {
                    // IE9 onwards addEventListener is available, 'click' event captures mouse click. mousedown works on other browsers
                    var event = (navigator.appVersion.indexOf("MSIE") !== -1) ? "click" : "mousedown";
                    eventOn(win, event, _processClick, _evtNamespace);
                    eventOn(win, "keyup", _processClick, _evtNamespace);
                } else if (doc && doc.attachEvent) {
                    // IE8 and below doesn't have addEventListener so it will use attachEvent
                    // attaching to window does not work in IE8
                    eventOn(doc, "click", _processClick, _evtNamespace);
                    eventOn(doc, "keyup", _processClick, _evtNamespace);
                }
            };
            // handle automatic event firing on user scroll
            _self.scroll = function(debounceConfig) {
                var processScroll = _debounce(
                    // on first call do nothing
                    null,
                    // after debounce, send contentView with viewportOffset
                    function() {
                        _analyticsPlugin.captureContentUpdate({
                            isAuto: true,
                            actionType: ActionType.SCROLL
                        });
                    }, debounceConfig.scroll, _this);
                eventOn(getWindow(), "scroll", processScroll, _evtNamespace);
            };
            // handle automatic event firing on user scroll
            _self.maxScroll = function(maxScroll) {
                var getMaxScrollDepth = function() {
                    var currentScroll = _getScrollOffset();
                    maxScroll.v = maxScroll.v > currentScroll.v ? maxScroll.v : currentScroll.v;
                };
                eventOn(getWindow(), "scroll", getMaxScrollDepth, _evtNamespace);
            };
            // handle automatic event firing on user resize
            _self.resize = function(debounceConfig) {
                /// I wasn�t able to repro the bug
                /// (https://microsoft.visualstudio.com/DefaultCollection/OSGS/_workitems/edit/7958464)
                /// until new content was loaded on the page and the resize
                /// rendering became slow. When resize happens, the page rendering
                /// time is longer than the resize debounce, and resize render
                /// happens in time > debounce, and so resize is acting like
                /// it's being done twice: once at the beginning of user resize,
                /// one at the end of browser render resize.
                var processResize = _debounce(
                    // on first call, send resize contentUpdate
                    function() {
                        _analyticsPlugin.captureContentUpdate({
                            isAuto: true,
                            actionType: ActionType.RESIZE
                        });
                    },
                    // after debounce, do nothing
                    null, debounceConfig.resize, _this);
                eventOn(getWindow(), "resize", processResize, _evtNamespace);
            };
            _self.onUnload = function() {
                var thePlugin = _analyticsPlugin;

                function _doUnload() {
                    if (thePlugin) {
                        thePlugin.capturePageUnload({
                            isAuto: true
                        });
                    }
                }
                if (thePlugin) {
                    var coreConfig = ((thePlugin || {}).core || {}).config;
                    var excludePageUnloadEvents = coreConfig.disablePageUnloadEvents;
                    addPageUnloadEventListener(_doUnload, excludePageUnloadEvents, _evtNamespace);
                    addPageHideEventListener(_doUnload, excludePageUnloadEvents, _evtNamespace);
                }
            };
            _self.teardown = function(unloadCtx, unloadState) {
                eventOff(getWindow(), null, null, _evtNamespace);
                eventOff(getDocument(), null, null, _evtNamespace);
                removePageUnloadEventListener(null, _evtNamespace);
                removePageHideEventListener(null, _evtNamespace);
                _initDefaults();
            };

            function _processClick(clickEvent) {
                var clickCaptureElements = {
                    A: true,
                    BUTTON: true,
                    AREA: true,
                    INPUT: true
                };
                var win = getWindow();
                clickEvent = clickEvent || win.event; // IE 8 does not pass the event
                var element = clickEvent.srcElement || clickEvent.target;
                // populate overrideValues
                var overrideValues = {
                    isAuto: true,
                    clickCoordinateX: clickEvent.pageX,
                    clickCoordinateY: clickEvent.pageY
                };
                var isRightClick = _isRightClick(clickEvent);
                if (isRightClick) {
                    overrideValues.actionType = ActionType.CLICKRIGHT;
                } else if (_isLeftClick(clickEvent)) {
                    overrideValues.actionType = ActionType.CLICKLEFT;
                } else if (_isKeyboardEnter(clickEvent)) {
                    overrideValues.actionType = ActionType.KEYBOARDENTER;
                } else if (_isKeyboardSpace(clickEvent)) {
                    overrideValues.actionType = ActionType.KEYBOARDSPACE;
                } else if (_isMiddleClick(clickEvent)) {
                    overrideValues.actionType = ActionType.CLICKMIDDLE;
                } else {
                    return;
                }
                while (element && element.tagName) {
                    // control property will be available for <label> elements with 'for' attribute, only use it when is a
                    // valid JSLL capture element to avoid infinite loops
                    if (element.control && clickCaptureElements[element.control.tagName.toUpperCase()]) {
                        element = element.control;
                    }
                    if (!clickCaptureElements[element.tagName.toUpperCase()]) {
                        element = element.parentElement || element.parentNode;
                        continue;
                    } else {
                        // Check allowed INPUT types
                        var sendEvent = element.tagName.toUpperCase() === "INPUT" ? clickCaptureInputTypes[element.type.toUpperCase()] : true;
                        if (sendEvent) {
                            _analyticsPlugin.capturePageAction(element, overrideValues, {}, isRightClick);
                        }
                        break;
                    }
                }
            }

            function _initDefaults() {
                _analyticsPlugin = null;
                _traceLogger = null;
                _evtNamespace = null;
            }
        });
    }
    // Removed Stub for AutoCaptureHandler.prototype.pageView.
    // Removed Stub for AutoCaptureHandler.prototype.onLoad.
    // handle automatic event firing on user click
    // Removed Stub for AutoCaptureHandler.prototype.click.
    // handle automatic event firing on user scroll
    // Removed Stub for AutoCaptureHandler.prototype.scroll.
    // handle automatic event firing on user scroll
    // Removed Stub for AutoCaptureHandler.prototype.maxScroll.
    // handle automatic event firing on user resize
    // Removed Stub for AutoCaptureHandler.prototype.resize.
    // Removed Stub for AutoCaptureHandler.prototype.onUnload.
    // Removed Stub for AutoCaptureHandler.prototype.teardown.
    // This is a workaround for an IE8 bug when using dynamicProto() with classes that don't have any
    // non-dynamic functions or static properties/functions when using uglify-js to minify the resulting code.
    // this will be removed when ES3 support is dropped.
    AutoCaptureHandler.__ieDyn = 1;

    return AutoCaptureHandler;
}());
export {
    AutoCaptureHandler
};
//# sourceMappingURL=AutoCaptureHandler.js.map