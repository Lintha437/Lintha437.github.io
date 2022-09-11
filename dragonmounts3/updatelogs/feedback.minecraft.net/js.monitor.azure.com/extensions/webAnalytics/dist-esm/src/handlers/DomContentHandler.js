/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * DomContentHandler.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
import * as DataCollector from "../DataCollector";
import {
    _throwInternal,
    extend,
    getDocument,
    isDocumentObjectAvailable
} from "@microsoft/1ds-core-js";
import {
    EventType
} from "../Enums";
import {
    MAX_CONTENTNAME_LENGTH
} from "../common/Constants";
import {
    _bracketIt,
    _findClosestByAttribute,
    _getViewportBoundingRect,
    _getViewportDimensions,
    _isElementDnt,
    _isElementTrulyVisible,
    _removeInvalidElements,
    _returnDomObjectIfjQuery,
    _walkUpDomChainWithElementValidation
} from "../common/Utils";
export var _contentBlobFieldNameObjects = {
    longNames: {
        isShortNames: false,
        id: "data-bi-id",
        areaName: "data-bi-area",
        slotNumber: "data-bi-slot",
        contentName: "data-bi-name",
        contentSource: "data-bi-source",
        templateName: "data-bi-view",
        productId: "data-bi-product",
        contentType: "data-bi-type",
        parentId: "data-bi-parentid",
        parentName: "data-bi-parentname"
    },
    shortNames: {
        isShortNames: true,
        id: "data-bi-id",
        areaName: "data-bi-an",
        slotNumber: "data-bi-sn",
        contentName: "data-bi-cn",
        contentSource: "data-bi-cs",
        templateName: "data-bi-tn",
        productId: "data-bi-pid",
        contentType: "data-bi-ct",
        parentId: "data-bi-pi",
        parentName: "data-bi-pn"
    }
};
export var _keyName = {
    longKeys: {
        parentId: "parentId",
        parentName: "parentName"
    },
    shortKeys: {
        parentId: "pI",
        parentName: "pN"
    }
};
var DomContentHandler = /** @class */ (function() {
    /**
     * @param config - WebAnalytics configuration object
     * @param traceLogger - Trace logger to log to console.
     */
    function DomContentHandler(_config, _traceLogger) {
        this._config = _config;
        this._traceLogger = _traceLogger;
        this._contentBlobFieldNames = null;
        this._contentBlobFieldNames = this._config.useShortNameForContentBlob === true ?
            _contentBlobFieldNameObjects.shortNames : _contentBlobFieldNameObjects.longNames;
    }
    /**
     * Collect metatags from DOM.
     * Collect data from meta tags. Assign specific field values
     * in the event object.Return an object that is a kvp of awa- and ms.tags.
     * @returns {object} - Metatags collection/property bag
     */
    DomContentHandler.prototype.getMetadata = function() {
        var msTags = {};
        var awaTags = {};
        if (isDocumentObjectAvailable) {
            // Collect the awa-* tags.
            awaTags = this._getMetaDataFromDOM("awa-", true);
            if (this._config.autoCapture && this._config.autoCapture.msTags) {
                // Collect the legacy ms.* tags and append them to the metaTags.
                msTags = this._getMetaDataFromDOM("ms.", false);
            }
        }
        return extend(true, awaTags, msTags);
    };
    DomContentHandler.prototype.getVisibleContent = function() {
        /// <summary> takes an array of elements and only pushes the visible ones to arrayOfContents </summary>
        /// <param type='object'> the list of elements </param>
        /// <param type='object'> the array to push in </param>
        var viewportDim = _getViewportDimensions();
        var viewportBoundingRect = _getViewportBoundingRect(viewportDim);
        // Select all elements that have data-bi-area/aN, data-bi-slot/sN or data-m (biAttributeName) defined in the viewPort.
        var elements = null;
        if (isDocumentObjectAvailable) {
            elements = document.querySelectorAll(_bracketIt(this._contentBlobFieldNames.areaName) + "," +
                _bracketIt(this._contentBlobFieldNames.slotNumber) + "," +
                _bracketIt(this._config.biBlobAttributeTag));
        }
        var arrayOfContents = [];
        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                // DNT = Do Not Track
                var element = elements[i];
                if (!_isElementDnt(element)) {
                    if (_isElementTrulyVisible(element, viewportBoundingRect)) {
                        var elementContent = this.getElementContent(element, EventType.CONTENT_UPDATE);
                        if (elementContent) {
                            arrayOfContents.push(elementContent);
                        }
                    }
                }
            }
        }
        return arrayOfContents;
    };
    /**
     * Collect data-bi attributes for the given element.
     * All attributes with data-bi prefix are collected.  'data-bi' prefix is removed from the key name.
     * @param element - The element from which attributes need to be collected.
     * @returns String representation of the Json array of element attributes
     */
    DomContentHandler.prototype.getElementContent = function(element, eventType) {
        if (!element) {
            return {};
        }
        var elementContent = {};
        var biBlobElement;
        var biBlobValue;
        var contentElement;
        // element has no tags - look for the closest upper element with tags
        if (!this._isTracked(element)) {
            // capture config.biBlobAttributeTag blob from element or hierarchy
            biBlobElement = _findClosestByAttribute(element, this._config.biBlobAttributeTag);
            if (biBlobElement) {
                biBlobValue = biBlobElement.getAttribute(this._config.biBlobAttributeTag);
            }
            if (biBlobValue) {
                try {
                    elementContent = JSON.parse(biBlobValue);
                } catch (e) {
                    _throwInternal(this._traceLogger, 1 /* eLoggingSeverity.CRITICAL */ , 506 /* _eExtendedInternalMessageId.CannotParseBiBlobValue */ , "Can not parse " + biBlobValue);
                }
            } else {
                // Get the element if it has any data-bi tag defined.  If not traverse up the DOM to find the closest parent with data-bi tag defined
                contentElement = _walkUpDomChainWithElementValidation(element, this._isTrackedWithDataBi);
                elementContent = extend(elementContent, this._populateElementContentwithDataBi(contentElement, element));
            }
        } else if (this._isTrackedWithDataM(element)) {
            biBlobElement = element;
            biBlobValue = biBlobElement.getAttribute(this._config.biBlobAttributeTag);
            try {
                elementContent = JSON.parse(biBlobValue);
            } catch (e) {
                _throwInternal(this._traceLogger, 1 /* eLoggingSeverity.CRITICAL */ , 506 /* _eExtendedInternalMessageId.CannotParseBiBlobValue */ , "Can not parse " + biBlobValue);
            }
        } else if (this._isTrackedWithDataBi(element)) {
            // Get the element if it has any data-bi tag defined.  If not traverse up the DOM to find the closest parent with data-bi tag defined
            contentElement = element;
            elementContent = extend(elementContent, this._populateElementContentwithDataBi(contentElement, element));
        }
        _removeInvalidElements(elementContent);
        if (this._config.autoCapture.lineage && eventType === EventType.PAGE_ACTION) {
            elementContent = extend(elementContent, this.getLineageDetails(element));
        }
        if (this._config.autoPopulateParentIdAndParentName) {
            elementContent = extend(elementContent, this._getParentDetails(biBlobElement ? biBlobElement : contentElement, elementContent));
        }
        return elementContent;
    };
    /**
     *  Computes the lineage of a given element.
     * @param element - An html element
     * @returns An object containing the different forms of lineage/hierarchy on DOM tree starting with the current element.
     * example output: {'lineage':'GET OFFICE 365>coreui-hero-6zx3vxo-item-2>R1Hero 1>primaryR1 1>primaryArea 1',
     * 'lineageById':'n10m1r1a2>nn9m1r1a2>m1r1a2>r1a2>a2Body','containerName':'R1Hero 1'}
     */
    DomContentHandler.prototype.getLineageDetails = function(element) {
        var name = [];
        var identifier = [];
        var lineageDelimiter = ">";
        var elementBiDataAttribute = this._config.biBlobAttributeTag; // data-m
        var elementModuleIdAttribute = "data-module-id";
        var containerName;
        var nameValue;
        var idValue;
        while (element) {
            var dataAttr = element.getAttribute(elementBiDataAttribute) || element[elementBiDataAttribute];
            var moduleIdAttribute = element.getAttribute(elementModuleIdAttribute) || element[elementModuleIdAttribute];
            if (dataAttr) {
                try {
                    var telemetryObject = JSON.parse(dataAttr);
                } catch (e) {
                    _throwInternal(this._traceLogger, 1 /* eLoggingSeverity.CRITICAL */ , 507 /* _eExtendedInternalMessageId.CannotParseDataAttribute */ , "Can not parse " + dataAttr);
                }
                if (telemetryObject) {
                    nameValue = telemetryObject.cN || telemetryObject.cT;
                    idValue = telemetryObject.id || undefined;
                    if (nameValue || idValue) {
                        name.push(nameValue);
                        if (moduleIdAttribute) {
                            // reporting treats cN of modules as containerName
                            containerName = nameValue;
                        }
                        identifier.push(idValue);
                    }
                }
            } else {
                nameValue = element.getAttribute(this._contentBlobFieldNames.contentName) || element.getAttribute(this._contentBlobFieldNames.contentType);
                idValue = element.getAttribute(this._contentBlobFieldNames.id) || undefined;
                if (nameValue || idValue) {
                    name.push(nameValue);
                    if (moduleIdAttribute) {
                        containerName = nameValue;
                    }
                    identifier.push(idValue);
                }
            }
            element = element.parentElement;
        }
        var lineageDetails = {
            lineage: name.join(lineageDelimiter),
            lineageById: identifier.join(lineageDelimiter),
            lineageContainerName: containerName
        };
        return lineageDetails;
    };
    DomContentHandler.prototype._populateElementContentwithDataBi = function(contentElement, element) {
        var elementContent = {};
        if (!contentElement) {
            // None of the element and its parent has any tags, collect standard HTML attribute for contentName when useDefaultContentName flag is true
            if (this._config.useDefaultContentName) {
                contentElement = element;
            } else {
                return elementContent;
            }
        }
        // Get the closest element with attribute data-bi-area.
        var areaElement = _findClosestByAttribute(contentElement, this._contentBlobFieldNames.areaName);
        var areaContent = extend({}, this._getAreaContent(areaElement));
        var customizedContentName = this._config.callback.contentName ? this._config.callback.contentName(contentElement, this._config.useDefaultContentName) : "";
        //Default content name must be for original clicked element and not contentElement to align with JSLL implementation
        var defaultContentName = this._getDefaultContentName(element, this._config.useDefaultContentName);
        elementContent = {
            id: contentElement.getAttribute(this._contentBlobFieldNames.id) || contentElement.id || "",
            aN: areaContent.areaName,
            sN: contentElement.getAttribute(this._contentBlobFieldNames.slotNumber),
            cN: customizedContentName || contentElement.getAttribute(this._contentBlobFieldNames.contentName) || defaultContentName || contentElement.getAttribute("alt") || "",
            cS: contentElement.getAttribute(this._contentBlobFieldNames.contentSource) || areaContent.contentSource,
            tN: areaContent.templateName,
            pid: contentElement.getAttribute(this._contentBlobFieldNames.productId),
            cT: contentElement.getAttribute(this._contentBlobFieldNames.contentType) || areaContent.type,
            pI: contentElement.getAttribute(this._contentBlobFieldNames.parentId),
            pN: contentElement.getAttribute(this._contentBlobFieldNames.parentName)
        };
        // Validate to ensure the minimum required field 'contentName/cN' is present.
        // The content schema defines id, aN and sN as required fields.  However,
        /// requiring these fields would result in majority of adopter's content from being collected.
        // Just throw a warning and continue collection.
        if (!elementContent.id || !elementContent.aN || !elementContent.sN || !elementContent.cN) {
            _throwInternal(this._traceLogger, 2 /* eLoggingSeverity.WARNING */ , 515 /* _eExtendedInternalMessageId.InvalidContentBlob */ , "Invalid content blob.  Missing required attributes (id, aN/area, sN/slot), cN/contentName. " +
                " Content information will still be collected!");
        }
        // use legacy fullNames for the content blob if configured so.
        if (!this._contentBlobFieldNames.isShortNames) {
            elementContent = {
                contentId: elementContent.id,
                areaName: elementContent.aN,
                slotNumber: elementContent.sN,
                contentName: elementContent.cN,
                contentSource: elementContent.cS,
                templateName: elementContent.tN,
                productId: elementContent.pid,
                contentType: elementContent.cT,
                parentId: elementContent.pI,
                parentName: elementContent.pN
            };
        }
        // Collect all other data-bi attributes and name them w/o the data-bi prefix.
        for (var i = 0, attrib; i < contentElement.attributes.length; i++) {
            attrib = contentElement.attributes[i];
            if (attrib.name === this._contentBlobFieldNames.id ||
                attrib.name === this._contentBlobFieldNames.areaName ||
                attrib.name === this._contentBlobFieldNames.slotNumber ||
                attrib.name === this._contentBlobFieldNames.contentName ||
                attrib.name === this._contentBlobFieldNames.contentSource ||
                attrib.name === this._contentBlobFieldNames.templateName ||
                attrib.name === this._contentBlobFieldNames.productId ||
                attrib.name === this._contentBlobFieldNames.contentType ||
                attrib.name === this._contentBlobFieldNames.parentId ||
                attrib.name === this._contentBlobFieldNames.parentName ||
                attrib.name.indexOf("data-bi-") === -1) {
                continue;
            }
            var attribName = attrib.name.replace("data-bi-", "");
            elementContent[attribName] = attrib.value;
        }
        return elementContent;
    };
    /**
     * Retrieve a specified metadata tag value from the DOM.
     * @param prefix - Prefix to search the metatags with.
     * @param removePrefix - Specifies if the prefix must be excluded from key names in the returned collection.
     * @returns Metadata collection/property bag
     */
    DomContentHandler.prototype._getMetaDataFromDOM = function(prefix, removePrefix) {
        var metaElements;
        var metaData = {};
        if (isDocumentObjectAvailable) {
            metaElements = document.querySelectorAll("meta");
            for (var i = 0; i < metaElements.length; i++) {
                var meta = metaElements[i];
                if (meta.name) {
                    var mt = meta.name.toLowerCase();
                    if (mt.indexOf(prefix) === 0) {
                        var name = removePrefix ? meta.name.replace(prefix, "") : meta.name;
                        metaData[name] = meta.content;
                    }
                }
            }
        }
        return metaData;
    };
    /**
     * extracts area content from element
     * @param areaElement An html element
     * @returns A JSON object representing the content.
     */
    DomContentHandler.prototype._getAreaContent = function(areaElement) {
        areaElement = _returnDomObjectIfjQuery(areaElement);
        if (areaElement) {
            return {
                areaName: areaElement.getAttribute(this._contentBlobFieldNames.areaName),
                templateName: areaElement.getAttribute(this._contentBlobFieldNames.templateName),
                contentSource: areaElement.getAttribute(this._contentBlobFieldNames.contentSource),
                product: areaElement.getAttribute(this._contentBlobFieldNames.productId),
                type: areaElement.getAttribute(this._contentBlobFieldNames.contentType)
            };
        }
    };
    /**
     * Gets the default content name.
     * @param element - An html element
     * @param useDefaultContentName -Flag indicating if an element is market PII.
     * @returns Content name
     */
    /*ignore jslint start*/
    DomContentHandler.prototype._getDefaultContentName = function(element, useDefaultContentName) {
        if (useDefaultContentName === false || DataCollector._isPii(element) || !element.tagName) {
            return "";
        }
        var doc = getDocument() || {};
        var contentName;
        switch (element.tagName) {
            case "A":
                contentName = doc.all ? element.innerText || element.innerHTML : element.text || element.innerHTML;
                break;
            case "IMG":
            case "AREA":
                contentName = element.alt;
                break;
            default:
                contentName = element.value || element.name || element.alt || element.innerText || element.id;
        }
        return contentName.substring(0, MAX_CONTENTNAME_LENGTH);
    };
    /*ignore jslint end*/
    /**
     * Computes the parentId and parentName of a given element.
     * @param element - An html element
     * @returns An object containing the closest parentId and parentName, can be empty if nothing was found
     */
    DomContentHandler.prototype._getParentDetails = function(element, elementContent) {
        var parentIdKey = this._contentBlobFieldNames.isShortNames ? _keyName.shortKeys.parentId : _keyName.longKeys.parentId;
        var parentNameKey = this._contentBlobFieldNames.isShortNames ? _keyName.shortKeys.parentName : _keyName.longKeys.parentName;
        var parentId = elementContent[parentIdKey];
        var parentName = elementContent[parentNameKey];
        var parentInfo = {};
        if (parentId || parentName || !element) {
            return parentInfo;
        }
        return this._populateParentInfo(element, parentIdKey, parentNameKey);
    };
    /**
     * Check if the user wants to track the element, which means if the element has any tags
     * @param element - An html element
     * @returns true if any data-bi- tag or data-m tag exist, otherwise return false
     */
    DomContentHandler.prototype._isTrackedWithDataM = function(element) {
        var attrs = element.attributes;
        for (var i = 0; i < attrs.length; i++) {
            if (attrs[i].name === "data-m") {
                return true;
            }
        }
        return false;
    };
    /**
     * Check if the user wants to track the element, which means if the element has any tags
     * @param element - An html element
     * @returns true if any data-bi- tag or data-m tag exist, otherwise return false
     */
    DomContentHandler.prototype._isTrackedWithDataBi = function(element) {
        var attrs = element.attributes;
        for (var i = 0; i < attrs.length; i++) {
            if (attrs[i].name.indexOf("data-bi-") >= 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * Check if the user wants to track the element, which means if the element has any tags
     * @param element - An html element
     * @returns true if any data-bi- tag or data-m tag exist, otherwise return false
     */
    DomContentHandler.prototype._isTracked = function(element) {
        var attrs = element.attributes;
        for (var i = 0; i < attrs.length; i++) {
            if (attrs[i].name === "data-m" || attrs[i].name.indexOf("data-bi-") >= 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * Check if parent info already set up, if so take and put into content, if not walk up the DOM to find correct info
     * @param element - An html element that the user wants to track
     * @returns n object containing the parent info, can be empty if nothing was found
     */
    DomContentHandler.prototype._populateParentInfo = function(element, parentIdKey, parentNameKey) {
        var parentInfo = {};
        var elementBiDataAttribute = this._config.biBlobAttributeTag; // data-m
        var parentId;
        var parentName;
        // if the user does not set up parent info, walk to the DOM, find the closest parent element (with tags) and populate the info
        var closestParentElement = _walkUpDomChainWithElementValidation(element.parentElement, this._isTracked);
        if (closestParentElement) {
            var dataAttr = closestParentElement.getAttribute(elementBiDataAttribute) || element[elementBiDataAttribute];
            if (dataAttr) {
                try {
                    var telemetryObject = JSON.parse(dataAttr);
                } catch (e) {
                    _throwInternal(this._traceLogger, 1 /* eLoggingSeverity.CRITICAL */ , 507 /* _eExtendedInternalMessageId.CannotParseDataAttribute */ , "Can not parse " + dataAttr);
                }
                if (telemetryObject) {
                    parentId = telemetryObject.id;
                    parentName = telemetryObject.cN;
                }
            } else {
                parentId = closestParentElement.getAttribute(this._contentBlobFieldNames.id);
                parentName = closestParentElement.getAttribute(this._contentBlobFieldNames.contentName);
            }
            if (parentId) {
                parentInfo[parentIdKey] = parentId;
            }
            if (parentName) {
                parentInfo[parentNameKey] = parentName;
            }
        }
        return parentInfo;
    };
    return DomContentHandler;
}());
export {
    DomContentHandler
};
//# sourceMappingURL=DomContentHandler.js.map