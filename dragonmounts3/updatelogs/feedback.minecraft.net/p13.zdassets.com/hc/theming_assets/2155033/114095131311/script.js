/*
 * jQuery v1.9.1 included
 */
$(document).ready(function() {
    // To fix WPC accessibility issue removing Iframe
    setTimeout(function() {
        $("#automaticAnswers").remove();
    }, 2500);

    //Code change for dynamically adding 'alt' attribute to user uploaded images
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        if (img.src.includes("/hc/user_images/") && (img.alt == '' || img.alt == undefined)) {
            img.alt = 'User uploaded image';
        }
    }

    // #291041 - Add the role for topic dropdown
    $('.nesty-input').click(function() {
        setTimeout(function() {
            $('.nesty-panel ul').attr('role', 'list');
        }, 1000);
    });
    $('.community_post_submit').attr('tabindex', 0)
    // #291041 - End add the role for topic dropdown

    // social share popups
    $(".share a").click(function(e) {
        e.preventDefault();
        window.open(this.href, "", "height = 500, width = 500");
    });

    // show form controls when the textarea receives focus or backbutton is used and value exists
    var $commentContainerTextarea = $(".comment-container textarea"),
        $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

    $commentContainerTextarea.one("focus", function() {
        $commentContainerFormControls.show();
    });

    if ($commentContainerTextarea.val() !== "") {
        $commentContainerFormControls.show();
    }

    // Expand Request comment form when Add to conversation is clicked
    var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
        $requestCommentFields = $(".request-container .comment-container .comment-fields"),
        $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

    $showRequestCommentContainerTrigger.on("click", function() {
        $showRequestCommentContainerTrigger.hide();
        $requestCommentFields.show();
        $requestCommentSubmit.show();
        $commentContainerTextarea.focus();
    });

    // Mark as solved button
    var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
        $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
        $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

    $requestMarkAsSolvedButton.on("click", function() {
        $requestMarkAsSolvedCheckbox.attr("checked", true);
        $requestCommentSubmitButton.prop("disabled", true);
        $(this).attr("data-disabled", true).closest("form").submit();
    });

    // Change Mark as solved text according to whether comment is filled
    var $requestCommentTextarea = $(".request-container .comment-container textarea");

    $requestCommentTextarea.on("keyup", function() {
        if ($requestCommentTextarea.val() !== "") {
            $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
            $requestCommentSubmitButton.prop("disabled", false);
        } else {
            $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
            $requestCommentSubmitButton.prop("disabled", true);
        }
    });

    // Disable submit button if textarea is empty
    if ($requestCommentTextarea.val() === "") {
        $requestCommentSubmitButton.prop("disabled", true);
    }

    // Submit requests filter form in the request list page
    $("#request-status-select, #request-organization-select")
        .on("change", function() {
            search();
        });

    // Submit requests filter form in the request list page
    $("#quick-search").on("keypress", function(e) {
        if (e.which === 13) {
            search();
        }
    });

    function search() {
        window.location.search = $.param({
            query: $("#quick-search").val(),
            status: $("#request-status-select").val(),
            organization_id: $("#request-organization-select").val()
        });
    }

    $(".header .icon-menu").on("click", function(e) {
        e.stopPropagation();
        var menu = document.getElementById("user-nav");
        var isExpanded = menu.getAttribute("aria-expanded") === "true";
        menu.setAttribute("aria-expanded", !isExpanded);
    });

    if ($("#user-nav").children().length === 0) {
        $(".header .icon-menu").hide();
    }

    // Submit organization form in the request page
    $("#request-organization select").on("change", function() {
        this.form.submit();
    });

    // Toggles expanded aria to collapsible elements
    $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
        e.stopPropagation();
        var isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isExpanded);
    });


});

$(document).ready(function() {

    if (document.getElementById("desBox")) {
        if ($.trim($('#desBox').text()) == "") {
            $('#desBox').hide();
        }
    }

    if (document.getElementById("noValid")) {
        $('.reportPost, .reportComment').remove();
    }

    $('.pagination-prev a').text('← Previous');
    $('.pagination-next a').text('Next →');
    $('.postText').text('Give feedback');
    $('.postTextAlt').text('Post new feedback');
    // change text of Post Actions dropdown menu statuses
    $('.post-actions .dropdown-menu :nth-child(3)').text('staff comment');
    $('.post-actions .dropdown-menu :nth-child(4)').text('under review');
    $('.post-actions .dropdown-menu :nth-child(5)').text('released');
    $('.post-actions .dropdown-menu :nth-child(6)').text('needs info');

    //hide empty status in dropdown
    $('#statusDrop a:last-child').hide();
    //'My feedback' CTA Functionality
    var user_link;
    if (document.getElementById("user")) {
        $("#user-menu a").each(function() {
            if ($(this).text() == "My profile") {
                user_link = $(this).attr('href');
            }
        });
        $('#myFeedCta').attr('href', 'https://minecraftfeedback.zendesk.com' + user_link);
    } else {
        $('#myFeedCta').attr('href', '#');
    }

    //'My Feedback' on-click
    $("#myFeedCta").click(function(e) {
        var target = $(this).attr('href');
        if (target == '#') {
            var logHref = $('.login').attr('href');
            $("#myFeedCta").attr('href', logHref);
        }
    });

    function mobile_search_box() {

        $(".menu-mobile").removeClass('bg-on-mobile');
        $(".menu-mobile .menuLay img").attr("src", $(".menu-mobile .menuLay img").attr('data-mouseDef'));
        if ($('.show-on-mobile').is(':visible')) {
            $('.clearfix').removeClass('show-on-mobile');
        }
        if (!$('.tabSer').is(':visible')) {
            $('.searchSpan .searchLay').addClass('closeSer');
            $('.searchSpan .searchLay').css('background', '#313131');
            $('.tabSer').show();
        } else {
            $('.searchSpan .searchLay').removeClass('closeSer');
            $('.searchSpan .searchLay').css('background', 'transparent');
            $('.tabSer').hide();
        }
    }
    // Start of #382194 accessibility bug fix
    $('body').on('keydown', '.searchLay', function(event) {
        if (event.keyCode == 13) {
            mobile_search_box();
        }
    });
    // End of #382194 accessibility bug fix
    $('body').on('click', '.searchLay', function(event) {
        mobile_search_box();
        /*$(".menu-mobile").removeClass('bg-on-mobile');
        $(".menu-mobile .menuLay img").attr("src", $(".menu-mobile .menuLay img").attr('data-mouseDef'));
        if ($('.show-on-mobile').is(':visible')) {
            $('.clearfix').removeClass('show-on-mobile');
        }
        if (!$('.tabSer').is(':visible')) {
            $('.searchSpan .searchLay').addClass('closeSer');
            $('.searchSpan .searchLay').css('background', '#313131');
            $('.tabSer').show();
        } else {
            $('.searchSpan .searchLay').removeClass('closeSer');
            $('.searchSpan .searchLay').css('background', 'transparent');
            $('.tabSer').hide();
        }*/
    });
    //Search form
    $('form.search-full').attr('id', 'menuSer');
    $('body').on('click', '#searchIcon', function(event) {
        var y = encodeURIComponent($(this).siblings('input[type="search"]').val());
        var x = "/hc/en-us/search?utf8=%E2%9C%93&query=" + y;
        window.location.href = x;
    });
    //shoe selected custom status in active state
    var abc = $('#filtersList .dropdown-menu [role="menuitem"][aria-selected="true"]').text();
    $('#filtersList.dropdown .dropdown-toggle').text('Show ' + abc);
    //search Icon
    $(".menu .search-full").append('<span id="searchIcon"></span>');
    //NEw post page placeholder
    $('.new_community_post .nesty-input').text('Please select a topic...');
    $("#community_post_topic_id option:first").text('Please select a topic...');
    //hide empty <p> in post page
    //$('.post-body p').filter(function() {return $.trim($(this).text()) === ''}).remove();
    // Top nav signin text change
    $('.login').text('FEEDBACK LOGIN');
    // Follow text change
    $('.post-subscribe').text('Follow Post');
    // New post text change
    $('.newPostText').text('Post new feedback');

    //To get post count from topic list page and render in menu
    var lang = $('html').attr('lang').toLowerCase();
    $.ajax({
        url: 'https://feedback.minecraft.net/hc/' + lang + '/community/topics', //Pass URL here 
        type: "GET", //Also use GET method
        success: function(data) {
            var pCount = $(data).find('#topicsSidebar').html();
            $('#seeAllposts').after(pCount);
            //$('#raAppend').after(pCount);
        }
    });
    //To get article count from category page and render in sidebar card
    $.ajax({
        url: 'https://feedback.minecraft.net/hc/' + lang + '/categories/115000410252-General', //Pass URL here 
        type: "GET", //Also use GET method
        success: function(data) {
            var aCount = $(data).find('#sectionSidebar').html();
            $('#sectionList').append(aCount);
        }
    });
});

function getposts(data) {
    var _postBoxLeft = '';
    $.each(data.posts, function(index) {
        var itmae = data.posts[index];
        var itemTitle = itmae.title;
        var itemtitle = '';
        var maxLength = 50;
        /*if($.trim(itmae.title).length > maxLength){
           itemTitle = itemTitle.substring(0, maxLength)+'...';
          itemtitle = itmae.title;
        }*/
        //     console.log('itemTitle',itemTitle)
        _postBoxLeft = _postBoxLeft + '<div class="feedList myclass"><div class="voteBox text-center"><span class="voteBoxInner"><span class="font-bold">' + itmae.vote_sum + '</span><span>Votes</span></span></div><a href="' + itmae.html_url + '" class="feedTitle" title="' + itemtitle + '">' + itemTitle + '</a></div>';
    })
    return _postBoxLeft;
}

