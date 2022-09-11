/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
import {
    __extendsFn as __extends
} from "@microsoft/applicationinsights-shims";
/**
 * WebAnalyticsPlugin.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 * File containing the interfaces for WebAnalytics SDK.
 */
import dynamicProto from "@microsoft/dynamicproto-js";
import Id from "./Id";
import Timespan from "./Timespan";
import {
    _throwInternal,
    createGuid,
    extend,
    isDocumentObjectAvailable,
    isObject,
    isValueAssigned,
    objForEachKey,
    setProcessTelemetryTimings
} from "@microsoft/1ds-core-js";
import {
    AnalyticsPlugin
} from "@microsoft/applicationinsights-analytics-js";
import {
    onDomLoaded
} from "./DataCollector";
import {
    _isClickTelemetryAllowed,
    _removeNonObjectsAndInvalidElements
} from "./common/Utils";
import {
    ContentUpdate
} from "./events/ContentUpdate";
import {
    PageAction
} from "./events/PageAction";
import {
    PageUnload
} from "./events/PageUnload";
import {
    PageView
} from "./events/PageView";
import {
    PageViewPerformance
} from "./events/PageViewPerformance";
import {
    AutoCaptureHandler
} from "./handlers/AutoCaptureHandler";
import {
    DomContentHandler
} from "./handlers/DomContentHandler";
/**
 * @ignore
 * Merge passed in configuration with default configuration
 * @param overrideConfig
 */
