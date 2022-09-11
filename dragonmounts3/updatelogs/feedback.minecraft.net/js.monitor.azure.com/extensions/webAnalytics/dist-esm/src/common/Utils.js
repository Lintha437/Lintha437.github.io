/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * Utils.ts
 * @author Ram Thiru (ramthi) Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 * File containing utility functions.
 */
import {
    arrForEach,
    getDocument,
    getPerformance,
    getWindow,
    isObject,
    isValueAssigned,
    isWindowObjectAvailable,
    objForEachKey
} from "@microsoft/1ds-core-js";
import {
    APPID_PREFIX
} from "./Constants";
var doNotTrackFieldName = "data-bi-dnt";
var manualTrackOnlyFieldName = "data-bi-mto";
/**
 * Check if appId has a colon as the third character. If it does
 * do nothing otherwise prefix it with 'JS:'.A colon is valid in an appId
 * @param appId - appId
 * @returns An appId with js:prefix
 */
export function _getAppIdWithPrefix(appId) {
    var result;
    if (appId) {
        var appIdArray = appId.split(":");
        result = appIdArray.length > 1 && appIdArray[0].toLowerCase() === "js" ? appId : APPID_PREFIX + appId;
    }
    return result;
}
/**
 * Finds attributes in overrideConfig which are invalid or should be objects
 * and deletes them. useful in override config
 * @param overrideConfig - override config object
 * @param attributeNamesExpectedObjects - attributes that should be objects in override config object
 */
export function _removeNonObjectsAndInvalidElements(overrideConfig, attributeNamesExpectedObjects) {
    _removeInvalidElements(overrideConfig);
    arrForEach(attributeNamesExpectedObjects, function(objectName, i) {
        if (isObject(overrideConfig[objectName])) {
            _removeInvalidElements(overrideConfig[objectName]);
        } else {
            delete overrideConfig[objectName];
        }
    });
}
/**
 * Finds attributes in object which are invalid
 * and deletes them. useful in override config
 * @param object Input object
 */
export function _removeInvalidElements(object) {
    /// Because the config object 'callback' contains only functions,
    /// when it is stringified it returns the empty object. This explains
    /// the workaround regarding 'callback'
    objForEachKey(object, function(property, value) {
        if (!isValueAssigned(value) ||
            (JSON.stringify(value) === "{}" && (property !== "callback"))) {
            delete object[property];
        }
    });
}
/**
 * Gets intersection area of two rectangles
 * and deletes them. useful in override config
 * @param  rect1 - object containing top, left, right, and bottom numbers
 * @param  rect2 - object containing top, left, right, and bottom numbers
 * @returns Intersection area in px^2
 */
export function _getIntersectionArea(rect1, rect2) {
    var x11 = rect1.left;
    var y11 = rect1.top;
    var x12 = rect1.right;
    var y12 = rect1.bottom;
    var x21 = rect2.left;
    var y21 = rect2.top;
    var x22 = rect2.right;
    var y22 = rect2.bottom;
    var xOverlap = Math.max(0, Math.min(x12, x22) - Math.max(x11, x21));
    var yOverlap = Math.max(0, Math.min(y12, y22) - Math.max(y11, y21));
    return xOverlap * yOverlap;
}
/**
 * Walks up DOM tree to find anchor element
 * @param element - DOM element
 * @returns Dom element which is an anchor
 */
export function _findClosestAnchor(element) {
    /// <summary> Walks up DOM tree to find anchor element </summary>
    /// <param type='object'> DOM element </param>
    /// <returns> Dom element which is an anchor</returns>
    return _walkUpDomChainWithElementValidation(element, _isElementAnAnchor);
}
/**
 * Stringify object
 * @param fieldName - Field name
 * @param value - Value
 * @returns Stringified value
 */
export function _stringifyField(fieldName, value) {
    if (value) {
        try {
            var stringified = JSON.stringify(value);
            if (stringified === "{}") {
                if (fieldName === "timing") {
                    return _stringifyWindowPerformanceTiming();
                }
            }
            return stringified;
        } catch (e) {
            // JSON.Strigify has issues with circular references.
            // http://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
            var message = "{'error': 'ERROR: could not stringify {0} {1}'}";
            var token = (typeof value === "string") ? value : "";
            return message.replace("{0}", fieldName).replace("{1}", token);
        }
    }
    return "";
}
/**
 * Stringify window timing object
 * Safari does not serialize window.performance.timing, therefore this shim is necessary.
 * @returns stringified window.performance.timing
 */
