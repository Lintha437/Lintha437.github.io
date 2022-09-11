/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * Enums.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * @copyright Microsoft 2018
 */
export var ActionType = {
    CLICKLEFT: "CL",
    CLICKRIGHT: "CR",
    CLICKMIDDLE: "CM",
    SCROLL: "S",
    ZOOM: "Z",
    RESIZE: "R",
    KEYBOARDENTER: "KE",
    KEYBOARDSPACE: "KS",
    OTHER: "O"
};
export var EventType;
(function(EventType) {
    EventType[EventType["PAGE_ACTION"] = 0] = "PAGE_ACTION";
    EventType[EventType["CONTENT_UPDATE"] = 1] = "CONTENT_UPDATE";
})(EventType || (EventType = {}));
//# sourceMappingURL=Enums.js.map