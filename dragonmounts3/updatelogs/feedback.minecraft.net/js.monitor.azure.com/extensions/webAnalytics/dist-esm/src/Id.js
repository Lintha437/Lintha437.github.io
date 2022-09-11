/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * id.ts
 * @author Ram Thiru (ramthi)
 * @copyright Microsoft 2018
 */
import dynamicProto from "@microsoft/dynamicproto-js";
import {
    createGuid,
    generateW3CId,
    getCookieValue,
    getDocument,
    getLocation,
    safeGetCookieMgr
} from "@microsoft/1ds-core-js";
// Limit support to i, w, and c; make logging accidental PII data more difficult.
var userIdPrefixes = [
    "c:",
    "i:",
    "w:" // domain user id as hash
];
var supportedMuidHosts = {
    "microsoft.com": "c1.microsoft.com",
    "xbox.com": "c.xbox.com",
    "live.com": "c.live.com",
    "microsoftstore.com": "c.microsoftstore.com",
    "msn.com": "c.msn.com",
    "windows.com": "c.windows.com",
    "office.com": "c.office.com"
};
var Id = /** @class */ (function() {
    function Id(core) {
        this.core = core;
        var lastPageViewId = createGuid();
        var internalTraceId = generateW3CId();
        var appUserId = null;
        var firstPageView = false;
        var deviceClass;
        var _cookieMgr = safeGetCookieMgr(core);
        dynamicProto(Id, this, function(_self) {
            _self.getTraceId = function() {
                if (core && core.getTraceCtx) {
                    return core.getTraceCtx().getTraceId() || internalTraceId;
                }
                return internalTraceId;
            };
            _self.getLastPageViewId = function() {
                return lastPageViewId;
            };
            _self.initializeIds = function() {
                if (!firstPageView) {
                    firstPageView = true;
                } else {
                    // this.traceId = this.createTraceId();
                    lastPageViewId = createGuid();
                }
            };
            _self.getMuidUserId = function() {
                var muidValue = getCookieValue(_cookieMgr, "MUID");
                return muidValue && muidValue.length ? "t:" + muidValue : muidValue;
            };
            /// Set app user id.
            _self.setAppUserId = function(uid) {
                appUserId = null; // Make sure to reset the last user id.
                if (!uid) {
                    return; // No need to log null or empty user ids which can be used to reset app user ids.
                }
                for (var i = 0; i < userIdPrefixes.length; i++) {
                    if (userIdPrefixes[i] === uid.substring(0, 2)) {
                        appUserId = uid;
                        break;
                    }
                }
                if (!appUserId) {
                    // this._traceLogger.w('Unsupported app user id: ' + uid + '. Supported app user ids are: c:, i:, and w:');
                }
            };
            _self.setDeviceClass = function(newDeviceClass) {
                if (newDeviceClass) {
                    deviceClass = newDeviceClass;
                }
            };
            _self.getDeviceClass = function() {
                return deviceClass;
            };
            _self.getAppUserId = function() {
                return appUserId;
            };
            _self.syncMuid = function(muidHost) {
                var location = getLocation();
                if (location && muidHost) {
                    var muidsrc = (location.protocol || "http:") + "//" + muidHost + "/c.gif?DI=4050&did=1&t=";
                    var document_1 = getDocument();
                    if (document_1) {
                        var img = document_1.createElement("IMG");
                        img.style.display = "none";
                        img.src = muidsrc;
                        img.hidden = "";
                        img["aria-hidden"] = "true";
                        img.role = "presentation";
                    }
                    return true;
                }
                return false;
            };
            _self.getMuidHost = function(rootDomain) {
                return supportedMuidHosts[rootDomain];
            };
        });
    }
    Id.visitorId = function() {
        var userId = getCookieValue(safeGetCookieMgr(null), "MUID");
        return userId;
    };
    // Removed Stub for Id.prototype.getTraceId.
    // Removed Stub for Id.prototype.getLastPageViewId.
    // Removed Stub for Id.prototype.initializeIds.
    // Removed Stub for Id.prototype.getMuidUserId.
    /// Set app user id.
    // Removed Stub for Id.prototype.setAppUserId.
    // Removed Stub for Id.prototype.setDeviceClass.
    // Removed Stub for Id.prototype.getDeviceClass.
    // Removed Stub for Id.prototype.getAppUserId.
    // Removed Stub for Id.prototype.syncMuid.
    // Removed Stub for Id.prototype.getMuidHost.
    return Id;
}());
export default Id;
//# sourceMappingURL=Id.js.map