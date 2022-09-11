/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * DataCollector.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
import {
    _throwInternal,
    arrForEach,
    createUniqueNamespace,
    eventOff,
    eventOn,
    getDocument,
    getLocation,
    getWindow,
    isDocumentObjectAvailable,
    isValueAssigned,
    isWindowObjectAvailable,
    mergeEvtNamespace
} from "@microsoft/1ds-core-js";
import {
    _findClosestAnchor
} from "./common/Utils";
var clickCaptureInputTypes = {
    BUTTON: true,
    CHECKBOX: true,
    RADIO: true,
    RESET: true,
    SUBMIT: true
};
/**
 * Get Image href of a given HTMLImageElement
 * @param element - An html image element
 * @returns Href value.
 */
export function _getImageHref(element) {
    var temp = element;
    if (temp) {
        var parent = _findClosestAnchor(temp);
        if (parent && parent.length === 1) {
            if (parent[0].href) {
                return parent[0].href;
            } else if (parent[0].src) {
                return (parent[0].src);
            }
        }
    }
    return "";
}
/**
 * Check if a given element has an element has data-dc attribute defined with a value 'pii'
 * @param element - An html element
 * @returns Flag indicating if an element is market PII.
 */
export function _isPii(element) {
    if (!element || !element.attributes) {
        return false;
    }
    try {
        var pii = element.getAttribute("data-dc");
        if (isValueAssigned(pii)) {
            if (pii.toLowerCase() === "pii") {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}
/**
 * Get URI, sanitize the value if configured on
 * @param config - Configuration
 * @param location - window.location or document.location
 * @returns Flag indicating if an element is market PII.
 */
export function _getUri(config, location) {
    if (config.coreData && config.coreData.requestUri && config.coreData.requestUri !== "") {
        return config.coreData.requestUri;
    }
    return _sanitizeUrl(config, location);
}
/**
 * Sanitize URL values
 * @param config - Configuration
 * @param location - window.location or document.location
 * @returns Flag indicating if an element is market PII.
 */
export function _sanitizeUrl(config, location) {
    if (!location) {
        return null;
    }
    var url = location.protocol + "//" + (location.hostname || location.host) + // location.hostname is not supported on Opera and Opera for Android
        (isValueAssigned(location.port) ? ":" + location.port : "") +
        location.pathname;
    if (config.urlCollectQuery) { // false by default
        var query = location.search;
        if (!query) {
            // in older browsers the query parameters can be contained in the hash
            var hash = location.hash || "";
            var queryIndex = hash.indexOf("?");
            if (queryIndex !== -1) {
                query = hash.slice(queryIndex);
            }
        }
        url += query;
    }
    if (config.urlCollectHash) { // false by default
        url += (location.hash || "");
    }
    return url;
}
/**
 * Gets the pageName from the DOM or by calling a override if set.
 * @param config - configuration object
 * @returns Page name.
 */
export function _getPageName(config, overrideValues) {
    /// <summary>
    ///  Gets the pageName from the DOM or by calling a override if set.
    /// </summary>
    if (overrideValues && overrideValues.pageName) {
        return overrideValues.pageName;
    } else if (config.callback && typeof(config.callback.pageName) === "function") {
        return config.callback.pageName();
    } else if (config.coreData && config.coreData.pageName) {
        return config.coreData.pageName;
    } else {
        var loc = getLocation() || {};
        var pagename = loc.pathname || "";
        var fragments = pagename.split("/");
        if (fragments && fragments[fragments.length - 1] !== "") {
            pagename = fragments[fragments.length - 1];
        } else {
            pagename = "Undefined";
        }
        return pagename;
    }
}
/**
 * Gets the document's title.  Title returned is trimmed to 150 characters
 * @returns Document title.
 */
export function _getTitle() {
    return isDocumentObjectAvailable ? document.title.substring(0, 150) : "";
}
export function _getSignedInStatus(config) {
    var isLoggedIn = config.callback && typeof(config.callback.signedinStatus) === "function" ?
        config.callback.signedinStatus() : config.isLoggedIn;
    return isLoggedIn;
}
/**
 * Gets client cookies
 * @returns Cookies.
 */
export function _getClientCookies(config, traceLogger) {
    var cookies = "";
    var uniqueCookies = {};
    var mergedCookies = [];
    var cookiesConfig = config.cookiesToCollect;
    if (config.shareAuthStatus === false) {
        // collect ANON if it is in cookiesConfig
        mergedCookies = cookiesConfig;
    } else {
        // do not collect ANON even if it is in cookiesConfig
        arrForEach(cookiesConfig, function(value) {
            if (value !== "ANON") {
                mergedCookies.push(value);
            }
        });
    }
    var key;
    var cookieValue;
    try {
        try {
            // adding a try catch block to ensure any mis-handling
            // of the varCustomerCookies variable by adopters is not impacting the rest.
            if (isWindowObjectAvailable && window.varCustomerCookies && window.varCustomerCookies.length > 0) {
                mergedCookies = mergedCookies.concat(window.varCustomerCookies);
            }
        } catch (e) {
            _throwInternal(traceLogger, 1 /* eLoggingSeverity.CRITICAL */ , 512 /* _eExtendedInternalMessageId.FailedToGetCookies */ , "Failed to get cookies ");
        }
        arrForEach(mergedCookies, function(value) {
            // de-dupe the list, no value is necessary hence ''
            if (!uniqueCookies.hasOwnProperty(value)) {
                uniqueCookies[value] = "";
                if (isDocumentObjectAvailable) {
                    cookieValue = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(value).replace(/[\-\.\+\*]/g, "\\$&") +
                        "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"));
                    if (cookieValue !== "") {
                        cookies += value + "=" + cookieValue + ";";
                    }
                }
            }
        });
    } catch (e) {
        _throwInternal(traceLogger, 1 /* eLoggingSeverity.CRITICAL */ , 512 /* _eExtendedInternalMessageId.FailedToGetCookies */ , "Failed to get cookies ");
    }
    return cookies;
}
/**
 *
 * Get click target
 * @returns Click target URI
 */
export function _getClickTarget(element) {
    var clickTarget = "";
    switch (element.tagName) {
        case "A":
        case "AREA":
            clickTarget = element.href || "";
            break;
        case "IMG":
            clickTarget = _getImageHref(element);
            break;
        case "INPUT":
            var type = element.type;
            if (type && (clickCaptureInputTypes[type.toUpperCase()])) {
                var loc = getLocation() || {};
                if (element.form) {
                    clickTarget = element.form.action || (loc.pathname || "");
                } else {
                    clickTarget = loc.pathname || "";
                }
            }
            break;
        default:
            break;
    }
    return clickTarget;
}
/**
 *
 * Execute callback when DOM finish loading
 */
export function onDomLoaded(callback, parentEvtNamespace) {
    var evtNamespace = mergeEvtNamespace(createUniqueNamespace("onDomLoaded"), parentEvtNamespace);
    onDomReadyDo(function() {
        if (isDocumentObjectAvailable && document.readyState === "complete") {
            callback();
        } else {
            var win_1 = getWindow();
            if (win_1) {
                eventOn(win_1, "load", function() {
                    callback && callback();
                    callback = null;
                    // Auto remove the event handler
                    eventOff(win_1, null, null, evtNamespace);
                }, evtNamespace);
            }
        }
    });
}
// use smallest domready ever for IE8. When IE8 is deprecated, use addEventListener('DomContentLoaded')
function onDomReadyDo(f) {
    /// <summary> fires function f on domRead </summary>
    /// <param type='function'>function to call on domRead</param>
    var doc = getDocument() || {};
    /in/.test(doc.readyState) ? setTimeout(function() {
        onDomReadyDo(f);
    }, 100) : f.call();
}
//# sourceMappingURL=DataCollector.js.map