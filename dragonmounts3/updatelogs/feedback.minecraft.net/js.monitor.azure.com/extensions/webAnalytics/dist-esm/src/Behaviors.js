/*
 * 1DS JS SDK Web Analytics plugin, 3.2.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
/**
 * Enums.ts
 * @author Ram Thiru (ramthi) and Hector Hernandez (hectorh)
 * Copyright (c) Microsoft and contributors. All rights reserved.
 */
// Behavior enum values
export var Behavior;
(function(Behavior) {
    Behavior[Behavior["UNDEFINED"] = 0] = "UNDEFINED";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Page Experience [1-19]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["NAVIGATIONBACK"] = 1] = "NAVIGATIONBACK";
    Behavior[Behavior["NAVIGATION"] = 2] = "NAVIGATION";
    Behavior[Behavior["NAVIGATIONFORWARD"] = 3] = "NAVIGATIONFORWARD";
    Behavior[Behavior["APPLY"] = 4] = "APPLY";
    Behavior[Behavior["REMOVE"] = 5] = "REMOVE";
    Behavior[Behavior["SORT"] = 6] = "SORT";
    Behavior[Behavior["EXPAND"] = 7] = "EXPAND";
    Behavior[Behavior["REDUCE"] = 8] = "REDUCE";
    Behavior[Behavior["CONTEXTMENU"] = 9] = "CONTEXTMENU";
    Behavior[Behavior["TAB"] = 10] = "TAB";
    Behavior[Behavior["COPY"] = 11] = "COPY";
    Behavior[Behavior["EXPERIMENTATION"] = 12] = "EXPERIMENTATION";
    Behavior[Behavior["PRINT"] = 13] = "PRINT";
    Behavior[Behavior["SHOW"] = 14] = "SHOW";
    Behavior[Behavior["HIDE"] = 15] = "HIDE";
    Behavior[Behavior["MAXIMIZE"] = 16] = "MAXIMIZE";
    Behavior[Behavior["MINIMIZE"] = 17] = "MINIMIZE";
    Behavior[Behavior["BACKBUTTON"] = 18] = "BACKBUTTON";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Scenario Process [20-39]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["STARTPROCESS"] = 20] = "STARTPROCESS";
    Behavior[Behavior["PROCESSCHECKPOINT"] = 21] = "PROCESSCHECKPOINT";
    Behavior[Behavior["COMPLETEPROCESS"] = 22] = "COMPLETEPROCESS";
    Behavior[Behavior["SCENARIOCANCEL"] = 23] = "SCENARIOCANCEL";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Download [40-59]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["DOWNLOADCOMMIT"] = 40] = "DOWNLOADCOMMIT";
    Behavior[Behavior["DOWNLOAD"] = 41] = "DOWNLOAD";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Search [60-79]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["SEARCHAUTOCOMPLETE"] = 60] = "SEARCHAUTOCOMPLETE";
    Behavior[Behavior["SEARCH"] = 61] = "SEARCH";
    Behavior[Behavior["SEARCHINITIATE"] = 62] = "SEARCHINITIATE";
    Behavior[Behavior["TEXTBOXINPUT"] = 63] = "TEXTBOXINPUT";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Commerce [80-99]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["PURCHASE"] = 80] = "PURCHASE";
    Behavior[Behavior["ADDTOCART"] = 81] = "ADDTOCART";
    Behavior[Behavior["VIEWCART"] = 82] = "VIEWCART";
    Behavior[Behavior["ADDWISHLIST"] = 83] = "ADDWISHLIST";
    Behavior[Behavior["FINDSTORE"] = 84] = "FINDSTORE";
    Behavior[Behavior["CHECKOUT"] = 85] = "CHECKOUT";
    Behavior[Behavior["REMOVEFROMCART"] = 86] = "REMOVEFROMCART";
    Behavior[Behavior["PURCHASECOMPLETE"] = 87] = "PURCHASECOMPLETE";
    Behavior[Behavior["VIEWCHECKOUTPAGE"] = 88] = "VIEWCHECKOUTPAGE";
    Behavior[Behavior["VIEWCARTPAGE"] = 89] = "VIEWCARTPAGE";
    Behavior[Behavior["VIEWPDP"] = 90] = "VIEWPDP";
    Behavior[Behavior["UPDATEITEMQUANTITY"] = 91] = "UPDATEITEMQUANTITY";
    Behavior[Behavior["INTENTTOBUY"] = 92] = "INTENTTOBUY";
    Behavior[Behavior["PUSHTOINSTALL"] = 93] = "PUSHTOINSTALL";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Authentication [100-119]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["SIGNIN"] = 100] = "SIGNIN";
    Behavior[Behavior["SIGNOUT"] = 101] = "SIGNOUT";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Social [120-139]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["SOCIALSHARE"] = 120] = "SOCIALSHARE";
    Behavior[Behavior["SOCIALLIKE"] = 121] = "SOCIALLIKE";
    Behavior[Behavior["SOCIALREPLY"] = 122] = "SOCIALREPLY";
    Behavior[Behavior["CALL"] = 123] = "CALL";
    Behavior[Behavior["EMAIL"] = 124] = "EMAIL";
    Behavior[Behavior["COMMUNITY"] = 125] = "COMMUNITY";
    Behavior[Behavior["SOCIALFOLLOW"] = 126] = "SOCIALFOLLOW";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Feedback [140-159]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["VOTE"] = 140] = "VOTE";
    Behavior[Behavior["SURVEYINITIATE"] = 141] = "SURVEYINITIATE";
    Behavior[Behavior["SURVEYCOMPLETE"] = 142] = "SURVEYCOMPLETE";
    Behavior[Behavior["REPORTAPPLICATION"] = 143] = "REPORTAPPLICATION";
    Behavior[Behavior["REPORTREVIEW"] = 144] = "REPORTREVIEW";
    Behavior[Behavior["SURVEYCHECKPOINT"] = 145] = "SURVEYCHECKPOINT";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Registration, Contact [160-179]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["CONTACT"] = 160] = "CONTACT";
    Behavior[Behavior["REGISTRATIONINITIATE"] = 161] = "REGISTRATIONINITIATE";
    Behavior[Behavior["REGISTRATIONCOMPLETE"] = 162] = "REGISTRATIONCOMPLETE";
    Behavior[Behavior["CANCELSUBSCRIPTION"] = 163] = "CANCELSUBSCRIPTION";
    Behavior[Behavior["RENEWSUBSCRIPTION"] = 164] = "RENEWSUBSCRIPTION";
    Behavior[Behavior["CHANGESUBSCRIPTION"] = 165] = "CHANGESUBSCRIPTION";
    Behavior[Behavior["REGISTRATIONCHECKPOINT"] = 166] = "REGISTRATIONCHECKPOINT";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Chat [180-199]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["CHATINITIATE"] = 180] = "CHATINITIATE";
    Behavior[Behavior["CHATEND"] = 181] = "CHATEND";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Trial [200-209]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["TRIALSIGNUP"] = 200] = "TRIALSIGNUP";
    Behavior[Behavior["TRIALINITIATE"] = 201] = "TRIALINITIATE";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Signup [210-219]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["SIGNUP"] = 210] = "SIGNUP";
    Behavior[Behavior["FREESIGNUP"] = 211] = "FREESIGNUP";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Referals [220-229]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["PARTNERREFERRAL"] = 220] = "PARTNERREFERRAL";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Intents [230-239]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["LEARNLOWFUNNEL"] = 230] = "LEARNLOWFUNNEL";
    Behavior[Behavior["LEARNHIGHFUNNEL"] = 231] = "LEARNHIGHFUNNEL";
    Behavior[Behavior["SHOPPINGINTENT"] = 232] = "SHOPPINGINTENT";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Video [240-259]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["VIDEOSTART"] = 240] = "VIDEOSTART";
    Behavior[Behavior["VIDEOPAUSE"] = 241] = "VIDEOPAUSE";
    Behavior[Behavior["VIDEOCONTINUE"] = 242] = "VIDEOCONTINUE";
    Behavior[Behavior["VIDEOCHECKPOINT"] = 243] = "VIDEOCHECKPOINT";
    Behavior[Behavior["VIDEOJUMP"] = 244] = "VIDEOJUMP";
    Behavior[Behavior["VIDEOCOMPLETE"] = 245] = "VIDEOCOMPLETE";
    Behavior[Behavior["VIDEOBUFFERING"] = 246] = "VIDEOBUFFERING";
    Behavior[Behavior["VIDEOERROR"] = 247] = "VIDEOERROR";
    Behavior[Behavior["VIDEOMUTE"] = 248] = "VIDEOMUTE";
    Behavior[Behavior["VIDEOUNMUTE"] = 249] = "VIDEOUNMUTE";
    Behavior[Behavior["VIDEOFULLSCREEN"] = 250] = "VIDEOFULLSCREEN";
    Behavior[Behavior["VIDEOUNFULLSCREEN"] = 251] = "VIDEOUNFULLSCREEN";
    Behavior[Behavior["VIDEOREPLAY"] = 252] = "VIDEOREPLAY";
    Behavior[Behavior["VIDEOPLAYERLOAD"] = 253] = "VIDEOPLAYERLOAD";
    Behavior[Behavior["VIDEOPLAYERCLICK"] = 254] = "VIDEOPLAYERCLICK";
    Behavior[Behavior["VIDEOVOLUMECONTROL"] = 255] = "VIDEOVOLUMECONTROL";
    Behavior[Behavior["VIDEOAUDIOTRACKCONTROL"] = 256] = "VIDEOAUDIOTRACKCONTROL";
    Behavior[Behavior["VIDEOCLOSEDCAPTIONCONTROL"] = 257] = "VIDEOCLOSEDCAPTIONCONTROL";
    Behavior[Behavior["VIDEOCLOSEDCAPTIONSTYLE"] = 258] = "VIDEOCLOSEDCAPTIONSTYLE";
    Behavior[Behavior["VIDEORESOLUTIONCONTROL"] = 259] = "VIDEORESOLUTIONCONTROL";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Virtual Event [260-279]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["VIRTUALEVENTJOIN"] = 260] = "VIRTUALEVENTJOIN";
    Behavior[Behavior["VIRTUALEVENTEND"] = 261] = "VIRTUALEVENTEND";
    Behavior[Behavior["JOINTEAMSMEETINGEVENT"] = 262] = "JOINTEAMSMEETINGEVENT";
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // 	Advertisement Engagement [280-299]
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    Behavior[Behavior["IMPRESSION"] = 280] = "IMPRESSION";
    Behavior[Behavior["CLICK"] = 281] = "CLICK";
    Behavior[Behavior["RICHMEDIACOMPLETE"] = 282] = "RICHMEDIACOMPLETE";
    Behavior[Behavior["ADBUFFERING"] = 283] = "ADBUFFERING";
    Behavior[Behavior["ADERROR"] = 284] = "ADERROR";
    Behavior[Behavior["ADSTART"] = 285] = "ADSTART";
    Behavior[Behavior["ADCOMPLETE"] = 286] = "ADCOMPLETE";
    Behavior[Behavior["ADSKIP"] = 287] = "ADSKIP";
    Behavior[Behavior["ADTIMEOUT"] = 288] = "ADTIMEOUT";
    Behavior[Behavior["OTHER"] = 300] = "OTHER"; // Other
})(Behavior || (Behavior = {}));
//# sourceMappingURL=Behaviors.js.map