$(document).ready(function() {

    if ($('#homePage').length) {
        var pageArrLeft = Array(1, 2);
        var pageRandLeft = pageArrLeft[Math.floor(Math.random() * pageArrLeft.length)];
        $.ajax({
            url: 'https://minecraftfeedback.zendesk.com/api/v2/help_center/community/posts.json?filter_by=planned&page=' + pageRandLeft + '&per_page=3&sort_by=votes',
            dataType: 'json',
            //async: false,
            success: function(data) {
                var _announcedPost = getposts(data)
                $('#announcedPosts').html(_announcedPost);
            }
        });

        var pageunderPostsArr = Array(1, 2, 3);
        var pageunderPosts = pageunderPostsArr[Math.floor(Math.random() * pageunderPostsArr.length)];
        $.ajax({
            url: 'https://minecraftfeedback.zendesk.com/api/v2/help_center/community/posts.json?filter_by=not_planned&page=' + pageunderPosts + '&per_page=3&sort_by=votes',
            dataType: 'json',
            //async: false,
            success: function(data) {
                var _underReviewPost = getposts(data)
                $('#underReviewPosts').html(_underReviewPost);
            }
        });

        var _postBoxRight = '';
        var pageArrRight = Array(1, 2, 3);
        var pageRandRight = pageArrRight[Math.floor(Math.random() * pageArrRight.length)];
        $.ajax({
            /*url: 'https://minecraftfeedback.zendesk.com/api/v2/help_center/community/posts.json?filter_by=all&page=' + pageRandRight + '&per_page=3&sort_by=votes',*/
            url: 'https://minecraftfeedback.zendesk.com/api/v2/community/topics/360001803212/posts?per_page=3&sort_by=votes',
            dataType: 'json',
            //async: false,
            success: function(data) {
                //      console.log('data', data)
                var _randomPosts = getposts(data)
                $('#randomPosts').html(_randomPosts);
            }
        });
    }
});

$(document).ready(function() {


});

// GET post under review
/*$(document).ready(function () {
if (document.getElementById("homePage")) {
var items = new Array();
function myfunctionalt() {
$.ajax({
url: 'https://minecraftfeedback.zendesk.com/api/v2/community/topics.json',
dataType: 'json',
async: false,
success: function (data) {
$.each(data.topics, function (index) {
if (data.topics[index].user_segment_id == null) {
var topicIdNo = data.topics[index].id;
items.push(topicIdNo);
}
});
}
});
}
myfunctionalt();
var item = items[Math.floor(Math.random() * items.length)];

var hc_urla = 'https://minecraftfeedback.zendesk.com';
var _allarticlesa = [],
_artHtmla = '',
_urla;
var _articlesa = function (article) {
$.ajax({
url: _urla,
type: 'GET',
dataType: 'json',
success: article
});
};
_urla = hc_urla + '/api/v2/community/topics/' + item + '/posts.json?sort_by=votes&page=1&per_page=3';
_articlesa(function (data) {
_allarticlesa = data.posts;
_arthtmla = '';
$(data.posts).each(function (idxa, itma) {
var l;
$.ajax({
url: '/api/v2/community/topics/' + item + '/posts.json?sort_by=votes&page=1&per_page=3',
dataType: 'json',
async: false,
success: function (data) {
l = data.count;
}
});
_arthtmla = _arthtmla + '<div class="feedList"><div class="voteBox text-center"><span class="voteBoxInner"><span class="font-bold">' + itma.vote_count + '</span><span>Votes</span></span></div><a href="' + itma.html_url + '" class="feedTitle">' + itma.title + '</a></div>';
});
$('#underReviewPosts').html(_arthtmla);
});
}
});

// GET random posts without tag
$(document).ready(function () {
if (document.getElementById("homePage")) {
var items = new Array();
function myfunctionalt() {
$.ajax({
url: 'https://minecraftfeedback.zendesk.com/api/v2/community/topics.json',
dataType: 'json',
async: false,
success: function (data) {
$.each(data.topics, function (index) {
if (data.topics[index].user_segment_id == null) {
var topicIdNo = data.topics[index].id;
items.push(topicIdNo);
}
});
}
});
}
myfunctionalt();
var item = items[Math.floor(Math.random() * items.length)];
var itemsalt = Array(1, 2, 3);
var itemalt = itemsalt[Math.floor(Math.random() * itemsalt.length)];
var hc_url = 'https://minecraftfeedback.zendesk.com';
var _allarticles = [],
_artHtml = '',
_url;
var _articles = function (article) {
$.ajax({
url: _urla,
type: 'GET',
dataType: 'json',
success: article
});
};
_urla = hc_url + '/api/v2/community/topics/' + item + '/posts.json?sort_by=votes&page=' + itemalt + '&per_page=3';
_articles(function (data) {
_allarticles = data.posts;
_arthtml = '';
$(data.posts).each(function (idx, itm) {
var l;
$.ajax({
url: '/api/v2/community/topics/' + item + '/posts.json?sort_by=votes&page=' + itemalt + '&per_page=3',
dataType: 'json',
async: false,
success: function (data) {
l = data.count;
}
});
_arthtml = _arthtml + '<div class="feedList"><div class="voteBox text-center"><span class="voteBoxInner"><span class="font-bold">' + itm.vote_count + '</span><span>Votes</span></span></div><a href="' + itm.html_url + '" class="feedTitle">' + itm.title + '</a></div>';
});
$('#randomPosts').html(_arthtml);
});
}
});*/

//Custom Voting Box
$(document).ready(function() {

    $('a.vote-up').text('Vote');
    $(".vote-sum").after("<span class='cVoteText'>Votes</span>");

    if ($('.vote-up').hasClass("vote-voted")) {
        $('.vote-up').text('Voted!');
        $(this).css('background', '#2a81d7;');
    }

    $(".vote-up").click(function() {
        if (document.getElementById("user")) {
            if ($(this).hasClass("vote-voted")) {
                $(this).text('Vote');
            } else {
                $(this).text('Voted!');
                $(this).css('background', '#2a81d7;');
            }
        } else {
            var logHref = $('.login').attr('href');
            $('.vote-button').attr('href', logHref);
        }

    });
});

$(document).ready(function() {

    $('.cardSublist li a').on('keydown', function(e) {
        if (e.keyCode === 13) {
            var hostName = window.location.origin;
            window.location.href = hostName + $(this).attr('href');
        }
    });

    var assetsMouseLeave = $(".menu-mobile .menuLay img").attr('data-mouseClo');
    var assetsMenuClose = $(".menu-mobile .menuLay img").attr('data-mouseDef');
    "use strict";
    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    //$('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    //$(".menu .mLogo").before("<a href=\"#\" class=\"menu-mobile\">&nbsp;</a>");
    $(".menu > ul").first().before("<span class=\"searchSpan\"><span class=\"searchLay\" tabindex='0'><span class=\"search-mobile\">&nbsp;</span></span></span>");
    setTimeout(function() {
        $('.raa').remove();
    }, 1000);

    /*290930-Fix*/
    $(".menu .mainLi").on('keydown', function(event) {
        if (event.keyCode === 13) {
            $(".cardSublist").css('display', 'none');
            $(this).children(".cardSublist").css('display', 'block');
            //event.preventDefault();
        }
    });
    $(".dLogo a, .topNavbar .navLink").focus(function() {
        $(".cardSublist").css('display', 'none');
    });

    $(".menu .mainLi").hover(function(e) {
        if ($(window).width() > 943) {
            $(".cardSublist").css('display', 'none');
            //$(this).children(".cardSublist").show(100)
            $(this).children(".cardSublist").css('display', 'block');
            //$(this).children(".cardSublist").stop(true, true).fadeToggle(0);
            e.preventDefault();
        }
    });
    $(".menu .mainLi a").on('mousedown', function(event) {
        if ($(window).width() < 991) {
            //   console.log('12321')
            var _cardSublist = $(this).parent().find('.cardSublist')
            if (_cardSublist.hasClass('display-list')) {
                _cardSublist.removeClass('display-list');
                _cardSublist.addClass('remove-list');
            } else {
                _cardSublist.addClass('display-list');
                _cardSublist.removeClass('remove-list');
            }
        }
    });
    $('.cardSublist').mouseleave(function() {
        $(".cardSublist").css('display', 'none');
    });

    $(".menu > ul > li").click(function() {
        if ($(window).width() <= 943) {
            $(this).children("ul").fadeToggle(150);
        }
    });
    $(document).mousedown(function(e) {
        if ($('.menu .mainLi').has(e.target).length === 0) {
            $(".cardSublist").css('display', 'none');
        }
    });
    /*End: 290930-Fix*/


    /*$( ".menu > ul > li" ).css( "pointer-events", "none" );
     setTimeout(function(){
     $( ".menu > ul > li" ).css( "pointer-events", "auto" );
     }, 2000);
     
     $(".menu > ul > li").hover(function(e) {
     if ($(window).width() > 943) {
     $(this).children("ul").finish().fadeToggle(200);
     e.preventDefault();
     }
     });*/

    /*$(".menu > ul > li").mouseenter(function(e){
     if ($(window).width() > 943) {
     $(this).children("ul").stop(true, false).fadeToggle(0);
     e.preventDefault();
     }
     });
     $(".menu > ul > li").mouseleave(function(e){
     if ($(window).width() > 943) {
     $(this).children("ul").stop(true, false).fadeToggle(0);
     e.preventDefault();
     }
     });*/
    $(".menu > ul > li").click(function() {
        if ($(window).width() <= 943) {
            $(this).children("ul").fadeToggle(150);
        }
    });
    $(".menu-mobile").click(function(e) {
        $('.searchSpan .searchLay').removeClass('closeSer');
        $(".menu-mobile").toggleClass('bg-on-mobile');
        if (!$(".menu-mobile").hasClass('bg-on-mobile')) {
            $(".menu-mobile .menuLay img").attr("src", assetsMenuClose);
        } else {
            $(".menu-mobile .menuLay img").attr("src", assetsMouseLeave);
        }
        $(".menu > ul").toggleClass('show-on-mobile');
        $('.searchSpan .searchLay').css('background', 'transparent');
        $('.tabSer').css('display', 'none');
        e.preventDefault();
    });
});
var cachedWidth = $(window).width();
/*$(window).resize(function() {
$(".menu > ul > li").children("ul").hide();
$(".menu > ul").removeClass('show-on-mobile');
});*/

jQuery(window).on("load resize", function() {

    var assetsMenuClose = $(".menu-mobile .menuLay img").attr('data-mouseDef');
    var assetsMouseLeave = $(".menu-mobile .menuLay img").attr('data-mouseClo');
    setTimeout(function() {
        jQuery(function() {
            var assetsMenuClose = $(".menu-mobile .menuLay img").attr('data-mouseDef');
            var userAgent = (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/));
            if (navigator.userAgent.match(/Android/i)) {

            } else if (navigator.userAgent.match(/iPod|iPhone|iPad/i)) {

            } else {
                $(".menu-mobile .menuLay img").attr("src", assetsMenuClose);
                $(".menu > ul > li").children("ul").hide();
                $(".menu-mobile").removeClass('bg-on-mobile');
                $(".menu > ul").removeClass('show-on-mobile');
            }
        });
    }, 300);
});