function _stringifyWindowPerformanceTiming() {
    var performanceString = "{";
    if (isWindowObjectAvailable) {
        var WPTfields = ["navigationStart",
            "unloadEventStart",
            "unloadEventEnd",
            "redirectStart",
            "redirectEnd",
            "fetchStart",
            "domainLookupStart",
            "domainLookupEnd",
            "connectStart",
            "connectEnd",
            "secureConnectionStart",
            "requestStart",
            "responseStart",
            "responseEnd",
            "domLoading",
            "domInteractive",
            "domContentLoadedEventStart",
            "domContentLoadedEventEnd",
            "domComplete",
            "loadEventStart",
            "loadEventEnd"
        ];
        var perf = getPerformance();
        var windowPerformanceTiming = perf ? perf.timing : {};
        for (var i = 0; i < WPTfields.length; i++) {
            var WindowPerformanceTimingTempValue = windowPerformanceTiming[WPTfields[i]];
            if (isValueAssigned(WindowPerformanceTimingTempValue)) {
                performanceString += "'" + WPTfields[i] + "':" + WindowPerformanceTimingTempValue;
                if (i < WPTfields.length - 1) {
                    performanceString += ",";
                }
            }
        }
    }
    performanceString += "}";
    return performanceString;
}
/**
 * Walks up DOM tree to find element which matches validationMethod
 * @param el - DOM element
 * @param validationMethod - DOM element validation method
 * @param validationMethodParam - DOM element validation method parameters
 * @returns Dom element which is an anchor
 */
export function _walkUpDomChainWithElementValidation(el, validationMethod, validationMethodParam) {
    var element = el;
    if (element) {
        element = _returnDomObjectIfjQuery(element);
        while (!validationMethod(element, validationMethodParam)) {
            element = element.parentNode;
            element = _returnDomObjectIfjQuery(element);
            if (!element || !(element.getAttribute)) {
                return null;
            }
        }
        return element;
    }
}
/**
 * Determine if DOM element is an anchor
 * @param element - DOM element
 * @returns Is element an anchor
 */
export function _isElementAnAnchor(element) {
    return element.nodeName === "A";
}
/**
 * Some elements might be jQuery, do not have method getAttribute
 * @param element - DOM or jQuery element
 * @returns DOM element
 */
export function _returnDomObjectIfjQuery(element) {
    // TODO: Fix Jquery reference.
    // if (typeof jQuery === 'function' && element instanceof jQuery) {
    //    return element[0];
    // }
    return element;
}
/**
 * Determines if an element is currently visible to the user
 * @param element - element to check for visibility
 * @param viewportBoundingRect - Viewport bounding rectangle
 * @returns true if element is truly visible
 */
export function _isElementTrulyVisible(element, viewportBoundingRect) {
    element = _returnDomObjectIfjQuery(element);
    var rect = element.getBoundingClientRect();
    var intersectionArea = _getIntersectionArea(rect, viewportBoundingRect);
    if (intersectionArea > 0) {
        return true;
    } else {
        return false;
    }
}
/**
 * Returns the specified field and also removes the property from the object if exists.
 * @param obj - Input object
 * @param fieldName - >Name of the field/property to be extracted
 * @returns Value of the specified tag
 */
export function _extractFieldFromObject(obj, fieldName) {
    var fieldValue;
    if (obj && obj[fieldName]) {
        fieldValue = obj[fieldName];
        delete obj[fieldName];
    }
    return fieldValue;
}
/**
 * Determines whether an event is a right click or not
 * @param evt - Mouse event
 * @returns true if the event is a right click
 */
export function _isRightClick(evt) {
    if ("which" in evt) { // Chrome, FF, ...
        return (evt.which === 3);
    } else if ("button" in evt) { // IE, ...
        return (evt.button === 2);
    }
}
/**
 * Determines whether an event is a left click or not
 * @param evt - Mouse event
 * @returns true if the event is a left click
 */
export function _isLeftClick(evt) {
    if ("which" in evt) { // Chrome, FF, ...
        return (evt.which === 1);
    } else if ("button" in evt) { // IE, ...
        return (evt.button === 1);
    }
}
/**
 * Determines whether an event is a middle click or not
 * @param evt - Mouse event
 * @returns true if the event is a middle click
 */
export function _isMiddleClick(evt) {
    if ("which" in evt) { // Chrome, FF, ...
        return (evt.which === 2);
    } else if ("button" in evt) { // IE, ...
        return (evt.button === 4);
    }
}
/**
 *  Determines whether an event is a keyboard enter or not
 * @param evt - Keyboard event
 * @returns true if the event is a keyboard enter
 */
export function _isKeyboardEnter(evt) {
    if ("keyCode" in evt) { // Chrome, FF, ...
        return (evt.keyCode === 13);
    }
}
/**
 *  Determines whether an event is a keyboard space or not
 * @param evt - Keyboard event
 * @returns true if the event is a space enter
 */
