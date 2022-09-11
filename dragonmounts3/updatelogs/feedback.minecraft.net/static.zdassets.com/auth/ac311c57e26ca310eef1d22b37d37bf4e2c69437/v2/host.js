(() => {
    var e = {
            620: (e, i, t) => {
                var o = t(936),
                    n = t(239),
                    s = ["firefox"],
                    r = ["safari", "firefox", "mobile safari", "edge"],
                    a = function() {
                        return "iOS" === (new o).getOS().name
                    };

                function c() {
                    return (new o).getBrowser().name.toLowerCase()
                }

                function l() {
                    return document.cookie = "_zendesk_thirdparty_test=true; SameSite=None; Secure", -1 === document.cookie.indexOf("_zendesk_thirdparty_test") ? (console.log("Third-party cookie not allowed"), !1) : (console.log("Third-party cookie allowed"), document.cookie = "_zendesk_thirdparty_test=; expires=Thu, 01 Jan 1970 00:00:00 UTC;", !0)
                }

                function d(e) {
                    if (e.forceStorageAPIForIOS && a() && document.requestStorageAccess) return !0;
                    var i = c(),
                        t = r.includes(i);
                    return console.log("Require storage access for ".concat(i, ": ").concat(t)), t
                }
                e.exports = {
                    canSetCookie: l,
                    browserName: function() {
                        return c()
                    },
                    shortenedFlow: function() {
                        return !a() && s.includes(c())
                    },
                    storageAccessRequired: d,
                    disableBtns: function(e) {
                        e.forEach((function(e) {
                            e.classList.add("disabled-click", "is-disabled")
                        }))
                    },
                    initStorageAccessModal: function(e) {
                        if (d({
                                forceStorageAPIForIOS: !!document.querySelector("meta[name=force_storage_api_ios]")
                            })) {
                            var i = document.getElementById("request-storage-access-button");
                            i && n(i, "click", (function() {
                                new Promise((function(e) {
                                    document.requestStorageAccess().then((function(i) {
                                        e(i)
                                    })).catch((function(i) {
                                        console.log("ACCESS REQUEST REJECTED: ".concat(i)), e(!1)
                                    }))
                                })).then((function() {
                                    location.reload(), console.log("request storage access GRANTED iframe reloaded")
                                }))
                            })), l() || (document.getElementById("safari-warning-callout").style.display = "block", e.call())
                        }
                    }
                }
            },
            78: (e, i, t) => {
                var o = t(427);
                e.exports = function(e, i) {
                    if (!e) throw new Error("Missing elm");
                    var t = {};
                    return (i || []).forEach((function(i) {
                        var n = "data-" + o(i),
                            s = e.getAttribute(n);
                        /^(true|false)$/.test(s) && (s = "true" === s), /^\d+$/.test(s) && (s = parseInt(s, 10)), null !== s && (t[i] = s)
                    })), t
                }
            },
            310: e => {
                e.exports = function(e, i, t) {
                    var o;
                    for (o in e) e.hasOwnProperty(o) && i.call(t, o, e[o])
                }
            },
            521: e => {
                e.exports = function(e, i) {
                    return function() {
                        return e.apply(i, arguments)
                    }
                }
            },
            268: e => {
                e.exports = function(e, i, t) {
                    var o = "on" + i;
                    window.addEventListener ? e.removeEventListener(i, t, !1) : e.detachEvent(o, t)
                }
            },
            239: e => {
                e.exports = function(e, i, t) {
                    var o = "on" + i;
                    window.addEventListener ? e.addEventListener(i, t, !1) : e.attachEvent(o, t)
                }
            },
            427: e => {
                e.exports = function(e) {
                    return (e || "").replace(/([A-Z])/g, (function(e) {
                        return "-".concat(e.toLowerCase())
                    }))
                }
            },
            462: e => {
                e.exports = function(e) {
                    return (e || "").replace(/([A-Z])/g, (function(e) {
                        return "_".concat(e.toLowerCase())
                    }))
                }
            },
            768: e => {
                var i = {
                    onload: 1,
                    onunload: 1,
                    onblur: 1,
                    onchange: 1,
                    onfocus: 1,
                    onreset: 1,
                    onselect: 1,
                    onsubmit: 1,
                    onabort: 1,
                    onkeydown: 1,
                    onkeypress: 1,
                    onkeyup: 1,
                    onclick: 1,
                    ondblclick: 1,
                    onmousedown: 1,
                    onmousemove: 1,
                    onmouseout: 1,
                    onmouseover: 1,
                    onmouseup: 1
                };
                e.exports = function(e) {
                    var t, o = document;
                    document.createEvent ? (t = document.createEvent("Events")).initEvent(e, !0, !0) : document.createEventObject && ((t = document.createEventObject()).eventType = e), t.eventName = e, o.dispatchEvent ? o.dispatchEvent(t) : o.fireEvent && i["on".concat(e)] ? o.fireEvent("on".concat(t.eventType), t) : o[e] ? o[e]() : o["on".concat(e)] && o["on".concat(e)]()
                }
            },
            936: function(e, i, t) {
                var o;

                function n(e) {
                    return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, n(e)
                }
                e = t.nmd(e),
                    function(s, r) {
                        "use strict";
                        var a = "function",
                            c = "undefined",
                            l = "object",
                            d = "model",
                            u = "name",
                            w = "type",
                            h = "vendor",
                            p = "version",
                            f = "architecture",
                            m = "console",
                            b = "mobile",
                            g = "tablet",
                            v = "smarttv",
                            y = "wearable",
                            O = {
                                extend: function(e, i) {
                                    var t = {};
                                    for (var o in e) i[o] && i[o].length % 2 == 0 ? t[o] = i[o].concat(e[o]) : t[o] = e[o];
                                    return t
                                },
                                has: function(e, i) {
                                    return "string" == typeof e && -1 !== i.toLowerCase().indexOf(e.toLowerCase())
                                },
                                lowerize: function(e) {
                                    return e.toLowerCase()
                                },
                                major: function(e) {
                                    return "string" === n(e) ? e.replace(/[^\d\.]/g, "").split(".")[0] : r
                                },
                                trim: function(e) {
                                    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                                }
                            },
                            k = {
                                rgx: function(e, i) {
                                    for (var t, o, s, c, d, u, w = 0; w < i.length && !d;) {
                                        var h = i[w],
                                            p = i[w + 1];
                                        for (t = o = 0; t < h.length && !d;)
                                            if (d = h[t++].exec(e))
                                                for (s = 0; s < p.length; s++) u = d[++o], n(c = p[s]) === l && c.length > 0 ? 2 == c.length ? n(c[1]) == a ? this[c[0]] = c[1].call(this, u) : this[c[0]] = c[1] : 3 == c.length ? n(c[1]) !== a || c[1].exec && c[1].test ? this[c[0]] = u ? u.replace(c[1], c[2]) : r : this[c[0]] = u ? c[1].call(this, u, c[2]) : r : 4 == c.length && (this[c[0]] = u ? c[3].call(this, u.replace(c[1], c[2])) : r) : this[c] = u || r;
                                        w += 2
                                    }
                                },
                                str: function(e, i) {
                                    for (var t in i)
                                        if (n(i[t]) === l && i[t].length > 0) {
                                            for (var o = 0; o < i[t].length; o++)
                                                if (O.has(i[t][o], e)) return "?" === t ? r : t
                                        } else if (O.has(i[t], e)) return "?" === t ? r : t;
                                    return e
                                }
                            },
                            x = {
                                browser: {
                                    oldsafari: {
                                        version: {
                                            "1.0": "/8",
                                            1.2: "/1",
                                            1.3: "/3",
                                            "2.0": "/412",
                                            "2.0.2": "/416",
                                            "2.0.3": "/417",
                                            "2.0.4": "/419",
                                            "?": "/"
                                        }
                                    }
                                },
                                device: {
                                    amazon: {
                                        model: {
                                            "Fire Phone": ["SD", "KF"]
                                        }
                                    },
                                    sprint: {
                                        model: {
                                            "Evo Shift 4G": "7373KT"
                                        },
                                        vendor: {
                                            HTC: "APA",
                                            Sprint: "Sprint"
                                        }
                                    }
                                },
                                os: {
                                    windows: {
                                        version: {
                                            ME: "4.90",
                                            "NT 3.11": "NT3.51",
                                            "NT 4.0": "NT4.0",
                                            2e3: "NT 5.0",
                                            XP: ["NT 5.1", "NT 5.2"],
                                            Vista: "NT 6.0",
                                            7: "NT 6.1",
                                            8: "NT 6.2",
                                            8.1: "NT 6.3",
                                            10: ["NT 6.4", "NT 10.0"],
                                            RT: "ARM"
                                        }
                                    }
                                }
                            },
                            E = {
                                browser: [
                                    [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                                    [u, p],
                                    [/(opios)[\/\s]+([\w\.]+)/i],
                                    [
                                        [u, "Opera Mini"], p
                                    ],
                                    [/\s(opr)\/([\w\.]+)/i],
                                    [
                                        [u, "Opera"], p
                                    ],
                                    [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i, /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i],
                                    [u, p],
                                    [/(konqueror)\/([\w\.]+)/i],
                                    [
                                        [u, "Konqueror"], p
                                    ],
                                    [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                                    [
                                        [u, "IE"], p
                                    ],
                                    [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],
                                    [
                                        [u, "Edge"], p
                                    ],
                                    [/(yabrowser)\/([\w\.]+)/i],
                                    [
                                        [u, "Yandex"], p
                                    ],
                                    [/(Avast)\/([\w\.]+)/i],
                                    [
                                        [u, "Avast Secure Browser"], p
                                    ],
                                    [/(AVG)\/([\w\.]+)/i],
                                    [
                                        [u, "AVG Secure Browser"], p
                                    ],
                                    [/(puffin)\/([\w\.]+)/i],
                                    [
                                        [u, "Puffin"], p
                                    ],
                                    [/(focus)\/([\w\.]+)/i],
                                    [
                                        [u, "Firefox Focus"], p
                                    ],
                                    [/(opt)\/([\w\.]+)/i],
                                    [
                                        [u, "Opera Touch"], p
                                    ],
                                    [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
                                    [
                                        [u, "UCBrowser"], p
                                    ],
                                    [/(comodo_dragon)\/([\w\.]+)/i],
                                    [
                                        [u, /_/g, " "], p
                                    ],
                                    [/(windowswechat qbcore)\/([\w\.]+)/i],
                                    [
                                        [u, "WeChat(Win) Desktop"], p
                                    ],
                                    [/(micromessenger)\/([\w\.]+)/i],
                                    [
                                        [u, "WeChat"], p
                                    ],
                                    [/(brave)\/([\w\.]+)/i],
                                    [
                                        [u, "Brave"], p
                                    ],
                                    [/(qqbrowserlite)\/([\w\.]+)/i],
                                    [u, p],
                                    [/(QQ)\/([\d\.]+)/i],
                                    [u, p],
                                    [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
                                    [u, p],
                                    [/(baiduboxapp)[\/\s]?([\w\.]+)/i],
                                    [u, p],
                                    [/(2345Explorer)[\/\s]?([\w\.]+)/i],
                                    [u, p],
                                    [/(MetaSr)[\/\s]?([\w\.]+)/i],
                                    [u],
                                    [/(LBBROWSER)/i],
                                    [u],
                                    [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                                    [p, [u, "MIUI Browser"]],
                                    [/;fbav\/([\w\.]+);/i],
                                    [p, [u, "Facebook"]],
                                    [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i],
                                    [u, p],
                                    [/headlesschrome(?:\/([\w\.]+)|\s)/i],
                                    [p, [u, "Chrome Headless"]],
                                    [/\swv\).+(chrome)\/([\w\.]+)/i],
                                    [
                                        [u, /(.+)/, "$1 WebView"], p
                                    ],
                                    [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
                                    [
                                        [u, /(.+(?:g|us))(.+)/, "$1 $2"], p
                                    ],
                                    [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
                                    [p, [u, "Android Browser"]],
                                    [/(sailfishbrowser)\/([\w\.]+)/i],
                                    [
                                        [u, "Sailfish Browser"], p
                                    ],
                                    [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
                                    [u, p],
                                    [/(dolfin)\/([\w\.]+)/i],
                                    [
                                        [u, "Dolphin"], p
                                    ],
                                    [/(qihu|qhbrowser|qihoobrowser|360browser)/i],
                                    [
                                        [u, "360 Browser"]
                                    ],
                                    [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                                    [
                                        [u, "Chrome"], p
                                    ],
                                    [/(coast)\/([\w\.]+)/i],
                                    [
                                        [u, "Opera Coast"], p
                                    ],
                                    [/fxios\/([\w\.-]+)/i],
                                    [p, [u, "Firefox"]],
                                    [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                                    [p, [u, "Mobile Safari"]],
                                    [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                                    [p, u],
                                    [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                                    [
                                        [u, "GSA"], p
                                    ],
                                    [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                                    [u, [p, k.str, x.browser.oldsafari.version]],
                                    [/(webkit|khtml)\/([\w\.]+)/i],
                                    [u, p],
                                    [/(navigator|netscape)\/([\w\.-]+)/i],
                                    [
                                        [u, "Netscape"], p
                                    ],
                                    [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                                    [u, p]
                                ],
                                cpu: [
                                    [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                                    [
                                        [f, "amd64"]
                                    ],
                                    [/(ia32(?=;))/i],
                                    [
                                        [f, O.lowerize]
                                    ],
                                    [/((?:i[346]|x)86)[;\)]/i],
                                    [
                                        [f, "ia32"]
                                    ],
                                    [/windows\s(ce|mobile);\sppc;/i],
                                    [
                                        [f, "arm"]
                                    ],
                                    [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                                    [
                                        [f, /ower/, "", O.lowerize]
                                    ],
                                    [/(sun4\w)[;\)]/i],
                                    [
                                        [f, "sparc"]
                                    ],
                                    [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
                                    [
                                        [f, O.lowerize]
                                    ]
                                ],
                                device: [
                                    [/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],
                                    [d, h, [w, g]],
                                    [/applecoremedia\/[\w\.]+ \((ipad)/],
                                    [d, [h, "Apple"],
                                        [w, g]
                                    ],
                                    [/(apple\s{0,1}tv)/i],
                                    [
                                        [d, "Apple TV"],
                                        [h, "Apple"],
                                        [w, v]
                                    ],
                                    [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
                                    [h, d, [w, g]],
                                    [/(kf[A-z]+)\sbuild\/.+silk\//i],
                                    [d, [h, "Amazon"],
                                        [w, g]
                                    ],
                                    [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
                                    [
                                        [d, k.str, x.device.amazon.model],
                                        [h, "Amazon"],
                                        [w, b]
                                    ],
                                    [/android.+aft([bms])\sbuild/i],
                                    [d, [h, "Amazon"],
                                        [w, v]
                                    ],
                                    [/\((ip[honed|\s\w*]+);.+(apple)/i],
                                    [d, h, [w, b]],
                                    [/\((ip[honed|\s\w*]+);/i],
                                    [d, [h, "Apple"],
                                        [w, b]
                                    ],
                                    [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
                                    [h, d, [w, b]],
                                    [/\(bb10;\s(\w+)/i],
                                    [d, [h, "BlackBerry"],
                                        [w, b]
                                    ],
                                    [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],
                                    [d, [h, "Asus"],
                                        [w, g]
                                    ],
                                    [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                                    [
                                        [h, "Sony"],
                                        [d, "Xperia Tablet"],
                                        [w, g]
                                    ],
                                    [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                                    [d, [h, "Sony"],
                                        [w, b]
                                    ],
                                    [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                                    [h, d, [w, m]],
                                    [/android.+;\s(shield)\sbuild/i],
                                    [d, [h, "Nvidia"],
                                        [w, m]
                                    ],
                                    [/(playstation\s[34portablevi]+)/i],
                                    [d, [h, "Sony"],
                                        [w, m]
                                    ],
                                    [/(sprint\s(\w+))/i],
                                    [
                                        [h, k.str, x.device.sprint.vendor],
                                        [d, k.str, x.device.sprint.model],
                                        [w, b]
                                    ],
                                    [/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],
                                    [h, [d, /_/g, " "],
                                        [w, b]
                                    ],
                                    [/(nexus\s9)/i],
                                    [d, [h, "HTC"],
                                        [w, g]
                                    ],
                                    [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p|vog-l29|ane-lx1|eml-l29|ele-l29)/i],
                                    [d, [h, "Huawei"],
                                        [w, b]
                                    ],
                                    [/android.+(bah2?-a?[lw]\d{2})/i],
                                    [d, [h, "Huawei"],
                                        [w, g]
                                    ],
                                    [/(microsoft);\s(lumia[\s\w]+)/i],
                                    [h, d, [w, b]],
                                    [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                                    [d, [h, "Microsoft"],
                                        [w, m]
                                    ],
                                    [/(kin\.[onetw]{3})/i],
                                    [
                                        [d, /\./g, " "],
                                        [h, "Microsoft"],
                                        [w, b]
                                    ],
                                    [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i],
                                    [d, [h, "Motorola"],
                                        [w, b]
                                    ],
                                    [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                                    [d, [h, "Motorola"],
                                        [w, g]
                                    ],
                                    [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                                    [
                                        [h, O.trim],
                                        [d, O.trim],
                                        [w, v]
                                    ],
                                    [/hbbtv.+maple;(\d+)/i],
                                    [
                                        [d, /^/, "SmartTV"],
                                        [h, "Samsung"],
                                        [w, v]
                                    ],
                                    [/\(dtv[\);].+(aquos)/i],
                                    [d, [h, "Sharp"],
                                        [w, v]
                                    ],
                                    [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
                                    [
                                        [h, "Samsung"], d, [w, g]
                                    ],
                                    [/smart-tv.+(samsung)/i],
                                    [h, [w, v], d],
                                    [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i],
                                    [
                                        [h, "Samsung"], d, [w, b]
                                    ],
                                    [/sie-(\w*)/i],
                                    [d, [h, "Siemens"],
                                        [w, b]
                                    ],
                                    [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
                                    [
                                        [h, "Nokia"], d, [w, b]
                                    ],
                                    [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],
                                    [d, [h, "Acer"],
                                        [w, g]
                                    ],
                                    [/android.+([vl]k\-?\d{3})\s+build/i],
                                    [d, [h, "LG"],
                                        [w, g]
                                    ],
                                    [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                                    [
                                        [h, "LG"], d, [w, g]
                                    ],
                                    [/(lg) netcast\.tv/i],
                                    [h, d, [w, v]],
                                    [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i],
                                    [d, [h, "LG"],
                                        [w, b]
                                    ],
                                    [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],
                                    [h, d, [w, g]],
                                    [/android.+(ideatab[a-z0-9\-\s]+)/i],
                                    [d, [h, "Lenovo"],
                                        [w, g]
                                    ],
                                    [/(lenovo)[_\s-]?([\w-]+)/i],
                                    [h, d, [w, b]],
                                    [/linux;.+((jolla));/i],
                                    [h, d, [w, b]],
                                    [/((pebble))app\/[\d\.]+\s/i],
                                    [h, d, [w, y]],
                                    [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
                                    [h, d, [w, b]],
                                    [/crkey/i],
                                    [
                                        [d, "Chromecast"],
                                        [h, "Google"],
                                        [w, v]
                                    ],
                                    [/android.+;\s(glass)\s\d/i],
                                    [d, [h, "Google"],
                                        [w, y]
                                    ],
                                    [/android.+;\s(pixel c)[\s)]/i],
                                    [d, [h, "Google"],
                                        [w, g]
                                    ],
                                    [/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],
                                    [d, [h, "Google"],
                                        [w, b]
                                    ],
                                    [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]?[\w\s]+))\s+build/i],
                                    [
                                        [d, /_/g, " "],
                                        [h, "Xiaomi"],
                                        [w, b]
                                    ],
                                    [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]?[\w\s]+))\s+build/i],
                                    [
                                        [d, /_/g, " "],
                                        [h, "Xiaomi"],
                                        [w, g]
                                    ],
                                    [/android.+;\s(m[1-5]\snote)\sbuild/i],
                                    [d, [h, "Meizu"],
                                        [w, b]
                                    ],
                                    [/(mz)-([\w-]{2,})/i],
                                    [
                                        [h, "Meizu"], d, [w, b]
                                    ],
                                    [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})[\s)]/i],
                                    [d, [h, "OnePlus"],
                                        [w, b]
                                    ],
                                    [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
                                    [d, [h, "RCA"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
                                    [d, [h, "Dell"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
                                    [d, [h, "Verizon"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
                                    [
                                        [h, "Barnes & Noble"], d, [w, g]
                                    ],
                                    [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
                                    [d, [h, "NuVision"],
                                        [w, g]
                                    ],
                                    [/android.+;\s(k88)\sbuild/i],
                                    [d, [h, "ZTE"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
                                    [d, [h, "Swiss"],
                                        [w, b]
                                    ],
                                    [/android.+[;\/]\s*(zur\d{3})\s+build/i],
                                    [d, [h, "Swiss"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
                                    [d, [h, "Zeki"],
                                        [w, g]
                                    ],
                                    [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],
                                    [
                                        [h, "Dragon Touch"], d, [w, g]
                                    ],
                                    [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
                                    [d, [h, "Insignia"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
                                    [d, [h, "NextBook"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
                                    [
                                        [h, "Voice"], d, [w, b]
                                    ],
                                    [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
                                    [
                                        [h, "LvTel"], d, [w, b]
                                    ],
                                    [/android.+;\s(PH-1)\s/i],
                                    [d, [h, "Essential"],
                                        [w, b]
                                    ],
                                    [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
                                    [d, [h, "Envizen"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
                                    [h, d, [w, g]],
                                    [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
                                    [d, [h, "MachSpeed"],
                                        [w, g]
                                    ],
                                    [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
                                    [h, d, [w, g]],
                                    [/android.+[;\/]\s*TU_(1491)\s+build/i],
                                    [d, [h, "Rotor"],
                                        [w, g]
                                    ],
                                    [/android.+(KS(.+))\s+build/i],
                                    [d, [h, "Amazon"],
                                        [w, g]
                                    ],
                                    [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
                                    [h, d, [w, g]],
                                    [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                                    [
                                        [w, O.lowerize], h, d
                                    ],
                                    [/[\s\/\(](smart-?tv)[;\)]/i],
                                    [
                                        [w, v]
                                    ],
                                    [/(android[\w\.\s\-]{0,9});.+build/i],
                                    [d, [h, "Generic"]]
                                ],
                                engine: [
                                    [/windows.+\sedge\/([\w\.]+)/i],
                                    [p, [u, "EdgeHTML"]],
                                    [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                                    [p, [u, "Blink"]],
                                    [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                                    [u, p],
                                    [/rv\:([\w\.]{1,9}).+(gecko)/i],
                                    [p, u]
                                ],
                                os: [
                                    [/microsoft\s(windows)\s(vista|xp)/i],
                                    [u, p],
                                    [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                                    [u, [p, k.str, x.os.windows.version]],
                                    [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                                    [
                                        [u, "Windows"],
                                        [p, k.str, x.os.windows.version]
                                    ],
                                    [/\((bb)(10);/i],
                                    [
                                        [u, "BlackBerry"], p
                                    ],
                                    [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen|kaios)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i],
                                    [u, p],
                                    [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
                                    [
                                        [u, "Symbian"], p
                                    ],
                                    [/\((series40);/i],
                                    [u],
                                    [/mozilla.+\(mobile;.+gecko.+firefox/i],
                                    [
                                        [u, "Firefox OS"], p
                                    ],
                                    [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i],
                                    [u, p],
                                    [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                                    [
                                        [u, "Chromium OS"], p
                                    ],
                                    [/(sunos)\s?([\w\.\d]*)/i],
                                    [
                                        [u, "Solaris"], p
                                    ],
                                    [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
                                    [u, p],
                                    [/(haiku)\s(\w+)/i],
                                    [u, p],
                                    [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],
                                    [
                                        [p, /_/g, "."],
                                        [u, "iOS"]
                                    ],
                                    [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
                                    [
                                        [u, "Mac OS"],
                                        [p, /_/g, "."]
                                    ],
                                    [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i],
                                    [u, p]
                                ]
                            },
                            S = function e(i, t) {
                                if ("object" === n(i) && (t = i, i = r), !(this instanceof e)) return new e(i, t).getResult();
                                var o = i || (s && s.navigator && s.navigator.userAgent ? s.navigator.userAgent : ""),
                                    a = t ? O.extend(E, t) : E;
                                return this.getBrowser = function() {
                                    var e = {
                                        name: r,
                                        version: r
                                    };
                                    return k.rgx.call(e, o, a.browser), e.major = O.major(e.version), e
                                }, this.getCPU = function() {
                                    var e = {
                                        architecture: r
                                    };
                                    return k.rgx.call(e, o, a.cpu), e
                                }, this.getDevice = function() {
                                    var e = {
                                        vendor: r,
                                        model: r,
                                        type: r
                                    };
                                    return k.rgx.call(e, o, a.device), e
                                }, this.getEngine = function() {
                                    var e = {
                                        name: r,
                                        version: r
                                    };
                                    return k.rgx.call(e, o, a.engine), e
                                }, this.getOS = function() {
                                    var e = {
                                        name: r,
                                        version: r
                                    };
                                    return k.rgx.call(e, o, a.os), e
                                }, this.getResult = function() {
                                    return {
                                        ua: this.getUA(),
                                        browser: this.getBrowser(),
                                        engine: this.getEngine(),
                                        os: this.getOS(),
                                        device: this.getDevice(),
                                        cpu: this.getCPU()
                                    }
                                }, this.getUA = function() {
                                    return o
                                }, this.setUA = function(e) {
                                    return o = e, this
                                }, this
                            };
                        S.VERSION = "0.7.22", S.BROWSER = {
                            NAME: u,
                            MAJOR: "major",
                            VERSION: p
                        }, S.CPU = {
                            ARCHITECTURE: f
                        }, S.DEVICE = {
                            MODEL: d,
                            VENDOR: h,
                            TYPE: w,
                            CONSOLE: m,
                            MOBILE: b,
                            SMARTTV: v,
                            TABLET: g,
                            WEARABLE: y,
                            EMBEDDED: "embedded"
                        }, S.ENGINE = {
                            NAME: u,
                            VERSION: p
                        }, S.OS = {
                            NAME: u,
                            VERSION: p
                        }, n(i) !== c ? (n(e) !== c && e.exports && (i = e.exports = S), i.UAParser = S) : (o = function() {
                            return S
                        }.call(i, t, i, e)) === r || (e.exports = o);
                        var j = s && (s.jQuery || s.Zepto);
                        if (j && !j.ua) {
                            var T = new S;
                            j.ua = T.getResult(), j.ua.get = function() {
                                return T.getUA()
                            }, j.ua.set = function(e) {
                                T.setUA(e);
                                var i = T.getResult();
                                for (var t in i) j.ua[t] = i[t]
                            }
                        }
                    }("object" === ("undefined" == typeof window ? "undefined" : n(window)) ? window : this)
            },
            423: (e, i, t) => {
                var o = t(310),
                    n = function() {
                        this.element = document.createElement("div"), this.styles = {
                            "-webkit-overflow-scrolling": "touch",
                            overflow: "auto",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            left: 0,
                            "z-index": 99999
                        }, this.style()
                    };
                n.prototype = {
                    style: function() {
                        var e = "";
                        o(this.styles, (function(i, t) {
                            e += [i, ":", t, "!important;"].join("")
                        })), this.element.setAttribute("style", e)
                    },
                    changeStyles: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        o(e, (function(e, i) {
                            this.styles[e] = i
                        }), this), this.style()
                    },
                    destroy: function() {
                        this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = null
                    }
                }, e.exports = n
            },
            288: e => {
                var i = function(e) {
                    "string" == typeof e && (e = this.deserialize(e)), e = e || {}, this.type = e.type || "", this.data = e.data || {}
                };
                i.prototype = {
                    serialize: function() {
                        return JSON.stringify(this)
                    },
                    deserialize: function(e) {
                        return JSON.parse(e)
                    }
                }, e.exports = i
            },
            675: (e, i, t) => {
                function o(e, i) {
                    var t = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        i && (o = o.filter((function(i) {
                            return Object.getOwnPropertyDescriptor(e, i).enumerable
                        }))), t.push.apply(t, o)
                    }
                    return t
                }

                function n(e) {
                    for (var i = 1; i < arguments.length; i++) {
                        var t = null != arguments[i] ? arguments[i] : {};
                        i % 2 ? o(Object(t), !0).forEach((function(i) {
                            s(e, i, t[i])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : o(Object(t)).forEach((function(i) {
                            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i))
                        }))
                    }
                    return e
                }

                function s(e, i, t) {
                    return i in e ? Object.defineProperty(e, i, {
                        value: t,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[i] = t, e
                }
                var r = t(721),
                    a = t(424),
                    c = t(768),
                    l = t(462),
                    d = t(620),
                    u = function(e) {
                        var i = e || {};
                        this.validParams = ["role", "returnTo", "theme", "token", "locale", "brandId", "authOrigin", "showMobileDeeplink", "mobileDeeplinkParams"], this.options = n(n({}, {
                            action: "signin",
                            authDomain: "",
                            returnTo: window.location.href
                        }), i), this.load()
                    };
                u.prototype = {
                    load: function() {
                        var e = [this.options.authDomain, "/auth/v2/login/", this.options.action, "?", this.getParams()].join("");
                        this.frame = new r(e), this.receiver = new a(window, {
                            acceptFromSource: this.frame.getWindow()
                        }), this.receiver.on("auth:load_url", this.onLoadUrl, this), this.receiver.on("auth:goto_return_to", this.gotoReturnTo, this), this.receiver.on("auth:loaded", this.onLoaded, this), this.receiver.on("auth:close", this.close, this), this.receiver.on("auth:resize", this.onResize, this), c("auth:load")
                    },
                    close: function() {
                        c("auth:close"), this.destroy.apply(this, arguments)
                    },
                    getParams: function() {
                        var e = this,
                            i = [],
                            t = decodeURIComponent(this.options.returnTo).match(/\/admin|\/agent|\/chat|\/connect|\/explore|\/sell|oauth\//);
                        return this.validParams.forEach((function(t) {
                            e.options.hasOwnProperty(t) && i.push("".concat(l(t), "=").concat(encodeURIComponent(e.options[t])))
                        }), this), t && i.push("role=agent"), i.push("browser=".concat(d.browserName())), d.shortenedFlow() && i.push("request_cookie_access_state=request_access"), i.join("&")
                    },
                    destroy: function() {
                        this.frame.destroy(), this.receiver.destroy(), this.frame = void 0, this.receiver = void 0, this.onDestroyed.call(this)
                    },
                    onDestroyed: function() {},
                    onResize: function(e) {
                        var i = e.height,
                            t = window.innerHeight || document.documentElement.clientHeight;
                        i > 0 && this.frame.changeStyles({
                            height: "".concat(i, "px"),
                            "min-height": "".concat(t, "px")
                        })
                    },
                    onLoadUrl: function(e) {
                        this.close(), window.location.href = e.url
                    },
                    gotoReturnTo: function() {
                        window.location.href === this.options.returnTo ? window.location.reload(!0) : window.location.href = this.options.returnTo
                    },
                    onLoaded: function() {
                        c("auth:loaded"), document.querySelector("body").scrollTop = 1
                    }
                }, e.exports = u
            },
            721: (e, i, t) => {
                function o(e, i) {
                    var t = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        i && (o = o.filter((function(i) {
                            return Object.getOwnPropertyDescriptor(e, i).enumerable
                        }))), t.push.apply(t, o)
                    }
                    return t
                }

                function n(e) {
                    for (var i = 1; i < arguments.length; i++) {
                        var t = null != arguments[i] ? arguments[i] : {};
                        i % 2 ? o(Object(t), !0).forEach((function(i) {
                            s(e, i, t[i])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : o(Object(t)).forEach((function(i) {
                            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i))
                        }))
                    }
                    return e
                }

                function s(e, i, t) {
                    return i in e ? Object.defineProperty(e, i, {
                        value: t,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[i] = t, e
                }
                var r = t(423),
                    a = t(310),
                    c = function(e, i) {
                        if (!e) throw new Error("src not provided");
                        this.settings = n(n({}, {
                            src: e,
                            autoLoad: !0,
                            attachTo: "body"
                        }), i), this.element = document.createElement("iframe"), this.element.setAttribute("scrolling", "no"), this.element.setAttribute("allowTransparency", !0), this.element.setAttribute("border", 0), this.element.setAttribute("frameborder", 0), this.container = (new r).element, this.styles = {
                            "z-index": "99999",
                            display: "block",
                            "background-color": "transparent",
                            border: "none",
                            overflow: "hidden",
                            visibility: "visible",
                            margin: "0",
                            padding: "0",
                            "-webkit-tap-highlight-color": "transparent",
                            width: "100%",
                            height: "100%"
                        }, this.settings.autoLoad && this.load()
                    };
                c.prototype = {
                    style: function() {
                        var e = "";
                        a(this.styles, (function(i, t) {
                            e += [i, ":", t, "!important;"].join("")
                        })), this.element.setAttribute("style", e)
                    },
                    changeStyles: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        a(e, (function(e, i) {
                            this.styles[e] = i
                        }), this), this.style()
                    },
                    attach: function() {
                        var e = document.querySelector(this.settings.attachTo);
                        e && (this.container.appendChild(this.element), e.appendChild(this.container))
                    },
                    src: function() {
                        this.element.src = this.settings.src
                    },
                    load: function() {
                        this.style(), this.attach(), this.src()
                    },
                    getWindow: function() {
                        return this.element.contentWindow
                    },
                    destroy: function() {
                        this.container.parentNode && this.container.parentNode.removeChild(this.container), this.container = null, this.element = null
                    }
                }, e.exports = c
            },
            171: e => {
                function i() {
                    this.events = {}
                }
                i.prototype = {
                    on: function(e, i, t) {
                        this.events[e] || (this.events[e] = []), this.events[e].push({
                            callback: i,
                            thisArg: t
                        })
                    },
                    emit: function(e, i) {
                        var t = this.events[e] || [];
                        (this.events["*"] || []).concat(t).forEach((function(t) {
                            t.callback.call(t.thisArg, i, e)
                        }))
                    },
                    destroy: function() {
                        this.events = void 0
                    }
                }, e.exports = i
            },
            424: (e, i, t) => {
                function o(e, i) {
                    var t = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        i && (o = o.filter((function(i) {
                            return Object.getOwnPropertyDescriptor(e, i).enumerable
                        }))), t.push.apply(t, o)
                    }
                    return t
                }

                function n(e, i, t) {
                    return i in e ? Object.defineProperty(e, i, {
                        value: t,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[i] = t, e
                }
                var s = t(288),
                    r = t(171),
                    a = t(521),
                    c = t(239),
                    l = t(268),
                    d = function(e, i) {
                        if (!e) throw new Error("missing target");
                        var t = i || {};
                        this.events = {}, this.target = e, this.settings = function(e) {
                            for (var i = 1; i < arguments.length; i++) {
                                var t = null != arguments[i] ? arguments[i] : {};
                                i % 2 ? o(Object(t), !0).forEach((function(i) {
                                    n(e, i, t[i])
                                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : o(Object(t)).forEach((function(i) {
                                    Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i))
                                }))
                            }
                            return e
                        }({
                            acceptFromSource: null
                        }, t), this.onMessage = a(this.onMessage, this), c(this.target, "message", this.onMessage), this.mediator = new r
                    };
                d.prototype = {
                    onMessage: function(e) {
                        if (e.source === this.settings.acceptFromSource) {
                            var i = new s(e.data);
                            this.mediator.emit(i.type, i.data)
                        }
                    },
                    on: function() {
                        this.mediator.on.apply(this.mediator, arguments)
                    },
                    destroy: function() {
                        l(this.target, "message", this.onMessage), this.mediator.destroy(), this.mediator = void 0, this.settings = void 0, this.target = void 0, this.events = void 0
                    }
                }, e.exports = d
            }
        },
        i = {};

    function t(o) {
        var n = i[o];
        if (void 0 !== n) return n.exports;
        var s = i[o] = {
            id: o,
            loaded: !1,
            exports: {}
        };
        return e[o].call(s.exports, s, s.exports, t), s.loaded = !0, s.exports
    }
    t.nmd = e => (e.paths = [], e.children || (e.children = []), e), (() => {
        function e(e, i) {
            var t = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                i && (o = o.filter((function(i) {
                    return Object.getOwnPropertyDescriptor(e, i).enumerable
                }))), t.push.apply(t, o)
            }
            return t
        }

        function i(i) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? e(Object(n), !0).forEach((function(e) {
                    o(i, e, n[e])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(n)) : e(Object(n)).forEach((function(e) {
                    Object.defineProperty(i, e, Object.getOwnPropertyDescriptor(n, e))
                }))
            }
            return i
        }

        function o(e, i, t) {
            return i in e ? Object.defineProperty(e, i, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[i] = t, e
        }
        var n = t(675),
            s = t(78),
            r = new function() {
                if (this.KEYS = ["returnTo", "role", "theme", "token", "locale", "brandId", "authOrigin", "authDomain", "showMobileDeeplink", "mobileDeeplinkParams", "action"], this.elm = document.currentScript || document.querySelector('[src*="/auth/v2"]'), !this.elm) throw new Error("Could not find script tag for zendesk_auth");
                if (this.declarativeOptions = s(this.elm, this.KEYS), !this.declarativeOptions.authDomain) {
                    var e = this.elm.getAttribute("src") || "";
                    this.declarativeOptions.authDomain = e.replace(/\/auth\/v2.*/, "")
                }
                this.open = function(e) {
                    var t, o, s = e || {};
                    return o || (t = i(i({}, this.declarativeOptions), s), (o = new n(t)).onDestroyed((function() {
                        o = void 0
                    }))), {
                        close: function() {
                            o.close()
                        }
                    }
                }, this.declarativeOptions.action && this.open()
            };
        window.Zendesk = window.Zendesk || {}, window.Zendesk.Auth = function(e) {
            return r.open(e)
        }
    })()
})();