function _mergeConfig(overrideConfig) {
    var defaultConfig = {
        // General library settings
        useDefaultContentName: true,
        useShortNameForContentBlob: true,
        debounceMs: {
            scroll: 600,
            resize: 3000
        },
        biBlobAttributeTag: "data-m",
        isLoggedIn: false,
        shareAuthStatus: false,
        cookiesToCollect: ["MSFPC", "ANON"],
        autoCapture: {
            pageView: true,
            onLoad: true,
            onUnload: true,
            click: true,
            scroll: false,
            resize: false,
            lineage: false,
            jsError: true,
            msTags: true
        },
        callback: {
            pageName: null,
            pageActionPageTags: null,
            pageViewPageTags: null,
            contentUpdatePageTags: null,
            pageActionContentTags: null,
            signedinStatus: null
        },
        // overrideValues to use instead of collecting automatically
        coreData: {
            referrerUri: isDocumentObjectAvailable ? document.referrer : "",
            requestUri: "",
            pageName: "",
            pageType: "",
            product: "",
            market: "",
            pageTags: {}
        },
        autoPopulateParentIdAndParentName: false,
        syncMuid: false,
        muidDomain: "microsoft.com"
    };
    var attributesThatAreObjectsInConfig = [];
    objForEachKey(defaultConfig, function(attribute, value) {
        if (isObject(value)) {
            attributesThatAreObjectsInConfig.push(attribute);
        }
    });
    // delete attributes that should be object and
    // delete properties that are null, undefined, ''
    _removeNonObjectsAndInvalidElements(overrideConfig, attributesThatAreObjectsInConfig);
    return extend(true, defaultConfig, overrideConfig);
}
var ApplicationInsights = /** @class */ (function(_super) {
    __extends(ApplicationInsights, _super);
    /**
     * @constructor
     * @param WebAnalytics module configuration object.
     */
    function ApplicationInsights() {
        var _this = _super.call(this) || this;
        _this.identifier = "WebAnalyticsPlugin";
        _this.version = '3.2.4';
        var _pageView;
        var _pageAction;
        var _contentUpdate;
        var _pageUnload;
        var _pageViewPerformance;
        var _cvPlugin;
        var _theConfig;
        var _maxScroll;
        var _isPageUnloadFired = false;
        var _timespan;
        var _contentHandler;
        var _autoCaptureHandler;
        dynamicProto(ApplicationInsights, _this, function(_self, _base) {
            _initDefaults();
            _self.updateCoreDataConfig = function(coreData) {
                _theConfig.coreData = extend(true, _theConfig.coreData, coreData);
            };
            _self.refreshMetadata = function() {
                var metaTags = _contentHandler.getMetadata();
                _pageView.metaTags = metaTags;
                _contentUpdate.metaTags = metaTags;
                _pageAction.metaTags = metaTags;
                _pageViewPerformance.metaTags = metaTags;
            };
            _self.initialize = function(coreConfig, core, extensions) {
                var extendedCore = core;
                coreConfig.extensionConfig = coreConfig.extensionConfig || [];
                coreConfig.extensionConfig[_self.identifier] = coreConfig.extensionConfig[_self.identifier] || {};
                // Also assigning the exposed private _config for testing
                _self._config = _theConfig = _mergeConfig(coreConfig.extensionConfig[_self.identifier]);
                var autoCapture = _theConfig.autoCapture;
                var existingGetWParamMethod = extendedCore.getWParam;
                extendedCore.getWParam = function() {
                    var wparam = 0;
                    if (_theConfig.mscomCookies) {
                        wparam = wparam | 1;
                    }
                    return wparam | existingGetWParamMethod();
                };
                coreConfig.extensionConfig[_self.identifier].disableExceptionTracking = !autoCapture.jsError;
                _base.initialize(coreConfig, core, extensions);
                // Default to DOM content handler
                _contentHandler = _contentHandler ? _contentHandler : new DomContentHandler(_theConfig, _self.diagLog());
                // Default to DOM autoCapture handler
                _autoCaptureHandler = _autoCaptureHandler ? _autoCaptureHandler : new AutoCaptureHandler(_self, _self.diagLog());
                if (_theConfig.manageCv) {
                    for (var i = 0; i < extensions.length; i++) {
                        if ((extensions[i]).identifier === "CorrelationVectorPlugin") {
                            _theConfig.manageCv = true;
                            _cvPlugin = extensions[i];
                            break;
                        }
                    }
                    if (!_cvPlugin) {
                        _throwInternal(_self.diagLog(), 2 /* eLoggingSeverity.WARNING */ , 508 /* _eExtendedInternalMessageId.CVPluginNotAvailable */ , "Automatic Cv management is set to \"true\" in config.  However, cv plugin is not available. Disabling automatic Cv management");
                        _theConfig.manageCv = false;
                    }
                }
                _self.id = new Id(core);
                _timespan = new Timespan();
                var metaTags = _contentHandler.getMetadata();
                _pageView = new PageView(_this, _theConfig, _contentHandler, _self.id, _theConfig.callback.pageViewPageTags, metaTags, _self.diagLog());
                _pageAction = new PageAction(_this, _theConfig, _contentHandler, _self.id, _theConfig.callback.pageActionPageTags, metaTags, _self.diagLog());
                _contentUpdate = new ContentUpdate(_this, _theConfig, _contentHandler, _self.id, _theConfig.callback.contentUpdatePageTags, metaTags, _self.diagLog());
                _pageUnload = new PageUnload(_this, _theConfig, _self.id, _self.diagLog(), _timespan, _maxScroll);
                _pageViewPerformance = new PageViewPerformance(_this, _theConfig, _contentHandler, _self.id, _theConfig.callback.pageViewPageTags, metaTags, _self.diagLog());
                // Note: PageView is sent as soon as init is called (i.e. right after the Web Analytics script is loaded).
                // No Muid Sync will happen as we wait to send PV as soon as possible while Muid Sync requires document ready to happen.
                // This matches WEDCS in way of when they send PV without Muid Sync.
                if (_theConfig.syncMuid) {
                    onDomLoaded(function() {
                        var muidDomain = _self.id.getMuidHost(_theConfig.muidDomain);
                        _self.id.syncMuid(muidDomain);
                    }, _self._evtNamespace);
                }
                if (autoCapture.pageView) {
                    _autoCaptureHandler.pageView();
                }
                if (autoCapture.onLoad) {
                    _autoCaptureHandler.onLoad();
                }
                // handle automatic event firing on user click
                if (autoCapture.click) {
                    _autoCaptureHandler.click();
                }
                // handle automatic event firing on user scroll
                if (autoCapture.scroll) {
                    _autoCaptureHandler.scroll(_theConfig.debounceMs);
                }
                // handle automatic event firing on user resize
                if (autoCapture.resize) {
                    _autoCaptureHandler.resize(_theConfig.debounceMs);
                }
                // measure maxScroll
                if (autoCapture.onUnload || _theConfig.manualPageUnload) {
                    _autoCaptureHandler.maxScroll(_maxScroll);
                }
                if (autoCapture.onUnload) {
                    _autoCaptureHandler.onUnload();
                }
            };
            _self.processTelemetry = function(evt, itemCtx) {
                setProcessTelemetryTimings(evt, _self.identifier);
                var event = evt;
                if (event.baseType === "PageviewData") {
                    event.name = "Ms.Web.PageView";
                    event.latency = 3 /* EventLatencyValue.RealTime */ ;
                } else if (event.baseType === "ExceptionData") {
                    event.name = "Ms.Web.ClientError";
                    event.latency = 1 /* EventLatencyValue.Normal */ ;
                    // Remove extra AI properties
                    delete(event.baseData["aiDataContract"]);
                } else if (event.baseType === "PageviewPerformanceData") {
                    event.name = "Ms.Web.PageViewPerformance";
                    event.latency = 1 /* EventLatencyValue.Normal */ ;
                    // Remove extra AI properties
                    delete(event.baseData["isValid"]);
                    delete(event.baseData["durationMs"]);
                }
                // Correlation
                var cv = null;
                if (event.baseType !== "PageviewData") {
                    // If automatic cV management is desired and cV plugin is available
                    if (_theConfig.manageCv) {
                        cv = _cvPlugin.getCv();
                        if (cv) {
                            cv.increment();
                        }
                    }
                } else {
                    if (_theConfig.manageCv) {
                        cv = _cvPlugin.getCv();
                        // Seed a new cV for each event
                        if (!cv) {
                            cv = _cvPlugin.getCv();
                        } else {
                            cv.seed();
                        }
                    }
                }
                _base.processTelemetry(event, itemCtx);
            };
            _self.trackEvent = function(event, customProperties) {
                event.latency = event.latency || 1 /* EventLatencyValue.Normal */ ;
                event.baseData = event.baseData || {};
                event.data = event.data || {};
                // Add extra Part C
                if (isValueAssigned(customProperties)) {
                    objForEachKey(customProperties, function(prop, value) {
                        event.data[prop] = value;
                    });
                }
                _self.core.track(event);
            };
            _self.trackPageView = function(pageViewEvent, properties) {
                _resetPageUnloadProperties();
                // Initialize IDs to be used as parent and trace IDs
                _self.id.initializeIds();
                pageViewEvent.id = _self.id.getLastPageViewId();
                _base.sendPageViewInternal(pageViewEvent, properties, _getSystemProperties(pageViewEvent));
            };
            _self.capturePageView = function(overrideValues, customProperties) {
                _pageView.capturePageView(overrideValues, customProperties);
            };
            _self.trackPageViewPerformance = function(pageViewPerformance, customProperties) {
                _base.sendPageViewPerformanceInternal(pageViewPerformance, customProperties, _getSystemProperties(pageViewPerformance));
            };
            _self.capturePageViewPerformance = function(overrideValues, customProperties) {
                _pageViewPerformance.capturePageViewPerformance(overrideValues, customProperties);
            };
            _self.trackException = function(exception, customProperties) {
                exception.id = exception.id || createGuid();
                _base.sendExceptionInternal(exception, customProperties, _getSystemProperties(exception));
            };
            _self.trackPageAction = function(pageActionEvent, pageActionProperties) {
                _pageAction.trackPageAction(pageActionEvent, pageActionProperties);
            };
            _self.capturePageAction = function(element, overrideValues, customProperties, isRightClick) {
                if (_isClickTelemetryAllowed(element, overrideValues)) {
                    _pageAction.capturePageAction(element, overrideValues, customProperties, isRightClick);
                }
            };
            _self.trackContentUpdate = function(contentUpdateEvent, properties) {
                _contentUpdate.trackContentUpdate(contentUpdateEvent, properties);
            };
            _self.captureContentUpdate = function(overrideValues, customProperties) {
                _contentUpdate.captureContentUpdate(overrideValues, customProperties);
            };
            _self.trackPageUnload = function(pageUnloadEvent, properties) {
                if (!_isPageUnloadFired) {
                    _isPageUnloadFired = true;
                    _pageUnload.trackPageUnload(pageUnloadEvent, properties);
                }
            };
            _self.capturePageUnload = function(overrideValues, customProperties) {
                if (!_isPageUnloadFired) {
                    _isPageUnloadFired = true;
                    _pageUnload.capturePageUnload(overrideValues, customProperties);
                }
            };
            _self._populatePageViewPerformance = function(pageViewPerformance) {
                var perfManager = _self._pageViewPerformanceManager;
                if (perfManager) {
                    perfManager.populatePageViewPerformanceEvent(pageViewPerformance);
                }
            };
            _self.setContentHandler = function(contentHandler) {
                _contentHandler = contentHandler;
            };
            _self.setAutoCaptureHandler = function(autoCaptureHandler) {
                _autoCaptureHandler = autoCaptureHandler;
            };
            _self._doTeardown = function(unloadCtx, unloadState) {
                _autoCaptureHandler && _autoCaptureHandler.teardown(unloadCtx, unloadState);
                _base._doTeardown(unloadCtx, unloadState);
                _initDefaults();
            };

            function _initDefaults() {
                _pageView = null;
                _pageAction = null;
                _contentUpdate = null;
                _pageUnload = null;
                _pageViewPerformance = null;
                _cvPlugin = null;
                _theConfig = null;
                _maxScroll = {
                    h: 0,
                    v: 0
                };
                _isPageUnloadFired = false;
                _timespan = null;
                _contentHandler = null;
                _autoCaptureHandler = null;
            }

            function _getSystemProperties(event) {
                var ext = {};
                if (event.isManual !== undefined) {
                    ext["web"] = {};
                    ext["web"]["isManual"] = event.isManual !== undefined ? event.isManual : true;
                    delete(event.isManual);
                }
                return ext;
            }
            /**
             * @ignore
             * Resets the values used for pageUnload.
             */
            function _resetPageUnloadProperties() {
                _timespan._recordTimeSpan("dwellTime", false);
                _maxScroll.v = 0;
                _isPageUnloadFired = false;
            }
        });
        return _this;
    }
    // Removed Stub for ApplicationInsights.prototype.updateCoreDataConfig.
    // Removed Stub for ApplicationInsights.prototype.refreshMetadata.
    // Removed Stub for ApplicationInsights.prototype.initialize.
    // Removed Stub for ApplicationInsights.prototype.processTelemetry.
    // Removed Stub for ApplicationInsights.prototype.trackEvent.
    // Removed Stub for ApplicationInsights.prototype.trackPageView.
    // Removed Stub for ApplicationInsights.prototype.capturePageView.
    // Removed Stub for ApplicationInsights.prototype.trackPageViewPerformance.
    // Removed Stub for ApplicationInsights.prototype.capturePageViewPerformance.
    // Removed Stub for ApplicationInsights.prototype.trackException.
    // Removed Stub for ApplicationInsights.prototype.trackPageAction.
    // Removed Stub for ApplicationInsights.prototype.capturePageAction.
    // Removed Stub for ApplicationInsights.prototype.trackContentUpdate.
    // Removed Stub for ApplicationInsights.prototype.captureContentUpdate.
    // Removed Stub for ApplicationInsights.prototype.trackPageUnload.
    // Removed Stub for ApplicationInsights.prototype.capturePageUnload.
    // Removed Stub for ApplicationInsights.prototype._populatePageViewPerformance.
    // Removed Stub for ApplicationInsights.prototype.setContentHandler.
    // Removed Stub for ApplicationInsights.prototype.setAutoCaptureHandler.
    // This is a workaround for an IE8 bug when using dynamicProto() with classes that don't have any
    // non-dynamic functions or static properties/functions when using uglify-js to minify the resulting code.
    // this will be removed when ES3 support is dropped.
    ApplicationInsights.__ieDyn = 1;

    return ApplicationInsights;
}(AnalyticsPlugin));
export {
    ApplicationInsights
};
//# sourceMappingURL=WebAnalyticsPlugin.js.map