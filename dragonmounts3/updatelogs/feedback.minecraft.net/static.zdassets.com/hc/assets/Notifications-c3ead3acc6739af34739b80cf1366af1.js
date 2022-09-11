/*! For license information please see Notifications-c3ead3acc6739af34739b80cf1366af1.js.LICENSE.txt */
"use strict";
(self.webpackChunkhelp_center = self.webpackChunkhelp_center || []).push([
    [51623], {
        2589: function(e, n, t) {
            t.r(n), t.d(n, {
                default: function() {
                    return h
                }
            });
            var r = t(67294),
                a = t(73935),
                i = t(35937),
                l = t(38016),
                o = t.n(l),
                s = t(96989);

            function u() {
                return s.Z.get("current_brand_active") ? r.createElement(r.Fragment, null, o()("txt.help_center.views.shared.setup_mode_notification.message"), " ", r.createElement("a", {
                    href: "/hc/admin/general_settings"
                }, o()("txt.help_center.views.shared.setup_mode_notification.general_settings"))) : r.createElement(r.Fragment, null, r.createElement("strong", null, o()("txt.help_center.views.shared.brand_inactive_notification.heading")), " ", o()("txt.help_center.views.shared.brand_inactive_notification.message"), " ", r.createElement("a", {
                    href: "/agent/admin/brands",
                    target: "_blank"
                }, o()("txt.help_center.views.shared.brand_inactive_notification.brand_settings")))
            }

            function c() {
                var e = s.Z.get("current_session.shared_csrf_token"),
                    n = (0, r.useRef)(null);
                return r.createElement("form", {
                    action: "/users/revert",
                    method: "POST",
                    ref: n
                }, r.createElement("input", {
                    type: "hidden",
                    name: "authenticity_token",
                    value: e
                }), r.createElement("strong", null, o()("txt.help_center.views.shared.assume_user_warning.heading")), " ", o()("txt.help_center.views.shared.assume_user_warning.message"), " ", r.createElement("a", {
                    href: "/users/revert",
                    onClick: function(e) {
                        e.preventDefault(), n.current.submit()
                    }
                }, o()("txt.help_center.views.shared.assume_user_warning.end")))
            }
            var f = t(93379),
                d = t.n(f),
                p = t(43234),
                m = {
                    insert: "head",
                    singleton: !1
                },
                _ = (d()(p.Z, m), p.Z.locals || {}),
                h = function(e) {
                    document.body.appendChild(e), a.render(r.createElement(i.Z, null), e);
                    var n = "manager" === s.Z.get("user.role"),
                        t = s.Z.get("help_center_restricted"),
                        l = s.Z.get("is_preview"),
                        o = s.Z.get("is_assuming_someone_else"),
                        f = s.Z.get("flash_messages") || [];
                    n && t && !l && i.N.push({
                        type: "info",
                        message: r.createElement(u, null)
                    }), o && i.N.push({
                        type: "info",
                        message: r.createElement(c, null),
                        timeout: 1 / 0
                    }), f.forEach((function(e) {
                        var n = e.type,
                            t = e.title,
                            a = e.message,
                            l = e.timeout;
                        i.N.push({
                            type: {
                                notice: "success",
                                alert: "warning",
                                error: "error"
                            }[n] || "default",
                            title: t,
                            message: a && r.createElement("div", {
                                className: _.notificationBody,
                                dangerouslySetInnerHTML: {
                                    __html: a
                                }
                            }),
                            timeout: "Infinity" === l ? 1 / 0 : l
                        })
                    }))
                }
        },
        43234: function(e, n, t) {
            var r = t(87537),
                a = t.n(r),
                i = t(23645),
                l = t.n(i),
                o = t(54449),
                s = l()(a());
            s.i(o.Z, "", !0), s.push([e.id, ".ill1cK6AKmq2CuRrec_HtAbnINZ3NJ3C {\n}\n", "", {
                version: 3,
                sources: ["webpack://./ui/javascripts/enduser/modules/notifications/index.css"],
                names: [],
                mappings: "AAAA;AAEA",
                sourcesContent: ['.notificationBody {\n  composes: c-callout__paragraph from "~@zendeskgarden/css-callouts/dist/index.css";\n}\n'],
                sourceRoot: ""
            }]), s.locals = {
                notificationBody: "ill1cK6AKmq2CuRrec_HtAbnINZ3NJ3C " + o.Z.locals["c-callout__paragraph"]
            }, n.Z = s
        },
        60053: function(e, n) {
            var t, r, a, i;
            if ("object" == typeof performance && "function" == typeof performance.now) {
                var l = performance;
                n.unstable_now = function() {
                    return l.now()
                }
            } else {
                var o = Date,
                    s = o.now();
                n.unstable_now = function() {
                    return o.now() - s
                }
            }
            if ("undefined" == typeof window || "function" != typeof MessageChannel) {
                var u = null,
                    c = null,
                    f = function() {
                        if (null !== u) try {
                            var e = n.unstable_now();
                            u(!0, e), u = null
                        } catch (e) {
                            throw setTimeout(f, 0), e
                        }
                    };
                t = function(e) {
                    null !== u ? setTimeout(t, 0, e) : (u = e, setTimeout(f, 0))
                }, r = function(e, n) {
                    c = setTimeout(e, n)
                }, a = function() {
                    clearTimeout(c)
                }, n.unstable_shouldYield = function() {
                    return !1
                }, i = n.unstable_forceFrameRate = function() {}
            } else {
                var d = window.setTimeout,
                    p = window.clearTimeout;
                if ("undefined" != typeof console) {
                    var m = window.cancelAnimationFrame;
                    "function" != typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), "function" != typeof m && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")
                }
                var _ = !1,
                    h = null,
                    b = -1,
                    v = 5,
                    g = 0;
                n.unstable_shouldYield = function() {
                    return n.unstable_now() >= g
                }, i = function() {}, n.unstable_forceFrameRate = function(e) {
                    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : v = 0 < e ? Math.floor(1e3 / e) : 5
                };
                var w = new MessageChannel,
                    y = w.port2;
                w.port1.onmessage = function() {
                    if (null !== h) {
                        var e = n.unstable_now();
                        g = e + v;
                        try {
                            h(!0, e) ? y.postMessage(null) : (_ = !1, h = null)
                        } catch (e) {
                            throw y.postMessage(null), e
                        }
                    } else _ = !1
                }, t = function(e) {
                    h = e, _ || (_ = !0, y.postMessage(null))
                }, r = function(e, t) {
                    b = d((function() {
                        e(n.unstable_now())
                    }), t)
                }, a = function() {
                    p(b), b = -1
                }
            }

            function k(e, n) {
                var t = e.length;
                e.push(n);
                e: for (;;) {
                    var r = t - 1 >>> 1,
                        a = e[r];
                    if (!(void 0 !== a && 0 < E(a, n))) break e;
                    e[r] = n, e[t] = a, t = r
                }
            }

            function x(e) {
                return void 0 === (e = e[0]) ? null : e
            }

            function T(e) {
                var n = e[0];
                if (void 0 !== n) {
                    var t = e.pop();
                    if (t !== n) {
                        e[0] = t;
                        e: for (var r = 0, a = e.length; r < a;) {
                            var i = 2 * (r + 1) - 1,
                                l = e[i],
                                o = i + 1,
                                s = e[o];
                            if (void 0 !== l && 0 > E(l, t)) void 0 !== s && 0 > E(s, l) ? (e[r] = s, e[o] = t, r = o) : (e[r] = l, e[i] = t, r = i);
                            else {
                                if (!(void 0 !== s && 0 > E(s, t))) break e;
                                e[r] = s, e[o] = t, r = o
                            }
                        }
                    }
                    return n
                }
                return null
            }

            function E(e, n) {
                var t = e.sortIndex - n.sortIndex;
                return 0 !== t ? t : e.id - n.id
            }
            var C = [],
                A = [],
                Z = 1,
                I = null,
                F = 3,
                N = !1,
                P = !1,
                M = !1;

            function R(e) {
                for (var n = x(A); null !== n;) {
                    if (null === n.callback) T(A);
                    else {
                        if (!(n.startTime <= e)) break;
                        T(A), n.sortIndex = n.expirationTime, k(C, n)
                    }
                    n = x(A)
                }
            }

            function j(e) {
                if (M = !1, R(e), !P)
                    if (null !== x(C)) P = !0, t(q);
                    else {
                        var n = x(A);
                        null !== n && r(j, n.startTime - e)
                    }
            }

            function q(e, t) {
                P = !1, M && (M = !1, a()), N = !0;
                var i = F;
                try {
                    for (R(t), I = x(C); null !== I && (!(I.expirationTime > t) || e && !n.unstable_shouldYield());) {
                        var l = I.callback;
                        if ("function" == typeof l) {
                            I.callback = null, F = I.priorityLevel;
                            var o = l(I.expirationTime <= t);
                            t = n.unstable_now(), "function" == typeof o ? I.callback = o : I === x(C) && T(C), R(t)
                        } else T(C);
                        I = x(C)
                    }
                    if (null !== I) var s = !0;
                    else {
                        var u = x(A);
                        null !== u && r(j, u.startTime - t), s = !1
                    }
                    return s
                } finally {
                    I = null, F = i, N = !1
                }
            }
            var L = i;
            n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(e) {
                e.callback = null
            }, n.unstable_continueExecution = function() {
                P || N || (P = !0, t(q))
            }, n.unstable_getCurrentPriorityLevel = function() {
                return F
            }, n.unstable_getFirstCallbackNode = function() {
                return x(C)
            }, n.unstable_next = function(e) {
                switch (F) {
                    case 1:
                    case 2:
                    case 3:
                        var n = 3;
                        break;
                    default:
                        n = F
                }
                var t = F;
                F = n;
                try {
                    return e()
                } finally {
                    F = t
                }
            }, n.unstable_pauseExecution = function() {}, n.unstable_requestPaint = L, n.unstable_runWithPriority = function(e, n) {
                switch (e) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    default:
                        e = 3
                }
                var t = F;
                F = e;
                try {
                    return n()
                } finally {
                    F = t
                }
            }, n.unstable_scheduleCallback = function(e, i, l) {
                var o = n.unstable_now();
                switch ("object" == typeof l && null !== l ? l = "number" == typeof(l = l.delay) && 0 < l ? o + l : o : l = o, e) {
                    case 1:
                        var s = -1;
                        break;
                    case 2:
                        s = 250;
                        break;
                    case 5:
                        s = 1073741823;
                        break;
                    case 4:
                        s = 1e4;
                        break;
                    default:
                        s = 5e3
                }
                return e = {
                    id: Z++,
                    callback: i,
                    priorityLevel: e,
                    startTime: l,
                    expirationTime: s = l + s,
                    sortIndex: -1
                }, l > o ? (e.sortIndex = l, k(A, e), null === x(C) && e === x(A) && (M ? a() : M = !0, r(j, l - o))) : (e.sortIndex = s, k(C, e), P || N || (P = !0, t(q))), e
            }, n.unstable_wrapCallback = function(e) {
                var n = F;
                return function() {
                    var t = F;
                    F = n;
                    try {
                        return e.apply(this, arguments)
                    } finally {
                        F = t
                    }
                }
            }
        },
        63840: function(e, n, t) {
            e.exports = t(60053)
        }
    }
]);