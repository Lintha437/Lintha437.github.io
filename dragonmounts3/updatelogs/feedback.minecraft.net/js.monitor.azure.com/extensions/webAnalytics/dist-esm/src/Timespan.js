/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * timespan.ts
 * @author Ram Thiru (ramthi)
 * @copyright Microsoft 2018
 */
var Timespan = /** @class */ (function() {
    function Timespan() {
        this._timers = [];
    }
    /**
     * Records the current time on a timer object identified by the counterName passed in
     * Returns a number > 0  that denotes the milliseconds elapsed between start and current time, if isComplete param is set to true.
     * @param counterName - Unique name for the counter instance that needs to be operated on.
     * @param isComplete - Indicates if the call is to complete a timer or start a new one.
     */
    Timespan.prototype._recordTimeSpan = function(counterName, isComplete) {
        var timestamp = new Date().getTime();
        if (!isComplete) {
            this._timers[counterName] = timestamp;
        } else {
            return timestamp - this._timers[counterName];
        }
    };
    return Timespan;
}());
export default Timespan;
//# sourceMappingURL=Timespan.js.map