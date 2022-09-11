(function(t) {
    var e, n, s = Math.round,
        r = {},
        i = "undefined" != typeof module && module.exports,
        a = /^\/?Date\((\-?\d+)/i,
        o = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
        u = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
        h = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        d = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
        c = /\d\d?/,
        f = /\d{1,3}/,
        l = /\d{3}/,
        _ = /\d{1,4}/,
        m = /[+\-]?\d{1,6}/,
        y = /\d+/,
        p = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        g = /Z|[\+\-]\d\d:?\d\d/i,
        w = /T/i,
        M = /[\+\-]?\d+(\.\d{1,3})?/,
        D = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d:?\d\d|Z)?)?$/,
        Y = ["YYYY-MM-DD", "GGGG-[W]WW", "GGGG-[W]WW-E", "YYYY-DDD"],
        k = [
            ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
            ["HH:mm", /(T| )\d\d:\d\d/],
            ["HH", /(T| )\d\d/]
        ],
        v = /([\+\-]|\d\d)/gi,
        S = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
        b = {
            Milliseconds: 1,
            Seconds: 1e3,
            Minutes: 6e4,
            Hours: 36e5,
            Days: 864e5,
            Months: 2592e6,
            Years: 31536e6
        },
        T = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            D: "date",
            w: "week",
            W: "isoWeek",
            M: "month",
            y: "year",
            DDD: "dayOfYear",
            e: "weekday",
            E: "isoWeekday",
            gg: "weekYear",
            GG: "isoWeekYear"
        },
        O = {
            dayofyear: "dayOfYear",
            isoweekday: "isoWeekday",
            isoweek: "isoWeek",
            weekyear: "weekYear",
            isoweekyear: "isoWeekYear"
        },
        G = {},
        W = "DDD w W M D d".split(" "),
        F = "M D H h m s w W".split(" "),
        C = {
            M: function() {
                return this.month() + 1
            },
            MMM: function(t) {
                return this.lang().monthsShort(this, t)
            },
            MMMM: function(t) {
                return this.lang().months(this, t)
            },
            D: function() {
                return this.date()
            },
            DDD: function() {
                return this.dayOfYear()
            },
            d: function() {
                return this.day()
            },
            dd: function(t) {
                return this.lang().weekdaysMin(this, t)
            },
            ddd: function(t) {
                return this.lang().weekdaysShort(this, t)
            },
            dddd: function(t) {
                return this.lang().weekdays(this, t)
            },
            w: function() {
                return this.week()
            },
            W: function() {
                return this.isoWeek()
            },
            YY: function() {
                return Z(this.year() % 100, 2)
            },
            YYYY: function() {
                return Z(this.year(), 4)
            },
            YYYYY: function() {
                return Z(this.year(), 5)
            },
            gg: function() {
                return Z(this.weekYear() % 100, 2)
            },
            gggg: function() {
                return this.weekYear()
            },
            ggggg: function() {
                return Z(this.weekYear(), 5)
            },
            GG: function() {
                return Z(this.isoWeekYear() % 100, 2)
            },
            GGGG: function() {
                return this.isoWeekYear()
            },
            GGGGG: function() {
                return Z(this.isoWeekYear(), 5)
            },
            e: function() {
                return this.weekday()
            },
            E: function() {
                return this.isoWeekday()
            },
            a: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !0)
            },
            A: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !1)
            },
            H: function() {
                return this.hours()
            },
            h: function() {
                return this.hours() % 12 || 12
            },
            m: function() {
                return this.minutes()
            },
            s: function() {
                return this.seconds()
            },
            S: function() {
                return X(this.milliseconds() / 100)
            },
            SS: function() {
                return Z(X(this.milliseconds() / 10), 2)
            },
            SSS: function() {
                return Z(this.milliseconds(), 3)
            },
            SSSS: function() {
                return Z(this.milliseconds(), 3)
            },
            Z: function() {
                var t = -this.zone(),
                    e = "+";
                return t < 0 && (t = -t, e = "-"), e + Z(X(t / 60), 2) + ":" + Z(X(t) % 60, 2)
            },
            ZZ: function() {
                var t = -this.zone(),
                    e = "+";
                return t < 0 && (t = -t, e = "-"), e + Z(X(10 * t / 6), 4)
            },
            z: function() {
                return this.zoneAbbr()
            },
            zz: function() {
                return this.zoneName()
            },
            X: function() {
                return this.unix()
            }
        },
        z = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"];

    function L(t, e) {
        return function(n) {
            return Z(t.call(this, n), e)
        }
    }

    function U(t, e) {
        return function(n) {
            return this.lang().ordinal(t.call(this, n), e)
        }
    }
    for (; W.length;) n = W.pop(), C[n + "o"] = U(C[n], n);
    for (; F.length;) n = F.pop(), C[n + n] = L(C[n], 2);

    function P() {}

    function H(t) {
        K(t), I(this, t)
    }

    function x(t) {
        var e = J(t),
            n = e.year || 0,
            s = e.month || 0,
            r = e.week || 0,
            i = e.day || 0,
            a = e.hour || 0,
            o = e.minute || 0,
            u = e.second || 0,
            h = e.millisecond || 0;
        this._input = t, this._milliseconds = +h + 1e3 * u + 6e4 * o + 36e5 * a, this._days = +i + 7 * r, this._months = +s + 12 * n, this._data = {}, this._bubble()
    }

    function I(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return e.hasOwnProperty("toString") && (t.toString = e.toString), e.hasOwnProperty("valueOf") && (t.valueOf = e.valueOf), t
    }

    function A(t) {
        return t < 0 ? Math.ceil(t) : Math.floor(t)
    }

    function Z(t, e) {
        for (var n = t + ""; n.length < e;) n = "0" + n;
        return n
    }

    function N(t, n, s, r) {
        var i, a, o = n._milliseconds,
            u = n._days,
            h = n._months;
        o && t._d.setTime(+t._d + o * s), (u || h) && (i = t.minute(), a = t.hour()), u && t.date(t.date() + u * s), h && t.month(t.month() + h * s), o && !r && e.updateOffset(t), (u || h) && (t.minute(i), t.hour(a))
    }

    function E(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }

    function $(t, e, n) {
        var s, r = Math.min(t.length, e.length),
            i = Math.abs(t.length - e.length),
            a = 0;
        for (s = 0; s < r; s++)(n && t[s] !== e[s] || !n && X(t[s]) !== X(e[s])) && a++;
        return a + i
    }

    function V(t) {
        if (t) {
            var e = t.toLowerCase().replace(/(.)s$/, "$1");
            t = T[t] || O[e] || e
        }
        return t
    }

    function J(t) {
        var e, n, s = {};
        for (n in t) t.hasOwnProperty(n) && (e = V(n)) && (s[e] = t[n]);
        return s
    }

    function j(n) {
        var s, r;
        if (0 === n.indexOf("week")) s = 7, r = "day";
        else {
            if (0 !== n.indexOf("month")) return;
            s = 12, r = "month"
        }
        e[n] = function(i, a) {
            var o, u, h = e.fn._lang[n],
                d = [];
            if ("number" == typeof i && (a = i, i = t), u = function(t) {
                    var n = e().utc().set(r, t);
                    return h.call(e.fn._lang, n, i || "")
                }, null != a) return u(a);
            for (o = 0; o < s; o++) d.push(u(o));
            return d
        }
    }

    function X(t) {
        var e = +t,
            n = 0;
        return 0 != e && isFinite(e) && (n = 0 <= e ? Math.floor(e) : Math.ceil(e)), n
    }

    function R(t, e) {
        return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
    }

    function q(t) {
        return B(t) ? 366 : 365
    }

    function B(t) {
        return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
    }

    function K(t) {
        var e;
        t._a && -2 === t._pf.overflow && (e = t._a[1] < 0 || 11 < t._a[1] ? 1 : t._a[2] < 1 || t._a[2] > R(t._a[0], t._a[1]) ? 2 : t._a[3] < 0 || 23 < t._a[3] ? 3 : t._a[4] < 0 || 59 < t._a[4] ? 4 : t._a[5] < 0 || 59 < t._a[5] ? 5 : t._a[6] < 0 || 999 < t._a[6] ? 6 : -1, t._pf._overflowDayOfYear && (e < 0 || 2 < e) && (e = 2), t._pf.overflow = e)
    }

    function Q(t) {
        t._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function tt(t) {
        return null == t._isValid && (t._isValid = !isNaN(t._d.getTime()) && t._pf.overflow < 0 && !t._pf.empty && !t._pf.invalidMonth && !t._pf.nullInput && !t._pf.invalidFormat && !t._pf.userInvalidated, t._strict && (t._isValid = t._isValid && 0 === t._pf.charsLeftOver && 0 === t._pf.unusedTokens.length)), t._isValid
    }

    function et(t) {
        return t ? t.toLowerCase().replace("_", "-") : t
    }

    function nt(t) {
        function n(t) {
            if (!r[t] && i) try {
                require("./lang/" + t)
            } catch (t) {}
            return r[t]
        }
        var s, a, o, u, h = 0;
        if (!t) return e.fn._lang;
        if (!E(t)) {
            if (a = n(t)) return a;
            t = [t]
        }
        for (; h < t.length;) {
            for (s = (u = et(t[h]).split("-")).length, o = (o = et(t[h + 1])) ? o.split("-") : null; 0 < s;) {
                if (a = n(u.slice(0, s).join("-"))) return a;
                if (o && o.length >= s && $(u, o, !0) >= s - 1) break;
                s--
            }
            h++
        }
        return e.fn._lang
    }

    function st(t, e) {
        return t.isValid() ? (e = rt(e, t.lang()), G[e] || (G[e] = function(t) {
            var e, n, s, r = t.match(h);
            for (e = 0, n = r.length; e < n; e++) C[r[e]] ? r[e] = C[r[e]] : r[e] = (s = r[e]).match(/\[[\s\S]/) ? s.replace(/^\[|\]$/g, "") : s.replace(/\\/g, "");
            return function(s) {
                var i = "";
                for (e = 0; e < n; e++) i += r[e] instanceof Function ? r[e].call(s, t) : r[e];
                return i
            }
        }(e)), G[e](t)) : t.lang().invalidDate()
    }

    function rt(t, e) {
        var n = 5;

        function s(t) {
            return e.longDateFormat(t) || t
        }
        for (d.lastIndex = 0; 0 <= n && d.test(t);) t = t.replace(d, s), d.lastIndex = 0, n -= 1;
        return t
    }

    function it(t, e) {
        switch (t) {
            case "DDDD":
                return l;
            case "YYYY":
            case "GGGG":
            case "gggg":
                return _;
            case "YYYYY":
            case "GGGGG":
            case "ggggg":
                return m;
            case "S":
            case "SS":
            case "SSS":
            case "DDD":
                return f;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return p;
            case "a":
            case "A":
                return nt(e._l)._meridiemParse;
            case "X":
                return M;
            case "Z":
            case "ZZ":
                return g;
            case "T":
                return w;
            case "SSSS":
                return y;
            case "MM":
            case "DD":
            case "YY":
            case "GG":
            case "gg":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "e":
            case "E":
                return c;
            default:
                return new RegExp(function(t) {
                    return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                }(function(t) {
                    return t.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, (function(t, e, n, s, r) {
                        return e || n || s || r
                    }))
                }(t.replace("\\", ""))))
        }
    }

    function at(t) {
        var e = ((g.exec(t) || [])[0] + "").match(v) || ["-", 0, 0],
            n = 60 * e[1] + X(e[2]);
        return "+" === e[0] ? -n : n
    }

    function ot(t, e, n) {
        var s, r = n._a;
        switch (t) {
            case "M":
            case "MM":
                null != e && (r[1] = X(e) - 1);
                break;
            case "MMM":
            case "MMMM":
                null != (s = nt(n._l).monthsParse(e)) ? r[1] = s : n._pf.invalidMonth = e;
                break;
            case "D":
            case "DD":
                null != e && (r[2] = X(e));
                break;
            case "DDD":
            case "DDDD":
                null != e && (n._dayOfYear = X(e));
                break;
            case "YY":
                r[0] = X(e) + (68 < X(e) ? 1900 : 2e3);
                break;
            case "YYYY":
            case "YYYYY":
                r[0] = X(e);
                break;
            case "a":
            case "A":
                n._isPm = nt(n._l).isPM(e);
                break;
            case "H":
            case "HH":
            case "h":
            case "hh":
                r[3] = X(e);
                break;
            case "m":
            case "mm":
                r[4] = X(e);
                break;
            case "s":
            case "ss":
                r[5] = X(e);
                break;
            case "S":
            case "SS":
            case "SSS":
            case "SSSS":
                r[6] = X(1e3 * ("0." + e));
                break;
            case "X":
                n._d = new Date(1e3 * parseFloat(e));
                break;
            case "Z":
            case "ZZ":
                n._useUTC = !0, n._tzm = at(e);
                break;
            case "w":
            case "ww":
            case "W":
            case "WW":
            case "d":
            case "dd":
            case "ddd":
            case "dddd":
            case "e":
            case "E":
                t = t.substr(0, 1);
            case "gg":
            case "gggg":
            case "GG":
            case "GGGG":
            case "GGGGG":
                t = t.substr(0, 2), e && (n._w = n._w || {}, n._w[t] = e)
        }
    }

    function ut(t) {
        var n, s, r, i, a, o, u, h, d, c, f = [];
        if (!t._d) {
            for (r = function(t) {
                    var e = new Date;
                    return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
                }(t), t._w && null == t._a[2] && null == t._a[1] && (a = function(n) {
                    return n ? n.length < 3 ? 68 < parseInt(n, 10) ? "19" + n : "20" + n : n : null == t._a[0] ? e().weekYear() : t._a[0]
                }, u = null != (o = t._w).GG || null != o.W || null != o.E ? lt(a(o.GG), o.W || 1, o.E, 4, 1) : (h = nt(t._l), d = null != o.d ? ct(o.d, h) : null != o.e ? parseInt(o.e, 10) + h._week.dow : 0, c = parseInt(o.w, 10) || 1, null != o.d && d < h._week.dow && c++, lt(a(o.gg), c, d, h._week.doy, h._week.dow)), t._a[0] = u.year, t._dayOfYear = u.dayOfYear), t._dayOfYear && (i = null == t._a[0] ? r[0] : t._a[0], t._dayOfYear > q(i) && (t._pf._overflowDayOfYear = !0), s = dt(i, 0, t._dayOfYear), t._a[1] = s.getUTCMonth(), t._a[2] = s.getUTCDate()), n = 0; n < 3 && null == t._a[n]; ++n) t._a[n] = f[n] = r[n];
            for (; n < 7; n++) t._a[n] = f[n] = null == t._a[n] ? 2 === n ? 1 : 0 : t._a[n];
            f[3] += X((t._tzm || 0) / 60), f[4] += X((t._tzm || 0) % 60), t._d = (t._useUTC ? dt : function(t, e, n, s, r, i, a) {
                var o = new Date(t, e, n, s, r, i, a);
                return t < 1970 && o.setFullYear(t), o
            }).apply(null, f)
        }
    }

    function ht(t) {
        t._a = [], t._pf.empty = !0;
        var e, n, s, r, i, a = nt(t._l),
            o = "" + t._i,
            u = o.length,
            d = 0;
        for (s = rt(t._f, a).match(h) || [], e = 0; e < s.length; e++)(n = (it(r = s[e], t).exec(o) || [])[0]) && (0 < (i = o.substr(0, o.indexOf(n))).length && t._pf.unusedInput.push(i), o = o.slice(o.indexOf(n) + n.length), d += n.length), C[r] ? (n ? t._pf.empty = !1 : t._pf.unusedTokens.push(r), ot(r, n, t)) : t._strict && !n && t._pf.unusedTokens.push(r);
        t._pf.charsLeftOver = u - d, 0 < o.length && t._pf.unusedInput.push(o), t._isPm && t._a[3] < 12 && (t._a[3] += 12), !1 === t._isPm && 12 === t._a[3] && (t._a[3] = 0), ut(t), K(t)
    }

    function dt(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return t < 1970 && e.setUTCFullYear(t), e
    }

    function ct(t, e) {
        if ("string" == typeof t)
            if (isNaN(t)) {
                if ("number" != typeof(t = e.weekdaysParse(t))) return null
            } else t = parseInt(t, 10);
        return t
    }

    function ft(t, n, s) {
        var r, i = s - n,
            a = s - t.day();
        return i < a && (a -= 7), a < i - 7 && (a += 7), r = e(t).add("d", a), {
            week: Math.ceil(r.dayOfYear() / 7),
            year: r.year()
        }
    }

    function lt(t, e, n, s, r) {
        var i, a = new Date(Date.UTC(t, 0)).getUTCDay();
        return {
            year: 0 < (i = 7 * (e - 1) + ((n = null != n ? n : r) - r) + (r - a + (s < a ? 7 : 0)) + 1) ? t : t - 1,
            dayOfYear: 0 < i ? i : q(t - 1) + i
        }
    }

    function _t(n) {
        var s = n._i,
            r = n._f;
        return void 0 === n._pf && Q(n), null === s ? e.invalid({
            nullInput: !0
        }) : ("string" == typeof s && (n._i = s = nt().preparse(s)), e.isMoment(s) ? (n = I({}, s))._d = new Date(+s._d) : r ? E(r) ? function(t) {
            var e, n, s, r, i;
            if (0 === t._f.length) return t._pf.invalidFormat = !0, t._d = new Date(NaN);
            for (r = 0; r < t._f.length; r++) i = 0, Q(e = I({}, t)), e._f = t._f[r], ht(e), tt(e) && (i += e._pf.charsLeftOver, i += 10 * e._pf.unusedTokens.length, e._pf.score = i, (null == s || i < s) && (s = i, n = e));
            I(t, n || e)
        }(n) : ht(n) : function(e) {
            var n = e._i,
                s = a.exec(n);
            n === t ? e._d = new Date : s ? e._d = new Date(+s[1]) : "string" == typeof n ? function(t) {
                var e, n = t._i,
                    s = D.exec(n);
                if (s) {
                    for (t._pf.iso = !0, e = 4; 0 < e; e--)
                        if (s[e]) {
                            t._f = Y[e - 1] + (s[6] || " ");
                            break
                        }
                    for (e = 0; e < 4; e++)
                        if (k[e][1].exec(n)) {
                            t._f += k[e][0];
                            break
                        }
                    g.exec(n) && (t._f += "Z"), ht(t)
                } else t._d = new Date(n)
            }(e) : E(n) ? (e._a = n.slice(0), ut(e)) : function(t) {
                return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
            }(n) ? e._d = new Date(+n) : "object" == typeof n ? function(t) {
                var e;
                t._d || (e = J(t._i), t._a = [e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond], ut(t))
            }(e) : e._d = new Date(n)
        }(n), new H(n))
    }
    for (C.DDDD = L(C.DDD, 3), I(P.prototype, {
            set: function(t) {
                var e, n;
                for (n in t) "function" == typeof(e = t[n]) ? this[n] = e : this["_" + n] = e
            },
            _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            months: function(t) {
                return this._months[t.month()]
            },
            _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            monthsShort: function(t) {
                return this._monthsShort[t.month()]
            },
            monthsParse: function(t) {
                var n, s, r;
                for (this._monthsParse || (this._monthsParse = []), n = 0; n < 12; n++)
                    if (this._monthsParse[n] || (s = e.utc([2e3, n]), r = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[n] = new RegExp(r.replace(".", ""), "i")), this._monthsParse[n].test(t)) return n
            },
            _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdays: function(t) {
                return this._weekdays[t.day()]
            },
            _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysShort: function(t) {
                return this._weekdaysShort[t.day()]
            },
            _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            weekdaysMin: function(t) {
                return this._weekdaysMin[t.day()]
            },
            weekdaysParse: function(t) {
                var n, s, r;
                for (this._weekdaysParse || (this._weekdaysParse = []), n = 0; n < 7; n++)
                    if (this._weekdaysParse[n] || (s = e([2e3, 1]).day(n), r = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""), this._weekdaysParse[n] = new RegExp(r.replace(".", ""), "i")), this._weekdaysParse[n].test(t)) return n
            },
            _longDateFormat: {
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D YYYY",
                LLL: "MMMM D YYYY LT",
                LLLL: "dddd, MMMM D YYYY LT"
            },
            longDateFormat: function(t) {
                var e = this._longDateFormat[t];
                return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, (function(t) {
                    return t.slice(1)
                })), this._longDateFormat[t] = e), e
            },
            isPM: function(t) {
                return "p" === (t + "").toLowerCase().charAt(0)
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function(t, e, n) {
                return 11 < t ? n ? "pm" : "PM" : n ? "am" : "AM"
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function(t, e) {
                var n = this._calendar[t];
                return "function" == typeof n ? n.apply(e) : n
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function(t, e, n, s) {
                var r = this._relativeTime[n];
                return "function" == typeof r ? r(t, e, n, s) : r.replace(/%d/i, t)
            },
            pastFuture: function(t, e) {
                var n = this._relativeTime[0 < t ? "future" : "past"];
                return "function" == typeof n ? n(e) : n.replace(/%s/i, e)
            },
            ordinal: function(t) {
                return this._ordinal.replace("%d", t)
            },
            _ordinal: "%d",
            preparse: function(t) {
                return t
            },
            postformat: function(t) {
                return t
            },
            week: function(t) {
                return ft(t, this._week.dow, this._week.doy).week
            },
            _week: {
                dow: 0,
                doy: 6
            },
            _invalidDate: "Invalid date",
            invalidDate: function() {
                return this._invalidDate
            }
        }), (e = function(e, n, s, r) {
            return "boolean" == typeof s && (r = s, s = t), _t({
                _i: e,
                _f: n,
                _l: s,
                _strict: r,
                _isUTC: !1
            })
        }).utc = function(e, n, s, r) {
            return "boolean" == typeof s && (r = s, s = t), _t({
                _useUTC: !0,
                _isUTC: !0,
                _l: s,
                _i: e,
                _f: n,
                _strict: r
            }).utc()
        }, e.unix = function(t) {
            return e(1e3 * t)
        }, e.duration = function(t, n) {
            var s, r, i, a = e.isDuration(t),
                h = "number" == typeof t,
                d = a ? t._input : h ? {} : t,
                c = null;
            return h ? n ? d[n] = t : d.milliseconds = t : (c = o.exec(t)) ? (s = "-" === c[1] ? -1 : 1, d = {
                y: 0,
                d: X(c[2]) * s,
                h: X(c[3]) * s,
                m: X(c[4]) * s,
                s: X(c[5]) * s,
                ms: X(c[6]) * s
            }) : (c = u.exec(t)) && (s = "-" === c[1] ? -1 : 1, d = {
                y: (i = function(t) {
                    var e = t && parseFloat(t.replace(",", "."));
                    return (isNaN(e) ? 0 : e) * s
                })(c[2]),
                M: i(c[3]),
                d: i(c[4]),
                h: i(c[5]),
                m: i(c[6]),
                s: i(c[7]),
                w: i(c[8])
            }), r = new x(d), a && t.hasOwnProperty("_lang") && (r._lang = t._lang), r
        }, e.version = "2.4.0", e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", e.updateOffset = function() {}, e.lang = function(t, n) {
            return t ? (n ? function(t, e) {
                e.abbr = t, r[t] || (r[t] = new P), r[t].set(e), r[t]
            }(et(t), n) : null === n ? (function(t) {
                delete r[t]
            }(t), t = "en") : r[t] || nt(t), (e.duration.fn._lang = e.fn._lang = nt(t))._abbr) : e.fn._lang._abbr
        }, e.langData = function(t) {
            return t && t._lang && t._lang._abbr && (t = t._lang._abbr), nt(t)
        }, e.isMoment = function(t) {
            return t instanceof H
        }, e.isDuration = function(t) {
            return t instanceof x
        }, n = z.length - 1; 0 <= n; --n) j(z[n]);

    function mt(t, n) {
        e.fn[t] = e.fn[t + "s"] = function(t) {
            var s = this._isUTC ? "UTC" : "";
            return null != t ? (this._d["set" + s + n](t), e.updateOffset(this), this) : this._d["get" + s + n]()
        }
    }
    for (e.normalizeUnits = function(t) {
            return V(t)
        }, e.invalid = function(t) {
            var n = e.utc(NaN);
            return null != t ? I(n._pf, t) : n._pf.userInvalidated = !0, n
        }, e.parseZone = function(t) {
            return e(t).parseZone()
        }, I(e.fn = H.prototype, {
            clone: function() {
                return e(this)
            },
            valueOf: function() {
                return +this._d + 6e4 * (this._offset || 0)
            },
            unix: function() {
                return Math.floor(this / 1e3)
            },
            toString: function() {
                return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function() {
                return this._offset ? new Date(+this) : this._d
            },
            toISOString: function() {
                return st(e(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            },
            toArray: function() {
                var t = this;
                return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
            },
            isValid: function() {
                return tt(this)
            },
            isDSTShifted: function() {
                return !!this._a && this.isValid() && 0 < $(this._a, (this._isUTC ? e.utc(this._a) : e(this._a)).toArray())
            },
            parsingFlags: function() {
                return I({}, this._pf)
            },
            invalidAt: function() {
                return this._pf.overflow
            },
            utc: function() {
                return this.zone(0)
            },
            local: function() {
                return this.zone(0), this._isUTC = !1, this
            },
            format: function(t) {
                var n = st(this, t || e.defaultFormat);
                return this.lang().postformat(n)
            },
            add: function(t, n) {
                return N(this, "string" == typeof t ? e.duration(+n, t) : e.duration(t, n), 1), this
            },
            subtract: function(t, n) {
                return N(this, "string" == typeof t ? e.duration(+n, t) : e.duration(t, n), -1), this
            },
            diff: function(t, n, s) {
                var r, i, a = this._isUTC ? e(t).zone(this._offset || 0) : e(t).local(),
                    o = 6e4 * (this.zone() - a.zone());
                return "year" === (n = V(n)) || "month" === n ? (r = 432e5 * (this.daysInMonth() + a.daysInMonth()), i = 12 * (this.year() - a.year()) + (this.month() - a.month()), i += (this - e(this).startOf("month") - (a - e(a).startOf("month"))) / r, i -= 6e4 * (this.zone() - e(this).startOf("month").zone() - (a.zone() - e(a).startOf("month").zone())) / r, "year" === n && (i /= 12)) : (r = this - a, i = "second" === n ? r / 1e3 : "minute" === n ? r / 6e4 : "hour" === n ? r / 36e5 : "day" === n ? (r - o) / 864e5 : "week" === n ? (r - o) / 6048e5 : r), s ? i : A(i)
            },
            from: function(t, n) {
                return e.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!n)
            },
            fromNow: function(t) {
                return this.from(e(), t)
            },
            calendar: function() {
                var t = this.diff(e().zone(this.zone()).startOf("day"), "days", !0),
                    n = t < -6 ? "sameElse" : t < -1 ? "lastWeek" : t < 0 ? "lastDay" : t < 1 ? "sameDay" : t < 2 ? "nextDay" : t < 7 ? "nextWeek" : "sameElse";
                return this.format(this.lang().calendar(n, this))
            },
            isLeapYear: function() {
                return B(this.year())
            },
            isDST: function() {
                return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
            },
            day: function(t) {
                var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != t ? (t = ct(t, this.lang()), this.add({
                    d: t - e
                })) : e
            },
            month: function(t) {
                var n, s = this._isUTC ? "UTC" : "";
                return null != t ? ("string" == typeof t && "number" != typeof(t = this.lang().monthsParse(t)) || (n = this.date(), this.date(1), this._d["set" + s + "Month"](t), this.date(Math.min(n, this.daysInMonth())), e.updateOffset(this)), this) : this._d["get" + s + "Month"]()
            },
            startOf: function(t) {
                switch (t = V(t)) {
                    case "year":
                        this.month(0);
                    case "month":
                        this.date(1);
                    case "week":
                    case "isoWeek":
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                }
                return "week" === t ? this.weekday(0) : "isoWeek" === t && this.isoWeekday(1), this
            },
            endOf: function(t) {
                return t = V(t), this.startOf(t).add("isoWeek" === t ? "week" : t, 1).subtract("ms", 1)
            },
            isAfter: function(t, n) {
                return n = void 0 !== n ? n : "millisecond", +this.clone().startOf(n) > +e(t).startOf(n)
            },
            isBefore: function(t, n) {
                return n = void 0 !== n ? n : "millisecond", +this.clone().startOf(n) < +e(t).startOf(n)
            },
            isSame: function(t, n) {
                return n = void 0 !== n ? n : "millisecond", +this.clone().startOf(n) == +e(t).startOf(n)
            },
            min: function(t) {
                return (t = e.apply(null, arguments)) < this ? this : t
            },
            max: function(t) {
                return this < (t = e.apply(null, arguments)) ? this : t
            },
            zone: function(t) {
                var n = this._offset || 0;
                return null == t ? this._isUTC ? n : this._d.getTimezoneOffset() : ("string" == typeof t && (t = at(t)), Math.abs(t) < 16 && (t *= 60), this._offset = t, this._isUTC = !0, n !== t && N(this, e.duration(n - t, "m"), 1, !0), this)
            },
            zoneAbbr: function() {
                return this._isUTC ? "UTC" : ""
            },
            zoneName: function() {
                return this._isUTC ? "Coordinated Universal Time" : ""
            },
            parseZone: function() {
                return "string" == typeof this._i && this.zone(this._i), this
            },
            hasAlignedHourOffset: function(t) {
                return t = t ? e(t).zone() : 0, (this.zone() - t) % 60 == 0
            },
            daysInMonth: function() {
                return R(this.year(), this.month())
            },
            dayOfYear: function(t) {
                var n = s((e(this).startOf("day") - e(this).startOf("year")) / 864e5) + 1;
                return null == t ? n : this.add("d", t - n)
            },
            weekYear: function(t) {
                var e = ft(this, this.lang()._week.dow, this.lang()._week.doy).year;
                return null == t ? e : this.add("y", t - e)
            },
            isoWeekYear: function(t) {
                var e = ft(this, 1, 4).year;
                return null == t ? e : this.add("y", t - e)
            },
            week: function(t) {
                var e = this.lang().week(this);
                return null == t ? e : this.add("d", 7 * (t - e))
            },
            isoWeek: function(t) {
                var e = ft(this, 1, 4).week;
                return null == t ? e : this.add("d", 7 * (t - e))
            },
            weekday: function(t) {
                var e = (this.day() + 7 - this.lang()._week.dow) % 7;
                return null == t ? e : this.add("d", t - e)
            },
            isoWeekday: function(t) {
                return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
            },
            get: function(t) {
                return this[t = V(t)]()
            },
            set: function(t, e) {
                return "function" == typeof this[t = V(t)] && this[t](e), this
            },
            lang: function(e) {
                return e === t ? this._lang : (this._lang = nt(e), this)
            }
        }), n = 0; n < S.length; n++) mt(S[n].toLowerCase().replace(/s$/, ""), S[n]);

    function yt(t) {
        e.duration.fn[t] = function() {
            return this._data[t]
        }
    }

    function pt(t, n) {
        e.duration.fn["as" + t] = function() {
            return this / n
        }
    }
    for (n in mt("year", "FullYear"), e.fn.days = e.fn.day, e.fn.months = e.fn.month, e.fn.weeks = e.fn.week, e.fn.isoWeeks = e.fn.isoWeek, e.fn.toJSON = e.fn.toISOString, I(e.duration.fn = x.prototype, {
            _bubble: function() {
                var t, e, n, s, r = this._milliseconds,
                    i = this._days,
                    a = this._months,
                    o = this._data;
                o.milliseconds = r % 1e3, t = A(r / 1e3), o.seconds = t % 60, e = A(t / 60), o.minutes = e % 60, n = A(e / 60), o.hours = n % 24, i += A(n / 24), o.days = i % 30, a += A(i / 30), o.months = a % 12, s = A(a / 12), o.years = s
            },
            weeks: function() {
                return A(this.days() / 7)
            },
            valueOf: function() {
                return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * X(this._months / 12)
            },
            humanize: function(t) {
                var e = +this,
                    n = function(t, e, n) {
                        var r = s(Math.abs(t) / 1e3),
                            i = s(r / 60),
                            a = s(i / 60),
                            o = s(a / 24),
                            u = s(o / 365),
                            h = r < 45 && ["s", r] || 1 === i && ["m"] || i < 45 && ["mm", i] || 1 === a && ["h"] || a < 22 && ["hh", a] || 1 === o && ["d"] || o <= 25 && ["dd", o] || o <= 45 && ["M"] || o < 345 && ["MM", s(o / 30)] || 1 === u && ["y"] || ["yy", u];
                        return h[2] = e, h[3] = 0 < t, h[4] = n,
                            function(t, e, n, s, r) {
                                return r.relativeTime(e || 1, !!n, t, s)
                            }.apply({}, h)
                    }(e, !t, this.lang());
                return t && (n = this.lang().pastFuture(e, n)), this.lang().postformat(n)
            },
            add: function(t, n) {
                var s = e.duration(t, n);
                return this._milliseconds += s._milliseconds, this._days += s._days, this._months += s._months, this._bubble(), this
            },
            subtract: function(t, n) {
                var s = e.duration(t, n);
                return this._milliseconds -= s._milliseconds, this._days -= s._days, this._months -= s._months, this._bubble(), this
            },
            get: function(t) {
                return this[(t = V(t)).toLowerCase() + "s"]()
            },
            as: function(t) {
                return this["as" + (t = V(t)).charAt(0).toUpperCase() + t.slice(1) + "s"]()
            },
            lang: e.fn.lang,
            toIsoString: function() {
                var t = Math.abs(this.years()),
                    e = Math.abs(this.months()),
                    n = Math.abs(this.days()),
                    s = Math.abs(this.hours()),
                    r = Math.abs(this.minutes()),
                    i = Math.abs(this.seconds() + this.milliseconds() / 1e3);
                return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (t ? t + "Y" : "") + (e ? e + "M" : "") + (n ? n + "D" : "") + (s || r || i ? "T" : "") + (s ? s + "H" : "") + (r ? r + "M" : "") + (i ? i + "S" : "") : "P0D"
            }
        }), b) b.hasOwnProperty(n) && (pt(n, b[n]), yt(n.toLowerCase()));

    function gt(t) {
        var n = !1,
            s = e;
        "undefined" == typeof ender && (this.moment = t ? function() {
            return !n && console && console.warn && (n = !0, console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")), s.apply(null, arguments)
        } : e)
    }
    pt("Weeks", 6048e5), e.duration.fn.asMonths = function() {
        return (this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, e.lang("en", {
        ordinal: function(t) {
            var e = t % 10;
            return t + (1 === X(t % 100 / 10) ? "th" : 1 == e ? "st" : 2 == e ? "nd" : 3 == e ? "rd" : "th")
        }
    }), i ? (module.exports = e, gt(!0)) : "function" == typeof define && define.amd ? define("moment", (function(n, s, r) {
        return !0 !== r.config().noGlobal && gt(r.config().noGlobal === t), e
    })) : gt()
}).call(this);