//Post form custom validations
// Commented on 25th May 2020
/*$(document).ready(function () { 
//added document ready on FEB13th
$('body').on('click', 'form.new_community_post input[type="submit"]', function (event) {

  //console.log('Body content', $.trim($('#community_post_details_ifr').contents().find('body').text()));
  if ($("#hc-wysiwyg").length > 0) {
      if ($.trim($('#community_post_title').val()) === "" ||
              $.trim($('#community_post_details_ifr').contents().find('body').text()) === "" ||
              $.trim($("#community_post_topic_id").val()) === "" ||
              $('.nesty-input:nth-child(2)').text() === 'Please select a topic...' ||
              $('#community_post_title').val().length > 75 ||
              $.trim($('#community_post_details_ifr').contents().find('body').text()).length > 1500) {
          event.preventDefault();
          if ($.trim($('#community_post_title').val()) === "" || $('#community_post_title').val().length > 75) {
              if ($.trim($('#community_post_title').val()) === "") {
                  $('#editorVali1').text("can't be blank");
              } else if ($('#community_post_title').val().length > 75) {
                  $('#editorVali1').text("maximum 75 characters only");
                  //window.stop();
              }
              $('#editorVali1').css('display', 'block');
          } else {
              $('#editorVali1').css('display', 'none');
          }
          if ($.trim($('#community_post_details_ifr').contents().find('body').text()) === "" || $.trim($('#community_post_details_ifr').contents().find('body').text()).length > 1500) {
              if ($.trim($('#community_post_details_ifr').contents().find('body').text()) === "") {
                  $('#editorVali').text("can't be blank");
              } else if ($.trim($('#community_post_details_ifr').contents().find('body').text()).length > 1500) {
                  event.preventDefault();
                  $('#editorVali').text("maximum 1500 characters only");
                  //window.stop();
              }
              $('#editorVali').css('display', 'block');
          } else {
              $('#editorVali').css('display', 'none');
          }
          if ($.trim($('#community_post_topic_id').val()) === "" || $('.nesty-input:nth-child(2)').text() === 'Please select a topic...') {
              $('#editorVali3').css('display', 'block');
          } else {
              $('#editorVali3').css('display', 'none');
          }
          $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'none');
          return false;
      } else {
          $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'block');
          $('iframe[title="recaptcha challenge"]').parent().parent().css('top', $(window).scrollTop());
          $('.notification.notification-error').css('display', 'none');
          return true;
      }
  } else {
      if ($.trim($('#community_post_title').val()) === "" || $.trim($('#community_post_details').val()) === "" || $.trim($("#community_post_topic_id").val()) === "" || $('#community_post_title').val().length > 75 || $('#community_post_details').val().length > 1500) {
          event.preventDefault();
          if ($.trim($('#community_post_title').val()) === "" || $('#community_post_title').val().length > 75) {
              if ($.trim($('#community_post_title').val()) === "") {
                  $('#editorVali1').text("can't be blank");
              } else if ($('#community_post_title').val().length > 75) {
                  $('#editorVali1').text("maximum 75 characters only");
                  //window.stop();
              }
              $('#editorVali1').css('display', 'block');
          } else {
              $('#editorVali1').css('display', 'none');
          }
          if ($.trim($('#community_post_details').val()) === "" || $('#community_post_details').val().length > 1500) {
              if ($.trim($('#community_post_details').val()) === "") {
                  $('#editorVali').text("can't be blank");
              } else if ($('#community_post_details').val().length > 1500) {
                  $('#editorVali').text("maximum 1500 characters only");
                  //window.stop();
              }
              $('#editorVali').css('display', 'block');
          } else {
              $('#editorVali').css('display', 'none');
          }
          if ($.trim($('#community_post_topic_id').val()) === "") {
              $('#editorVali3').css('display', 'block');
          } else {
              $('#editorVali3').css('display', 'none');
          }
          return false;
      } else {
          return true;
      }
  }
});
}); */

// Commented on 25th May 2020
/*$(document).ready(function () {

$('body').on('click', '#zd-edit-comment-update', function (event) {
      $('.error-text').remove();
      event.preventDefault();
      if ($.trim($('#zd-wysiwyg_ifr').contents().find('body').text()) === "") {
          $('._35UhSvoBFfgLA5hMUd9u0a #hc-wysiwyg').after('<p class="error-text">cannot be blank</p>');
          console.log('failed!');
          return false;
      } else if ($.trim($('#zd-wysiwyg_ifr').contents().find('body').text()).length > 1500) {
          $('._35UhSvoBFfgLA5hMUd9u0a #hc-wysiwyg').after('<p class="error-text">maximum 1500 characters only</p>');
          console.log('failed!');
          return false;
      } else {
          console.log('passed!');
      }
  });

  $('body').on('keydown', '#zd-edit-post-update', function (event) {
      if (event.keyCode == 13 || event.keyCode == 32) {
          $('.notification-error').remove();
          if ($('#zd-edit-post-title').val().length > 75 || $.trim($('#zd-edit-post-title').val()) === "" || $.trim($('#zd-edit-post iframe#zd-wysiwyg_ifr').contents().find('body').text()).length > 1500 || $.trim($('#zd-edit-post iframe#zd-wysiwyg_ifr').contents().find('body').text()) === "") {

              event.preventDefault();
              if ($.trim($('#zd-edit-post-title').val()) === "") {
                  $('._1EcPS9uhGb3YySxe7pDQJ8 #zd-edit-post-title').after('<p class="notification notification-error notification-inline">cannot be blank</p>');
              } else if ($('#zd-edit-post-title').val().length > 75) {
                  console.log('post-title')
                  $('#zd-edit-post-title').after('<p class="notification notification-error notification-inline">maximum 75 characters only</p>');
              }
              if ($.trim($('#zd-edit-post iframe#zd-wysiwyg_ifr').contents().find('body').text().length) == 0) {
                  // $('._1EcPS9uhGb3YySxe7pDQJ8 #hc-wysiwyg').after('<p class="notification notification-error notification-inline">cannot be blank</p>');
                  $('#hc-wysiwyg').after('<p class="notification notification-error notification-inline">cannot be blank</p>');
              } else if ($.trim($('#zd-edit-post iframe#zd-wysiwyg_ifr').contents().find('body').text()).length > 1500) {
                  // $('._1EcPS9uhGb3YySxe7pDQJ8 #hc-wysiwyg').after('<p class="notification notification-error notification-inline">maximum 1500 characters only</p>');
                  $('#hc-wysiwyg').after('<p class="notification notification-error notification-inline">maximum 1500 characters only</p>');
              }
              return false;
          } else {
              console.log('passed!');
          }
      }
  });

  $('body').on('click', '#zd-edit-post-update', function (event) {
      $('.notification-error').remove();
      if ($('#zd-edit-post-title').val().length > 75 || $.trim($('#zd-edit-post-title').val()) === "" || $.trim($('#zd-edit-post iframe#zd-wysiwyg_ifr').contents().find('body').text()).length > 1500 || $.trim($('#zd-edit-post iframe#zd-wysiwyg_ifr').contents().find('body').text()) === "") {

          event.preventDefault();
          if ($.trim($('#zd-edit-post-title').val()) === "") {
              $('#zd-edit-post-title').after('<p class="notification notification-error notification-inline">cannot be blank</p>');
          } else if ($('#zd-edit-post-title').val().length > 75) {
              $('#zd-edit-post-title').after('<p class="notification notification-error notification-inline">maximum 75 characters only</p>');
          }
          if ($.trim($('#zd-edit-post iframe#zd-wysiwyg_ifr').contents().find('body').text().length) == 0) {
              $('#hc-wysiwyg').after('<p class="notification notification-error notification-inline">cannot be blank</p>');
          } else if ($.trim($('#zd-edit-post iframe#zd-wysiwyg_ifr').contents().find('body').text()).length > 1500) {
              $('#hc-wysiwyg').after('<p class="notification notification-error notification-inline">maximum 1500 characters only</p>');
          }
          return false;
      } else {
          console.log('passed!');
      }
  });
});*/


/* New post - Max character count */
/*$(document).ready(function() {
$('body').on('DOMNodeInserted', 'iframe', function(e) {
  $('#community_post_details_ifr').on('load', (function() {
    $('#editorVali').text("Maximum 1500 characters only.");
     $('#community_post_details_ifr').contents().find('body').on('keyup mousedown',function() {
        if ($.trim($('#community_post_details_ifr').contents().find('body').text()).length > 1500)
        {
          $('#editorVali').css('display', 'block');
          $(':input[type="submit"]').prop('disabled', true)
        }
        else
          {
            $('#editorVali').css('display', 'none');
            $(':input[type="submit"]').prop('disabled', false)
          }
     });
  }));
});
});*/
/* END New post - Max character count */