export function _isKeyboardSpace(evt) {
    if ("keyCode" in evt) { // Chrome, FF, ...
        return (evt.keyCode === 32);
    }
}
/**
 *  Determines whether the element have a DNT(Do Not Track) tag
 * @param element - DOM element
 * @param doNotTrackFieldName - Deprecated
 * @returns true if the element must not be tracked
 */
export function _isElementDnt(element, deprecated) {
    var dntElement = _findClosestByAttribute(element, doNotTrackFieldName);
    if (!isValueAssigned(dntElement)) {
        return false;
    }
    return true;
}
/**
 *  Determines whether the element can generate pageAction telemetry using data-bi attributes mto and dnt
 * @param element - DOM element
 * @param overrides - Override to determine if auto or manual call
 * @returns true if the element is can be tracked
 */
export function _isClickTelemetryAllowed(element, overrideValues) {
    // MTO do not send auto telemetry for this element
    if (overrideValues &&
        overrideValues.isAuto &&
        isValueAssigned(_findClosestByAttribute(element, manualTrackOnlyFieldName))) {
        return false;
    }
    // Do not track element
    if (_isElementDnt(element)) {
        return false;
    }
    return true;
}
/**
 * Walks up DOM tree to find element with attribute
 * @param el - DOM element
 * @param attribute - Attribute name
 * @returns Dom element which contains attribute
 */
export function _findClosestByAttribute(el, attribute) {
    return _walkUpDomChainWithElementValidation(el, _isAttributeInElement, attribute);
}
/**
 * checks if attribute is in element.
 * method checks for empty string, in case the attribute is set but no value is assigned to it
 * @param element - DOM element
 * @param attributeToLookFor - Attribute name
 * @returns true if attribute is in element, even if empty string
 */
export function _isAttributeInElement(element, attributeToLookFor) {
    var value = element.getAttribute(attributeToLookFor);
    return isValueAssigned(value) || value === "";
}
/**
 *  Adds surrounding square brackets to the passed in text
 * @param str - Input string
 * @returns String with surrounding brackets
 */
export function _bracketIt(str) {
    /// <summary>
    ///  Adds surrounding square brackets to the passed in text
    /// </summary>
    return "[" + str + "]";
}
/**
 *  When constantly called, debounce returns two functions, where:
 *  - function 1 will trigger at first call,
 *  - function 2 will be called at last call, after it stops being called for
 *  'wait' milliseconds
 * @param firstCallFunction - The function that will trigger at first call
 * @param secondCallFunction - The function that will trigger at last call after 'wait' milliseconds
 * @params wait - The debounce time interval
 */
export function _debounce(firstCallFunction, secondCallFunction, wait, context) {
    var timeout;
    return function() {
        var args = arguments;
        var later = function() {
            timeout = 0;
            if (secondCallFunction) {
                secondCallFunction.apply(context, args);
            }
        };
        var callNow = !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            if (firstCallFunction) {
                firstCallFunction.apply(context, args);
            }
        }
    };
}
/**
 *  Get scroll offset
 * @returns Returns the scroll offset
 */
export function _getScrollOffset() {
    var scrollOffset = {
        h: 0,
        v: 0
    };
    var win = getWindow();
    var doc = getDocument();
    if (doc && win) {
        scrollOffset = {
            h: parseInt(doc.body.scrollLeft || doc.documentElement.scrollLeft || win.pageXOffset, 10),
            v: parseInt(doc.body.scrollTop || doc.documentElement.scrollTop || win.pageYOffset, 10)
        };
    }
    return scrollOffset;
}
/**
 * Use window dimensions if available before reaching into DOM.
 * Accessing DOM frequently causes layout to reflow and impacts perf.
 * @returns Returns a Viewport object that contains dimensions of the current viewport
 * @description When this is executed from within an iFrame, the dimensions would be that of the iFrame and not the browser window.
 */
export function _getViewportDimensions() {
    var viewport = {
        h: 0,
        w: 0
    };
    var win = getWindow();
    var doc = getDocument();
    if (win && doc && win.screen) {
        var body = doc.body || {};
        var docElem = doc.documentElement || {};
        viewport.h = win.innerHeight || body.clientHeight || docElem.clientHeight;
        viewport.w = win.innerWidth || body.clientWidth || docElem.clientWidth;
    }
    return viewport;
}
/**
 *  Get viewport bounding dimensions
 * @param viewportDimensions Dimensions of the viewport
 * @returns Returns viewport bounding rect
 */
export function _getViewportBoundingRect(viewportDimensions) {
    var viewportBoundingRect = {
        top: 0,
        bottom: viewportDimensions.h,
        left: 0,
        right: viewportDimensions.w
    };
    return viewportBoundingRect;
}
//# sourceMappingURL=Utils.js.map