/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * ContentUpdate.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
import {
    __extendsFn as __extends
} from "@microsoft/applicationinsights-shims";
import {
    arrForEach,
    isDocumentObjectAvailable,
    isValueAssigned,
    objForEachKey
} from "@microsoft/1ds-core-js";
import {
    CONTENT_VERSION
} from "../common/Constants";
import {
    _getScrollOffset,
    _getViewportDimensions
} from "../common/Utils";
import {
    WebEvent
} from "./WebEvent";
var ContentUpdate = /** @class */ (function(_super) {
    __extends(ContentUpdate, _super);

    function ContentUpdate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * API to send ContentUpdate event
     * @param contentUpdateEvent - ContentUpdate event
     * @param  properties - ContentUpdate properties(Part C)
     */
    ContentUpdate.prototype.trackContentUpdate = function(contentUpdateEvent, properties) {
        // Get part A properties
        var ext = {};
        ext["web"] = {};
        ext["web"]["isManual"] = contentUpdateEvent.isManual;
        var event = {
            name: "Ms.Web.ContentUpdate",
            baseType: "ContentUpdateData",
            ext: ext,
            data: {},
            baseData: {},
            latency: 3 /* EventLatencyValue.RealTime */
        };
        arrForEach([
            "name",
            "uri",
            "market",
            "pageType",
            "isLoggedIn",
            "id",
            "properties",
            "ver",
            "actionType",
            "behavior",
            "pageHeight",
            "content",
            "contentVer",
            "vpHeight",
            "vpWidth",
            "vScrollOffset",
            "hScrollOffset"
        ], function(key) {
            event.baseData[key] = contentUpdateEvent[key];
        });
        objForEachKey(properties, function(property, value) {
            if (!event.data[property]) {
                event.data[property] = value;
            }
        });
        this._webAnalyticsPlugin.core.track(event);
    };
    /**
     * API to create and send a populated ContentUpdate event
     * @param overrideValues - ContentUpdate overrides
     * @param customProperties - Custom properties(Part C)
     */
    ContentUpdate.prototype.captureContentUpdate = function(overrideValues, customProperties) {
        overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
        var event = {};
        var properties = isValueAssigned(customProperties) ? customProperties : {};
        this._setCommonProperties(event, properties, overrideValues);
        event.behavior = this._getBehavior(overrideValues);
        if (isValueAssigned(overrideValues.actionType)) {
            event.actionType = overrideValues.actionType;
        }
        var viewportDim = _getViewportDimensions();
        var scrollOffset = _getScrollOffset();
        event.pageHeight = isDocumentObjectAvailable ? document.body.scrollHeight : null;
        event.vpHeight = viewportDim.h;
        event.vpWidth = viewportDim.w;
        event.vScrollOffset = scrollOffset.v;
        event.hScrollOffset = scrollOffset.h;
        event.contentVer = CONTENT_VERSION;
        event.isManual = !overrideValues.isAuto;
        var content = this._getContentFormatted(overrideValues.content) || JSON.stringify(this._contentHandler.getVisibleContent());
        if (content) {
            event.content = content;
        }
        // Set PartC values
        if (isValueAssigned(overrideValues.isDomComplete)) {
            properties.isDomComplete = overrideValues.isDomComplete;
        } else {
            properties.isDomComplete = false;
        }
        this.trackContentUpdate(event, properties);
    };
    return ContentUpdate;
}(WebEvent));
export {
    ContentUpdate
};
//# sourceMappingURL=ContentUpdate.js.map