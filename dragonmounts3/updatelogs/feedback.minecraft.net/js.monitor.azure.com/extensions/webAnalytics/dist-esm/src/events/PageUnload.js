/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * PageUnload.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
import {
    __extendsFn as __extends
} from "@microsoft/applicationinsights-shims";
import {
    getPerformance,
    isDocumentObjectAvailable,
    isUndefined,
    isValueAssigned,
    isWindowObjectAvailable,
    objForEachKey
} from "@microsoft/1ds-core-js";
import {
    _getViewportDimensions
} from "../common/Utils";
import {
    WebEvent
} from "./WebEvent";
var PageUnload = /** @class */ (function(_super) {
    __extends(PageUnload, _super);
    /**
     * @param _webAnalyticsPlugin - Web Analytics plugin instance
     * @param _config - WebAnalytics configuration object
     * @param _id - Id
     * @param _traceLogger - Trace logger to log to console.
     * @param timestamp - Timespan instance.
     * @param maxScroll - max scroll value
     */
    function PageUnload(_webAnalyticsPlugin, _config, _id, _traceLogger, timestamp, maxScroll) {
        var _this = _super.call(this, _webAnalyticsPlugin, _config, null, _id, {}, {}, _traceLogger) || this;
        _this._webAnalyticsPlugin = _webAnalyticsPlugin;
        _this._config = _config;
        _this._id = _id;
        _this._traceLogger = _traceLogger;
        _this._timestamp = timestamp;
        _this._maxScroll = maxScroll;
        return _this;
    }
    /**
     * API to send PageUnload event
     * @param pageUnloadEvent - PageUnload event
     * @param properties - PageUnload properties(Part C)
     */
    PageUnload.prototype.trackPageUnload = function(pageUnloadEvent, properties) {
        // Get part A properties
        var ext = {};
        ext["web"] = {};
        ext["web"]["isManual"] = pageUnloadEvent.isManual;
        var event = {
            name: "Ms.Web.PageUnload",
            baseType: "PageUnloadData",
            ext: ext,
            data: {},
            baseData: {},
            latency: 3 /* EventLatencyValue.RealTime */
        };
        var config = this._config || {};
        if (isUndefined(config.syncUnloadAction) || config.syncUnloadAction) {
            // Attempt to send the event immediately without blocking the JS execution
            event.sync = 3 /* EventSendType.SyncFetch */ ;
        }
        event.baseData["name"] = pageUnloadEvent.name;
        event.baseData["uri"] = pageUnloadEvent.uri;
        event.baseData["id"] = pageUnloadEvent.id;
        event.baseData["properties"] = pageUnloadEvent.properties;
        event.baseData["ver"] = pageUnloadEvent.ver;
        event.baseData["market"] = pageUnloadEvent.market;
        event.baseData["pageType"] = pageUnloadEvent.pageType;
        event.baseData["isLoggedIn"] = pageUnloadEvent.isLoggedIn;
        objForEachKey(properties, function(property, value) {
            if (!event.data[property]) {
                event.data[property] = value;
            }
        });
        this._webAnalyticsPlugin.core.track(event);
    };
    /**
     * API to create and send a populated PageUnload event
     * @param overrideValues - PageUnload overrides
     * @param customProperties - Custom properties(Part C)
     */
    PageUnload.prototype.capturePageUnload = function(overrideValues, customProperties) {
        overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
        var event = {};
        var properties = isValueAssigned(customProperties) ? customProperties : {};
        var scrollHeight = isDocumentObjectAvailable ? document.body.scrollHeight : 0;
        this._setBasicProperties(event, overrideValues);
        event.isManual = !overrideValues.isAuto;
        // Set PartC values
        properties.dwellTime = this._timestamp._recordTimeSpan("dwellTime", true);
        properties.scrollDepth = overrideValues.scrollDepth || this._maxScroll.v.toString() + "/" + scrollHeight.toString();
        properties.vpHeight = _getViewportDimensions().h;
        properties.vScrollOffset = overrideValues.vScrollOffset || this._maxScroll.v;
        if (isWindowObjectAvailable) {
            var perf = getPerformance();
            var windowPerformanceTiming = perf ? perf.timing : null;
            if (windowPerformanceTiming && windowPerformanceTiming.loadEventStart && windowPerformanceTiming.navigationStart) {
                if (windowPerformanceTiming.loadEventStart > 0) {
                    properties.pageLoadTime = windowPerformanceTiming.loadEventStart - windowPerformanceTiming.navigationStart;
                }
            }
        }
        this.trackPageUnload(event, properties);
    };
    return PageUnload;
}(WebEvent));
export {
    PageUnload
};
//# sourceMappingURL=PageUnload.js.map