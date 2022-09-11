/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * pageView.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
import {
    __extendsFn as __extends
} from "@microsoft/applicationinsights-shims";
import * as DataCollector from "../DataCollector";
import {
    isValueAssigned
} from "@microsoft/1ds-core-js";
import {
    WebEvent
} from "./WebEvent";
var PageView = /** @class */ (function(_super) {
    __extends(PageView, _super);

    function PageView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * API to populate and send a PageView event
     * @param overrideValues - PageView overrides
     * @param customProperties - Custom properties(Part C)
     */
    PageView.prototype.capturePageView = function(overrideValues, customProperties) {
        overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
        var pageViewEvent = {};
        var properties = isValueAssigned(customProperties) ? customProperties : {};
        this._setCommonProperties(pageViewEvent, properties, overrideValues);
        // Add pageView fields
        pageViewEvent.refUri = isValueAssigned(overrideValues.referrerUri) ? overrideValues.referrerUri : this._config.coreData.referrerUri;
        pageViewEvent.isManual = !overrideValues.isAuto;
        var cookiesValue = DataCollector._getClientCookies(this._config, this._traceLogger);
        if (cookiesValue) {
            properties.cookies = cookiesValue;
        }
        properties.behavior = this._getBehavior(overrideValues);
        this._webAnalyticsPlugin.trackPageView(pageViewEvent, properties);
    };
    return PageView;
}(WebEvent));
export {
    PageView
};
//# sourceMappingURL=PageView.js.map