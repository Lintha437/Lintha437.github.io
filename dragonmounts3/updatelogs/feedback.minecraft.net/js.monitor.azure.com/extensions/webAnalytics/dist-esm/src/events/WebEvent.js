/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * webEvents.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
import * as DataCollector from "../DataCollector";
import {
    cookieAvailable,
    extend,
    getLocation,
    isArray,
    isValueAssigned,
    isWindowObjectAvailable,
    objForEachKey
} from "@microsoft/1ds-core-js";
import {
    Behavior
} from "../Behaviors";
import {
    MSCONTENT_PARTB_VERSION
} from "../common/Constants";
import {
    _bracketIt
} from "../common/Utils";
/**
 * Get the specified metadata value from the collection
 * If overrideValue is specified in the config that takes precedence.
 * @param metaTags - Meta data.
 * @param awaTags - Coredata values from configuration.
 * @param metaTagName - Name of the metaTag to get.
 * @returns Meta data value
 */
function _getMetaData(metaTags, coreData, metaTagName) {
    var value = "";
    if (coreData && coreData[metaTagName]) {
        value = coreData[metaTagName];
    } else if (metaTags) {
        value = metaTags[metaTagName];
    }
    return value;
}
var WebEvent = /** @class */ (function() {
    /**
     * @param webAnalyticsPlugin - Web Analytics plugin instance
     * @param config - WebAnalytics configuration object
     * @param contentHandler - Content handler
     * @param id - Id object
     * @param pageTagsCallback - callback methods to get pageTags value
     * @param metaTags - Meta tags
     * @param traceLogger - Trace logger to log to console.
     */
    function WebEvent(_webAnalyticsPlugin, _config, _contentHandler, _id, _pageTagsCallback, metaTags, _traceLogger) {
        this._webAnalyticsPlugin = _webAnalyticsPlugin;
        this._config = _config;
        this._contentHandler = _contentHandler;
        this._id = _id;
        this._pageTagsCallback = _pageTagsCallback;
        this.metaTags = metaTags;
        this._traceLogger = _traceLogger;
        this._pageTags = {};
    }
    WebEvent.prototype._setBasicProperties = function(event, overrideValues) {
        // Fill common PartB fields
        event.ver = MSCONTENT_PARTB_VERSION;
        event.id = this._id.getLastPageViewId();
        if (!isValueAssigned(event.name)) {
            event.name = DataCollector._getPageName(this._config, overrideValues);
        }
        if (!isValueAssigned(event.uri) && isWindowObjectAvailable) {
            event.uri = DataCollector._getUri(this._config, getLocation());
        }
    };
    /**
     * Sets common properties for events that are based on the WebEvent schema.
     * @param event - The event
     */
    WebEvent.prototype._setCommonProperties = function(event, eventProperties, overrideValues) {
        var _self = this;
        _self._setBasicProperties(event, overrideValues);
        _self._setPageTags(event, overrideValues);
        // extract specific meta tags out of the pageTags.metaTags collection.  These will go into assigned first class fields in the event.
        // the rest will go into pageTags.metaTags collection as is.
        _self._pageTypeMetaTag = _getMetaData(_self.metaTags, _self._config.coreData, "pageType");
        _self._marketMetaTag = _getMetaData(_self.metaTags, _self._config.coreData, "market");
        _self._behaviorMetaTag = _getMetaData(_self.metaTags, _self._config.coreData, "behavior");
        if (isValueAssigned(overrideValues.pageType)) {
            event.pageType = overrideValues.pageType;
        }
        // Only assign if not overriden and meta data is available
        if (isValueAssigned(_self._pageTypeMetaTag) && !isValueAssigned(event.pageType)) {
            event.pageType = _self._pageTypeMetaTag;
        }
        if (isValueAssigned(_self._marketMetaTag)) {
            event.market = _self._marketMetaTag;
        }
        event.isLoggedIn = DataCollector._getSignedInStatus(_self._config);
        // Fill common PartC fields
        eventProperties.cookieEnabled = cookieAvailable();
    };
    /**
     * Sets pageTags.
     * @param event - The event
     */
    WebEvent.prototype._setPageTags = function(event, overrideValues) {
        var _self = this;
        _self._pageTags = {};
        // Use DOM meta data first and then apply overrides
        if (_self.metaTags) {
            _self._pageTags.metaTags = _self._pageTags.metaTags || {};
            // Remove not supported meta data in pageTags.metaTags
            objForEachKey(_self.metaTags, function(metaTag, value) {
                if (metaTag !== "behavior" && metaTag !== "market" && metaTag !== "pageType") {
                    _self._pageTags.metaTags[metaTag] = value;
                }
            });
        }
        // Prepare the pageTags object that is mostly the same for all events.  Event specific pageTags will be added inside event constructors.
        if (_self._config.coreData && _self._config.coreData.pageTags) {
            _self._pageTags = extend(true, _self._pageTags, _self._config.coreData.pageTags);
        }
        if (_self._pageTagsCallback) {
            _self._pageTags = extend(true, _self._pageTags, _self._pageTagsCallback());
        }
        if (isValueAssigned(overrideValues.pageTags)) {
            _self._pageTags = extend(true, _self._pageTags, overrideValues.pageTags);
        }
        // All metadata tags that must be saved as properties have been extracted at this point.  Assign pageTags as is.
        event.properties = event.properties || {};
        event.properties["pageTags"] = _self._pageTags;
    };
    WebEvent.prototype._getBehavior = function(overrideValues) {
        var behavior;
        // If override specified
        if (overrideValues && isValueAssigned(overrideValues.behavior)) {
            behavior = overrideValues.behavior;
        } else if (isValueAssigned(this._behaviorMetaTag)) {
            behavior = this._behaviorMetaTag;
        }
        return this._getValidBehavior(behavior);
    };
    WebEvent.prototype._getValidBehavior = function(behavior) {
        if (isValueAssigned(behavior)) {
            var result = void 0;
            var value = parseInt(behavior);
            if (!isNaN(value)) {
                result = value;
            } else {
                result = Behavior[behavior];
            }
            if (result in Behavior) {
                return result;
            }
        }
        return 0; /*UNDEFINED*/
    };
    WebEvent.prototype._getContentFormatted = function(content) {
        if (isValueAssigned(content)) {
            if (isArray(content)) {
                return JSON.stringify(content);
            } else {
                return _bracketIt(JSON.stringify(content));
            }
        }
        return undefined;
    };
    return WebEvent;
}());
export {
    WebEvent
};
//# sourceMappingURL=WebEvent.js.map