/* Start - Max character count */
$(document).ready(function() {
    var isTitleValid = false;
    var isDetailsValid = false;
    var isTopicValid = false;
    $(':input[type="submit"]').prop('disabled', true);

    function isSubmitFormValid() {
        if (isTitleValid && isDetailsValid && isTopicValid) {
            $(':input[type="submit"]').prop('disabled', false);
            $('#zd-edit-post-update').prop('disabled', false);
            $('#zd-edit-post-update').css({
                'pointer-events': 'auto',
                'opacity': 1
            });
            console.log('isSubmitFormValid enabled', isTitleValid + "  " + isDetailsValid + "  " + isTopicValid)
        } else {
            $(':input[type="submit"]').prop('disabled', true);
            $('#zd-edit-post-update').prop('disabled', true);
            $('#zd-edit-post-update').css({
                'pointer-events': 'none',
                'opacity': 0.5
            });
            console.log('isSubmitFormValid disabled', isTitleValid + "  " + isDetailsValid + "  " + isTopicValid)
        }
    }

    function isCommentValid() {
        if (isDetailsValid) {
            $(':input[type="submit"]').prop('disabled', false);
            $('#zd-edit-comment-update').css({
                'pointer-events': 'auto',
                'opacity': 1
            });
            console.log('isCommentValid enabled', isDetailsValid)
        } else {
            $(':input[type="submit"]').prop('disabled', true);
            $('#zd-edit-comment-update').css({
                'pointer-events': 'none',
                'opacity': 0.5
            });
            console.log('isCommentValid disabled', isDetailsValid)
        }
    }

    function detailsValidate() {
        if ($('#zd-wysiwyg_ifr').length > 0) {
            if ($.trim($('#zd-wysiwyg_ifr').contents().find('body').text()).length > 1500) {
                $('#zd-wysiwyg_ifr').parent().parent().after('<p class="notification notification-details edit-details-error notification-error notification-inline">maximum 1500 characters only</p>');
                isDetailsValid = false;
                isSubmitFormValid();
                isCommentValid();
            }
        } else if ($('#community_post_details_ifr').length > 0) {
            validatePostDetails($('#community_post_details_ifr').contents().find('body').text());
        } else if ($('#community_post_details').length > 0) {
            validatePostDetails($('#community_post_details').val());
        } else if ($('#community_comment_body_ifr').length > 0) {
            validateCommentDetails($('#community_comment_body_ifr').contents().find('body').text());;
        } else if ($('#community_comment_body').length > 0) {
            validateCommentDetails($('#community_comment_body').val());
        }
    }

    function titleValidate() {
        if ($('#community_post_title').val()) {
            if ($('#community_post_title').val().length > 75 || $('#community_post_title').val().length == 0) {
                isTitleValid = false
            } else
                isTitleValid = true;
        }
    }

    $('body').on('click', '#hc-wysiwyg div[role="form"] span[role="button"]', function(e) {
        detailsValidate();
    });
    // Start of code for Title input field character count validation
    $('#community_post_title').on('keyup mousedown', function() {
        if ($('#community_post_title').val().length > 75) {
            isTitleValid = false;
            $('#editorVali1').text("Maximum 75 characters only");
            $('#editorVali1').css('display', 'block');
            //$(':input[type="submit"]').prop('disabled', true);
        } else if ($.trim($('#community_post_title').val()).length === 0) {
            isTitleValid = false;
            $('#editorVali1').text("Can't be blank");
            $('#editorVali1').css('display', 'none');
        } else {
            isTitleValid = true;
            $('#editorVali1').css('display', 'none');
            //if(isDetailsValid)
            //$(':input[type="submit"]').prop('disabled', false);
        }
        var charCount = $('#community_post_title').val().length;
        $('.newPostFormSection .form .form-field #titleFieldCharCount .characters').text(charCount);
        isSubmitFormValid();
    });
    // End of code for Title input field character count validation

    // Start of Code for Details Iframe character count validation
    $('body').on('DOMNodeInserted', 'iframe', function(e) {
        if ($('#community_post_details_ifr').length > 0) {
            $('#community_post_details_ifr').on('load', (function() {
                var _this = $(this)
                _this.contents().find('body').on('keyup mousedown touch', function() {
                    var charCount = _this.contents().find('body').text().length;
                    $('.newPostFormSection .form #detailsField #detailsFieldCharCount .characters').text(charCount);
                    validatePostDetails(_this.contents().find('body').text());
                });
            }));
        } else if ($('#community_post_details').length > 0) {
            $('#community_post_details').on('keyup mousedown', function() {
                var charCount = $('#community_post_details').val().length;
                $('.newPostFormSection .form #detailsField #detailsFieldCharCount .characters').text(charCount);
                validatePostDetails($('#community_post_details').val());
            });
        }
    });

    function validatePostDetails(detailsText) {
        if (detailsText.length > 1500) {
            isDetailsValid = false;
            $('#editorVali').text("Maximum 1500 characters only");
            $('#editorVali').css('display', 'block');
            //$(':input[type="submit"]').prop('disabled', true);
        } else if ($.trim(detailsText).length === 0) {
            isDetailsValid = false;
            $('#editorVali').text("Can't be blank");
            $('#editorVali').css('display', 'none');
        } else {
            isDetailsValid = true;
            $('#editorVali').css('display', 'none');
            if (isTitleValid) {
                //$(':input[type="submit"]').prop('disabled', false);
            }
        }
        isSubmitFormValid();
    }
    // End of Code for Details Iframe character count validation

    // Start: Edit Title field character count validation
    $(document).on('keyup mousedown', '#zd-edit-post-title', function() {
        var charCount = $('#zd-edit-post-title').val().length;
        $('#editTitleCharCount .characters').text(charCount);
        $('.notification-title').remove();
        if ($('#zd-edit-post-title').val().length > 75) {
            $('#zd-edit-post-title').after('<p class="notification edit-title-error notification-title notification-error notification-inline">maximum 75 characters only</p>');
            //$('#zd-edit-post-update').attr('disabled', true)

            isTitleValid = false;
        } else if ($.trim($('#zd-edit-post-title').val()).length === 0) {
            $('#zd-edit-post-title').after('<p class="notification edit-title-error notification-error notification-inline">Can\'t be blank</p>');
            isTitleValid = false;
            $('.edit-title-error').css('display', 'none');
        } else {
            isTitleValid = true;
            if (!$('.edit-details-error').is(":visible") && $.trim($('#zd-wysiwyg_ifr').contents().find('body').text()).length > 0) {
                isDetailsValid = true;
                isTopicValid = true;
            }
            if (!$('.edit-details-error').is(":visible")) {
                // $('#zd-edit-post-update').attr('disabled', false)

            }
        }

        isSubmitFormValid();
    });
    // End: Edit Title field character count validation

    // Srart: Add Comment Iframe character count validation
    $(document).on('DOMNodeInserted', 'iframe', function(e) {
        if ($('#community_comment_body_ifr').length > 0) {
            $('#community_comment_body_ifr').on('load', (function() {
                var _this = $(this);
                _this.contents().find('body').on('keyup mousedown', function() {
                    var charCount = _this.contents().find('body').text().length;
                    $('.postSection .post-comments .comment-form .comment-container #commentsFieldCharCount .characters').text(charCount);
                    validateCommentDetails(_this.contents().find('body').text());
                });
            }));
        } else if ($('#community_comment_body').length > 0) {
            $('#community_comment_body').on('keyup mousedown', function() {
                var charCount = $('#community_comment_body').val().length;
                $('.postSection .post-comments .comment-form .comment-container #commentsFieldCharCount .characters').text(charCount);
                validateCommentDetails($('#community_comment_body').val());
            });
        }
    });

    function validateCommentDetails(commentText) {
        $('.notification-details').remove();
        if (commentText.length > 1500) {
            $('.notification-error').css('display', 'block');
            $('.notification-error').text('maximum 1500 characters only');
            isDetailsValid = false;

        } else {
            if ($.trim(commentText).length > 0) isDetailsValid = true;
            else isDetailsValid = false;
            $('.notification-error').css('display', 'none');
        }
        isCommentValid();
    }
    //End: Add Comment Iframe character count validation

    // Start: Edit Post/Comment Details Iframe character count validation
    $(document).on('DOMNodeInserted', 'iframe', function(e) {
        $('#zd-wysiwyg_ifr').on('load', (function() {
            setTimeout(function() {
                $('#zd-wysiwyg_ifr').parent().parent().after('<span id="editDetailsCharCount"><span class="characters">' + $('#zd-wysiwyg_ifr').contents().find('body').text().length + '</span>/1500 Characters </span>');
                $('#zd-edit-post-title').after('<span id="editTitleCharCount"><span class="characters">' + $('#zd-edit-post-title').val().length + '</span>/75 Characters </span>');
            }, 100);

            $('#zd-edit-comment-update').css({
                'pointer-events': 'none',
                'opacity': 0.5
            });
            $('#zd-wysiwyg_ifr').contents().find('body').css({
                'overflow-y': 'auto',
                '-webkit-overflow-scrolling': 'touch'
            });
            $('#zd-wysiwyg_ifr').contents().find('body').on('keyup mousedown', function() {
                $('.notification-details').remove();
                var charCount = $('#zd-wysiwyg_ifr').contents().find('body').text().length;
                $('#editDetailsCharCount .characters').text(charCount);
                if ($('#zd-wysiwyg_ifr').contents().find('body').text().length > 1500) {
                    /*$('#zd-wysiwyg_ifr').parent().parent().after('<p class="notification notification-details edit-details-error notification-error notification-inline">maximum 1500 characters only </p>');*/
                    $('#editDetailsCharCount').after('<p class="notification notification-details edit-details-error notification-error notification-inline">maximum 1500 characters only </p>');
                    //$(':input[type="submit"]').prop('disabled', true);
                    isDetailsValid = false;

                    //$('#zd-edit-post-update').attr('disabled', true);
                    // $('#zd-edit-post-update').css('pointer-events', 'none');
                    //$('#zd-edit-comment-update').css({'pointer-events': 'none', 'opacity': 0.5});
                } else if ($.trim($('#zd-wysiwyg_ifr').contents().find('body').text()).length === 0) {
                    $('#zd-wysiwyg_ifr').parent().parent().after('<p class="notification notification-details edit-details-error notification-error notification-inline">Can\'t be blank</p>');
                    //$(':input[type="submit"]').prop('disabled', true);
                    isDetailsValid = false;
                    $('.edit-details-error').css('display', 'none');
                } else {
                    isDetailsValid = true;
                    if (!$('.edit-title-error').is(":visible") && $.trim($('#zd-edit-post-title').val()).length > 0) {
                        isTitleValid = true;
                        isTopicValid = true;
                    }
                    if (!$('.edit-title-error').is(":visible")) {
                        console.log(">>>>>>>> 11222  ", $('.edit-title-error').is(":visible"))
                        //$('#zd-edit-post-update').attr('disabled', false);
                        //$('#zd-edit-post-update').css({'pointer-events': 'auto',   'opacity': 1});
                    }
                }
                isSubmitFormValid();
                isCommentValid();
                $(':input[type="submit"]').prop('disabled', true);
            });
            $('#official-comment').on('click', function() {
                validateCommentDetails($('#zd-wysiwyg_ifr').contents().find('body').text())
                isCommentValid();
            });
        }));

    });
    // End: Edit Details Iframe character count validation

    //Start: Topic Dropdown change
    $(document).on('change', '#community_post_topic_id', function() {
        if ($('.nesty-input:nth-child(2)').text() === 'Please select a topic...' || $('.nesty-input:nth-child(2)').text() === '-' || $.trim($('#community_post_topic_id').val()) === "") {
            isTopicValid = false;
            //$(':input[type="submit"]').prop('disabled', true);
        } else {
            $('#editorVali3').css('display', 'none');
            isTopicValid = true;

            if (isDetailsValid && isTitleValid) {
                // $(':input[type="submit"]').prop('disabled', false);
                $('#zd-edit-post-update').attr('disabled', false);
            }
        }
        titleValidate();
        detailsValidate();
        isSubmitFormValid();
    });
    //End: Topic Dropdown change

    //Start: Topic Dropdown change on Edit
    $(document).on('change', '#zd-edit-post-topic-id', function() {
        $('#zd-edit-post-update').css({
            'pointer-events': 'none',
            'opacity': 0.5
        });
        console.log('@@@ ', $('.notification-error').is(":visible"))
        if (!$('.notification-error').is(":visible")) {
            console.log('222 ', $('.notification-error').is(":visible"))
            isDetailsValid = isTitleValid = true;
            $(':input[type="submit"]').prop('disabled', false);
            $('#zd-edit-post-update').css({
                'pointer-events': 'auto',
                'opacity': 1
            });
        }
    })
    //End: Topic Dropdown change on Edit   

    // Start: Submit Post Form 
    $('body').on('click', 'form.new_community_post input[type="submit"]', function(event) {

        if ($.trim($('#community_post_topic_id').val()) != "" && $('.nesty-input:nth-child(2)').text() != 'Please select a topic...' && isDetailsValid && isTitleValid) {
            console.log('submiting')
            $('#editorVali3').css('display', 'none');
            $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'block');
            $('iframe[title="recaptcha challenge"]').parent().parent().css('top', $(window).scrollTop());
            $('.notification.notification-error').css('display', 'none');
            return true;
        } else {

            window.stop();
            console.log('submit error');
            event.preventDefault();
            $('form.new_community_post').unbind('submit');
            $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'none');
            event.stopImmediatePropagation();
            if ($('.nesty-input:nth-child(2)').text() === 'Please select a topic...' || $('.nesty-input:nth-child(2)').text() === '-' || $.trim($('#community_post_topic_id').val()) === "") {
                $('#editorVali3').css('display', 'block');
                $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'none');
            }
            if (!isDetailsValid) {
                $('#editorVali').css('display', 'block');
                $(':input[type="submit"]').prop('disabled', true);
            }
            if (!isTitleValid) {
                $('#editorVali1').css('display', 'block');
                $(':input[type="submit"]').prop('disabled', true);;
            }
            return false;
        }
    });
    //End: Submit Post Form 

    //Start: Update Post Form 
    $('body').on('click', '#zd-edit-post-update', function(event) {
        console.log('Update', $('.nesty-input:nth-child(2)').text(), " isDetailsValid :  ", isDetailsValid, " isTitleValid :  ", isTitleValid);
        if ($('.nesty-input:nth-child(2)').text() != 'Please select a topic...' && isDetailsValid && isTitleValid) {
            $('#editorVali3').css('display', 'none');
            console.log('22222222')

            return true;
        } else {
            window.stop();
            event.preventDefault();
            event.stopImmediatePropagation();
            if ($('.nesty-input:nth-child(2)').text() === '-' || $.trim($('#zd-edit-post-topic-id').val()) === "") {
                $('#editorVali3').css('display', 'block');
                $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'none');
            }
            if (!isDetailsValid) {
                $('.edit-details-error').css('display', 'block');
                $('#zd-edit-post-update').prop('disabled', true);
                $('#zd-edit-post-update').css({
                    'pointer-events': 'none',
                    'opacity': 0.5
                });
            }
            if (!isTitleValid) {
                $('.edit-title-error').css('display', 'block');
                $('#zd-edit-post-update').prop('disabled', true);
                $('#zd-edit-post-update').css({
                    'pointer-events': 'none',
                    'opacity': 0.5
                });
            }
            return false;
        }
    })
    //End: Update Post Form 

    //Start: Submit  comment
    $('body').on('click', 'form.comment-form input[type="submit"]', function(event) {
        var commentBodyText = " ";
        console.log('1 >>  ', $('#community_comment_body_ifr').length);
        console.log('2 >>  ', $('#community_comment_body').length);
        if ($('#community_comment_body_ifr').length > 0) {
            commentBodyText = $('#community_comment_body_ifr').contents().find('body').text();
            console.log('1111  ', commentBodyText);
        } else if ($('#community_comment_body').length > 0) {
            commentBodyText = $('#community_comment_body').val();
            console.log('222  ', commentBodyText);
        }
        console.log($.trim(commentBodyText).length > 0);

        if ($.trim(commentBodyText).length > 0) {
            console.log('Submiting Comment')
            $('.notification-error').css('display', 'none');
            $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'block');
            $('iframe[title="recaptcha challenge"]').parent().parent().css('top', $(window).scrollTop());
            $('.notification.notification-error').css('display', 'none');
            return true;
        } else {
            window.stop();
            $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'none');
            console.log('error', $.trim($('#community_comment_body_ifr').contents().find('body').text()).length);
            event.preventDefault();
            $('form.comment-form').unbind('submit');
            event.stopImmediatePropagation();
            if ($.trim($('#community_comment_body_ifr').contents().find('body').text()).length == 0 || $.trim($('#community_comment_body').val().length == 0)) {
                $('.notification-error').text("can't be blank");
                $('.notification-error').css('display', 'block');
                $(':input[type="submit"]').prop('disabled', true);
            }

            return false;
        }
    });

    //End: Submit  comment

    //Start: UPDATE comment
    $('body').on('click', '#zd-edit-comment-update', function(event) {
        console.log('UPDATE comment')
        if (isDetailsValid) {
            $('iframe[title="recaptcha challenge"]').parent().parent().css('display', 'block');
            $('iframe[title="recaptcha challenge"]').parent().parent().css('top', $(window).scrollTop());
            $('.notification.notification-error').css('display', 'none');
            console.log('UPDATE')
        } else {
            window.stop();
            event.preventDefault();
            console.log('111111')
            event.stopImmediatePropagation();

            $('.edit-details-error').css('display', 'block');

            $('#zd-edit-comment-update').css({
                'pointer-events': 'none',
                'opacity': 0.5
            });
            return false;
        }
    });

});
/* END Max character count */

