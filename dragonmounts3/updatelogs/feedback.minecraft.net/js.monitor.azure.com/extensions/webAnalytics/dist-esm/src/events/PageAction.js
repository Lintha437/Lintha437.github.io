/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * pageAction.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
import {
    __extendsFn as __extends
} from "@microsoft/applicationinsights-shims";
import * as DataCollector from "../DataCollector";
import {
    extend,
    getPerformance,
    isArray,
    isUndefined,
    isValueAssigned,
    objForEachKey,
    strStartsWith
} from "@microsoft/1ds-core-js";
import {
    ActionType,
    EventType
} from "../Enums";
import {
    CONTENT_VERSION
} from "../common/Constants";
import {
    _extractFieldFromObject,
    _returnDomObjectIfjQuery
} from "../common/Utils";
import {
    WebEvent
} from "./WebEvent";
var PageAction = /** @class */ (function(_super) {
    __extends(PageAction, _super);

    function PageAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * API to send pageAction event
     * @param pageActionEvent - PageAction event
     * @param properties - PageAction properties(Part C)
     */
    PageAction.prototype.trackPageAction = function(pageActionEvent, properties) {
        // Get part A properties
        var ext = {};
        ext["web"] = {};
        ext["web"]["isManual"] = pageActionEvent.isManual;
        var event = {
            name: "Ms.Web.PageAction",
            baseType: "PageActionData",
            ext: ext,
            data: {},
            baseData: {},
            latency: 1 /* EventLatencyValue.Normal */
        };
        if (!isUndefined(pageActionEvent.sync)) {
            event.sync = pageActionEvent.sync;
        }
        event.baseData["name"] = pageActionEvent.name;
        event.baseData["uri"] = pageActionEvent.uri;
        event.baseData["market"] = pageActionEvent.market;
        event.baseData["pageType"] = pageActionEvent.pageType;
        event.baseData["isLoggedIn"] = pageActionEvent.isLoggedIn;
        event.baseData["id"] = pageActionEvent.id;
        event.baseData["properties"] = pageActionEvent.properties;
        event.baseData["ver"] = pageActionEvent.ver;
        event.baseData["actionType"] = pageActionEvent.actionType;
        event.baseData["behavior"] = pageActionEvent.behavior;
        event.baseData["clickCoordinates"] = pageActionEvent.clickCoordinates;
        event.baseData["content"] = pageActionEvent.content;
        event.baseData["contentVer"] = pageActionEvent.contentVer;
        event.baseData["targetUri"] = pageActionEvent.targetUri;
        objForEachKey(properties, function(property, value) {
            if (!event.data[property]) {
                event.data[property] = value;
            }
        });
        this._webAnalyticsPlugin.core.track(event);
    };
    /**
     * API to create and send a populated PageAction event
     * @param element - DOM element
     * @param overrideValues - PageAction overrides
     * @param customProperties - Custom properties(Part C)
     * @param isRightClick - Flag for mouse right clicks
     */
    PageAction.prototype.capturePageAction = function(element, overrideValues, customProperties, isRightClick) {
        overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
        var pageActionEvent = {};
        var pageActionProperties = isValueAssigned(customProperties) ? customProperties : {};
        this._setCommonProperties(pageActionEvent, pageActionProperties, overrideValues);
        pageActionEvent.isManual = !overrideValues.isAuto;
        pageActionEvent.behavior = this._getBehavior(overrideValues);
        // element in scope is needed for below properties.  We cannot pass element into the plugin call chain.
        // process them here.
        var elementContent = {};
        element = _returnDomObjectIfjQuery(element);
        if (isRightClick) {
            // Default behavior for righ click
            pageActionEvent.behavior = 9 /*CONTEXTMENU*/ ;
        } else {
            var config = this._config || {};
            if (element && isUndefined(config.syncPageActionNavClick) || config.syncPageActionNavClick) {
                if (overrideValues.actionType === ActionType.CLICKLEFT || overrideValues.actionType === ActionType.KEYBOARDENTER) {
                    if (element.tagName.toLowerCase() === "a") {
                        var href = (element.getAttribute("href") || "").toLowerCase();
                        // Simple check for a URI that would typically cause a navigation
                        if (href && (strStartsWith(href, "https:") || strStartsWith(href, "http:") || strStartsWith(href, ".") || strStartsWith(href, "/"))) {
                            // Special case that looks like this page action is going to cause a page navigation which will result
                            // in a race condition with the sending of the batched event and XHR cancellation
                            pageActionEvent.sync = 3 /* EventSendType.SyncFetch */ ; // Attempt to send the event immediately without blocking the JS execution
                        }
                    }
                }
            }
        }
        // Fill PartB
        if (element) {
            pageActionEvent.targetUri = DataCollector._getClickTarget(element);
            elementContent = this._contentHandler.getElementContent(element, EventType.PAGE_ACTION); // collect data-bi tags
            elementContent = extend(elementContent, this._getCustomTags(element)); // collect ms.* tags
            // if the element has a data-bi-bhvr attrib defined, use it.
            if (elementContent && elementContent.bhvr && !isValueAssigned(overrideValues.behavior)) {
                var currentBehavior = _extractFieldFromObject(elementContent, "bhvr");
                pageActionEvent.behavior = this._getValidBehavior(currentBehavior);
            }
        }
        if (isValueAssigned(overrideValues.actionType)) {
            pageActionEvent.actionType = overrideValues.actionType;
        }
        if (isValueAssigned(overrideValues.clickCoordinateX) && isValueAssigned(overrideValues.clickCoordinateY)) {
            pageActionEvent.clickCoordinates = overrideValues.clickCoordinateX + "X" + overrideValues.clickCoordinateY;
        }
        if (isValueAssigned(overrideValues.targetUri)) {
            pageActionEvent.targetUri = overrideValues.targetUri;
        }
        pageActionEvent.contentVer = CONTENT_VERSION;
        var currentContent = overrideValues.content || elementContent;
        // Array cannot be merged with kvp objects
        if (!isArray(currentContent)) {
            var pageActionContentTags = this._config.callback.pageActionContentTags;
            currentContent = extend(currentContent, typeof pageActionContentTags === "function" ? pageActionContentTags(element) : {}, overrideValues && overrideValues.contentTags ? overrideValues.contentTags : {});
        }
        pageActionEvent.content = this._getContentFormatted(currentContent);
        // set PartC values
        pageActionProperties.timeToAction = this._getTimeToClick();
        pageActionProperties.refUri = isValueAssigned(overrideValues.refUri) ? overrideValues.refUri : this._config.coreData.referrerUri;
        var cookiesValue = DataCollector._getClientCookies(this._config, this._traceLogger);
        if (cookiesValue) {
            pageActionProperties.cookies = cookiesValue;
        }
        this.trackPageAction(pageActionEvent, pageActionProperties);
    };
    PageAction.prototype._getCustomTags = function(obj) {
        /// <summary>Collect data from attributes that have a ms. prefix.
        /// This functionality is there to provide compatibility with WEDCS.
        ///   TODO: When all adopters have moved to the new tagging taxanomy we can remove this functionality.
        /// </summary>
        /// <param type='Object'>The element from which attributes need to be collected.</param>
        /// <returns type='Object'>Tags collection/property bag</returns>
        var customParameters = {};
        while (obj) {
            if (!DataCollector._isPii(obj)) {
                for (var attr in obj.attributes) {
                    if (attr) {
                        if (obj.attributes[attr]) {
                            var nn = obj.attributes[attr].name;
                            if (nn) {
                                if (nn.toLowerCase().indexOf("ms.") === 0) {
                                    customParameters[nn] = obj.attributes[attr].value;
                                }
                            }
                        }
                    }
                }
            }
            obj = (obj.parentElement || obj.parentNode);
        }
        return customParameters;
    };
    PageAction.prototype._getTimeToClick = function() {
        // capture performance data into PageTags
        var perf = getPerformance();
        if (perf && perf.timing) {
            var isNavigationStart = perf.timing.navigationStart;
            if (isNavigationStart && isNavigationStart !== 0) {
                return new Date().getTime() - isNavigationStart;
            }
        }
        return -1;
    };
    return PageAction;
}(WebEvent));
export {
    PageAction
};
//# sourceMappingURL=PageAction.js.map