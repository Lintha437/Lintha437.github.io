(self.webpackChunkhelp_center = self.webpackChunkhelp_center || []).push([
    [56295], {
        43410: function(n, e, t) {
            "use strict";
            var r, o = t(67294);

            function i() {
                return i = Object.assign || function(n) {
                    for (var e = 1; e < arguments.length; e++) {
                        var t = arguments[e];
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
                    }
                    return n
                }, i.apply(this, arguments)
            }
            e.Z = function(n) {
                return o.createElement("svg", i({
                    xmlns: "http://www.w3.org/2000/svg",
                    width: 12,
                    height: 12,
                    viewBox: "0 0 12 12"
                }, n), r || (r = o.createElement("path", {
                    fill: "none",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M1 7l3 3 7-7"
                })))
            }
        },
        70486: function(n, e, t) {
            "use strict";
            t.d(e, {
                v2: function() {
                    return c.v2
                },
                j2: function() {
                    return E
                },
                sN: function() {
                    return C
                },
                Uk: function() {
                    return g
                },
                qy: function() {
                    return v
                },
                Cl: function() {
                    return B
                }
            });
            var r = t(41266),
                o = t(73126),
                i = t(67294),
                a = t(45697),
                s = t.n(a),
                c = t(33080),
                u = t(55877),
                l = t.n(u);

            function A() {
                for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++) e[t] = arguments[t];
                var r = (0, i.useRef)();
                return (0, i.useEffect)((function() {
                    e.forEach((function(n) {
                        n && ("function" == typeof n ? n(r.current) : n.current = r.current)
                    }))
                }), [e]), r
            }
            var p = t(93379),
                f = t.n(p),
                d = t(76967),
                m = {
                    insert: "head",
                    singleton: !1
                },
                b = (f()(d.Z, m), d.Z.locals || {}),
                x = ["position"],
                E = (0, i.forwardRef)((function(n, e) {
                    var t = A(e, i.useRef(null));
                    return (0, i.useEffect)((function() {
                        t.current.removeAttribute("data-reach-menu-button")
                    }), [t, e]), i.createElement(c.j2, (0, o.Z)({
                        ref: t,
                        id: l().v4()
                    }, n))
                }));
            E.displayName = c.j2.displayName;
            var h = (0, i.forwardRef)((function(n, e) {
                var t = A(e, i.useRef(null));
                return (0, i.useEffect)((function() {
                    t.current.removeAttribute("data-reach-menu-items"), t.current.parentElement.removeAttribute("data-reach-popover"), t.current.parentElement.removeAttribute("data-reach-menu"), t.current.parentElement.removeAttribute("data-reach-menu-popover")
                }), [t, e]), i.createElement(c.sd, (0, o.Z)({
                    ref: t,
                    className: b.list
                }, n))
            }));
            h.displayName = c.sd.displayName;
            var v = (0, i.forwardRef)((function(n, e) {
                var t = n.position,
                    o = (0, r.Z)(n, x);
                return i.createElement(c.YI, {
                    ref: e,
                    position: t
                }, i.createElement(h, o))
            }));
            v.propTypes = {
                position: s().any
            }, v.displayName = c.qy.displayName;
            var C = (0, i.forwardRef)((function(n, e) {
                var t = A(e, i.useRef(null));
                return (0, i.useEffect)((function() {
                    t.current.removeAttribute("data-reach-menu-item")
                }), [t, e]), i.createElement(c.sN, (0, o.Z)({
                    ref: t,
                    className: b.item
                }, n))
            }));
            C.displayName = c.sN.displayName;
            var g = (0, i.forwardRef)((function(n, e) {
                var t = A(e, i.useRef(null));
                return (0, i.useEffect)((function() {
                    t.current.removeAttribute("data-reach-menu-item"), t.current.removeAttribute("data-reach-menu-link")
                }), [t, e]), i.createElement(c.Uk, (0, o.Z)({
                    ref: t,
                    className: b.item
                }, n))
            }));
            g.displayName = c.Uk.displayName;
            var B = function(n) {
                return i.createElement("div", (0, o.Z)({
                    className: b.separator
                }, n))
            }
        },
        69605: function(n, e, t) {
            "use strict";
            t.r(e), t.d(e, {
                default: function() {
                    return M
                }
            });
            var r = t(25110),
                o = t.n(r),
                i = t(67294),
                a = t(73935),
                s = t(56869),
                c = t.n(s),
                u = t(44845),
                l = t(83728),
                A = t(33938),
                p = t(51679),
                f = t.n(p),
                d = t(97606),
                m = t.n(d),
                b = t(28222),
                x = t.n(b),
                E = t(80222),
                h = t.n(E),
                v = t(14418),
                C = t.n(v),
                g = t(8446),
                B = t.n(g),
                w = t(66870),
                y = t.n(w),
                k = t(29747),
                O = t.n(k),
                R = t(96718),
                N = t.n(R),
                Z = t(30222),
                j = t.n(Z),
                W = t(45697),
                T = t.n(W),
                _ = t(38016),
                S = t.n(_),
                q = t(53371),
                z = t(43410),
                P = t(96989),
                F = t(70486),
                Q = t(35937),
                U = t(93379),
                D = t.n(U),
                K = t(39354),
                I = {
                    insert: "head",
                    singleton: !1
                },
                L = (D()(K.Z, I), K.Z.locals || {});

            function Y(n, e) {
                var t = x()(n);
                if (h()) {
                    var r = h()(n);
                    e && (r = C()(r).call(r, (function(e) {
                        return B()(n, e).enumerable
                    }))), t.push.apply(t, r)
                }
                return t
            }

            function X(n) {
                for (var e = 1; e < arguments.length; e++) {
                    var t = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? Y(Object(t), !0).forEach((function(e) {
                        (0, u.Z)(n, e, t[e])
                    })) : y() ? O()(n, y()(t)) : Y(Object(t)).forEach((function(e) {
                        N()(n, e, B()(t, e))
                    }))
                }
                return n
            }
            var H = function() {
                var n = (0, A.Z)(j().mark((function n(e, t) {
                    var r;
                    return j().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                            case 0:
                                return n.t0 = fetch, n.t1 = e, n.t2 = t, n.next = 5, (0, q.RJ)();
                            case 5:
                                return n.t3 = n.sent, n.t4 = {
                                    "X-CSRF-Token": n.t3
                                }, n.t5 = {
                                    method: n.t2,
                                    credentials: "same-origin",
                                    headers: n.t4
                                }, n.next = 10, (0, n.t0)(n.t1, n.t5);
                            case 10:
                                if ((r = n.sent).ok) {
                                    n.next = 13;
                                    break
                                }
                                throw new Error(r.statusText);
                            case 13:
                            case "end":
                                return n.stop()
                        }
                    }), n)
                })));
                return function(e, t) {
                    return n.apply(this, arguments)
                }
            }();

            function J(n) {
                var e = n.url,
                    t = (0, i.useState)(n.options),
                    r = (0, l.Z)(t, 2),
                    o = r[0],
                    a = r[1],
                    s = (0, i.useState)(n.isSubscribed),
                    c = (0, l.Z)(s, 2),
                    u = c[0],
                    p = c[1],
                    d = (0, i.useState)(n.followerCount),
                    b = (0, l.Z)(d, 2),
                    x = b[0],
                    E = b[1],
                    h = "anonymous" !== P.Z.get("user.role"),
                    v = null == o ? void 0 : f()(o).call(o, (function(n) {
                        return n.selected
                    })),
                    C = function() {
                        var n = (0, A.Z)(j().mark((function n(t) {
                            var r;
                            return j().wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return r = u, p(!0), a(null == o ? void 0 : m()(o).call(o, (function(n) {
                                            return X(X({}, n), {}, {
                                                selected: n === t
                                            })
                                        }))), void 0 === x || u || E(x + 1), n.prev = 4, n.next = 7, H((null == t ? void 0 : t.url) || e, "POST");
                                    case 7:
                                        n.next = 15;
                                        break;
                                    case 9:
                                        n.prev = 9, n.t0 = n.catch(4), Q.N.push({
                                            type: "error",
                                            title: S()("txt.help_center.views.subscribe.error_message")
                                        }), p(r), a(null == o ? void 0 : m()(o).call(o, (function(n) {
                                            return X(X({}, n), {}, {
                                                selected: n === v
                                            })
                                        }))), void 0 === x || r || E(x);
                                    case 15:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [4, 9]
                            ])
                        })));
                        return function(e) {
                            return n.apply(this, arguments)
                        }
                    }(),
                    g = function() {
                        var n = (0, A.Z)(j().mark((function n() {
                            return j().wrap((function(n) {
                                for (;;) switch (n.prev = n.next) {
                                    case 0:
                                        return p(!1), a(null == o ? void 0 : m()(o).call(o, (function(n) {
                                            return X(X({}, n), {}, {
                                                selected: !1
                                            })
                                        }))), void 0 !== x && E(x - 1), n.prev = 3, n.next = 6, H(e, "DELETE");
                                    case 6:
                                        n.next = 14;
                                        break;
                                    case 8:
                                        n.prev = 8, n.t0 = n.catch(3), Q.N.push({
                                            type: "error",
                                            title: S()("txt.help_center.views.subscribe.error_message")
                                        }), p(!0), a(null == o ? void 0 : m()(o).call(o, (function(n) {
                                            return X(X({}, n), {}, {
                                                selected: n === v
                                            })
                                        }))), void 0 !== x && E(x);
                                    case 14:
                                    case "end":
                                        return n.stop()
                                }
                            }), n, null, [
                                [3, 8]
                            ])
                        })));
                        return function() {
                            return n.apply(this, arguments)
                        }
                    }();
                return i.createElement(F.v2, null, i.createElement(F.j2, {
                    onClick: function() {
                        h && !o && (u ? g() : C())
                    },
                    "data-auth-action": h ? void 0 : "signin",
                    "data-follower-count": x,
                    "data-selected": u
                }, u ? o ? S()("txt.help_center.views.section._subscription.following") : S()("txt.help_center.views.section._subscription.unfollow") : S()("txt.help_center.views.section._subscription.follow")), h && o && i.createElement(F.qy, {
                    className: L.list
                }, m()(o).call(o, (function(n) {
                    return i.createElement(F.sN, {
                        key: n.url,
                        className: L.item,
                        onSelect: function() {
                            return C(n)
                        }
                    }, n.label, n.selected && i.createElement(i.Fragment, null, i.createElement("span", {
                        className: L.spacer
                    }), i.createElement(z.Z, {
                        "aria-hidden": !0
                    })))
                })), u && i.createElement(F.sN, {
                    key: e,
                    className: L.item,
                    onSelect: g
                }, S()("txt.help_center.views.section._subscription.unfollow"))))
            }

            function M() {
                var n = document.querySelectorAll("[data-helper='subscribe']");
                o()(n).forEach((function(n) {
                    var e = n.getAttribute("data-json"),
                        t = c()(JSON.parse(e));
                    n.removeAttribute("data-helper"), n.removeAttribute("data-json"), a.render(i.createElement(J, t), n)
                }))
            }
            J.propTypes = {
                url: T().string.isRequired,
                isSubscribed: T().bool.isRequired,
                followerCount: T().number,
                options: T().arrayOf(T().shape({
                    label: T().string.isRequired,
                    url: T().string.isRequired,
                    selected: T().bool.isRequired
                }))
            }
        },
        7702: function(n, e, t) {
            t(74979);
            var r = t(54058).Object,
                o = n.exports = function(n, e) {
                    return r.defineProperties(n, e)
                };
            r.defineProperties.sham && (o.sham = !0)
        },
        286: function(n, e, t) {
            t(46924);
            var r = t(54058).Object,
                o = n.exports = function(n, e) {
                    return r.getOwnPropertyDescriptor(n, e)
                };
            r.getOwnPropertyDescriptor.sham && (o.sham = !0)
        },
        92766: function(n, e, t) {
            t(88482);
            var r = t(54058);
            n.exports = r.Object.getOwnPropertyDescriptors
        },
        74979: function(n, e, t) {
            var r = t(76887),
                o = t(55746),
                i = t(59938).f;
            r({
                target: "Object",
                stat: !0,
                forced: Object.defineProperties !== i,
                sham: !o
            }, {
                defineProperties: i
            })
        },
        46924: function(n, e, t) {
            var r = t(76887),
                o = t(95981),
                i = t(74529),
                a = t(49677).f,
                s = t(55746),
                c = o((function() {
                    a(1)
                }));
            r({
                target: "Object",
                stat: !0,
                forced: !s || c,
                sham: !s
            }, {
                getOwnPropertyDescriptor: function(n, e) {
                    return a(i(n), e)
                }
            })
        },
        88482: function(n, e, t) {
            var r = t(76887),
                o = t(55746),
                i = t(31136),
                a = t(74529),
                s = t(49677),
                c = t(55449);
            r({
                target: "Object",
                stat: !0,
                sham: !o
            }, {
                getOwnPropertyDescriptors: function(n) {
                    for (var e, t, r = a(n), o = s.f, u = i(r), l = {}, A = 0; u.length > A;) void 0 !== (t = o(r, e = u[A++])) && c(l, e, t);
                    return l
                }
            })
        },
        57396: function(n, e, t) {
            var r = t(7702);
            n.exports = r
        },
        79427: function(n, e, t) {
            var r = t(286);
            n.exports = r
        },
        62857: function(n, e, t) {
            var r = t(92766);
            n.exports = r
        },
        76967: function(n, e, t) {
            "use strict";
            var r = t(87537),
                o = t.n(r),
                i = t(23645),
                a = t.n(i)()(o());
            a.push([n.id, ":root {\n  --reach-menu-button: 1;\n}\n\n._8RHFYPTt0CxuUudzL8wxA9oZq1ynL1u {\n  background: #fff;\n  border: 1px solid rgb(216, 216, 216);\n  border-radius: 3px;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  left: 0;\n  min-width: 170px;\n  outline: none;\n  padding: 10px 0;\n  position: relative;\n  z-index: 1000;\n}\n\n._s7IdTkp038IFCdlKs8vwOcioOy4uK5h {\n  color: #333;\n  cursor: pointer;\n  display: block;\n  padding: 7px 40px 7px 20px;\n  outline: none;\n  white-space: nowrap;\n}\n\n._s7IdTkp038IFCdlKs8vwOcioOy4uK5h:hover,\n._s7IdTkp038IFCdlKs8vwOcioOy4uK5h:focus {\n  background: #f3f3f3;\n  text-decoration: none;\n  color: #333;\n}\n\n.XmCiWBUhr_QflETEQRaOWgLkfbAj8oS7 {\n  border-bottom: 1px solid rgb(216, 216, 216);\n  color: rgb(150, 150, 150);\n  display: block;\n  font-weight: normal;\n  font-size: 11px;\n  padding: 5px 0;\n  margin: 5px 20px 10px 20px;\n}\n\n.NFPgFc0gI0HvonfLdOrjAWlpe6fhsgu2 {\n  display: inline-block;\n  width: 10px;\n}\n", "", {
                version: 3,
                sources: ["webpack://./ui/components/MenuButton/index.css"],
                names: [],
                mappings: "AAAA;EACE,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;EAChB,oCAAoC;EACpC,kBAAkB;EAClB,wCAAwC;EACxC,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,OAAO;EACP,gBAAgB;EAChB,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,WAAW;EACX,eAAe;EACf,cAAc;EACd,0BAA0B;EAC1B,aAAa;EACb,mBAAmB;AACrB;;AAEA;;EAEE,mBAAmB;EACnB,qBAAqB;EACrB,WAAW;AACb;;AAEA;EACE,2CAA2C;EAC3C,yBAAyB;EACzB,cAAc;EACd,mBAAmB;EACnB,eAAe;EACf,cAAc;EACd,0BAA0B;AAC5B;;AAEA;EACE,qBAAqB;EACrB,WAAW;AACb",
                sourcesContent: [":root {\n  --reach-menu-button: 1;\n}\n\n.list {\n  background: #fff;\n  border: 1px solid rgb(216, 216, 216);\n  border-radius: 3px;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  left: 0;\n  min-width: 170px;\n  outline: none;\n  padding: 10px 0;\n  position: relative;\n  z-index: 1000;\n}\n\n.item {\n  color: #333;\n  cursor: pointer;\n  display: block;\n  padding: 7px 40px 7px 20px;\n  outline: none;\n  white-space: nowrap;\n}\n\n.item:hover,\n.item:focus {\n  background: #f3f3f3;\n  text-decoration: none;\n  color: #333;\n}\n\n.separator {\n  border-bottom: 1px solid rgb(216, 216, 216);\n  color: rgb(150, 150, 150);\n  display: block;\n  font-weight: normal;\n  font-size: 11px;\n  padding: 5px 0;\n  margin: 5px 20px 10px 20px;\n}\n\n.spacer {\n  display: inline-block;\n  width: 10px;\n}\n"],
                sourceRoot: ""
            }]), a.locals = {
                list: "_8RHFYPTt0CxuUudzL8wxA9oZq1ynL1u",
                item: "_s7IdTkp038IFCdlKs8vwOcioOy4uK5h",
                separator: "XmCiWBUhr_QflETEQRaOWgLkfbAj8oS7",
                spacer: "NFPgFc0gI0HvonfLdOrjAWlpe6fhsgu2"
            }, e.Z = a
        },
        39354: function(n, e, t) {
            "use strict";
            var r = t(87537),
                o = t.n(r),
                i = t(23645),
                a = t.n(i)()(o());
            a.push([n.id, ":root {\n  --reach-menu-button: 1;\n}\n\n.vb0q01gYhxX6xjoZDd0O4Qb7TxhiDaKD {\n  background: #fff;\n  border: 1px solid rgb(216, 216, 216);\n  border-radius: 3px;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  left: 0;\n  min-width: 170px;\n  outline: none;\n  padding: 10px 0;\n  z-index: 1000;\n}\n\n.OZgYUTQTaNinWRRb5SyjeQ8WEtA09RuF {\n  color: #333;\n  cursor: pointer;\n  display: block;\n  padding: 7px 40px 7px 20px;\n  outline: none;\n  white-space: nowrap;\n}\n\n.OZgYUTQTaNinWRRb5SyjeQ8WEtA09RuF:hover,\n.OZgYUTQTaNinWRRb5SyjeQ8WEtA09RuF:focus {\n  background: #f3f3f3;\n  text-decoration: none;\n  color: #333;\n}\n\n.p1JvbEyYxbSfz1_7MmGKUQzT0SOap8Vu {\n  display: inline-block;\n  width: 10px;\n}\n", "", {
                version: 3,
                sources: ["webpack://./ui/components/Subscribe/index.css"],
                names: [],
                mappings: "AAAA;EACE,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;EAChB,oCAAoC;EACpC,kBAAkB;EAClB,wCAAwC;EACxC,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,OAAO;EACP,gBAAgB;EAChB,aAAa;EACb,eAAe;EACf,aAAa;AACf;;AAEA;EACE,WAAW;EACX,eAAe;EACf,cAAc;EACd,0BAA0B;EAC1B,aAAa;EACb,mBAAmB;AACrB;;AAEA;;EAEE,mBAAmB;EACnB,qBAAqB;EACrB,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,WAAW;AACb",
                sourcesContent: [":root {\n  --reach-menu-button: 1;\n}\n\n.list {\n  background: #fff;\n  border: 1px solid rgb(216, 216, 216);\n  border-radius: 3px;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  left: 0;\n  min-width: 170px;\n  outline: none;\n  padding: 10px 0;\n  z-index: 1000;\n}\n\n.item {\n  color: #333;\n  cursor: pointer;\n  display: block;\n  padding: 7px 40px 7px 20px;\n  outline: none;\n  white-space: nowrap;\n}\n\n.item:hover,\n.item:focus {\n  background: #f3f3f3;\n  text-decoration: none;\n  color: #333;\n}\n\n.spacer {\n  display: inline-block;\n  width: 10px;\n}\n"],
                sourceRoot: ""
            }]), a.locals = {
                list: "vb0q01gYhxX6xjoZDd0O4Qb7TxhiDaKD",
                item: "OZgYUTQTaNinWRRb5SyjeQ8WEtA09RuF",
                spacer: "p1JvbEyYxbSfz1_7MmGKUQzT0SOap8Vu"
            }, e.Z = a
        },
        29747: function(n, e, t) {
            n.exports = t(57396)
        },
        8446: function(n, e, t) {
            n.exports = t(79427)
        },
        66870: function(n, e, t) {
            n.exports = t(62857)
        },
        80222: function(n, e, t) {
            n.exports = t(9534)
        },
        28222: function(n, e, t) {
            n.exports = t(23059)
        }
    }
]);