//Comment form custom validation
$(document).ready(function() {
    // Commented on 25th May 2020
    /* window.validateCommunityPost = function(e)
    {
      if ($.trim($('#community_post_details_ifr').contents().find('body').text()).length > 1500)
      {
          e.preventDefault();
        $('#editorVali').text("Maximum 1500 characters only.");
        $('#editorVali').css('display', 'block');
        console.log('cancel submit');
          return false;
      }
    }

      $('body').on('click', 'form.comment-form input[type="submit"]', function (event) {
          if ($("#hc-wysiwyg").length > 0) {
              if ($.trim($('#community_comment_body_ifr').contents().find('body').text()).length > 1500) {
                  event.preventDefault();
                  if ($.trim($('#community_comment_body_ifr').contents().find('body').text()).length > 1500) {
                      $('#editorValiCom').css('display', 'block');
                  } else {
                      $('#editorValiCom').css('display', 'none');
                  }
                  return false;
              } else {
                  return true;
              }
          } else {
              if ($.trim($('#community_comment_body').val()).length > 1500) {
                  event.preventDefault();
                  if ($.trim($('#community_comment_body').val()).length > 1500) {
                      $('#editorValiCom').css('display', 'block');
                  } else {
                      $('#editorValiCom').css('display', 'none');
                  }
                  return false;
              } else {
                  return true;
              }
          }
      });*/
});

/*$(document).ready(function() {
var hostName = window.location.origin;
var user_linkk;
if (document.getElementById("user")) {
var userName = $('#user-name').text(); 
$( "#user-menu a" ).each(function() {
if($( this ).text()=="My profile") {
user_linkk = $(this).attr('href');
}
});
}
$(".reportPost, .reportComment").click(function(){
var reportType = $(this).attr('class');   
var anchor = $(this).attr('data-url');
if (reportType == 'reportPost') {
var reportTyp = 'Post';
}
if (reportType == 'reportComment'){
var reportTyp = 'Comment';
}
var final = encodeURIComponent(reportTyp + ' URL - ' + anchor + ', Username - ' + userName + ', User Profile - ' + hostName + user_linkk);
$.ajax({
url: 'https://minecraftsupportreportpost.azurewebsites.net/api/ReportPost/FlagAPost?postURL=' + final,
type: 'POST',
async: false,
success: function(msg) {
if (reportType == 'reportPost') {
$('.hover_bkgr_fricc .popDesc').text('This post has been reported.');
}
if (reportType == 'reportComment'){
$('.hover_bkgr_fricc .popDesc').text('This comment has been reported.');
}
$('.hover_bkgr_fricc').show();
console.log(msg);
},
error: function(xhr, errorText) {
console.log('Error ' + xhr.responseText);
}
});
});
});*/

