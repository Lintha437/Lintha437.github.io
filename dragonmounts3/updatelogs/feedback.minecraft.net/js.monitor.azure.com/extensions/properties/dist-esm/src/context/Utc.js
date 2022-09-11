/*
 * 1DS JS SDK Properties plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * Utc.ts
 * @author Hector Hernandez (hectorh)
 * @copyright Microsoft 2019
 */
export var HASH_IDENTIFIERS_FLAG = 0x100000;
export var DROP_IDENTIFIERS_FLAG = 0x200000;
var Utc = /** @class */ (function() {
    function Utc(propertiesConfig) {
        var self = this;
        self.popSample = 100;
        self.eventFlags = 0;
        if (propertiesConfig.hashIdentifiers) {
            self.eventFlags = self.eventFlags | HASH_IDENTIFIERS_FLAG;
        }
        if (propertiesConfig.dropIdentifiers) {
            self.eventFlags = self.eventFlags | DROP_IDENTIFIERS_FLAG;
        }
    }
    return Utc;
}());
export {
    Utc
};
//# sourceMappingURL=Utc.js.map