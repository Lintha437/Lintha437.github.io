/*
 * 1DS JS SDK Analytics Web, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
import {
    __extendsFn as __extends
} from "@microsoft/applicationinsights-shims";
/**
 * ApplicationInsights.ts
 * @author Abhilash Panwar (abpanwar) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 * Main class containing all the APIs.
 */
import dynamicProto from "@microsoft/dynamicproto-js";
import {
    AppInsightsCore,
    _throwInternal,
    arrIndexOf,
    doPerf,
    dumpObj,
    extend,
    isArray,
    isFunction,
    isNullOrUndefined,
    isString,
    objForEachKey,
    proxyAssign,
    proxyFunctions,
    throwError
} from "@microsoft/1ds-core-js";
import {
    PostChannel
} from "@microsoft/1ds-post-js";
import {
    PropertiesPlugin
} from "@microsoft/1ds-properties-js";
import {
    ApplicationInsights as WebAnalytics
} from "@microsoft/1ds-wa-js";
// This is an exclude list of properties that should not be updated during initialization
// They include a combination of private and internal property names and properties
var _ignoreUpdateSnippetProperties = [
    "snippet", "_webAnalytics", "_postChannel", "_propertyManager", "_extensions"
];
// This is an exclude list of properties that may exist on both the snippet and the instance that
// should not be updated during definition assignment
var _ignoreUpdateDefineSnippetProperties = [
    "queue", "extensions", "version", "sv"
];
var ApplicationInsights = /** @class */ (function(_super) {
    __extends(ApplicationInsights, _super);

    function ApplicationInsights() {
        var _this = _super.call(this) || this;
        var _snippetVersion;
        var _webAnalytics;
        var _postChannel;
        var _propertyManager;
        dynamicProto(ApplicationInsights, _this, function(_self, _base) {
            _initDefaults();
            _self.initialize = function(config, extensions) {
                doPerf(_self, function() {
                    return "ApplicationInsights:initialize";
                }, function() {
                    var plugins = [_propertyManager, _webAnalytics];
                    if (extensions) {
                        plugins = plugins.concat(extensions);
                    }
                    if (!config) {
                        throwError("You must provide a config object!");
                    }
                    if (config.channels && config.channels.length > 0) {
                        // Add post channel to first fork if not available
                        var postFound = false;
                        for (var j = 0; j < config.channels[0].length; j++) {
                            if (config.channels[0][j].identifier === _postChannel.identifier) {
                                postFound = true;
                                break;
                            }
                        }
                        if (!postFound) {
                            config.channels[0].push(_postChannel);
                        }
                    } else {
                        config.channels = [
                            [_postChannel]
                        ];
                    }
                    // Add configurations
                    var extConfig = config.extensionConfig = config.extensionConfig || [];
                    extConfig[_postChannel.identifier] = config ? config.channelConfiguration : {};
                    extConfig[_propertyManager.identifier] = config ? config.propertyConfiguration : {};
                    extConfig[_webAnalytics.identifier] = config ? config.webAnalyticsConfiguration : {};
                    try {
                        _base.initialize(config, plugins);
                    } catch (error) {
                        _throwInternal(_self.logger, 1 /* eLoggingSeverity.CRITICAL */ , 514 /* _eExtendedInternalMessageId.FailedToInitializeSDK */ , "Failed to initialize SDK." + dumpObj(error));
                    }
                }, function() {
                    return ({
                        config: config,
                        extensions: extensions
                    });
                });
            };
            _self.getPropertyManager = function() {
                return _propertyManager;
            };
            _self.getPostChannel = function() {
                return _postChannel;
            };
            _self.getWebAnalyticsExtension = function() {
                return _webAnalytics;
            };
            // Expose these _webAnalytics functions directly on self
            proxyFunctions(_self, function() {
                return _webAnalytics;
            }, [
                "trackEvent",
                "trackPageView",
                "trackPageAction",
                "trackContentUpdate",
                "trackPageUnload",
                "trackException",
                "trackPageViewPerformance",
                "capturePageView",
                "capturePageViewPerformance",
                "capturePageAction",
                "captureContentUpdate",
                "capturePageUnload",
                "_onerror"
            ]);
            _self.emptySnippetQueue = function(snippet) {
                function _updateSnippetProperties() {
                    if (snippet) {
                        var snippetVer = "";
                        if (!isNullOrUndefined(_snippetVersion)) {
                            snippetVer += _snippetVersion;
                        }
                        // TODO (newylie): Need somewhere in Common Schema to put this value
                        // let propManager = _self.getPropertyManager();
                        // if (propManager) {
                        //     let context = propManager.getPropertiesContext();
                        //     if (_self.context && _self.context.internal) {
                        //         _self.context.internal.snippetVer = snippetVer || "-";
                        //     }
                        // }
                        // apply updated properties to the global instance (snippet)
                        objForEachKey(_self, function(field, value) {
                            if (isString(field) &&
                                !isFunction(value) &&
                                field && field[0] !== "_" && // Don't copy "internal" values
                                arrIndexOf(_ignoreUpdateSnippetProperties, field) === -1) {
                                try {
                                    snippet[field] = value;
                                } catch (error) {
                                    // Unable to set the property -- so just ignore as it's probably a setter
                                    _throwInternal(_self.logger, 2 /* eLoggingSeverity.WARNING */ , 514 /* _eExtendedInternalMessageId.FailedToInitializeSDK */ , "Failed to set [" + field + "] during initialization." + dumpObj(error));
                                }
                            }
                        });
                    }
                }
                // call functions that were queued before the main script was loaded
                try {
                    _updateSnippetProperties();
                    if (isArray(snippet.queue)) {
                        // note: do not check length in the for-loop conditional in case something goes wrong and the stub methods are not overridden.
                        var length = snippet.queue.length;
                        for (var i = 0; i < length; i++) {
                            var call = snippet.queue[i];
                            call();
                        }
                        snippet.queue = undefined;
                        delete snippet.queue;
                    }
                } catch (exception) {
                    var properties = {};
                    if (exception && isFunction(exception.toString)) {
                        properties.exception = exception.toString();
                    }
                }
            };
            /**
             * Overwrite the lazy loaded fields of global window snippet to contain the
             * actual initialized API methods
             * @param snippet
             */
            _self.updateSnippetDefinitions = function(snippet) {
                var _self = _this;
                // Assign the snippet to this instance
                _self.snippet = snippet;
                _snippetVersion = "" + (snippet.sv || snippet.version || "");
                // The config (may) exist on both the snippet definition and the current instance, which by default would cause the
                // snippet version to be overwritten (even with a value of null or undefined - which is now the default to properly
                // support unloading
                if (_self.config) {
                    // Self already has a config (not normal) so combine with the snippet
                    _self.config = extend(true, snippet.config, _self.config || {});
                } else {
                    // Normal case just directly assign as the self config which will then be assigned correctly during proxyAssign()
                    _self.config = snippet.config;
                }
                // apply full appInsights to the global instance
                // Note: This will be called BEFORE this instance has been initialized
                proxyAssign(snippet, _self, function(name) {
                    // Not excluding names prefixed with "_" as we need to proxy some functions like _onError
                    return name && arrIndexOf(_ignoreUpdateSnippetProperties, name) === -1 && arrIndexOf(_ignoreUpdateDefineSnippetProperties, name) === -1;
                });
            };
            _self.unload = function(isAsync, unloadComplete, cbTimeout) {
                if (isAsync === void 0) {
                    isAsync = true;
                }
                _base.unload(isAsync, function(unloadState) {
                    _initDefaults();
                    unloadComplete && unloadComplete(unloadState);
                }, cbTimeout);
            };
        });

        function _initDefaults() {
            // Initialize plugins
            _postChannel = new PostChannel();
            _propertyManager = new PropertiesPlugin();
            _webAnalytics = new WebAnalytics();
        }
        return _this;
    }
    // Removed Stub for ApplicationInsights.prototype.initialize.
    // Removed Stub for ApplicationInsights.prototype.getPropertyManager.
    // Removed Stub for ApplicationInsights.prototype.getPostChannel.
    // Removed Stub for ApplicationInsights.prototype.getWebAnalyticsExtension.
    // Removed Stub for ApplicationInsights.prototype.trackEvent.
    // Removed Stub for ApplicationInsights.prototype.trackPageView.
    // Removed Stub for ApplicationInsights.prototype.trackPageAction.
    // Removed Stub for ApplicationInsights.prototype.trackContentUpdate.
    // Removed Stub for ApplicationInsights.prototype.trackPageUnload.
    // Removed Stub for ApplicationInsights.prototype.trackException.
    // Removed Stub for ApplicationInsights.prototype.trackPageViewPerformance.
    // Removed Stub for ApplicationInsights.prototype.capturePageView.
    // Removed Stub for ApplicationInsights.prototype.capturePageViewPerformance.
    // Removed Stub for ApplicationInsights.prototype.capturePageAction.
    // Removed Stub for ApplicationInsights.prototype.captureContentUpdate.
    // Removed Stub for ApplicationInsights.prototype.capturePageUnload.
    // Removed Stub for ApplicationInsights.prototype._onerror.
    // Removed Stub for ApplicationInsights.prototype.emptySnippetQueue.
    // Removed Stub for ApplicationInsights.prototype.updateSnippetDefinitions.
    // Removed Stub for ApplicationInsights.prototype.unload.
    // This is a workaround for an IE8 bug when using dynamicProto() with classes that don't have any
    // non-dynamic functions or static properties/functions when using uglify-js to minify the resulting code.
    // this will be removed when ES3 support is dropped.
    ApplicationInsights.__ieDyn = 1;

    return ApplicationInsights;
}(AppInsightsCore));
export {
    ApplicationInsights
};
//# sourceMappingURL=ApplicationInsights.js.map