$(document).ready(function() {
    //console.log('111')
    var hostName = window.location.origin;
    var user_linkk;
    var reportType;
    var anchor;
    var reportTyp;
    if (document.getElementById("user")) {
        var userName = $('#user-name').text();
        $("#user-menu a").each(function() {
            if ($(this).text() == "My profile") {
                user_linkk = $(this).attr('href');
            }
        });
    }

    $('.reportPost, .reportComment').keydown(function(e) {
        var key = e.which;
        var thisVal = $(this);
        if (key == 13) {
            thisVal.click();
        }
    });

    $('#community_post_report').on('change', function() {
        let selectedVal = $(this).find(':selected').attr('data-val');
        let showinfo = '';
        if (selectedVal == 'violate' || selectedVal == 'wrong' || selectedVal == 'previous' || selectedVal == 'duplicate') {
            showinfo = '';
        } else if (selectedVal == 'cheating') {
            showinfo = 'Someone is utilizing game mods to gain an advantage over others, exploiting bugs, or engaging in other unsupported and fraudulent behaviors for the purposes of winning.';
        } else if (selectedVal == 'behaviour') {
            showinfo = 'Someone is creating usernames that include Hate Speech, PII, drug references, or other inappopriate words or pharases.';
        } else if (selectedVal == 'quit') {
            showinfo = 'Someone is leaving competitive games early resulting in negative concequences and experiences for other purposefully.';
        } else if (selectedVal == 'duplicate') {
            showinfo = 'Someone is taking resources, destroying player created content, or engaging in harassment of other players.';
        } else if (selectedVal === 'child') {
            showinfo = 'Someone is talking about or otherwise promoting indecent behavior involving minors.';
        } else if (selectedVal == 'terrorism') {
            showinfo = 'Someone is talking about, sharing, or otherwise promoting extreme violence, weapons, or bloody gore.';
        } else if (selectedVal == 'hate') {
            showinfo = 'Someone is using racial slurs, or targeting protected groups and demographics negatively.';
        } else if (selectedVal == 'harm') {
            showinfo = 'Someone is making declarative statements with intent to harm someone, including depressive language and references to weapons or timelines.';
        } else if (selectedVal == 'suicide') {
            showinfo = 'Someone is making statements with intent to harm themselves, including depressive language and references to weapons or timelines.';
        } else if (selectedVal == 'imagery') {
            showinfo = 'Someone is sending pictures of a pornographic or inappropriate nature to other players, or posting the content in publicly viewed spaces.';
        } else if (selectedVal == 'extreme') {
            showinfo = 'Someone is talking about, promoting, or threatening to commit acts of terrorism or violent extremism for political, religious, ideological, or other reasons.';
        } else if (selectedVal == 'nudity') {
            showinfo = 'Someone is talking about, sharing, or otherwise promoting nudity or pornography.';
        } else if (selectedVal == 'harassment') {
            showinfo = 'Someone is bullying, attacking, or shaming you or another player. This includes when someone is sharing personal information or repeatedly trying to contact someone without consent.';
        } else if (selectedVal == 'defamation') {
            showinfo = "Someone is pretending to be someone they’re not, sharing false information, or damaging the reputation of a person or brand.";
        } else if (selectedVal == 'drug') {
            showinfo = 'Someone is talking about or otherwise promoting drugs or alcohol.';
        } else if (selectedVal == 'profanity') {
            showinfo = 'Someone is using or otherwise promoting bad language.';
        }
        $(this).parent().find('.detail-info').html(showinfo);
    });

    $('body').on('click', '.reportPost, .reportComment', function() {
        $('.hover_bkgr_fricc .reportCard').show();
        $('.detail-info').html('');
        $('.reportHead').text('You are reporting this post or comment!');
        $('.hover_bkgr_fricc .popDesc').text('Are you sure you want to report this?');
        /*reportType = $(this).attr('class');
        anchor = $(this).attr('data-url');
        if (reportType == 'reportPost') {
            reportTyp = 'Post';
        }
        if (reportType == 'reportComment') {
            reportTyp = 'Comment';
        }*/
        if ($(this).hasClass('reportPost')) {
            reportTyp = 'Post';
            reportType = 'reportPost';
        } else if ($(this).hasClass('reportComment')) {
            reportTyp = 'Comment';
            reportType = 'reportComment';
        } else {
            reportTyp = '';
            reportType = '';
        }
        $('.popupWrapper').attr('aria-label', 'Report a ' + reportTyp);
        var anchor = $(this).children('a').attr('data-url');
        $('.hover_bkgr_fricc').show();
        $('.reportPost, .reportComment').removeClass('open');
        $(this).addClass('open');
        $('.popup_card').focus();
        $("#report_yes").click(function() {
            let thisVal = $(this);
            var reportReason = $('#community_post_report').val();
            if (reportReason != '') {
                thisVal.css({
                    "opacity": 0.7,
                    "pointer-events": "none"
                });
                var final = encodeURIComponent(reportTyp + ' URL - ' + anchor + ', Username - ' + userName + ', User Profile - ' + hostName + user_linkk + ', Reason - ' + reportReason);
                console.log(final);
                $.ajax({
                    url: 'https://minecraftsupportreportpost.azurewebsites.net/api/ReportPost/FlagAPost?postURL=' + final,
                    //url: 'https://minecraftsupportreportpost.azurewebsites.net/api/ReportPost/FlagAPost?postURL=' + anchor + '&userName=username - ' + userName + '&userid=User ' + user_linkk,
                    type: 'POST',
                    //async: false,
                    success: function(msg) {
                        $('.hover_bkgr_fricc').hide();
                        $('.reportHead').text('You have reported this content.');
                        if (reportType == 'reportPost') {
                            $('.hover_bkgr_fricc .popDesc').text('This post has been reported.');
                        }
                        if (reportType == 'reportComment') {
                            $('.hover_bkgr_fricc .popDesc').text('This comment has been reported.');
                        }
                        $('.hover_bkgr_fricc .reportCard').hide();
                        $('.hover_bkgr_fricc').show();
                        $('.popup_card').focus();
                        console.log(msg);
                        thisVal.css({
                            "opacity": 1,
                            "pointer-events": ""
                        });
                    },
                    error: function(xhr, errorText) {
                        console.log('Error ' + xhr.responseText);
                        $('.hover_bkgr_fricc .reportCard').hide();
                        $('.popup_card').focus();
                        $('.reportHead').text('An error has occurred.');
                        $('.hover_bkgr_fricc .popDesc').text('Please try reporting this content later');
                        thisVal.css({
                            "opacity": 1,
                            "pointer-events": ""
                        });
                    }
                });
            } else {
                $('#community_post_report').css('border', '1px solid red');
            }
        });

    });
});

$(window).load(function() {

    $(".trigger_popup_fricc").click(function() {
        $('.hover_bkgr_fricc').show();
    });
    //$('.hover_bkgr_fricc').click(function(){
    //$('.hover_bkgr_fricc').hide();
    //});

    $('.popupCloseButton, #report_no').keydown(function(e) {
        var key = e.which;
        var thisVal = $(this);
        if (key == 13) {
            thisVal.click();
        }
    });

    //Code change for pagination links
    let activePage = $('.pagination').find('span').text();
    $('.pagination').find('span').attr('aria-label', 'Page ' + activePage);
    $('.pagination').find('a').each(function() {
        let labelVal = $(this).attr('data-bi-name');
        $(this).attr('aria-label', 'Page ' + labelVal);
    });

    // trap focus within popup
    $('#report_no, .popupCloseButton').keydown(function(e) {
        var key = e.which;
        var thisVal = $(this);
        if (key === 9 && !e.shiftKey && thisVal.attr('id') == 'report_no') {
            $('.popup_card').focus();
        } else if (key === 9 && e.shiftKey && thisVal.attr('class') == 'popupCloseButton') {
            $('.tabFocusDiv').focus();
        }
    });

    $(document).keyup(function(e) {
        var key = e.which;
        if ((key === 27) && (e.target.className == "popup_card" || $(e.target).parents(".popup_card").length)) {
            $('.popupCloseButton').click();
            $('.reportPost.open, .reportComment.open').focus();
        }
    });


    $('.popupCloseButton, #report_no').click(function() {
        $('.hover_bkgr_fricc').hide();
        $('#community_post_report').val('');
        $('.reportPost.open, .reportComment.open').focus();

    });

    $(".attr-aria-expanded").click(function() {
        const element = $(this);
        const expandedState = element.attr("aria-expanded") === "true";
        element.attr("aria-expanded", !expandedState);
    });

});

/*$(document).ready(function() {
var ageid;
if (document.getElementById("user")) {
$( "#user-menu a" ).each(function() {
if($( this ).text()=="My profile") {
var x=$(this).attr('href');
var id = x.substring(x.lastIndexOf('/') + 1);
ageid = id.slice(0, 12);
}
});
$.ajax({
url: 'https://feedback.minecraft.net/api/v2/users/' + ageid + '.json', //Pass URL here 
type: "GET", //Also use GET method
success: function(data) {
if (data.user.role !== 'admin') {

$('.menu .extraLi').hide();
console.log('in');
}
}
});
} else{
$('.menu .extraLi').hide();
console.log('out');
}
});*/

$(document).ready(function() {

    var ageid;
    if (document.getElementById("user")) {
        $("#user-menu a").each(function() {
            if ($(this).text() == "My profile") {
                var x = $(this).attr('href');
                var id = x.substring(x.lastIndexOf('/') + 1);
                ageid = id.slice(0, 12);
            }
        });
        $.ajax({
            url: 'https://feedback.minecraft.net/api/v2/users/' + ageid + '.json', //Pass URL here 
            type: "GET", //Also use GET method
            success: function(data) {
                if (data.user.role == 'admin') {
                    $('#topicsList').append('<li class="extraLi"><a href="/hc/en-us/community/topics/360000579432-Villagers-NPC-Humanoids?sort_by=votes" data-id="360000579432">Villagers, NPC, Humanoids</a><span class="uvStyle-count"> 542</span></li><li class="extraLi"><a href="/hc/en-us/community/topics/360000276332-Website?sort_by=votes" data-id="360000276332">Website</a><span class="uvStyle-count"> 82</span></li>');
                }
            }
        });
    }
});

