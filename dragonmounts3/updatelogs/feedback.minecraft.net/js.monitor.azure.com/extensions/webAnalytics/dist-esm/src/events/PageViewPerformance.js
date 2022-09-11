/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
import {
    __extendsFn as __extends
} from "@microsoft/applicationinsights-shims";
/**
 * PageViewPerformance.ts
 * @author Hector Hernandez (hectorh)
 * @copyright Microsoft 2019
 */
import {
    isValueAssigned
} from "@microsoft/1ds-core-js";
import {
    WebEvent
} from "./WebEvent";
var PageViewPerformance = /** @class */ (function(_super) {
    __extends(PageViewPerformance, _super);

    function PageViewPerformance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * API to populate and send a PageViewPerformance event
     * @param overrideValues - PageView overrides
     * @param customProperties - Custom properties(Part C)
     */
    PageViewPerformance.prototype.capturePageViewPerformance = function(overrideValues, customProperties) {
        overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
        var event = {};
        var properties = isValueAssigned(customProperties) ? customProperties : {};
        this._setBasicProperties(event, overrideValues);
        this._setPageTags(event, overrideValues);
        event.isManual = !overrideValues.isAuto;
        properties.behavior = this._getBehavior(overrideValues);
        properties.vpHeight = overrideValues.vpHeight;
        properties.vpWidth = overrideValues.vpWidth;
        properties.framework = overrideValues.framework;
        properties.systemTiming = overrideValues.systemTiming;
        properties.customTiming = overrideValues.customTiming;
        this._webAnalyticsPlugin._populatePageViewPerformance(event);
        this._webAnalyticsPlugin.trackPageViewPerformance(event, properties);
    };
    return PageViewPerformance;
}(WebEvent));
export {
    PageViewPerformance
};
//# sourceMappingURL=PageViewPerformance.js.map