function existingPostSearch(callbackfunction) {
    var timer = null;
    return function() {
        var context = this;
        var args = callbackfunction;
        clearTimeout(timer);
        timer = window.setTimeout(function() {
                callbackfunction.apply(context, args);
            },
            2200);
    };
}
// New post re-design
$(document).ready(function() {
    $.get('https://feedback.minecraft.net/api/v2/help_center/users/' + getUserID() + '/votes.json').done(function(data) {
        localStorage.setItem("votesData", JSON.stringify(data));
        var lData = localStorage.getItem("votesData");
    });
    var hostName = window.location.origin;
    /*$("body").on('DOMSubtreeModified', ".searchbox-suggestions", function () {
    });*/
    $('#community_post_title').keyup(existingPostSearch(function() {
        var appendSuggestion = false;
        if ($("#post_new_feedback").length == 0) {
            appendSuggestion = true;
        }
        if (true) {
            $('.new_community_post .searchbox-suggestions').css('display', 'block');
            $('.new_community_post #detailsField').css('display', 'none');
            $('.new_community_post #community_post_topic_id').parent().css('display', 'none');
            $('.new_community_post input[type="submit"]').css('display', 'none');
            if ($('.new_community_post .searchbox-suggestions ul li').length == 0 || $(this).val().length < 3) {
                console.log('No list items');
                community_post_form();
            } else {
                if (appendSuggestion) {
                    $('.searchbox label').empty().append('Vote for an existing idea or <span id="post_new_feedback" tabindex="0">Post new feedback</span>');
                }
                console.log('calling populatePosts ')
                populatePosts();

                $("#post_new_feedback").keypress(function() {
                    if (event.which == 13) {
                        community_post_form();
                    }
                });
                $('#post_new_feedback').on('click', function(e) {
                    community_post_form();
                });
            }
        }
    }));

    /* $('#community_post_title').on("keyup", function(event) {
         console.log('keyup');
           $('.new_community_post .searchbox-suggestions').css('display', 'block');
           $('.new_community_post #detailsField').css('display', 'none');
           $('.new_community_post #community_post_topic_id').parent().css('display', 'none');
           $('.new_community_post input[type="submit"]').css('display', 'none');

           var timer;
           window.clearTimeout(timer);
           timer = window.setTimeout(function(){
               if( $('.new_community_post .searchbox-suggestions ul li').length == 0){
                   community_post_form();
                 }
           },2500); 

       });*/

    var community_post_form = function() {
        $('.new_community_post .searchbox-suggestions').css('display', 'none');
        $('.new_community_post #detailsField').css('display', 'block');
        $('.new_community_post #community_post_topic_id').parent().css('display', 'block');
        $('.new_community_post input[type="submit"]').css('display', 'inline-block');
        $('.new_community_post .see-all-btn').css('display', 'none');

    }


    /*$('#community_post_title').on("keypress", function(event) {
          if (event.keyCode == 13) {
              event.preventDefault();
              var count=$('.searchbox-suggestions ul li').length;
              $('#community_post_title').attr('aria-label', count + ' suggestions found');   

          }
    });*/
    $('.suggestion-list').after('<a class="see-all-btn" href="' + hostName + '/hc/en-us/search?query=' + $("#community_post_title").val() + '">See All Results</a>');
});

function populatePosts() {

    var hostName = window.location.origin;
    $('.newPostFormSection .form .new_community_post .see-all-btn').css('display', 'block')
    if ($('.searchbox-suggestions').children().length) {

        $('.searchbox-suggestions li').each(function() {
            var currentEle = $(this);
            var sugUrl = currentEle.children('a').attr('href');
            if (sugUrl) {
                var id = sugUrl.split('/')[7].substring(0, 12);
            } else {
                return 0;
            }
            $.ajax({
                url: hostName + '/api/v2/community/posts/' + id + '.json',
                type: "GET",
                success: function(data) {
                    if (data.post.title.length > 0) {
                        if (currentEle.find('.vote-button').attr('post-id') != data.post.id) {
                            currentEle.empty();
                            currentEle.append('<article class="postarticle"><div class="postvoteCell"><span class="vote-sum"  >' + data.post.vote_count + '</span> <span class="cVoteText">Votes</span> <a role="button" aria-label="vote ' + data.post.title + '" rel="nofollow" class="vote-button" data-vote-url="' + data.post.url + '" data-vote-html_url="' + data.post.html_url + '" data-value="null" data-selected-class="vote-voted" tabindex="0" post-id="' + data.post.id + '">Vote</a></div> <div class="postLinkCell"><a class="postLink" name="' + data.post.title + '" href="' + data.post.html_url + '">' + data.post.title + '</a> <span class="comments-count">' + data.post.comment_count + ' comments ' + '&bull; <time>' + formatDate(data.post.updated_at) + '</time></span></div></article>');

                            $('.vote-button').on('click', function(event) {
                                event.preventDefault();
                                voteHandler(event);
                            });
                            // Added the below for Enter key
                            $('.vote-button').keypress(function(event) {
                                if (event.which == 13) {
                                    event.preventDefault();
                                    voteHandler(event);
                                }
                            });
                            // Added the below for Enter key                          
                            highlightSearchText();

                        }
                    }
                    var data = localStorage.getItem("votesData");
                    data = JSON.parse(data);
                    console.log('data', data);
                    $('.vote-button').each(function() {
                        var postIdalt = $(this).attr('post-id');
                        for (var i = 0; i < data.votes.length; i++) {
                            if (data.votes[i].item_id == postIdalt) {
                                $(this).text('Voted!').addClass("vote-voted");
                                $(this).attr('aria-label', 'voted ' + $(this).attr('name'))
                            }
                        }
                    });
                }
            });
        });
    }
    $('.see-all-btn').attr('href', hostName + "/hc/en-us/search?query=" + $('#community_post_title').val());
}

function highlightSearchText() {

    var str = $("#community_post_title").val();
    var regex = new RegExp(str, "gi");
    $('.suggestion-list .postLink').each(function() {
        this.innerHTML = this.innerHTML.replace(regex, function(matched) {
            return "<span class='highlight'>" + matched + "</span>";
        });
    });
}

function formatDate(date) {

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    date = new Date(date)
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hrs = date.getHours();
    var min = date.getMinutes()
    return monthNames[monthIndex] + ' ' + day + ', ' + year + ' ' + hrs + ':' + min;
}

function getUserID() {

    var user_id;
    $("#user-menu a").each(function() {
        if ($(this).text() == "My profile") {
            var x = $(this).attr('href');
            var id = x.substring(x.lastIndexOf('/') + 1);
            user_id = id.slice(0, 12);
        }
    });
    return user_id;
}

function voteHandler(event) {

    var ele = event.target;
    var postID = $(ele).attr('post-id');
    var vote;
    if (document.getElementById("user")) {
        if ($(ele).hasClass("vote-voted")) {
            $.ajax({
                url: $(ele).attr('data-vote-html_url') + '/vote.json',
                type: "DELETE",
                data: {
                    value: 'up'
                }
            }).done(function(data) {
                vote = data.vote_sum;
                $(ele).siblings('.vote-sum').text(vote);
                $(ele).removeClass("vote-voted");
                $(ele).text('Vote');
                $(ele).attr('aria-label', 'vote ' + $(ele).attr('name'));
            });
        } else {
            $.ajax({
                url: $(ele).attr('data-vote-html_url') + '/vote.json',
                type: "POST",
                data: {
                    value: 'up'
                }
            }).done(function(data) {
                var vote = data.vote_sum;
                $(ele).siblings('.vote-sum').text(vote);
                $(ele).text('Voted!');
                $(ele).addClass("vote-voted");
                $(ele).attr('aria-label', 'voted ' + $(ele).attr('name'));
            });
        }
    }
}

/* Added the below code to show the different tags/badges for different group of users */
$(document).ready(function() {

    var assetsUsers = staff_tags;
    var support = assetsUsers.support;
    var community_team = assetsUsers.community_team;
    var feedback_moderator = assetsUsers.feedback_moderator;
    var mojang = assetsUsers.mojang;
    $('.comment-author').each(function(index) {
        var userId = $(this).children(".comment-avatar").children("div.comment-meta").children("span").children("a").attr("href").split('profiles/')[1].split('-')[0];
        if ($.inArray(userId, support) !== -1) {
            $(this).children(".comment-avatar").children("div.comment-meta").children("span").addClass('support');
        } else if ($.inArray(userId, community_team) !== -1) {
            $(this).children(".comment-avatar").children("div.comment-meta").children("span").addClass('community-team');
        } else if ($.inArray(userId, feedback_moderator) !== -1) {
            $(this).children(".comment-avatar").children("div.comment-meta").children("span").addClass('feedback-moderator');
        } else if ($.inArray(userId, mojang) !== -1) {
            $(this).children(".comment-avatar").children("div.comment-meta").children("span").addClass('mojang');
        }
    });
    if ($('.post-author').children(".post-meta").children("span").children("a").attr("href")) {
        var postAuthorId = $('.post-author').children(".post-meta").children("span").children("a").attr("href").split('profiles/')[1].split('-')[0];
        if ($.inArray(postAuthorId, support) !== -1) {
            $('.post-author').children(".post-meta").children("span").addClass('support');
        } else if ($.inArray(postAuthorId, community_team) !== -1) {
            $('.post-author').children(".post-meta").children("span").addClass('community-team');
        } else if ($.inArray(postAuthorId, feedback_moderator) !== -1) {
            $('.post-author').children(".post-meta").children("span").addClass('feedback-moderator');
        } else if ($.inArray(postAuthorId, mojang) !== -1) {
            $('.post-author').children(".post-meta").children("span").addClass('mojang');
        }
    }
});
/* Added the above code to show the different tags/badges for different group of users */

function removeDuplicateQueryParams(_href) {

    var names = _href.split('?')[1].split('&');
    var uniqueParams = [];
    console.log("names ", names);
    var myNewArray = names.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });
    var qparms = myNewArray.join('&')
    return '?' + qparms;
}
/*Accesibility fixes*/
$(document).ready(function() {

    /*$('.menu .tabSer .search-full input[type="search"]').removeAttr('id');
    $('.menu .tabSer .search-full').removeAttr('id');
    $('.menu .tabSer .search-full span').removeAttr('id');*/
    if ($('.menu-dropdown-icon.mainLi:nth-child(2) > .cardSublist').attr('id') == 'sectionList') {
        // $('.menu-dropdown-icon.mainLi:nth-child(2) > .cardSublist').removeAttr('id');
    }
    /*Accessibility Bug 722357*/
    $(".category-section").each(function() {
        var parentAriaLabel = $(this).attr("aria-label");
        $(this).find('.article-list-link').each(function() {
            $(this).attr("aria-label", parentAriaLabel + ' for ' + $(this).text());
        });
    });

    //290928 - Fix start
    //$(".userNavDdLink").attr("aria-label", $('#user .dropdown-toggle #user-name').text() + ' user dropdown collapsed');
    /*$(".userNavDdLink").on("click", function(e) {
      if ($('.userNavDdLink #user-dropdown').attr('aria-expanded') == 'true') {
        //$(this).attr("aria-label", $('#user .dropdown-toggle #user-name').text() + ' user dropdown expanded');
      }
      else 
         //$(this).attr("aria-label", $('#user .dropdown-toggle #user-name').text() + ' user dropdown collapsed');
    });*/

    $(".userNavDdLink").on("keypress", function(e) {
        var user_dropdown_status = $('#user-dropdown').attr('aria-expanded');
        if ((e.which === 13 || e.which === 32) && user_dropdown_status !== 'true') {
            $('.userNavDdLink #user-dropdown').attr('aria-expanded', 'true');
            //$(this).attr("aria-label", $('#user .dropdown-toggle #user-name').text() + ' user dropdown expanded');
        } else {
            $('.userNavDdLink #user-dropdown').attr('aria-expanded', 'false');
            //$(this).attr("aria-label", $('#user .dropdown-toggle #user-name').text() + ' user dropdown collapsed');
        }

    });
    $(".userNavDdLink .my-activities").on("keydown", function(e) {
        var user_dropdown_status = $('#user-dropdown').attr('aria-expanded');

        if ((e.shiftKey === true && e.which === 9) && user_dropdown_status !== 'false') {

            //$('.userNavDdLink #user-dropdown').attr('aria-expanded', 'false');

            //$('.userNavDdLink').attr("aria-label", $('#user .dropdown-toggle #user-name').text() + ' user dropdown collapsed');
            console.log(">>>", $('.userNavDdLink').attr('aria-label'));
        }
    });
    /*$("body").on("mouseup", function(e) {
      if (e.currentTarget != $(".userNavDdLink")  ) 
           //$(".userNavDdLink").attr("aria-label", $('#user .dropdown-toggle #user-name').text() + ' user dropdown collapsed');
    });*/
    $(".userNavDdLink").on("keyup", function(e) {
        var user_dropdown_status = $('#user-dropdown').attr('aria-expanded');
        if (e.which === 27 && user_dropdown_status !== 'false') {
            $('.userNavDdLink #user-dropdown').attr('aria-expanded', 'false');
            //$(this).attr("aria-label", $('#user .dropdown-toggle #user-name').text() + ' user dropdown collapsed');
        }
    });
    //290928 - Fix End

    // #290925 - To display the user profile nav
    // #291054 - To display the show all dropdown
    $("#filtersList").on("keypress", function(e) {
        var show_all_dropdown_status = $('#statusDrop').attr('aria-expanded');
        if (e.which === 13 && show_all_dropdown_status !== 'true') {
            $('#filtersList #statusDrop').attr('aria-expanded', 'true');
            $('#statusDrop').focus();
        } else {
            $('#filtersList #statusDrop').attr('aria-expanded', 'false');
        }
    });
    $("#filtersList").on("keyup", function(e) {
        var show_all_dropdown_status = $('#statusDrop').attr('aria-expanded');
        if (e.which === 27 && show_all_dropdown_status !== 'false') {
            $('#filtersList #statusDrop').attr('aria-expanded', 'false');
        }
    });
    // #291054 - To display the show all dropdown

    // #290923 - Skip to main
    var mainSectionElement = $("main[role='main']");
    mainSectionElement.attr('id', "mainContentBody");
    $("#uhfSkipToMain").attr('href', "#" + mainSectionElement.attr('id'));
    // #290923 - End skip to main

    // #291041 - Add the role for topic dropdown
    $('.nesty-panel').on('DOMAttrModified', function(e) {
        $('.nesty-panel ul li').attr('role', "list item")
    });
    // #291041 - End add the role for topic dropdown
    /*
    // Start of Duplicate ID issue on search box
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }
    if (isMobile === true) {
      $('.searchLi').remove();
      if ($('.tabSer').length == 0) {
        $('.menu').append('<div class="tabSer"><form role="search" class="search search-full mSearch" data-search="" data-instant="true" autocomplete="off" action="/hc/en-us/search" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓"><input type="search" name="query" id="query" placeholder="Search" autocomplete="off" aria-label="Search"></form></div>');
      }  
    } else {
      $('.tabSer').remove();
      if ($('.searchLi').length == 0) {
        $('.rightUI').append('<li class="searchLi"><form role="search" class="search search-full dSearch" data-search="" data-instant="true" autocomplete="off" action="/hc/en-us/search" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓"><input type="search" name="query" id="query" placeholder="Search" autocomplete="off" aria-label="Search"></form></li>');
      }
    }
    console.log(' ismobile ' + isMobile);
      // End of Duplicate ID issue on search box
    */
});

$(window).load(function() {
    $('#quick-search').attr('aria-label', 'search');
    $(".post-subscribe").removeAttr("aria-selected");
    $(".comment-vote").removeAttr("role");
    $('#automaticAnswers').attr('title', 'Automatic Answers');
    $('#community_post_details_ifr').attr('title', 'Community Post Details');
    //$('#detailsField').next('.form-field a.nesty-input').attr('aria-label', 'Topic');
    const collapsibleNavList = $('.collapsible-nav .collapsible-nav-list');
    collapsibleNavList.attr({
        'role': 'tablist',
        'aria-label': 'navbar list items'
    });
    collapsibleNavList.find('li').attr('role', 'tab');

    /*Accessibility Bug Fixes*/
    const userInfo = $(".user-info")[0];
    const myProfileLink = $("#user-menu").find("a[data-bi-name='my profile']")[0];
    const myActivitiesLink = $("#user-menu").find("a[data-bi-name='my activities']")[0];
    const signOutLink = $("#user-menu").find("a[data-bi-name='sign out']")[0];

    $(document).keydown(function(e) {
        var activeElement = document.activeElement;
        if (e.key === 'Escape') {
            /*720225*/
            if (activeElement.isEqualNode(userInfo) ||
                activeElement.isEqualNode(myProfileLink) ||
                activeElement.isEqualNode(myActivitiesLink) ||
                activeElement.isEqualNode(signOutLink)) {
                e.preventDefault();
                userInfo.focus();
            }
        }
    });
});

/**
});

/*End accesibility fixes*/

/* Start of Redirecting untranslated articles to EN-US */
$(document).ready(function() {
    var notDefaultLanguage = window.location.href.indexOf('/en-us/') == -1;
    var isArticle = window.location.href.indexOf('/articles/') > -1;
    var isErrorPage = $(".error-page").length > 0;
    if (isArticle && notDefaultLanguage && isErrorPage) {
        var newURL = window.location.href.replace(/(.*\/hc\/)([\w-]+)(\/.*)/, "$1en-us$3");
        window.location.href = newURL;
    }
    /*Accessibility Bug Fixes*/
    const headerSubMenuList = $(".mainLi .cardSublist");
    const mobileSearchButton = $(".searchLay");
    const mobileSearchInput = $("#query")[0];
    const mobileMenuButton = $(".menu-mobile")[0];
    const mobileFirstMenuLi = $(".leftUl li.mainLi:first-child")[0];

    $(document).keydown(function(e) {
        /*720225*/
        const lastCategoriesOption = $(".menu-item-categories>ul li:last-child a")[0];
        const lastKBOption = $(".menu-item-knowledge>ul li:last-child a")[0];
        const mobileLastMenu = $(".rightUl.show-on-mobile li.mainLi:last-child").find("a")[0];
        const mobileSecondLastMenu = $(".rightUl li.mainLi:nth-last-child(2)").find("a")[0];
        var tabbedActiveElement = document.activeElement;
        /*Tab Key*/
        if (e.key === 'Tab') {
            if (tabbedActiveElement.isEqualNode(lastCategoriesOption)) {
                $("#topicsList").hide();
            }
            if (tabbedActiveElement.isEqualNode(lastKBOption)) {
                $("#sectionList").hide();
            }
            if (tabbedActiveElement.isEqualNode(mobileMenuButton) ||
                tabbedActiveElement.isEqualNode(mobileLastMenu)) {
                mobileFirstMenuLi.focus();
            }
            if (tabbedActiveElement.isEqualNode(mobileSearchInput)) {
                $(".closeSer")[0].click();
            }
        }
        /*Esc Key*/
        if (e.key === 'Escape') {
            /*721759*/
            (function() {
                var expandedMenuCount = 0;
                headerSubMenuList.each(function(index) {
                    const subMenu = $(this);
                    if (subMenu.is(':visible')) {
                        subMenu.hide().removeClass('display-list');
                        subMenu.parent().find(':first-child').focus();
                        expandedMenuCount++;
                    }
                });
                if (expandedMenuCount == 0) {
                    mobileMenuButton.click();
                    mobileMenuButton.focus();
                }
            })();
            if (mobileSearchButton.hasClass("closeSer")) {
                mobileSearchButton.click();
                mobileSearchButton.focus();
            }
        }
        /*721766*/
        if (e.shiftKey === true && e.which === 9) {
            if (window.matchMedia("(max-width: 991px)").matches) {
                if (tabbedActiveElement.isEqualNode($("#topicData")[0])) {
                    e.preventDefault();
                    mobileMenuButton.click();
                    mobileMenuButton.focus();
                }
                if (tabbedActiveElement.isEqualNode(mobileLastMenu)) {
                    e.preventDefault();
                    setTimeout(function() {
                        mobileSecondLastMenu.focus();
                    }, 5);
                }
            }
        }
    });
});
/* End of Redirecting untranslated articles to EN-US */

// Start of Duplicate ID issue on search box
$(window).bind("load resize", function(e) {
    if (window.matchMedia("(max-width: 991px)").matches) { // The viewport is less than 991 pixels wide
        $('.searchLi').remove();
        if ($('.tabSer').length == 0) {
            $('.menu').append('<div class="tabSer"><form role="search" class="search search-full mSearch" data-search="" data-instant="true" autocomplete="off" action="/hc/en-us/search" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓"><input type="search" name="query" id="query" placeholder="Search" autocomplete="off" aria-label="Search"></form></div>');
        }
        $('#menuCategories').attr('tabindex', '0');
    } else { // The viewport is at least 991 pixels wide
        $('.tabSer').remove();
        if ($('.searchLi').length == 0) {
            $('.rightUl').append('<li class="searchLi"><form role="search" class="search search-full dSearch" data-search="" data-instant="true" autocomplete="off" action="/hc/en-us/search" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓"><input type="search" name="query" id="query" placeholder="Search" autocomplete="off" aria-label="Search"></form></li>');
        }
        $('#menuCategories').removeAttr('tabindex');
    }
});
// End of Duplicate ID issue on search box

$.ajax({
    url: 'https://' + window.location.hostname + '/api/v2/users',
    type: "GET",
    success: function(data) {
        console.log('ZD emails' + data);
    }
});