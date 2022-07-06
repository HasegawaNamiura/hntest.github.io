function init() {
    worksColCheck = !1, $ws = $(".article_slider"), setsize(), workSlider(), wsSetImg(), map_init();
    $(".thisiscontactpage").length ? $html.addClass("contact") : $html.removeClass("contact");
    home = $(".index_poster").length, home && jumpFirstimg()
}

function deviceFromSize() {
    windowWidth > 768 ? (device = "pc", $scr = $(window)) : windowWidth > 480 ? (device = "tablet", $scr = $(".scrollarea")) : (device = "mobile", $scr = $(".scrollarea"))
}

function setsize() {
    windowWidth = $(window).width(), windowHeight = $(window).height(), headerHeight = $(".header").height(), deviceFromSize(), $(".poster").height(windowHeight), $(".poster_half").height(windowHeight / 2);
    var e = categoryCols;
    categoryCols = windowWidth > listPoint ? 4 : 3, e != categoryCols && (worksColCheck = !1);
    var t = $(".category_workslist li:not(.rest_box)").length;
    if (!worksColCheck && "pc" === device) {
        var n = categoryCols - t % categoryCols;
        if ($(".rest_box").remove(), n != categoryCols)
            for (var i = n; i > 0; i--) $(".category_workslist .workslist").append('<li class="rest_box"><span><img src="/wp/wp-content/themes/plantica/common/img/blank_rest.png" width="480" height="400" alt="" /><div class="workslist_label" />');
        worksColCheck = !0
    }
    $(".category_thumbnails").each(function(e, t) {
        var n = e % categoryCols;
        $(t).parents("li").removeClass(function(e, t) {
            return (t.match(/\load_delay\S+/g) || []).join(" ")
        }).addClass("load_delay" + n)
    }), $(".exhibition_clear").remove(), "pc" === device ? $(".exhibition_list li:nth-child(3n)").after('<span class="exhibition_clear" />') : $(".exhibition_list li:nth-child(2n)").after('<span class="exhibition_clear" />'), $spMenu.css({
        height: windowHeight,
        width: windowWidth,
        top: -windowHeight / 2,
        left: -windowWidth / 2
    })
}

function load() {
    function e() {
        $(".loader").css({
            display: "transparent",
            width: 0,
            height: 0
        }), setTimeout(function() {
            loadCompleteFunc(), $html.removeClass("loading").addClass("loaded"), setTimeout(function() {
                $html.removeClass("loaded")
            }, 1e3)
        }, 200)
    }
    var t = new createjs.LoadQueue,
        n = [];
    $("img").each(function(e, t) {
        n.push($(t).attr("src"))
    }), $(".countBG").each(function(e, t) {
        var i = $(t).css("background-image").replace(/(url\(|\)|")/g, "");
        n.push(i), $(t).removeClass("countBG")
    }), t.loadManifest(n, !0), t.addEventListener("progress", handleProgress), t.addEventListener("complete", e)
}

function handleProgress(e) {
    var t = e.progress;
    $(".hdbar").removeClass("notrans").width(100 * t + "%")
}

function loadCompleteFunc() {
    $fadeElems.velocity({
        opacity: 1
    }, {
        duration: 300
    }), $hdInner.velocity({
        opacity: 1,
        translateY: 0
    }, {
        duration: 300,
        delay: 300
    }), pjaxflag = !1, worksImgLoad(), delayInSetting(), $(".mask_block").velocity({
        opacity: 1,
        translateY: 0
    }, 400)
}

function scrollFunc() {
    scrollVal = $scr.scrollTop(), headerScr(scrollVal), stopscroll && $scr.scrollTop(stopscrollPos), "pc" === device && bgPlx(scrollVal), delayIn(scrollVal)
}

function bgPlx(e) {
    $(".about_service, .about_exhibition").each(function(t, n) {
        var i = $(n).data("offset"),
            r = $(n).height(),
            o = e + windowHeight > i,
            a = i + windowHeight > e,
            s = (e + windowHeight - i) / r,
            l = 75 * s + 25;
        o && a && $(n).css({
            "background-position": "50% " + l + "%"
        })
    }), $(".about_poster, .about_philosophy").each(function(t, n) {
        var i = $(n).data("offset"),
            r = $(n).height(),
            o = e + windowHeight > i,
            a = i + windowHeight > e,
            s = (e + windowHeight - i) / r,
            l = 50 * s - 50;
        o && a && l > 0 && 100 >= l && $(n).css({
            "background-position": "50% 100" - l + "%"
        })
    })
}

function delayInSetting() {
    $(".dlin").children().height(""), $(".dlin").each(function(e, t) {
        var n = $(t).children().height();
        $(t).parent().height(n), $(t).children().height(n), $(t).closest(".dlin_holder").attr({
            "data-offset": $(this).offset().top - n
        })
    }), $(".dlfd").each(function(e, t) {
        $(t).attr(home ? {
            "data-offset": $(this).offset().top - windowHeight
        } : {
            "data-offset": $(this).offset().top
        })
    }), "pc" === device && $(".about_service, .about_exhibition, .about_poster, .about_philosophy").each(function(e, t) {
        $(t).attr({
            "data-offset": $(this).offset().top
        })
    }), delayIn(scrollVal), "pc" === device && bgPlx(scrollVal)
}

function delayIn(e) {
    $(".dlin_holder").each(function(t, n) {
        var i = $(n).data("offset");
        e + windowHeight - 50 > i && $(n).addClass("-o")
    }), $(".dlfd").each(function(t, n) {
        var i = $(n).data("offset");
        e + windowHeight > i && $(n).addClass("-o")
    })
}

function headerScr(e) {
    var t = $("html");
    e > 130 ? t.addClass("hdfixon") : 0 >= e ? t.removeClass("hdfixon") : t.is(".pageUp") || t.removeClass("hdfixon")
}

function worksImgLoad() {
    $(".category_thumbnails").lazyload("pc" != device ? {
        container: $(".scrollarea"),
        load: function() {
            var e = $(this),
                t = imagesLoaded(e);
            t.on("done", function() {
                e.parents("li").addClass("loaded")
            })
        }
    } : {
        load: function() {
            var e = $(this),
                t = imagesLoaded(e);
            t.on("done", function() {
                e.parents("li").addClass("loaded")
            })
        }
    })
}

function workSlider() {
    function e() {
        $(".slidenav > ul").empty();
        for (var e = 0; wsPageLen > e; e++) $(".slidenav > ul").append('<li class="slidenav_page" data-page="' + e + '" ><span />');
        $(".slidenav_page").css({
            "max-width": 100 / wsPageLen + "%"
        }), checkCur = $(".pages_current .num").text(), "1" === checkCur ? $(".slidenav_page").first().addClass("current") : $(".slidenav_page").eq(checkCur - 1).addClass("current"), $(".slidenav").thumbnailSlider(), $(".slidenav_page").on("click", function() {
            var e = wsNum - $(this).data("page");
            if (wsNum = $(this).data("page"), i(wsNum, e), t(wsNum), wsHeight >= windowHeight) {
                var n = $ws.offset().top;
                $("html, body").velocity("scroll", {
                    duration: 600,
                    offset: n
                })
            }
        })
    }

    function t(e) {
        $_wsText_CUR.text(e + 1)
    }

    function i(e, t) {
        if ($html.is(".playvideo")) {
            for (n = 0; vidLen > n; n++) player[n].pauseVideo();
            $html.removeClass("playvideo")
        }
        $_wsPage.removeClass("next_page prev_page current_page"), t > 0 && $_wsCurr.addClass("jump_prev"), 0 > t && $_wsCurr.addClass("jump_next"), $_wsCurr = $_wsPage.eq(e).addClass("current_page"), $(".slidenav_page").eq(e).addClass("current").siblings().removeClass("current"), $_wsCurr.nextAll(".slide_page").velocity("stop").velocity({
            width: "100%"
        }, {
            duration: 600,
            easing: [.77, 0, .175, 1]
        }).find("img").velocity("stop").velocity({
            translateX: "20%"
        }, {
            duration: 600,
            easing: [.77, 0, .175, 1]
        }), $_wsCurr.prevAll(".slide_page").velocity("stop").velocity({
            width: 0
        }, {
            duration: 600,
            easing: [.77, 0, .175, 1]
        }).find("img").velocity("stop").velocity({
            translateX: "-20%"
        }, {
            duration: 600,
            easing: [.77, 0, .175, 1]
        }), $_wsCurr.velocity("stop").velocity({
            width: "100%"
        }, {
            duration: 600,
            easing: [.77, 0, .175, 1]
        }).find("img").velocity("stop").velocity({
            translateX: "0"
        }, {
            duration: 600,
            easing: [.77, 0, .175, 1]
        }), setTimeout(function() {
            $_wsPage.removeClass("jump_next jump_prev")
        }, 400), $_wsCurr.next(".slide_page").addClass("next_page"), $_wsCurr.prev(".slide_page").addClass("prev_page")
    }
    if ($(".slide_holder").length) wsSetsize(), ws_pending = !1, $_wsPage = $(".slide_page"), $_wsHolder = $(".slide_holder"), $_wsCurr = $(".current_page"), $_wsCursor = $(".navigator"), $_wsText_ALL = $(".pages_all .num"), $_wsText_CUR = $(".pages_current .num"), wsPageLen = $(".slide_page").length, $_wsText_ALL.text(wsPageLen), wsNum = $_wsCurr.index();
    else {
        if ($ws.find("li").each(function(e, t) {
                var n = $(t);
                n.addClass("slide_page"), n.wrapInner('<div class="slide_holder" />')
            }), wsSetsize(), ws_pending = !1, $_wsPage = $(".slide_page"), $_wsHolder = $(".slide_holder"), $_wsCurr = $_wsPage.first().addClass("current_page"), $_wsCursor = $(".navigator"), $_wsText_ALL = $(".pages_all .num"), $_wsText_CUR = $(".pages_current .num"), wsPageLen = $(".slide_page").length, $_wsText_ALL.text(wsPageLen), wsNum = $_wsCurr.index(), 1 >= wsPageLen) return void $ws.addClass("singlemode");
        $_wsCurr.nextAll(".slide_page").find("img").velocity({
            translateX: "20%"
        }, 10)
    }
    $(".slidepanel, .navigator").on("click", function(e) {
        if (!ws_pending) {
            ws_pending = !0;
            var n = e.pageX;
            return n > dirNextArea && (wsNum++, wsNum >= wsPageLen && (wsNum -= 2), wsNum >= wsPageLen - 1 ? $html.removeClass("dirNext").addClass("dirPrev") : $html.removeClass("dirPrev").addClass("dirNext"), i(wsNum, 0)), dirPrevArea > n && (wsNum--, 0 > wsNum && (wsNum += 2), 1 > wsNum ? $html.removeClass("dirPrev").addClass("dirNext") : $html.removeClass("dirNext").addClass("dirPrev"), i(wsNum, 0)), t(wsNum), setTimeout(function() {
                ws_pending = !1
            }, 500), !1
        }
    }), t(wsNum), e(), $("img", $_wsHolder).on({
        mouseover: function() {
            $_wsCursor.addClass("invert")
        },
        mouseleave: function() {
            $_wsCursor.removeClass("invert")
        }
    }), $(".video_mask", $_wsHolder).on({
        mouseover: function() {
            $_wsCursor.addClass("invert").show()
        },
        mouseleave: function() {
            $_wsCursor.hide()
        }
    }), $ws.on({
        mousemove: function(e) {
            var t = $(this).offset().top,
                n = e.pageX,
                i = e.pageY;
            $_wsCursor.css({
                top: i - t,
                left: n - 5
            }), ws_pending || (n >= dirNextArea && wsNum != wsPageLen - 1 || 0 === wsNum ? $html.addClass("dirNext") : $html.removeClass("dirNext"), dirPrevArea >= n && 0 != wsNum || wsNum === wsPageLen - 1 ? $html.addClass("dirPrev") : $html.removeClass("dirPrev"))
        },
        mouseleave: function() {
            $html.removeClass("dirNext dirPrev")
        }
    })
}

function wsSetsize() {
    "pc" === device ? (wsWidth = windowWidth, wsHeight = windowWidth / 16 * 9, $ws.height(wsHeight), $(".slide_holder").width(wsWidth), dirNextArea = wsWidth / 2, dirPrevArea = wsWidth / 2) : (wsHeight = windowWidth / 14 * 9, wsWidth = .8 * windowWidth, $ws.height(wsHeight), $(".article_slider").perfectScrollbar({
        wheelSpeed: 10
    }))
}

function wsSetImg() {
    "pc" === device && $(".slide_holder img").each(function(e, t) {
        var n = $(t).data("mode"),
            i = $(t).data("wd"),
            r = $(t).data("hg"),
            o = slideimgMt = 0;
        "full" != n ? (o = windowWidth / i * r, slideimgMt = (o - wsHeight) / 2, $(t).css({
            top: -slideimgMt + "px"
        })) : r + 40 >= wsHeight || (slideimgMt = (r + 40 - wsHeight) / 2, $(t).css({
            top: -slideimgMt + "px"
        })), $(t).css({
            top: -slideimgMt + "px"
        })
    })
}

function wsResetImg() {
    "pc" === device ? $(".slide_holder img").each(function(e, t) {
        var n = $(t).innerHeight(),
            i = (n - wsHeight) / 2;
        $(t).css({
            top: -i + "px"
        })
    }) : $(".slide_holder img").css({
        top: ""
    })
}

function createVideo() {
    for (vidLen = $(".video").length, i = 0; vidLen > i; i++) player[i] = new YT.Player("player" + i, {
        width: 160,
        height: 90,
        videoId: $(".video").eq(i).data("yid"),
        playerVars: {
            showinfo: 0,
            autohide: 1,
            rel: 0,
            loop: 1,
            color: "white"
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    })
}

function onPlayerReady(e) {
    e.target.setVolume(20)
}

function onPlayerStateChange(e) {
    switch (e.data) {
        case YT.PlayerState.ENDED:
        case YT.PlayerState.PAUSED:
            $html.removeClass("playvideo");
            break;
        case YT.PlayerState.CUED:
        case YT.PlayerState.PLAYING:
        case YT.PlayerState.BUFFERING:
        default:
            $html.addClass("playvideo")
    }
}

function jumpFirstimg() {
    function e() {
        return !noscroll || ie || safari || $scr.scrollTop(0), isAnimating ? !1 : (delayIn(scrollVal), void setTimeout(function() {
            homeScrollVal = $scr.scrollTop(), 0 >= homeScrollVal && isRevealed && t(0), homeScrollVal >= 0 && !isRevealed && t(1)
        }, 100))
    }

    function t(e) {
        isAnimating = !0, e ? pullContainer.addClass("modify") : (noscroll = !0, disable_scroll(), pullContainer.removeClass("modify")), setTimeout(function() {
            isAnimating = !1, e ? (noscroll = !1, enable_scroll(), isRevealed = !0, $(".category_thumbnails").lazyload({
                container: $(".scrollarea"),
                load: function() {
                    var e = $(this),
                        t = imagesLoaded(e);
                    t.on("done", function() {
                        e.parents("li").addClass("loaded")
                    })
                }
            })) : isRevealed = !1
        }, 1200)
    }
    pullContainer = $(".pull_page_container"), pullTrigger = $(".trigger_mask, .pull_trigger"), poster = $(".index_poster"), isRevealed = isAnimating = !1, noscroll = !0, disable_scroll(), homeScrollVal = $scr.scrollTop(), homeScrollVal > 1 && t(1), $scr.on("scroll touchmove", function() {
        home && e()
    }), $scr.on("mousewheel", function(t) {
        home && (t.deltaY > 30 || t.deltaY < 0) && e()
    }), pullTrigger.on("click", function() {
        e()
    })
}

function preventDefault(e) {
    e = e || window.event, e.preventDefault && e.preventDefault(), e.returnValue = !1
}

function touchmove(e) {
    preventDefault(e)
}

function disable_scroll() {
    window.onmousewheel = document.onmousewheel, document.body.ontouchmove = touchmove
}

function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.body.ontouchmove = null
}

function map_init() {
    var e, t, n = new google.maps.Geocoder,
        i = $(".map_address").val();
    n && n.geocode({
        address: i
    }, function(n, r) {
        if (r == google.maps.GeocoderStatus.OK)
            for (var o in n)
                if (n[o].geometry) {
                    var a = n[o].geometry.location;
                    e = a.lat(), t = a.lng(), drawmap(i, e, t)
                }
    })
}

function drawmap(e, t, n) {
    var i, r = new google.maps.LatLng(t + .005, n),
        o = new google.maps.LatLng(t, n),
        a = "cool",
        s = [{
            stylers: [{
                saturation: -100
            }, {
                visibility: "simplified"
            }, {
                gamma: 1.91
            }]
        }, {
            elementType: "labels.icon",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            elementType: "labels.text",
            stylers: [{
                visibility: "simplified"
            }, {
                color: "#aaaaaa"
            }]
        }, {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "poi.business",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit.station",
            stylers: [{
                visibility: "off"
            }, {
                saturation: -100
            }]
        }];
    if ("pc" != device) var l = {
        zoom: 13,
        center: r,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, a]
        },
        mapTypeId: a,
        mapTypeControl: !1,
        zoomControl: !1,
        scrollwheel: !1,
        streetViewControl: !1,
        draggable: !1
    };
    else var l = {
        zoom: 13,
        center: r,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, a]
        },
        mapTypeId: a,
        mapTypeControl: !1,
        zoomControl: !1,
        scrollwheel: !1,
        streetViewControl: !1
    };
    i = new google.maps.Map(document.getElementById("map"), l);
    var c = {
            name: "sample"
        },
        u = new google.maps.StyledMapType(s, c);
    if (i.mapTypes.set(a, u), "mobile" != device) var d = {
        url: "/wp/wp-content/themes/plantica/common/img/map_pin.png",
        size: new google.maps.Size(446, 198),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(112, 99),
        scaledSize: new google.maps.Size(233, 99)
    };
    else var d = {
        url: "/wp/wp-content/themes/plantica/common/img/map_pin.png",
        size: new google.maps.Size(446, 376),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(80, 71),
        scaledSize: new google.maps.Size(160, 71)
    };
    var p = new google.maps.Marker({
        position: o,
        map: i,
        icon: d
    });
    google.maps.event.addListener(p, "click", function() {
        window.open("https://www.google.co.jp/maps/place/" + e)
    })
}

function getUA() {
    var e = window.navigator.userAgent.toLowerCase(),
        t = window.navigator.appVersion.toLowerCase();
    if (e.indexOf("msie") > -1) {
        if (ie = !0, t.indexOf("msie 6.0") > -1) return ieAlert(), "ie ie6";
        if (t.indexOf("msie 7.0") > -1) return ieAlert(), "ie ie7";
        if (t.indexOf("msie 8.0") > -1) return ieAlert(), "ie ie8";
        if (t.indexOf("msie 9.0") > -1) return "ie ie9";
        if (t.indexOf("msie 10.0") > -1) return "ie ie10"
    } else {
        if (-1 != e.indexOf("Trident/")) {
            ie = !0;
            var n = e.indexOf("rv:");
            return rv = parseInt(e.substring(n + 3, e.indexOf(".", e.indexOf("rv:"))), 10), "ie ie11"
        }
        if (-1 != e.indexOf("chrome")) return "chrome";
        if (-1 != e.indexOf("safari")) return safari = !0, "safari";
        if (-1 != e.indexOf("firefox")) return "firefox";
        if (-1 != e.indexOf("opera")) return "opera"
    }
}

function ieAlert() {
    $(".scrollarea").prepend('<div class="iealert"><div class="page_head_box"><div class="inner"><h2>Your Internet Explorer is out of date.</h2><div>ã“ã®ã‚µã‚¤ãƒˆã¯ã”ä½¿ç”¨ã®ãƒ–ãƒ©ã‚¦ã‚¶ã«ã¯å¯¾å¿œã—ã¦ãŠã‚Šã¾ã›ã‚“ã€‚<br/>ã‚µã‚¤ãƒˆã‚’æ­£ã—ãè¡¨ç¤ºã™ã‚‹ã«ã¯ã€ãƒ–ãƒ©ã‚¦ã‚¶ã‚’ã‚¢ãƒƒãƒ—ã‚°ãƒ¬ãƒ¼ãƒ‰ã™ã‚‹ã‹ã€Chromeã¾ãŸã¯Firefoxã§é–²è¦§ã—ã¦ãã ã•ã„ã€‚<div class="browser_download"><ul><li><a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank">æœ€æ–°ã®Internet Explorerã¸ã‚¢ãƒƒãƒ—ã‚°ãƒ¬ãƒ¼ãƒ‰</a></li><li><a href="https://www.google.co.jp/chrome/browser/desktop/" target="_blank">æœ€æ–°ã®Chromeã‚’ãƒ€ã‚¦ãƒ³ãƒ­ãƒ¼ãƒ‰</a></li><li><a href="https://www.mozilla.org/ja/firefox/new/" target="_blank">æœ€æ–°ã®Firefoxã‚’ãƒ€ã‚¦ãƒ³ãƒ­ãƒ¼ãƒ‰</a> ')
}! function(e) {
    function t(t, i, r) {
        var o = this;
        return this.on("click.pjax", t, function(t) {
            var a = e.extend({}, p(i, r));
            a.container || (a.container = e(this).attr("data-pjax") || o), n(t, a)
        })
    }

    function n(t, n, i) {
        i = p(n, i);
        var o = t.currentTarget;
        if ("A" !== o.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || location.protocol !== o.protocol || location.hostname !== o.hostname || o.hash && o.href.replace(o.hash, "") === location.href.replace(location.hash, "") || o.href === location.href + "#" || t.isDefaultPrevented())) {
            var a = {
                    url: o.href,
                    container: e(o).attr("data-pjax"),
                    target: o
                },
                s = e.extend({}, a, i),
                l = e.Event("pjax:click");
            e(o).trigger(l, [s]), l.isDefaultPrevented() || (r(s), t.preventDefault(), e(o).trigger("pjax:clicked", [s]))
        }
    }

    function i(t, n, i) {
        i = p(n, i);
        var o = t.currentTarget;
        if ("FORM" !== o.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
        var a = {
            type: o.method.toUpperCase(),
            url: o.action,
            container: e(o).attr("data-pjax"),
            target: o
        };
        if ("GET" !== a.type && void 0 !== window.FormData) a.data = new FormData(o), a.processData = !1, a.contentType = !1;
        else {
            if (e(o).find(":file").length) return;
            a.data = e(o).serializeArray()
        }
        r(e.extend({}, a, i)), t.preventDefault()
    }

    function r(t) {
        function n(t, n, r) {
            r || (r = {}), r.relatedTarget = i;
            var o = e.Event(t, r);
            return s.trigger(o, n), !o.isDefaultPrevented()
        }
        t = e.extend(!0, {}, e.ajaxSettings, r.defaults, t), e.isFunction(t.url) && (t.url = t.url());
        var i = t.target,
            o = d(t.url).hash,
            s = t.context = f(t.container);
        t.data || (t.data = {}), t.data._pjax = s.selector;
        var l;
        t.beforeSend = function(e, i) {
            return "GET" !== i.type && (i.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", s.selector), n("pjax:beforeSend", [e, i]) ? (i.timeout > 0 && (l = setTimeout(function() {
                n("pjax:timeout", [e, t]) && e.abort("timeout")
            }, i.timeout), i.timeout = 0), void(t.requestUrl = d(i.url).href)) : !1
        }, t.complete = function(e, i) {
            l && clearTimeout(l), n("pjax:complete", [e, i, t]), n("pjax:end", [e, t])
        }, t.error = function(e, i, r) {
            var o = m("", e, t),
                s = n("pjax:error", [e, i, r, t]);
            "GET" == t.type && "abort" !== i && s && a(o.url)
        }, t.success = function(i, l, u) {
            var p = r.state,
                f = "function" == typeof e.pjax.defaults.version ? e.pjax.defaults.version() : e.pjax.defaults.version,
                h = u.getResponseHeader("X-PJAX-Version"),
                g = m(i, u, t);
            if (f && h && f !== h) return void a(g.url);
            if (!g.contents) return void a(g.url);
            r.state = {
                id: t.id || c(),
                url: g.url,
                title: g.title,
                container: s.selector,
                fragment: t.fragment,
                timeout: t.timeout
            }, (t.push || t.replace) && window.history.replaceState(r.state, g.title, g.url);
            try {
                document.activeElement.blur()
            } catch (y) {}
            g.title && (document.title = g.title), n("pjax:beforeReplace", [g.contents, t], {
                state: r.state,
                previousState: p
            }), s.html(g.contents);
            var w = s.find("input[autofocus], textarea[autofocus]").last()[0];
            if (w && document.activeElement !== w && w.focus(), v(g.scripts), "number" == typeof t.scrollTo && e(window).scrollTop(t.scrollTo), "" !== o) {
                var b = d(g.url);
                b.hash = o, r.state.url = b.href, window.history.replaceState(r.state, g.title, b.href);
                var x = e(b.hash);
                x.length && e(window).scrollTop(x.offset().top)
            }
            n("pjax:success", [i, l, u, t])
        }, r.state || (r.state = {
            id: c(),
            url: window.location.href,
            title: document.title,
            container: s.selector,
            fragment: t.fragment,
            timeout: t.timeout
        }, window.history.replaceState(r.state, document.title));
        var p = r.xhr;
        p && p.readyState < 4 && (p.onreadystatechange = e.noop, p.abort()), r.options = t;
        var p = r.xhr = e.ajax(t);
        return p.readyState > 0 && (t.push && !t.replace && (y(r.state.id, s.clone().contents()), window.history.pushState(null, "", u(t.requestUrl))), n("pjax:start", [p, t]), n("pjax:send", [p, t])), r.xhr
    }

    function o(t, n) {
        var i = {
            url: window.location.href,
            push: !1,
            replace: !0,
            scrollTo: !1
        };
        return r(e.extend(i, p(t, n)))
    }

    function a(e) {
        window.history.replaceState(null, "", "#"), window.location.replace(e)
    }

    function s(t) {
        var n = r.state,
            i = t.state;
        if (i && i.container) {
            if (T && C == i.url) return;
            if (r.state && r.state.id === i.id) return;
            var o = e(i.container);
            if (o.length) {
                var s, l = A[i.id];
                r.state && (s = r.state.id < i.id ? "forward" : "back", w(s, r.state.id, o.clone().contents()));
                var c = e.Event("pjax:popstate", {
                    state: i,
                    direction: s
                });
                o.trigger(c);
                var u = {
                    id: i.id,
                    url: i.url,
                    container: o,
                    push: !1,
                    fragment: i.fragment,
                    timeout: i.timeout,
                    scrollTo: !1
                };
                if (l) {
                    o.trigger("pjax:start", [null, u]), r.state = i, i.title && (document.title = i.title);
                    var d = e.Event("pjax:beforeReplace", {
                        state: i,
                        previousState: n
                    });
                    o.trigger(d, [l, u]), o.html(l), o.trigger("pjax:end", [null, u])
                } else r(u);
                o[0].offsetHeight
            } else a(location.href)
        }
        T = !1
    }

    function l(t) {
        var n = e.isFunction(t.url) ? t.url() : t.url,
            i = t.type ? t.type.toUpperCase() : "GET",
            r = e("<form>", {
                method: "GET" === i ? "GET" : "POST",
                action: n,
                style: "display:none"
            });
        "GET" !== i && "POST" !== i && r.append(e("<input>", {
            type: "hidden",
            name: "_method",
            value: i.toLowerCase()
        }));
        var o = t.data;
        if ("string" == typeof o) e.each(o.split("&"), function(t, n) {
            var i = n.split("=");
            r.append(e("<input>", {
                type: "hidden",
                name: i[0],
                value: i[1]
            }))
        });
        else if ("object" == typeof o)
            for (key in o) r.append(e("<input>", {
                type: "hidden",
                name: key,
                value: o[key]
            }));
        e(document.body).append(r), r.submit()
    }

    function c() {
        return (new Date).getTime()
    }

    function u(e) {
        return e.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "")
    }

    function d(e) {
        var t = document.createElement("a");
        return t.href = e, t
    }

    function p(t, n) {
        return t && n ? n.container = t : n = e.isPlainObject(t) ? t : {
            container: t
        }, n.container && (n.container = f(n.container)), n
    }

    function f(t) {
        if (t = e(t), t.length) {
            if ("" !== t.selector && t.context === document) return t;
            if (t.attr("id")) return e("#" + t.attr("id"));
            throw "cant get selector for pjax container!"
        }
        throw "no pjax container for " + t.selector
    }

    function h(e, t) {
        return e.filter(t).add(e.find(t))
    }

    function g(t) {
        return e.parseHTML(t, document, !0)
    }

    function m(t, n, i) {
        var r = {};
        if (r.url = u(n.getResponseHeader("X-PJAX-URL") || i.requestUrl), /<html/i.test(t)) var o = e(g(t.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),
            a = e(g(t.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
        else var o = a = e(g(t));
        if (0 === a.length) return r;
        if (r.title = h(o, "title").last().text(), i.fragment) {
            if ("body" === i.fragment) var s = a;
            else var s = h(a, i.fragment).first();
            s.length && (r.contents = s.contents(), r.title || (r.title = s.attr("title") || s.data("title")))
        } else /<html/i.test(t) || (r.contents = a);
        return r.contents && (r.contents = r.contents.not(function() {
            return e(this).is("title")
        }), r.contents.find("title").remove(), r.scripts = h(r.contents, "script[src]").remove(), r.contents = r.contents.not(r.scripts)), r.title && (r.title = e.trim(r.title)), r
    }

    function v(t) {
        if (t) {
            var n = e("script[src]");
            t.each(function() {
                var t = this.src,
                    i = n.filter(function() {
                        return this.src === t
                    });
                if (!i.length) {
                    var r = document.createElement("script"),
                        o = e(this).attr("type");
                    o && (r.type = o), r.src = e(this).attr("src"), document.head.appendChild(r)
                }
            })
        }
    }

    function y(e, t) {
        A[e] = t, _.push(e), b(k, 0), b(_, r.defaults.maxCacheLength)
    }

    function w(e, t, n) {
        var i, o;
        A[t] = n, "forward" === e ? (i = _, o = k) : (i = k, o = _), i.push(t), (t = o.pop()) && delete A[t], b(i, r.defaults.maxCacheLength)
    }

    function b(e, t) {
        for (; e.length > t;) delete A[e.shift()]
    }

    function x() {
        return e("meta").filter(function() {
            var t = e(this).attr("http-equiv");
            return t && "X-PJAX-VERSION" === t.toUpperCase()
        }).attr("content")
    }

    function S() {
        e.fn.pjax = t, e.pjax = r, e.pjax.enable = e.noop, e.pjax.disable = $, e.pjax.click = n, e.pjax.submit = i, e.pjax.reload = o, e.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: x
        }, e(window).on("popstate.pjax", s)
    }

    function $() {
        e.fn.pjax = function() {
            return this
        }, e.pjax = l, e.pjax.enable = S, e.pjax.disable = e.noop, e.pjax.click = e.noop, e.pjax.submit = e.noop, e.pjax.reload = function() {
            window.location.reload()
        }, e(window).off("popstate.pjax", s)
    }
    var T = !0,
        C = window.location.href,
        P = window.history.state;
    P && P.container && (r.state = P), "state" in window.history && (T = !1);
    var A = {},
        k = [],
        _ = [];
    e.inArray("state", e.event.props) < 0 && e.event.props.push("state"), e.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/), e.support.pjax ? S() : $()
}(jQuery), ! function(e, t, n, i) {
    var r = e(t);
    e.fn.lazyload = function(o) {
        function a() {
            var t = 0;
            l.each(function() {
                var n = e(this);
                if (!c.skip_invisible || n.is(":visible"))
                    if (e.abovethetop(this, c) || e.leftofbegin(this, c));
                    else if (e.belowthefold(this, c) || e.rightoffold(this, c)) {
                    if (++t > c.failure_limit) return !1
                } else n.trigger("appear"), t = 0
            })
        }
        var s, l = this,
            c = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: t,
                data_attribute: "original",
                skip_invisible: !1,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return o && (i !== o.failurelimit && (o.failure_limit = o.failurelimit, delete o.failurelimit), i !== o.effectspeed && (o.effect_speed = o.effectspeed, delete o.effectspeed), e.extend(c, o)), s = c.container === i || c.container === t ? r : e(c.container), 0 === c.event.indexOf("scroll") && s.bind(c.event, function() {
            return a()
        }), this.each(function() {
            var t = this,
                n = e(t);
            t.loaded = !1, (n.attr("src") === i || n.attr("src") === !1) && n.is("img") && n.attr("src", c.placeholder), n.one("appear", function() {
                if (!this.loaded) {
                    if (c.appear) {
                        var i = l.length;
                        c.appear.call(t, i, c)
                    }
                    e("<img />").bind("load", function() {
                        var i = n.attr("data-" + c.data_attribute);
                        n.hide(), n.is("img") ? n.attr("src", i) : n.css("background-image", "url('" + i + "')"), n[c.effect](c.effect_speed), t.loaded = !0;
                        var r = e.grep(l, function(e) {
                            return !e.loaded
                        });
                        if (l = e(r), c.load) {
                            var o = l.length;
                            c.load.call(t, o, c)
                        }
                    }).attr("src", n.attr("data-" + c.data_attribute))
                }
            }), 0 !== c.event.indexOf("scroll") && n.bind(c.event, function() {
                t.loaded || n.trigger("appear")
            })
        }), r.bind("resize", function() {
            a()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && r.bind("pageshow", function(t) {
            t.originalEvent && t.originalEvent.persisted && l.each(function() {
                e(this).trigger("appear")
            })
        }), e(n).ready(function() {
            a()
        }), this
    }, e.belowthefold = function(n, o) {
        var a;
        return a = o.container === i || o.container === t ? (t.innerHeight ? t.innerHeight : r.height()) + r.scrollTop() : e(o.container).offset().top + e(o.container).height(), a <= e(n).offset().top - o.threshold
    }, e.rightoffold = function(n, o) {
        var a;
        return a = o.container === i || o.container === t ? r.width() + r.scrollLeft() : e(o.container).offset().left + e(o.container).width(), a <= e(n).offset().left - o.threshold
    }, e.abovethetop = function(n, o) {
        var a;
        return a = o.container === i || o.container === t ? r.scrollTop() : e(o.container).offset().top, a >= e(n).offset().top + o.threshold + e(n).height()
    }, e.leftofbegin = function(n, o) {
        var a;
        return a = o.container === i || o.container === t ? r.scrollLeft() : e(o.container).offset().left, a >= e(n).offset().left + o.threshold + e(n).width()
    }, e.inviewport = function(t, n) {
        return !(e.rightoffold(t, n) || e.leftofbegin(t, n) || e.belowthefold(t, n) || e.abovethetop(t, n))
    }, e.extend(e.expr[":"], {
        "below-the-fold": function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        "above-the-top": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-screen": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-screen": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        },
        "in-viewport": function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        },
        "above-the-fold": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-fold": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-fold": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document),
function() {
    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    var i = e.prototype,
        r = this,
        o = r.EventEmitter;
    i.getListeners = function(e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function(e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function(e, n) {
        var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n,
            once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function(e) {
        return this.getListeners(e), this
    }, i.defineEvents = function(e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function(e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function(e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            a = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : a.call(this, i, r));
        return this
    }, i.removeEvent = function(e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
        var n, i, r, o, a = this.getListenersAsObject(e);
        for (r in a)
            if (a.hasOwnProperty(r))
                for (i = a[r].length; i--;) n = a[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, e.noConflict = function() {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}.call(this),
    function(e) {
        function t(t) {
            var n = e.event;
            return n.target = n.target || n.srcElement || t, n
        }
        var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(e, t, n) {
            e.addEventListener(t, n, !1)
        } : n.attachEvent && (i = function(e, n, i) {
            e[n + i] = i.handleEvent ? function() {
                var n = t(e);
                i.handleEvent.call(i, n)
            } : function() {
                var n = t(e);
                i.call(e, n)
            }, e.attachEvent("on" + n, e[n + i])
        });
        var r = function() {};
        n.removeEventListener ? r = function(e, t, n) {
            e.removeEventListener(t, n, !1)
        } : n.detachEvent && (r = function(e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (i) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: i,
            unbind: r
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
            return t(e, n, i)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(window, function(e, t, n) {
        function i(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function r(e) {
            return "[object Array]" === p.call(e)
        }

        function o(e) {
            var t = [];
            if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function a(e, t, n) {
            if (!(this instanceof a)) return new a(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), c && (this.jqDeferred = new c.Deferred);
            var r = this;
            setTimeout(function() {
                r.check()
            })
        }

        function s(e) {
            this.img = e
        }

        function l(e) {
            this.src = e, f[e] = this
        }
        var c = e.jQuery,
            u = e.console,
            d = void 0 !== u,
            p = Object.prototype.toString;
        a.prototype = new t, a.prototype.options = {}, a.prototype.getImages = function() {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                var i = n.nodeType;
                if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, a = r.length; a > o; o++) {
                        var s = r[o];
                        this.addImage(s)
                    }
            }
        }, a.prototype.addImage = function(e) {
            var t = new s(e);
            this.images.push(t)
        }, a.prototype.check = function() {
            function e(e, r) {
                return t.options.debug && d && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
            }
            var t = this,
                n = 0,
                i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return void this.complete();
            for (var r = 0; i > r; r++) {
                var o = this.images[r];
                o.on("confirm", e), o.check()
            }
        }, a.prototype.progress = function(e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function() {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, a.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function() {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, c && (c.fn.imagesLoaded = function(e, t) {
            var n = new a(this, e, t);
            return n.jqDeferred.promise(c(this))
        }), s.prototype = new t, s.prototype.check = function() {
            var e = f[this.img.src] || new l(this.img.src);
            if (e.isConfirmed) return void this.confirm(e.isLoaded, "cached was confirmed");
            if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            var t = this;
            e.on("confirm", function(e, n) {
                return t.confirm(e.isLoaded, n), !0
            }), e.check()
        }, s.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var f = {};
        return l.prototype = new t, l.prototype.check = function() {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, l.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, l.prototype.onload = function(e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, l.prototype.onerror = function(e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, l.prototype.confirm = function(e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, l.prototype.unbindProxyEvents = function(e) {
            n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
        }, a
    }), ! function(e) {
        function t(e) {
            var t = e.length,
                i = n.type(e);
            return "function" === i || n.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
        }
        if (!e.jQuery) {
            var n = function(e, t) {
                return new n.fn.init(e, t)
            };
            n.isWindow = function(e) {
                return null != e && e == e.window
            }, n.type = function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? r[a.call(e)] || "object" : typeof e
            }, n.isArray = Array.isArray || function(e) {
                return "array" === n.type(e)
            }, n.isPlainObject = function(e) {
                var t;
                if (!e || "object" !== n.type(e) || e.nodeType || n.isWindow(e)) return !1;
                try {
                    if (e.constructor && !o.call(e, "constructor") && !o.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (i) {
                    return !1
                }
                for (t in e);
                return void 0 === t || o.call(e, t)
            }, n.each = function(e, n, i) {
                var r, o = 0,
                    a = e.length,
                    s = t(e);
                if (i) {
                    if (s)
                        for (; a > o && (r = n.apply(e[o], i), r !== !1); o++);
                    else
                        for (o in e)
                            if (r = n.apply(e[o], i), r === !1) break
                } else if (s)
                    for (; a > o && (r = n.call(e[o], o, e[o]), r !== !1); o++);
                else
                    for (o in e)
                        if (r = n.call(e[o], o, e[o]), r === !1) break;
                return e
            }, n.data = function(e, t, r) {
                if (void 0 === r) {
                    var o = e[n.expando],
                        a = o && i[o];
                    if (void 0 === t) return a;
                    if (a && t in a) return a[t]
                } else if (void 0 !== t) {
                    var o = e[n.expando] || (e[n.expando] = ++n.uuid);
                    return i[o] = i[o] || {}, i[o][t] = r, r
                }
            }, n.removeData = function(e, t) {
                var r = e[n.expando],
                    o = r && i[r];
                o && n.each(t, function(e, t) {
                    delete o[t]
                })
            }, n.extend = function() {
                var e, t, i, r, o, a, s = arguments[0] || {},
                    l = 1,
                    c = arguments.length,
                    u = !1;
                for ("boolean" == typeof s && (u = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" !== n.type(s) && (s = {}), l === c && (s = this, l--); c > l; l++)
                    if (null != (o = arguments[l]))
                        for (r in o) e = s[r], i = o[r], s !== i && (u && i && (n.isPlainObject(i) || (t = n.isArray(i))) ? (t ? (t = !1, a = e && n.isArray(e) ? e : []) : a = e && n.isPlainObject(e) ? e : {}, s[r] = n.extend(u, a, i)) : void 0 !== i && (s[r] = i));
                return s
            }, n.queue = function(e, i, r) {
                function o(e, n) {
                    var i = n || [];
                    return null != e && (t(Object(e)) ? ! function(e, t) {
                        for (var n = +t.length, i = 0, r = e.length; n > i;) e[r++] = t[i++];
                        if (n !== n)
                            for (; void 0 !== t[i];) e[r++] = t[i++];
                        return e.length = r, e
                    }(i, "string" == typeof e ? [e] : e) : [].push.call(i, e)), i
                }
                if (e) {
                    i = (i || "fx") + "queue";
                    var a = n.data(e, i);
                    return r ? (!a || n.isArray(r) ? a = n.data(e, i, o(r)) : a.push(r), a) : a || []
                }
            }, n.dequeue = function(e, t) {
                n.each(e.nodeType ? [e] : e, function(e, i) {
                    t = t || "fx";
                    var r = n.queue(i, t),
                        o = r.shift();
                    "inprogress" === o && (o = r.shift()), o && ("fx" === t && r.unshift("inprogress"), o.call(i, function() {
                        n.dequeue(i, t)
                    }))
                })
            }, n.fn = n.prototype = {
                init: function(e) {
                    if (e.nodeType) return this[0] = e, this;
                    throw new Error("Not a DOM node.")
                },
                offset: function() {
                    var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                        top: 0,
                        left: 0
                    };
                    return {
                        top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                        left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                    }
                },
                position: function() {
                    function e() {
                        for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
                        return e || document
                    }
                    var t = this[0],
                        e = e.apply(t),
                        i = this.offset(),
                        r = /^(?:body|html)$/i.test(e.nodeName) ? {
                            top: 0,
                            left: 0
                        } : n(e).offset();
                    return i.top -= parseFloat(t.style.marginTop) || 0, i.left -= parseFloat(t.style.marginLeft) || 0, e.style && (r.top += parseFloat(e.style.borderTopWidth) || 0, r.left += parseFloat(e.style.borderLeftWidth) || 0), {
                        top: i.top - r.top,
                        left: i.left - r.left
                    }
                }
            };
            var i = {};
            n.expando = "velocity" + (new Date).getTime(), n.uuid = 0;
            for (var r = {}, o = r.hasOwnProperty, a = r.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < s.length; l++) r["[object " + s[l] + "]"] = s[l].toLowerCase();
            n.fn.init.prototype = n.fn, e.Velocity = {
                Utilities: n
            }
        }
    }(window),
    function(e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
    }(function() {
        return function(e, t, n, i) {
            function r(e) {
                for (var t = -1, n = e ? e.length : 0, i = []; ++t < n;) {
                    var r = e[t];
                    r && i.push(r)
                }
                return i
            }

            function o(e) {
                return g.isWrapped(e) ? e = [].slice.call(e) : g.isNode(e) && (e = [e]), e
            }

            function a(e) {
                var t = p.data(e, "velocity");
                return null === t ? i : t
            }

            function s(e) {
                return function(t) {
                    return Math.round(t * e) * (1 / e)
                }
            }

            function l(e, n, i, r) {
                function o(e, t) {
                    return 1 - 3 * t + 3 * e
                }

                function a(e, t) {
                    return 3 * t - 6 * e
                }

                function s(e) {
                    return 3 * e
                }

                function l(e, t, n) {
                    return ((o(t, n) * e + a(t, n)) * e + s(t)) * e
                }

                function c(e, t, n) {
                    return 3 * o(t, n) * e * e + 2 * a(t, n) * e + s(t)
                }

                function u(t, n) {
                    for (var r = 0; g > r; ++r) {
                        var o = c(n, e, i);
                        if (0 === o) return n;
                        var a = l(n, e, i) - t;
                        n -= a / o
                    }
                    return n
                }

                function d() {
                    for (var t = 0; w > t; ++t) $[t] = l(t * b, e, i)
                }

                function p(t, n, r) {
                    var o, a, s = 0;
                    do a = n + (r - n) / 2, o = l(a, e, i) - t, o > 0 ? r = a : n = a; while (Math.abs(o) > v && ++s < y);
                    return a
                }

                function f(t) {
                    for (var n = 0, r = 1, o = w - 1; r != o && $[r] <= t; ++r) n += b;
                    --r;
                    var a = (t - $[r]) / ($[r + 1] - $[r]),
                        s = n + a * b,
                        l = c(s, e, i);
                    return l >= m ? u(t, s) : 0 == l ? s : p(t, n, n + b)
                }

                function h() {
                    T = !0, (e != n || i != r) && d()
                }
                var g = 4,
                    m = .001,
                    v = 1e-7,
                    y = 10,
                    w = 11,
                    b = 1 / (w - 1),
                    x = "Float32Array" in t;
                if (4 !== arguments.length) return !1;
                for (var S = 0; 4 > S; ++S)
                    if ("number" != typeof arguments[S] || isNaN(arguments[S]) || !isFinite(arguments[S])) return !1;
                e = Math.min(e, 1), i = Math.min(i, 1), e = Math.max(e, 0), i = Math.max(i, 0);
                var $ = x ? new Float32Array(w) : new Array(w),
                    T = !1,
                    C = function(t) {
                        return T || h(), e === n && i === r ? t : 0 === t ? 0 : 1 === t ? 1 : l(f(t), n, r)
                    };
                C.getControlPoints = function() {
                    return [{
                        x: e,
                        y: n
                    }, {
                        x: i,
                        y: r
                    }]
                };
                var P = "generateBezier(" + [e, n, i, r] + ")";
                return C.toString = function() {
                    return P
                }, C
            }

            function c(e, t) {
                var n = e;
                return g.isString(e) ? w.Easings[e] || (n = !1) : n = g.isArray(e) && 1 === e.length ? s.apply(null, e) : g.isArray(e) && 2 === e.length ? b.apply(null, e.concat([t])) : g.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, n === !1 && (n = w.Easings[w.defaults.easing] ? w.defaults.easing : y), n
            }

            function u(e) {
                if (e) {
                    var t = (new Date).getTime(),
                        n = w.State.calls.length;
                    n > 1e4 && (w.State.calls = r(w.State.calls));
                    for (var o = 0; n > o; o++)
                        if (w.State.calls[o]) {
                            var s = w.State.calls[o],
                                l = s[0],
                                c = s[2],
                                f = s[3],
                                h = !!f,
                                m = null;
                            f || (f = w.State.calls[o][3] = t - 16);
                            for (var v = Math.min((t - f) / c.duration, 1), y = 0, b = l.length; b > y; y++) {
                                var S = l[y],
                                    T = S.element;
                                if (a(T)) {
                                    var C = !1;
                                    if (c.display !== i && null !== c.display && "none" !== c.display) {
                                        if ("flex" === c.display) {
                                            var P = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                            p.each(P, function(e, t) {
                                                x.setPropertyValue(T, "display", t)
                                            })
                                        }
                                        x.setPropertyValue(T, "display", c.display)
                                    }
                                    c.visibility !== i && "hidden" !== c.visibility && x.setPropertyValue(T, "visibility", c.visibility);
                                    for (var A in S)
                                        if ("element" !== A) {
                                            var k, _ = S[A],
                                                L = g.isString(_.easing) ? w.Easings[_.easing] : _.easing;
                                            if (1 === v) k = _.endValue;
                                            else {
                                                var E = _.endValue - _.startValue;
                                                if (k = _.startValue + E * L(v, c, E), !h && k === _.currentValue) continue
                                            }
                                            if (_.currentValue = k, "tween" === A) m = k;
                                            else {
                                                if (x.Hooks.registered[A]) {
                                                    var H = x.Hooks.getRoot(A),
                                                        j = a(T).rootPropertyValueCache[H];
                                                    j && (_.rootPropertyValue = j)
                                                }
                                                var V = x.setPropertyValue(T, A, _.currentValue + (0 === parseFloat(k) ? "" : _.unitType), _.rootPropertyValue, _.scrollData);
                                                x.Hooks.registered[A] && (a(T).rootPropertyValueCache[H] = x.Normalizations.registered[H] ? x.Normalizations.registered[H]("extract", null, V[1]) : V[1]), "transform" === V[0] && (C = !0)
                                            }
                                        }
                                    c.mobileHA && a(T).transformCache.translate3d === i && (a(T).transformCache.translate3d = "(0px, 0px, 0px)", C = !0), C && x.flushTransformCache(T)
                                }
                            }
                            c.display !== i && "none" !== c.display && (w.State.calls[o][2].display = !1), c.visibility !== i && "hidden" !== c.visibility && (w.State.calls[o][2].visibility = !1), c.progress && c.progress.call(s[1], s[1], v, Math.max(0, f + c.duration - t), f, m), 1 === v && d(o)
                        }
                }
                w.State.isTicking && $(u)
            }

            function d(e, t) {
                if (!w.State.calls[e]) return !1;
                for (var n = w.State.calls[e][0], r = w.State.calls[e][1], o = w.State.calls[e][2], s = w.State.calls[e][4], l = !1, c = 0, u = n.length; u > c; c++) {
                    var d = n[c].element;
                    if (t || o.loop || ("none" === o.display && x.setPropertyValue(d, "display", o.display), "hidden" === o.visibility && x.setPropertyValue(d, "visibility", o.visibility)), o.loop !== !0 && (p.queue(d)[1] === i || !/\.velocityQueueEntryFlag/i.test(p.queue(d)[1])) && a(d)) {
                        a(d).isAnimating = !1, a(d).rootPropertyValueCache = {};
                        var f = !1;
                        p.each(x.Lists.transforms3D, function(e, t) {
                            var n = /^scale/.test(t) ? 1 : 0,
                                r = a(d).transformCache[t];
                            a(d).transformCache[t] !== i && new RegExp("^\\(" + n + "[^.]").test(r) && (f = !0, delete a(d).transformCache[t])
                        }), o.mobileHA && (f = !0, delete a(d).transformCache.translate3d), f && x.flushTransformCache(d), x.Values.removeClass(d, "velocity-animating")
                    }
                    if (!t && o.complete && !o.loop && c === u - 1) try {
                        o.complete.call(r, r)
                    } catch (h) {
                        setTimeout(function() {
                            throw h
                        }, 1)
                    }
                    s && o.loop !== !0 && s(r), a(d) && o.loop === !0 && !t && (p.each(a(d).tweensContainer, function(e, t) {
                        /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                    }), w(d, "reverse", {
                        loop: !0,
                        delay: o.delay
                    })), o.queue !== !1 && p.dequeue(d, o.queue)
                }
                w.State.calls[e] = !1;
                for (var g = 0, m = w.State.calls.length; m > g; g++)
                    if (w.State.calls[g] !== !1) {
                        l = !0;
                        break
                    }
                l === !1 && (w.State.isTicking = !1, delete w.State.calls, w.State.calls = [])
            }
            var p, f = function() {
                    if (n.documentMode) return n.documentMode;
                    for (var e = 7; e > 4; e--) {
                        var t = n.createElement("div");
                        if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
                    }
                    return i
                }(),
                h = function() {
                    var e = 0;
                    return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                        var n, i = (new Date).getTime();
                        return n = Math.max(0, 16 - (i - e)), e = i + n, setTimeout(function() {
                            t(i + n)
                        }, n)
                    }
                }(),
                g = {
                    isString: function(e) {
                        return "string" == typeof e
                    },
                    isArray: Array.isArray || function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    isFunction: function(e) {
                        return "[object Function]" === Object.prototype.toString.call(e)
                    },
                    isNode: function(e) {
                        return e && e.nodeType
                    },
                    isNodeList: function(e) {
                        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== i && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
                    },
                    isWrapped: function(e) {
                        return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
                    },
                    isSVG: function(e) {
                        return t.SVGElement && e instanceof t.SVGElement
                    },
                    isEmptyObject: function(e) {
                        for (var t in e) return !1;
                        return !0
                    }
                },
                m = !1;
            if (e.fn && e.fn.jquery ? (p = e, m = !0) : p = t.Velocity.Utilities, 8 >= f && !m) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
            if (7 >= f) return void(jQuery.fn.velocity = jQuery.fn.animate);
            var v = 400,
                y = "swing",
                w = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: t.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: n.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: p,
                    Redirects: {},
                    Easings: {},
                    Promise: t.Promise,
                    defaults: {
                        queue: "",
                        duration: v,
                        easing: y,
                        begin: i,
                        complete: i,
                        progress: i,
                        display: i,
                        visibility: i,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function(e) {
                        p.data(e, "velocity", {
                            isSVG: g.isSVG(e),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 2,
                        patch: 2
                    },
                    debug: !1
                };
            t.pageYOffset !== i ? (w.State.scrollAnchor = t, w.State.scrollPropertyLeft = "pageXOffset", w.State.scrollPropertyTop = "pageYOffset") : (w.State.scrollAnchor = n.documentElement || n.body.parentNode || n.body, w.State.scrollPropertyLeft = "scrollLeft", w.State.scrollPropertyTop = "scrollTop");
            var b = function() {
                function e(e) {
                    return -e.tension * e.x - e.friction * e.v
                }

                function t(t, n, i) {
                    var r = {
                        x: t.x + i.dx * n,
                        v: t.v + i.dv * n,
                        tension: t.tension,
                        friction: t.friction
                    };
                    return {
                        dx: r.v,
                        dv: e(r)
                    }
                }

                function n(n, i) {
                    var r = {
                            dx: n.v,
                            dv: e(n)
                        },
                        o = t(n, .5 * i, r),
                        a = t(n, .5 * i, o),
                        s = t(n, i, a),
                        l = 1 / 6 * (r.dx + 2 * (o.dx + a.dx) + s.dx),
                        c = 1 / 6 * (r.dv + 2 * (o.dv + a.dv) + s.dv);
                    return n.x = n.x + l * i, n.v = n.v + c * i, n
                }
                return function i(e, t, r) {
                    var o, a, s, l = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        c = [0],
                        u = 0,
                        d = 1e-4,
                        p = .016;
                    for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, r = r || null, l.tension = e, l.friction = t, o = null !== r, o ? (u = i(e, t), a = u / r * p) : a = p; s = n(s || l, a), c.push(1 + s.x), u += 16, Math.abs(s.x) > d && Math.abs(s.v) > d;);
                    return o ? function(e) {
                        return c[e * (c.length - 1) | 0]
                    } : u
                }
            }();
            w.Easings = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                spring: function(e) {
                    return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                }
            }, p.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function(e, t) {
                w.Easings[t[0]] = l.apply(null, t[1])
            });
            var x = w.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function() {
                        for (var e = 0; e < x.Lists.colors.length; e++) {
                            var t = "color" === x.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                            x.Hooks.templates[x.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                        }
                        var n, i, r;
                        if (f)
                            for (n in x.Hooks.templates) {
                                i = x.Hooks.templates[n], r = i[0].split(" ");
                                var o = i[1].match(x.RegEx.valueSplit);
                                "Color" === r[0] && (r.push(r.shift()), o.push(o.shift()), x.Hooks.templates[n] = [r.join(" "), o.join(" ")])
                            }
                        for (n in x.Hooks.templates) {
                            i = x.Hooks.templates[n], r = i[0].split(" ");
                            for (var e in r) {
                                var a = n + r[e],
                                    s = e;
                                x.Hooks.registered[a] = [n, s]
                            }
                        }
                    },
                    getRoot: function(e) {
                        var t = x.Hooks.registered[e];
                        return t ? t[0] : e
                    },
                    cleanRootPropertyValue: function(e, t) {
                        return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]), t
                    },
                    extractValue: function(e, t) {
                        var n = x.Hooks.registered[e];
                        if (n) {
                            var i = n[0],
                                r = n[1];
                            return t = x.Hooks.cleanRootPropertyValue(i, t), t.toString().match(x.RegEx.valueSplit)[r]
                        }
                        return t
                    },
                    injectValue: function(e, t, n) {
                        var i = x.Hooks.registered[e];
                        if (i) {
                            var r, o, a = i[0],
                                s = i[1];
                            return n = x.Hooks.cleanRootPropertyValue(a, n), r = n.toString().match(x.RegEx.valueSplit), r[s] = t, o = r.join(" ")
                        }
                        return n
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function(e, t, n) {
                            switch (e) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var i;
                                    return x.RegEx.wrappedValueAlreadyExtracted.test(n) ? i = n : (i = n.toString().match(x.RegEx.valueUnwrap), i = i ? i[1].replace(/,(\s+)?/g, " ") : n), i;
                                case "inject":
                                    return "rect(" + n + ")"
                            }
                        },
                        blur: function(e, t, n) {
                            switch (e) {
                                case "name":
                                    return w.State.isFirefox ? "filter" : "-webkit-filter";
                                case "extract":
                                    var i = parseFloat(n);
                                    if (!i && 0 !== i) {
                                        var r = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        i = r ? r[1] : 0
                                    }
                                    return i;
                                case "inject":
                                    return parseFloat(n) ? "blur(" + n + ")" : "none"
                            }
                        },
                        opacity: function(e, t, n) {
                            if (8 >= f) switch (e) {
                                case "name":
                                    return "filter";
                                case "extract":
                                    var i = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return n = i ? i[1] / 100 : 1;
                                case "inject":
                                    return t.style.zoom = 1, parseFloat(n) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(n), 10) + ")"
                            } else switch (e) {
                                case "name":
                                    return "opacity";
                                case "extract":
                                    return n;
                                case "inject":
                                    return n
                            }
                        }
                    },
                    register: function() {
                        9 >= f || w.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));
                        for (var e = 0; e < x.Lists.transformsBase.length; e++) ! function() {
                            var t = x.Lists.transformsBase[e];
                            x.Normalizations.registered[t] = function(e, n, r) {
                                switch (e) {
                                    case "name":
                                        return "transform";
                                    case "extract":
                                        return a(n) === i || a(n).transformCache[t] === i ? /^scale/i.test(t) ? 1 : 0 : a(n).transformCache[t].replace(/[()]/g, "");
                                    case "inject":
                                        var o = !1;
                                        switch (t.substr(0, t.length - 1)) {
                                            case "translate":
                                                o = !/(%|px|em|rem|vw|vh|\d)$/i.test(r);
                                                break;
                                            case "scal":
                                            case "scale":
                                                w.State.isAndroid && a(n).transformCache[t] === i && 1 > r && (r = 1), o = !/(\d)$/i.test(r);
                                                break;
                                            case "skew":
                                                o = !/(deg|\d)$/i.test(r);
                                                break;
                                            case "rotate":
                                                o = !/(deg|\d)$/i.test(r)
                                        }
                                        return o || (a(n).transformCache[t] = "(" + r + ")"), a(n).transformCache[t]
                                }
                            }
                        }();
                        for (var e = 0; e < x.Lists.colors.length; e++) ! function() {
                            var t = x.Lists.colors[e];
                            x.Normalizations.registered[t] = function(e, n, r) {
                                switch (e) {
                                    case "name":
                                        return t;
                                    case "extract":
                                        var o;
                                        if (x.RegEx.wrappedValueAlreadyExtracted.test(r)) o = r;
                                        else {
                                            var a, s = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                            /^[A-z]+$/i.test(r) ? a = s[r] !== i ? s[r] : s.black : x.RegEx.isHex.test(r) ? a = "rgb(" + x.Values.hexToRgb(r).join(" ") + ")" : /^rgba?\(/i.test(r) || (a = s.black), o = (a || r).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                        }
                                        return 8 >= f || 3 !== o.split(" ").length || (o += " 1"), o;
                                    case "inject":
                                        return 8 >= f ? 4 === r.split(" ").length && (r = r.split(/\s+/).slice(0, 3).join(" ")) : 3 === r.split(" ").length && (r += " 1"), (8 >= f ? "rgb" : "rgba") + "(" + r.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                    }
                },
                Names: {
                    camelCase: function(e) {
                        return e.replace(/-(\w)/g, function(e, t) {
                            return t.toUpperCase()
                        })
                    },
                    SVGAttribute: function(e) {
                        var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (f || w.State.isAndroid && !w.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                    },
                    prefixCheck: function(e) {
                        if (w.State.prefixMatches[e]) return [w.State.prefixMatches[e], !0];
                        for (var t = ["", "Webkit", "Moz", "ms", "O"], n = 0, i = t.length; i > n; n++) {
                            var r;
                            if (r = 0 === n ? e : t[n] + e.replace(/^\w/, function(e) {
                                    return e.toUpperCase()
                                }), g.isString(w.State.prefixElement.style[r])) return w.State.prefixMatches[e] = r, [r, !0]
                        }
                        return [e, !1]
                    }
                },
                Values: {
                    hexToRgb: function(e) {
                        var t, n = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                            i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                        return e = e.replace(n, function(e, t, n, i) {
                            return t + t + n + n + i + i
                        }), t = i.exec(e), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                    },
                    isCSSNullValue: function(e) {
                        return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                    },
                    getUnitType: function(e) {
                        return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                    },
                    getDisplayType: function(e) {
                        var t = e && e.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                    },
                    addClass: function(e, t) {
                        e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                    },
                    removeClass: function(e, t) {
                        e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                    }
                },
                getPropertyValue: function(e, n, r, o) {
                    function s(e, n) {
                        function r() {
                            c && x.setPropertyValue(e, "display", "none")
                        }
                        var l = 0;
                        if (8 >= f) l = p.css(e, n);
                        else {
                            var c = !1;
                            if (/^(width|height)$/.test(n) && 0 === x.getPropertyValue(e, "display") && (c = !0, x.setPropertyValue(e, "display", x.Values.getDisplayType(e))), !o) {
                                if ("height" === n && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var u = e.offsetHeight - (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);
                                    return r(), u
                                }
                                if ("width" === n && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var d = e.offsetWidth - (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0);
                                    return r(), d
                                }
                            }
                            var h;
                            h = a(e) === i ? t.getComputedStyle(e, null) : a(e).computedStyle ? a(e).computedStyle : a(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === n && (n = "borderTopColor"), l = 9 === f && "filter" === n ? h.getPropertyValue(n) : h[n], ("" === l || null === l) && (l = e.style[n]), r()
                        }
                        if ("auto" === l && /^(top|right|bottom|left)$/i.test(n)) {
                            var g = s(e, "position");
                            ("fixed" === g || "absolute" === g && /top|left/i.test(n)) && (l = p(e).position()[n] + "px")
                        }
                        return l
                    }
                    var l;
                    if (x.Hooks.registered[n]) {
                        var c = n,
                            u = x.Hooks.getRoot(c);
                        r === i && (r = x.getPropertyValue(e, x.Names.prefixCheck(u)[0])), x.Normalizations.registered[u] && (r = x.Normalizations.registered[u]("extract", e, r)), l = x.Hooks.extractValue(c, r)
                    } else if (x.Normalizations.registered[n]) {
                        var d, h;
                        d = x.Normalizations.registered[n]("name", e), "transform" !== d && (h = s(e, x.Names.prefixCheck(d)[0]), x.Values.isCSSNullValue(h) && x.Hooks.templates[n] && (h = x.Hooks.templates[n][1])), l = x.Normalizations.registered[n]("extract", e, h)
                    }
                    if (!/^[\d-]/.test(l))
                        if (a(e) && a(e).isSVG && x.Names.SVGAttribute(n))
                            if (/^(height|width)$/i.test(n)) try {
                                l = e.getBBox()[n]
                            } catch (g) {
                                l = 0
                            } else l = e.getAttribute(n);
                            else l = s(e, x.Names.prefixCheck(n)[0]);
                    return x.Values.isCSSNullValue(l) && (l = 0), w.debug >= 2 && console.log("Get " + n + ": " + l), l
                },
                setPropertyValue: function(e, n, i, r, o) {
                    var s = n;
                    if ("scroll" === n) o.container ? o.container["scroll" + o.direction] = i : "Left" === o.direction ? t.scrollTo(i, o.alternateValue) : t.scrollTo(o.alternateValue, i);
                    else if (x.Normalizations.registered[n] && "transform" === x.Normalizations.registered[n]("name", e)) x.Normalizations.registered[n]("inject", e, i), s = "transform", i = a(e).transformCache[n];
                    else {
                        if (x.Hooks.registered[n]) {
                            var l = n,
                                c = x.Hooks.getRoot(n);
                            r = r || x.getPropertyValue(e, c), i = x.Hooks.injectValue(l, i, r), n = c
                        }
                        if (x.Normalizations.registered[n] && (i = x.Normalizations.registered[n]("inject", e, i), n = x.Normalizations.registered[n]("name", e)), s = x.Names.prefixCheck(n)[0], 8 >= f) try {
                            e.style[s] = i
                        } catch (u) {
                            w.debug && console.log("Browser does not support [" + i + "] for [" + s + "]")
                        } else a(e) && a(e).isSVG && x.Names.SVGAttribute(n) ? e.setAttribute(n, i) : e.style[s] = i;
                        w.debug >= 2 && console.log("Set " + n + " (" + s + "): " + i)
                    }
                    return [s, i]
                },
                flushTransformCache: function(e) {
                    function t(t) {
                        return parseFloat(x.getPropertyValue(e, t))
                    }
                    var n = "";
                    if ((f || w.State.isAndroid && !w.State.isChrome) && a(e).isSVG) {
                        var i = {
                            translate: [t("translateX"), t("translateY")],
                            skewX: [t("skewX")],
                            skewY: [t("skewY")],
                            scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                            rotate: [t("rotateZ"), 0, 0]
                        };
                        p.each(a(e).transformCache, function(e) {
                            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), i[e] && (n += e + "(" + i[e].join(" ") + ") ", delete i[e])
                        })
                    } else {
                        var r, o;
                        p.each(a(e).transformCache, function(t) {
                            return r = a(e).transformCache[t], "transformPerspective" === t ? (o = r, !0) : (9 === f && "rotateZ" === t && (t = "rotate"), void(n += t + r + " "))
                        }), o && (n = "perspective" + o + " " + n)
                    }
                    x.setPropertyValue(e, "transform", n)
                }
            };
            x.Hooks.register(), x.Normalizations.register(), w.hook = function(e, t, n) {
                var r = i;
                return e = o(e), p.each(e, function(e, o) {
                    if (a(o) === i && w.init(o), n === i) r === i && (r = w.CSS.getPropertyValue(o, t));
                    else {
                        var s = w.CSS.setPropertyValue(o, t, n);
                        "transform" === s[0] && w.CSS.flushTransformCache(o), r = s
                    }
                }), r
            };
            var S = function() {
                function e() {
                    return s ? A.promise || null : l
                }

                function r() {
                    function e() {
                        function e(e, t) {
                            var n = i,
                                r = i,
                                a = i;
                            return g.isArray(e) ? (n = e[0], !g.isArray(e[1]) && /^[\d-]/.test(e[1]) || g.isFunction(e[1]) || x.RegEx.isHex.test(e[1]) ? a = e[1] : (g.isString(e[1]) && !x.RegEx.isHex.test(e[1]) || g.isArray(e[1])) && (r = t ? e[1] : c(e[1], s.duration), e[2] !== i && (a = e[2]))) : n = e, t || (r = r || s.easing), g.isFunction(n) && (n = n.call(o, T, $)), g.isFunction(a) && (a = a.call(o, T, $)), [n || 0, r, a]
                        }

                        function d(e, t) {
                            var n, i;
                            return i = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                                return n = e, ""
                            }), n || (n = x.Values.getUnitType(e)), [i, n]
                        }

                        function f() {
                            var e = {
                                    myParent: o.parentNode || n.body,
                                    position: x.getPropertyValue(o, "position"),
                                    fontSize: x.getPropertyValue(o, "fontSize")
                                },
                                i = e.position === V.lastPosition && e.myParent === V.lastParent,
                                r = e.fontSize === V.lastFontSize;
                            V.lastParent = e.myParent, V.lastPosition = e.position, V.lastFontSize = e.fontSize;
                            var s = 100,
                                l = {};
                            if (r && i) l.emToPx = V.lastEmToPx, l.percentToPxWidth = V.lastPercentToPxWidth, l.percentToPxHeight = V.lastPercentToPxHeight;
                            else {
                                var c = a(o).isSVG ? n.createElementNS("http://www.w3.org/2000/svg", "rect") : n.createElement("div");
                                w.init(c), e.myParent.appendChild(c), p.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                                    w.CSS.setPropertyValue(c, t, "hidden")
                                }), w.CSS.setPropertyValue(c, "position", e.position), w.CSS.setPropertyValue(c, "fontSize", e.fontSize), w.CSS.setPropertyValue(c, "boxSizing", "content-box"), p.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                                    w.CSS.setPropertyValue(c, t, s + "%")
                                }), w.CSS.setPropertyValue(c, "paddingLeft", s + "em"), l.percentToPxWidth = V.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(c, "width", null, !0)) || 1) / s, l.percentToPxHeight = V.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(c, "height", null, !0)) || 1) / s, l.emToPx = V.lastEmToPx = (parseFloat(x.getPropertyValue(c, "paddingLeft")) || 1) / s, e.myParent.removeChild(c)
                            }
                            return null === V.remToPx && (V.remToPx = parseFloat(x.getPropertyValue(n.body, "fontSize")) || 16), null === V.vwToPx && (V.vwToPx = parseFloat(t.innerWidth) / 100, V.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = V.remToPx, l.vwToPx = V.vwToPx, l.vhToPx = V.vhToPx, w.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), o), l
                        }
                        if (s.begin && 0 === T) try {
                            s.begin.call(h, h)
                        } catch (v) {
                            setTimeout(function() {
                                throw v
                            }, 1)
                        }
                        if ("scroll" === k) {
                            var b, S, C, P = /^x$/i.test(s.axis) ? "Left" : "Top",
                                _ = parseFloat(s.offset) || 0;
                            s.container ? g.isWrapped(s.container) || g.isNode(s.container) ? (s.container = s.container[0] || s.container, b = s.container["scroll" + P], C = b + p(o).position()[P.toLowerCase()] + _) : s.container = null : (b = w.State.scrollAnchor[w.State["scrollProperty" + P]], S = w.State.scrollAnchor[w.State["scrollProperty" + ("Left" === P ? "Top" : "Left")]], C = p(o).offset()[P.toLowerCase()] + _), l = {
                                scroll: {
                                    rootPropertyValue: !1,
                                    startValue: b,
                                    currentValue: b,
                                    endValue: C,
                                    unitType: "",
                                    easing: s.easing,
                                    scrollData: {
                                        container: s.container,
                                        direction: P,
                                        alternateValue: S
                                    }
                                },
                                element: o
                            }, w.debug && console.log("tweensContainer (scroll): ", l.scroll, o)
                        } else if ("reverse" === k) {
                            if (!a(o).tweensContainer) return void p.dequeue(o, s.queue);
                            "none" === a(o).opts.display && (a(o).opts.display = "auto"), "hidden" === a(o).opts.visibility && (a(o).opts.visibility = "visible"), a(o).opts.loop = !1, a(o).opts.begin = null, a(o).opts.complete = null, y.easing || delete s.easing, y.duration || delete s.duration, s = p.extend({}, a(o).opts, s);
                            var L = p.extend(!0, {}, a(o).tweensContainer);
                            for (var E in L)
                                if ("element" !== E) {
                                    var H = L[E].startValue;
                                    L[E].startValue = L[E].currentValue = L[E].endValue, L[E].endValue = H, g.isEmptyObject(y) || (L[E].easing = s.easing), w.debug && console.log("reverse tweensContainer (" + E + "): " + JSON.stringify(L[E]), o)
                                }
                            l = L
                        } else if ("start" === k) {
                            var L;
                            a(o).tweensContainer && a(o).isAnimating === !0 && (L = a(o).tweensContainer), p.each(m, function(t, n) {
                                if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(t)) {
                                    var r = e(n, !0),
                                        o = r[0],
                                        a = r[1],
                                        s = r[2];
                                    if (x.RegEx.isHex.test(o)) {
                                        for (var l = ["Red", "Green", "Blue"], c = x.Values.hexToRgb(o), u = s ? x.Values.hexToRgb(s) : i, d = 0; d < l.length; d++) {
                                            var p = [c[d]];
                                            a && p.push(a), u !== i && p.push(u[d]), m[t + l[d]] = p
                                        }
                                        delete m[t]
                                    }
                                }
                            });
                            for (var j in m) {
                                var Y = e(m[j]),
                                    O = Y[0],
                                    X = Y[1],
                                    I = Y[2];
                                j = x.Names.camelCase(j);
                                var N = x.Hooks.getRoot(j),
                                    W = !1;
                                if (a(o).isSVG || "tween" === N || x.Names.prefixCheck(N)[1] !== !1 || x.Normalizations.registered[N] !== i) {
                                    (s.display !== i && null !== s.display && "none" !== s.display || s.visibility !== i && "hidden" !== s.visibility) && /opacity|filter/.test(j) && !I && 0 !== O && (I = 0), s._cacheValues && L && L[j] ? (I === i && (I = L[j].endValue + L[j].unitType), W = a(o).rootPropertyValueCache[N]) : x.Hooks.registered[j] ? I === i ? (W = x.getPropertyValue(o, N), I = x.getPropertyValue(o, j, W)) : W = x.Hooks.templates[N][1] : I === i && (I = x.getPropertyValue(o, j));
                                    var M, D, F, z = !1;
                                    if (M = d(j, I), I = M[0], F = M[1], M = d(j, O), O = M[0].replace(/^([+-\/*])=/, function(e, t) {
                                            return z = t, ""
                                        }), D = M[1], I = parseFloat(I) || 0, O = parseFloat(O) || 0, "%" === D && (/^(fontSize|lineHeight)$/.test(j) ? (O /= 100, D = "em") : /^scale/.test(j) ? (O /= 100, D = "") : /(Red|Green|Blue)$/i.test(j) && (O = O / 100 * 255, D = "")), /[\/*]/.test(z)) D = F;
                                    else if (F !== D && 0 !== I)
                                        if (0 === O) D = F;
                                        else {
                                            r = r || f();
                                            var B = /margin|padding|left|right|width|text|word|letter/i.test(j) || /X$/.test(j) || "x" === j ? "x" : "y";
                                            switch (F) {
                                                case "%":
                                                    I *= "x" === B ? r.percentToPxWidth : r.percentToPxHeight;
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    I *= r[F + "ToPx"]
                                            }
                                            switch (D) {
                                                case "%":
                                                    I *= 1 / ("x" === B ? r.percentToPxWidth : r.percentToPxHeight);
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    I *= 1 / r[D + "ToPx"]
                                            }
                                        }
                                    switch (z) {
                                        case "+":
                                            O = I + O;
                                            break;
                                        case "-":
                                            O = I - O;
                                            break;
                                        case "*":
                                            O = I * O;
                                            break;
                                        case "/":
                                            O = I / O
                                    }
                                    l[j] = {
                                        rootPropertyValue: W,
                                        startValue: I,
                                        currentValue: I,
                                        endValue: O,
                                        unitType: D,
                                        easing: X
                                    }, w.debug && console.log("tweensContainer (" + j + "): " + JSON.stringify(l[j]), o)
                                } else w.debug && console.log("Skipping [" + N + "] due to a lack of browser support.")
                            }
                            l.element = o
                        }
                        l.element && (x.Values.addClass(o, "velocity-animating"), R.push(l), "" === s.queue && (a(o).tweensContainer = l, a(o).opts = s), a(o).isAnimating = !0, T === $ - 1 ? (w.State.calls.push([R, h, s, null, A.resolver]), w.State.isTicking === !1 && (w.State.isTicking = !0, u())) : T++)
                    }
                    var r, o = this,
                        s = p.extend({}, w.defaults, y),
                        l = {};
                    switch (a(o) === i && w.init(o), parseFloat(s.delay) && s.queue !== !1 && p.queue(o, s.queue, function(e) {
                        w.velocityQueueEntryFlag = !0, a(o).delayTimer = {
                            setTimeout: setTimeout(e, parseFloat(s.delay)),
                            next: e
                        }
                    }), s.duration.toString().toLowerCase()) {
                        case "fast":
                            s.duration = 200;
                            break;
                        case "normal":
                            s.duration = v;
                            break;
                        case "slow":
                            s.duration = 600;
                            break;
                        default:
                            s.duration = parseFloat(s.duration) || 1
                    }
                    w.mock !== !1 && (w.mock === !0 ? s.duration = s.delay = 1 : (s.duration *= parseFloat(w.mock) || 1, s.delay *= parseFloat(w.mock) || 1)), s.easing = c(s.easing, s.duration), s.begin && !g.isFunction(s.begin) && (s.begin = null), s.progress && !g.isFunction(s.progress) && (s.progress = null), s.complete && !g.isFunction(s.complete) && (s.complete = null), s.display !== i && null !== s.display && (s.display = s.display.toString().toLowerCase(), "auto" === s.display && (s.display = w.CSS.Values.getDisplayType(o))), s.visibility !== i && null !== s.visibility && (s.visibility = s.visibility.toString().toLowerCase()), s.mobileHA = s.mobileHA && w.State.isMobile && !w.State.isGingerbread, s.queue === !1 ? s.delay ? setTimeout(e, s.delay) : e() : p.queue(o, s.queue, function(t, n) {
                        return n === !0 ? (A.promise && A.resolver(h), !0) : (w.velocityQueueEntryFlag = !0, void e(t))
                    }), "" !== s.queue && "fx" !== s.queue || "inprogress" === p.queue(o)[0] || p.dequeue(o)
                }
                var s, l, f, h, m, y, b = arguments[0] && (arguments[0].p || p.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || g.isString(arguments[0].properties));
                if (g.isWrapped(this) ? (s = !1, f = 0, h = this, l = this) : (s = !0, f = 1, h = b ? arguments[0].elements || arguments[0].e : arguments[0]), h = o(h)) {
                    b ? (m = arguments[0].properties || arguments[0].p, y = arguments[0].options || arguments[0].o) : (m = arguments[f], y = arguments[f + 1]);
                    var $ = h.length,
                        T = 0;
                    if (!/^(stop|finish)$/i.test(m) && !p.isPlainObject(y)) {
                        var C = f + 1;
                        y = {};
                        for (var P = C; P < arguments.length; P++) g.isArray(arguments[P]) || !/^(fast|normal|slow)$/i.test(arguments[P]) && !/^\d/.test(arguments[P]) ? g.isString(arguments[P]) || g.isArray(arguments[P]) ? y.easing = arguments[P] : g.isFunction(arguments[P]) && (y.complete = arguments[P]) : y.duration = arguments[P]
                    }
                    var A = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    s && w.Promise && (A.promise = new w.Promise(function(e, t) {
                        A.resolver = e, A.rejecter = t
                    }));
                    var k;
                    switch (m) {
                        case "scroll":
                            k = "scroll";
                            break;
                        case "reverse":
                            k = "reverse";
                            break;
                        case "finish":
                        case "stop":
                            p.each(h, function(e, t) {
                                a(t) && a(t).delayTimer && (clearTimeout(a(t).delayTimer.setTimeout), a(t).delayTimer.next && a(t).delayTimer.next(), delete a(t).delayTimer)
                            });
                            var _ = [];
                            return p.each(w.State.calls, function(e, t) {
                                t && p.each(t[1], function(n, r) {
                                    var o = y === i ? "" : y;
                                    return o === !0 || t[2].queue === o || y === i && t[2].queue === !1 ? void p.each(h, function(n, i) {
                                        i === r && ((y === !0 || g.isString(y)) && (p.each(p.queue(i, g.isString(y) ? y : ""), function(e, t) {
                                            g.isFunction(t) && t(null, !0)
                                        }), p.queue(i, g.isString(y) ? y : "", [])), "stop" === m ? (a(i) && a(i).tweensContainer && o !== !1 && p.each(a(i).tweensContainer, function(e, t) {
                                            t.endValue = t.currentValue
                                        }), _.push(e)) : "finish" === m && (t[2].duration = 1))
                                    }) : !0
                                })
                            }), "stop" === m && (p.each(_, function(e, t) {
                                d(t, !0)
                            }), A.promise && A.resolver(h)), e();
                        default:
                            if (!p.isPlainObject(m) || g.isEmptyObject(m)) {
                                if (g.isString(m) && w.Redirects[m]) {
                                    var L = p.extend({}, y),
                                        E = L.duration,
                                        H = L.delay || 0;
                                    return L.backwards === !0 && (h = p.extend(!0, [], h).reverse()), p.each(h, function(e, t) {
                                        parseFloat(L.stagger) ? L.delay = H + parseFloat(L.stagger) * e : g.isFunction(L.stagger) && (L.delay = H + L.stagger.call(t, e, $)), L.drag && (L.duration = parseFloat(E) || (/^(callout|transition)/.test(m) ? 1e3 : v), L.duration = Math.max(L.duration * (L.backwards ? 1 - e / $ : (e + 1) / $), .75 * L.duration, 200)), w.Redirects[m].call(t, t, L || {}, e, $, h, A.promise ? A : i)
                                    }), e()
                                }
                                var j = "Velocity: First argument (" + m + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return A.promise ? A.rejecter(new Error(j)) : console.log(j), e()
                            }
                            k = "start"
                    }
                    var V = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        R = [];
                    p.each(h, function(e, t) {
                        g.isNode(t) && r.call(t)
                    });
                    var Y, L = p.extend({}, w.defaults, y);
                    if (L.loop = parseInt(L.loop), Y = 2 * L.loop - 1, L.loop)
                        for (var O = 0; Y > O; O++) {
                            var X = {
                                delay: L.delay,
                                progress: L.progress
                            };
                            O === Y - 1 && (X.display = L.display, X.visibility = L.visibility, X.complete = L.complete), S(h, "reverse", X)
                        }
                    return e()
                }
            };
            w = p.extend(S, w), w.animate = S;
            var $ = t.requestAnimationFrame || h;
            return w.State.isMobile || n.hidden === i || n.addEventListener("visibilitychange", function() {
                n.hidden ? ($ = function(e) {
                    return setTimeout(function() {
                        e(!0)
                    }, 16)
                }, u()) : $ = t.requestAnimationFrame || h
            }), e.Velocity = w, e !== t && (e.fn.velocity = S, e.fn.velocity.defaults = w.defaults), p.each(["Down", "Up"], function(e, t) {
                w.Redirects["slide" + t] = function(e, n, r, o, a, s) {
                    var l = p.extend({}, n),
                        c = l.begin,
                        u = l.complete,
                        d = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        f = {};
                    l.display === i && (l.display = "Down" === t ? "inline" === w.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function() {
                        c && c.call(a, a);
                        for (var n in d) {
                            f[n] = e.style[n];
                            var i = w.CSS.getPropertyValue(e, n);
                            d[n] = "Down" === t ? [i, 0] : [0, i]
                        }
                        f.overflow = e.style.overflow, e.style.overflow = "hidden"
                    }, l.complete = function() {
                        for (var t in f) e.style[t] = f[t];
                        u && u.call(a, a), s && s.resolver(a)
                    }, w(e, d, l)
                }
            }), p.each(["In", "Out"], function(e, t) {
                w.Redirects["fade" + t] = function(e, n, r, o, a, s) {
                    var l = p.extend({}, n),
                        c = {
                            opacity: "In" === t ? 1 : 0
                        },
                        u = l.complete;
                    l.complete = r !== o - 1 ? l.begin = null : function() {
                        u && u.call(a, a), s && s.resolver(a)
                    }, l.display === i && (l.display = "In" === t ? "auto" : "none"), w(this, c, l)
                }
            }), w
        }(window.jQuery || window.Zepto || window, window, document)
    }), ! function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
    }(function(e) {
        function t(t) {
            var a = t || window.event,
                s = l.call(arguments, 1),
                c = 0,
                d = 0,
                p = 0,
                f = 0,
                h = 0,
                g = 0;
            if (t = e.event.fix(a), t.type = "mousewheel", "detail" in a && (p = -1 * a.detail), "wheelDelta" in a && (p = a.wheelDelta), "wheelDeltaY" in a && (p = a.wheelDeltaY), "wheelDeltaX" in a && (d = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (d = -1 * p, p = 0), c = 0 === p ? d : p, "deltaY" in a && (p = -1 * a.deltaY, c = p), "deltaX" in a && (d = a.deltaX, 0 === p && (c = -1 * d)), 0 !== p || 0 !== d) {
                if (1 === a.deltaMode) {
                    var m = e.data(this, "mousewheel-line-height");
                    c *= m, p *= m, d *= m
                } else if (2 === a.deltaMode) {
                    var v = e.data(this, "mousewheel-page-height");
                    c *= v, p *= v, d *= v
                }
                if (f = Math.max(Math.abs(p), Math.abs(d)), (!o || o > f) && (o = f, i(a, f) && (o /= 40)), i(a, f) && (c /= 40, d /= 40, p /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / o), d = Math[d >= 1 ? "floor" : "ceil"](d / o), p = Math[p >= 1 ? "floor" : "ceil"](p / o), u.settings.normalizeOffset && this.getBoundingClientRect) {
                    var y = this.getBoundingClientRect();
                    h = t.clientX - y.left, g = t.clientY - y.top
                }
                return t.deltaX = d, t.deltaY = p, t.deltaFactor = o, t.offsetX = h, t.offsetY = g, t.deltaMode = 0, s.unshift(t, c, d, p), r && clearTimeout(r), r = setTimeout(n, 200), (e.event.dispatch || e.event.handle).apply(this, s)
            }
        }

        function n() {
            o = null
        }

        function i(e, t) {
            return u.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 === 0
        }
        var r, o, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            s = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            l = Array.prototype.slice;
        if (e.event.fixHooks)
            for (var c = a.length; c;) e.event.fixHooks[a[--c]] = e.event.mouseHooks;
        var u = e.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var n = s.length; n;) this.addEventListener(s[--n], t, !1);
                else this.onmousewheel = t;
                e.data(this, "mousewheel-line-height", u.getLineHeight(this)), e.data(this, "mousewheel-page-height", u.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var n = s.length; n;) this.removeEventListener(s[--n], t, !1);
                else this.onmousewheel = null;
                e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(t) {
                var n = e(t),
                    i = n["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                return i.length || (i = e("body")), parseInt(i.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
            },
            getPageHeight: function(t) {
                return e(t).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        e.fn.extend({
            mousewheel: function(e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function(e) {
                return this.unbind("mousewheel", e)
            }
        })
    }), ! function(e) {
        var t = "data-imgcolor",
            n = "data-img-parent",
            i = "data-css-background",
            r = "ab-color-found",
            o = {
                selector: '[data-colorcheck="1"]',
                parent: ".slide_page",
                exclude: ["rgb(0,0,0)", "rgba(255,255,255)"],
                normalizeTextColor: !1,
                normalizedTextColors: {
                    light: "#fff",
                    dark: "#000"
                },
                lumaClasses: {
                    light: "light",
                    dark: "dark"
                }
            };
        ! function(e) {
            "use strict";
            var t = function() {
                    return document.createElement("canvas").getContext("2d")
                },
                n = function(e, n) {
                    var i = new Image,
                        r = e.src || e;
                    "data:" !== r.substring(0, 5) && (i.crossOrigin = "Anonymous"), i.onload = function() {
                        var e = t("2d");
                        e.drawImage(i, 0, 0);
                        var r = e.getImageData(0, 0, i.width, i.height);
                        n && n(r.data)
                    }, i.src = r
                },
                i = function(e) {
                    return ["rgb(", e, ")"].join("")
                },
                r = function(e) {
                    return e.map(function(e) {
                        return i(e.name)
                    })
                },
                o = 5,
                a = 10,
                s = {};
            s.colors = function(e, t) {
                t = t || {};
                var s = t.exclude || [],
                    l = t.paletteSize || a;
                n(e, function(n) {
                    for (var a = e.width * e.height || n.length, c = {}, u = "", d = [], p = {
                            dominant: {
                                name: "",
                                count: 0
                            },
                            palette: Array.apply(null, new Array(l)).map(Boolean).map(function() {
                                return {
                                    name: "0,0,0",
                                    count: 0
                                }
                            })
                        }, f = 0; a > f;) {
                        if (d[0] = n[f], d[1] = n[f + 1], d[2] = n[f + 2], u = d.join(","), c[u] = u in c ? c[u] + 1 : 1, -1 === s.indexOf(i(u))) {
                            var h = c[u];
                            h > p.dominant.count ? (p.dominant.name = u, p.dominant.count = h) : p.palette.some(function(e) {
                                return h > e.count ? (e.name = u, e.count = h, !0) : void 0
                            })
                        }
                        f += 4 * o
                    }
                    if (t.success) {
                        var g = r(p.palette);
                        t.success({
                            dominant: i(p.dominant.name),
                            secondary: g[0],
                            palette: g
                        })
                    }
                })
            }, e.RGBaster = e.RGBaster || s
        }(window), e.adaptiveBackground = {
            run: function(a) {
                var s = e.extend({}, o, a);
                e(s.selector).each(function() {
                    var o = e(this),
                        a = function() {
                            var e = l() ? c() : o[0];
                            RGBaster.colors(e, {
                                paletteSize: 20,
                                exclude: s.exclude,
                                success: function(e) {
                                    o.attr(t, e.dominant), o.trigger(r, {
                                        color: e.dominant,
                                        palette: e.palette
                                    })
                                }
                            })
                        },
                        l = function() {
                            return o.attr(i)
                        },
                        c = function() {
                            return o.css("background-image").replace("url(", "").replace(")", "")
                        };
                    o.on(r, function(e, t) {
                        var i;
                        i = s.parent && o.parents(s.parent).length ? o.parents(s.parent) : o.attr(n) && o.parents(o.attr(n)).length ? o.parents(o.attr(n)) : l() ? o : s.parent ? o.parents(s.parent) : o.parent();
                        var r = function() {
                                var e = t.color.match(/\d+/g);
                                return (299 * e[0] + 587 * e[1] + 114 * e[2]) / 1e3
                            },
                            a = function(e) {
                                return r(e) >= 128 ? s.normalizedTextColors.dark : s.normalizedTextColors.light
                            },
                            c = function(e) {
                                return r(e) <= 128 ? s.lumaClasses.dark : s.lumaClasses.light
                            };
                        s.normalizeTextColor && i.css({
                            color: a(t.color)
                        }), i.addClass(c(t.color)).attr("data-yaq", r(t.color)), s.success && s.success(o, t)
                    }), a()
                })
            }
        }
    }(jQuery), ! function(e) {
        return "function" == typeof define && define.amd ? define(["jquery"], function(t) {
            return e(t, window, document)
        }) : "object" == typeof exports ? module.exports = e(require("jquery"), window, document) : e(jQuery, window, document)
    }(function(e, t, n) {
        "use strict";
        var i, r, o, a, s, l, c, u, d, p, f, h, g, m, v, y, w, b, x, S, $, T, C, P, A, k, _, L, E, H, j;
        C = {
            paneClass: "nano-pane",
            sliderClass: "nano-slider",
            contentClass: "nano-content",
            iOSNativeScrolling: !1,
            preventPageScrolling: !1,
            disableResize: !1,
            alwaysVisible: !1,
            flashDelay: 1500,
            sliderMinHeight: 20,
            sliderMaxHeight: null,
            documentContext: null,
            windowContext: null
        }, b = "scrollbar", w = "scroll", d = "mousedown", p = "mouseenter", f = "mousemove", g = "mousewheel", h = "mouseup", y = "resize", s = "drag", l = "enter", S = "up", v = "panedown", o = "DOMMouseScroll", a = "down", $ = "wheel", c = "keydown", u = "keyup", x = "touchmove", i = "Microsoft Internet Explorer" === t.navigator.appName && /msie 7./i.test(t.navigator.appVersion) && t.ActiveXObject, r = null, _ = t.requestAnimationFrame, T = t.cancelAnimationFrame, E = n.createElement("div").style, j = function() {
            var e, t, n, i, r, o;
            for (i = ["t", "webkitT", "MozT", "msT", "OT"], e = r = 0, o = i.length; o > r; e = ++r)
                if (n = i[e], t = i[e] + "ransform", t in E) return i[e].substr(0, i[e].length - 1);
            return !1
        }(), H = function(e) {
            return j === !1 ? !1 : "" === j ? e : j + e.charAt(0).toUpperCase() + e.substr(1)
        }, L = H("transform"), A = L !== !1, P = function() {
            var e, t, i;
            return e = n.createElement("div"), t = e.style, t.position = "absolute", t.width = "100px", t.height = "100px", t.overflow = w, t.top = "-9999px", n.body.appendChild(e), i = e.offsetWidth - e.clientWidth, n.body.removeChild(e), i
        }, k = function() {
            var e, n, i;
            return n = t.navigator.userAgent, (e = /(?=.+Mac OS X)(?=.+Firefox)/.test(n)) ? (i = /Firefox\/\d{2}\./.exec(n), i && (i = i[0].replace(/\D+/g, "")), e && +i > 23) : !1
        }, m = function() {
            function c(i, o) {
                this.el = i, this.options = o, r || (r = P()), this.$el = e(this.el), this.doc = e(this.options.documentContext || n), this.win = e(this.options.windowContext || t), this.body = this.doc.find("body"), this.$content = this.$el.children("." + this.options.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
            }
            return c.prototype.preventScrolling = function(e, t) {
                if (this.isActive)
                    if (e.type === o)(t === a && e.originalEvent.detail > 0 || t === S && e.originalEvent.detail < 0) && e.preventDefault();
                    else if (e.type === g) {
                    if (!e.originalEvent || !e.originalEvent.wheelDelta) return;
                    (t === a && e.originalEvent.wheelDelta < 0 || t === S && e.originalEvent.wheelDelta > 0) && e.preventDefault()
                }
            }, c.prototype.nativeScrolling = function() {
                this.$content.css({
                    WebkitOverflowScrolling: "touch"
                }), this.iOSNativeScrolling = !0, this.isActive = !0
            }, c.prototype.updateScrollValues = function() {
                var e, t;
                e = this.content, this.maxScrollTop = e.scrollHeight - e.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = e.scrollTop, t = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== t && this.$el.trigger("update", {
                    position: this.contentScrollTop,
                    maximum: this.maxScrollTop,
                    direction: t
                }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
            }, c.prototype.setOnScrollStyles = function() {
                var e;
                A ? (e = {}, e[L] = "translate(0, " + this.sliderTop + "px)") : e = {
                    top: this.sliderTop
                }, _ ? (T && this.scrollRAF && T(this.scrollRAF), this.scrollRAF = _(function(t) {
                    return function() {
                        return t.scrollRAF = null, t.slider.css(e)
                    }
                }(this))) : this.slider.css(e)
            }, c.prototype.createEvents = function() {
                this.events = {
                    down: function(e) {
                        return function(t) {
                            return e.isBeingDragged = !0, e.offsetY = t.pageY - e.slider.offset().top, e.slider.is(t.target) || (e.offsetY = 0), e.pane.addClass("active"), e.doc.bind(f, e.events[s]).bind(h, e.events[S]), e.body.bind(p, e.events[l]), !1
                        }
                    }(this),
                    drag: function(e) {
                        return function(t) {
                            return e.sliderY = t.pageY - e.$el.offset().top - e.paneTop - (e.offsetY || .5 * e.sliderHeight), e.scroll(), e.contentScrollTop >= e.maxScrollTop && e.prevScrollTop !== e.maxScrollTop ? e.$el.trigger("scrollend") : 0 === e.contentScrollTop && 0 !== e.prevScrollTop && e.$el.trigger("scrolltop"), !1
                        }
                    }(this),
                    up: function(e) {
                        return function() {
                            return e.isBeingDragged = !1, e.pane.removeClass("active"), e.doc.unbind(f, e.events[s]).unbind(h, e.events[S]), e.body.unbind(p, e.events[l]), !1
                        }
                    }(this),
                    resize: function(e) {
                        return function() {
                            e.reset()
                        }
                    }(this),
                    panedown: function(e) {
                        return function(t) {
                            return e.sliderY = (t.offsetY || t.originalEvent.layerY) - .5 * e.sliderHeight, e.scroll(), e.events.down(t), !1
                        }
                    }(this),
                    scroll: function(e) {
                        return function(t) {
                            e.updateScrollValues(), e.isBeingDragged || (e.iOSNativeScrolling || (e.sliderY = e.sliderTop, e.setOnScrollStyles()), null != t && (e.contentScrollTop >= e.maxScrollTop ? (e.options.preventPageScrolling && e.preventScrolling(t, a), e.prevScrollTop !== e.maxScrollTop && e.$el.trigger("scrollend")) : 0 === e.contentScrollTop && (e.options.preventPageScrolling && e.preventScrolling(t, S), 0 !== e.prevScrollTop && e.$el.trigger("scrolltop"))))
                        }
                    }(this),
                    wheel: function(e) {
                        return function(t) {
                            var n;
                            return null != t ? (n = t.delta || t.wheelDelta || t.originalEvent && t.originalEvent.wheelDelta || -t.detail || t.originalEvent && -t.originalEvent.detail, n && (e.sliderY += -n / 3), e.scroll(), !1) : void 0
                        }
                    }(this),
                    enter: function(e) {
                        return function(t) {
                            var n;
                            return e.isBeingDragged && 1 !== (t.buttons || t.which) ? (n = e.events)[S].apply(n, arguments) : void 0
                        }
                    }(this)
                }
            }, c.prototype.addEvents = function() {
                var e;
                this.removeEvents(), e = this.events, this.options.disableResize || this.win.bind(y, e[y]), this.iOSNativeScrolling || (this.slider.bind(d, e[a]), this.pane.bind(d, e[v]).bind("" + g + " " + o, e[$])), this.$content.bind("" + w + " " + g + " " + o + " " + x, e[w])
            }, c.prototype.removeEvents = function() {
                var e;
                e = this.events, this.win.unbind(y, e[y]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + w + " " + g + " " + o + " " + x, e[w])
            }, c.prototype.generate = function() {
                var e, n, i, o, a, s, l;
                return o = this.options, s = o.paneClass, l = o.sliderClass, e = o.contentClass, (a = this.$el.children("." + s)).length || a.children("." + l).length || this.$el.append('<div class="' + s + '"><div class="' + l + '" /></div>'), this.pane = this.$el.children("." + s), this.slider = this.pane.find("." + l), 0 === r && k() ? (i = t.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), n = {
                    right: -14,
                    paddingRight: +i + 14
                }) : r && (n = {
                    right: -r
                }, this.$el.addClass("has-scrollbar")), null != n && this.$content.css(n), this
            }, c.prototype.restore = function() {
                this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
            }, c.prototype.reset = function() {
                var e, t, n, o, a, s, l, c, u, d, p, f;
                return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), e = this.content, o = e.style, a = o.overflowY, i && this.$content.css({
                    height: this.$content.height()
                }), t = e.scrollHeight + r, d = parseInt(this.$el.css("max-height"), 10), d > 0 && (this.$el.height(""), this.$el.height(e.scrollHeight > d ? d : e.scrollHeight)), l = this.pane.outerHeight(!1), u = parseInt(this.pane.css("top"), 10), s = parseInt(this.pane.css("bottom"), 10), c = l + u + s, f = Math.round(c / t * l), f < this.options.sliderMinHeight ? f = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && f > this.options.sliderMaxHeight && (f = this.options.sliderMaxHeight), a === w && o.overflowX !== w && (f += r), this.maxSliderTop = c - f, this.contentHeight = t, this.paneHeight = l, this.paneOuterHeight = c, this.sliderHeight = f, this.paneTop = u, this.slider.height(f), this.events.scroll(), this.pane.show(), this.isActive = !0, e.scrollHeight === e.clientHeight || this.pane.outerHeight(!0) >= e.scrollHeight && a !== w ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === e.scrollHeight && a === w ? this.slider.hide() : this.slider.show(), this.pane.css({
                    opacity: this.options.alwaysVisible ? 1 : "",
                    visibility: this.options.alwaysVisible ? "visible" : ""
                }), n = this.$content.css("position"), ("static" === n || "relative" === n) && (p = parseInt(this.$content.css("right"), 10), p && this.$content.css({
                    right: "",
                    marginRight: p
                })), this)
            }, c.prototype.scroll = function() {
                return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
            }, c.prototype.scrollBottom = function(e) {
                return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - e).trigger(g), this.stop().restore(), this) : void 0
            }, c.prototype.scrollTop = function(e) {
                return this.isActive ? (this.$content.scrollTop(+e).trigger(g), this.stop().restore(), this) : void 0
            }, c.prototype.scrollTo = function(e) {
                return this.isActive ? (this.scrollTop(this.$el.find(e).get(0).offsetTop), this) : void 0
            }, c.prototype.stop = function() {
                return T && this.scrollRAF && (T(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
            }, c.prototype.destroy = function() {
                return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), i && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({
                    right: ""
                })), this
            }, c.prototype.flash = function() {
                return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function(e) {
                    return function() {
                        e.pane.removeClass("flashed")
                    }
                }(this), this.options.flashDelay), this) : void 0
            }, c
        }(), e.fn.nanoScroller = function(t) {
            return this.each(function() {
                var n, i;
                if ((i = this.nanoscroller) || (n = e.extend({}, C, t), this.nanoscroller = i = new m(this, n)), t && "object" == typeof t) {
                    if (e.extend(i.options, t), null != t.scrollBottom) return i.scrollBottom(t.scrollBottom);
                    if (null != t.scrollTop) return i.scrollTop(t.scrollTop);
                    if (t.scrollTo) return i.scrollTo(t.scrollTo);
                    if ("bottom" === t.scroll) return i.scrollBottom(0);
                    if ("top" === t.scroll) return i.scrollTop(0);
                    if (t.scroll && t.scroll instanceof e) return i.scrollTo(t.scroll);
                    if (t.stop) return i.stop();
                    if (t.destroy) return i.destroy();
                    if (t.flash) return i.flash()
                }
                return i.reset()
            })
        }, e.fn.nanoScroller.Constructor = m
    }), ! function e(t, n, i) {
        function r(a, s) {
            if (!n[a]) {
                if (!t[a]) {
                    var l = "function" == typeof require && require;
                    if (!s && l) return l(a, !0);
                    if (o) return o(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[a] = {
                    exports: {}
                };
                t[a][0].call(u.exports, function(e) {
                    var n = t[a][1][e];
                    return r(n ? n : e)
                }, u, u.exports, e, t, n, i)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
        return r
    }({
        1: [function(e, t) {
            "use strict";

            function n(e) {
                e.fn.perfectScrollbar = function(t) {
                    return this.each(function() {
                        if ("object" == typeof t || "undefined" == typeof t) {
                            var n = t;
                            r.get(this) || i.initialize(this, n)
                        } else {
                            var o = t;
                            "update" === o ? i.update(this) : "destroy" === o && i.destroy(this)
                        }
                        return e(this)
                    })
                }
            }
            var i = e("../main"),
                r = e("../plugin/instances");
            if ("function" == typeof define && define.amd) define(["jquery"], n);
            else {
                var o = window.jQuery ? window.jQuery : window.$;
                "undefined" != typeof o && n(o)
            }
            t.exports = n
        }, {
            "../main": 7,
            "../plugin/instances": 18
        }],
        2: [function(e, t, n) {
            "use strict";

            function i(e, t) {
                var n = e.className.split(" ");
                n.indexOf(t) < 0 && n.push(t), e.className = n.join(" ")
            }

            function r(e, t) {
                var n = e.className.split(" "),
                    i = n.indexOf(t);
                i >= 0 && n.splice(i, 1), e.className = n.join(" ")
            }
            n.add = function(e, t) {
                e.classList ? e.classList.add(t) : i(e, t)
            }, n.remove = function(e, t) {
                e.classList ? e.classList.remove(t) : r(e, t)
            }, n.list = function(e) {
                return e.classList ? e.classList : e.className.split(" ")
            }
        }, {}],
        3: [function(e, t, n) {
            "use strict";

            function i(e, t) {
                return window.getComputedStyle(e)[t]
            }

            function r(e, t, n) {
                return "number" == typeof n && (n = n.toString() + "px"), e.style[t] = n, e
            }

            function o(e, t) {
                for (var n in t) {
                    var i = t[n];
                    "number" == typeof i && (i = i.toString() + "px"), e.style[n] = i
                }
                return e
            }
            n.e = function(e, t) {
                var n = document.createElement(e);
                return n.className = t, n
            }, n.appendTo = function(e, t) {
                return t.appendChild(e), e
            }, n.css = function(e, t, n) {
                return "object" == typeof t ? o(e, t) : "undefined" == typeof n ? i(e, t) : r(e, t, n)
            }, n.matches = function(e, t) {
                return "undefined" != typeof e.matches ? e.matches(t) : "undefined" != typeof e.matchesSelector ? e.matchesSelector(t) : "undefined" != typeof e.webkitMatchesSelector ? e.webkitMatchesSelector(t) : "undefined" != typeof e.mozMatchesSelector ? e.mozMatchesSelector(t) : "undefined" != typeof e.msMatchesSelector ? e.msMatchesSelector(t) : void 0
            }, n.remove = function(e) {
                "undefined" != typeof e.remove ? e.remove() : e.parentNode.removeChild(e)
            }
        }, {}],
        4: [function(e, t) {
            "use strict";
            var n = function(e) {
                this.element = e, this.events = {}
            };
            n.prototype.bind = function(e, t) {
                "undefined" == typeof this.events[e] && (this.events[e] = []), this.events[e].push(t), this.element.addEventListener(e, t, !1)
            }, n.prototype.unbind = function(e, t) {
                var n = "undefined" != typeof t;
                this.events[e] = this.events[e].filter(function(i) {
                    return n && i !== t ? !0 : (this.element.removeEventListener(e, i, !1), !1)
                }, this)
            }, n.prototype.unbindAll = function() {
                for (var e in this.events) this.unbind(e)
            };
            var i = function() {
                this.eventElements = []
            };
            i.prototype.eventElement = function(e) {
                var t = this.eventElements.filter(function(t) {
                    return t.element === e
                })[0];
                return "undefined" == typeof t && (t = new n(e), this.eventElements.push(t)), t
            }, i.prototype.bind = function(e, t, n) {
                this.eventElement(e).bind(t, n)
            }, i.prototype.unbind = function(e, t, n) {
                this.eventElement(e).unbind(t, n)
            }, i.prototype.unbindAll = function() {
                for (var e = 0; e < this.eventElements.length; e++) this.eventElements[e].unbindAll()
            }, i.prototype.once = function(e, t, n) {
                var i = this.eventElement(e),
                    r = function(e) {
                        i.unbind(t, r), n(e)
                    };
                i.bind(t, r)
            }, t.exports = i
        }, {}],
        5: [function(e, t) {
            "use strict";
            t.exports = function() {
                function e() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }
                return function() {
                    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
                }
            }()
        }, {}],
        6: [function(e, t, n) {
            "use strict";
            var i = e("./class"),
                r = e("./dom");
            n.toInt = function(e) {
                return "string" == typeof e ? parseInt(e, 10) : ~~e
            }, n.clone = function(e) {
                if (null === e) return null;
                if ("object" == typeof e) {
                    var t = {};
                    for (var n in e) t[n] = this.clone(e[n]);
                    return t
                }
                return e
            }, n.extend = function(e, t) {
                var n = this.clone(e);
                for (var i in t) n[i] = this.clone(t[i]);
                return n
            }, n.isEditable = function(e) {
                return r.matches(e, "input,[contenteditable]") || r.matches(e, "select,[contenteditable]") || r.matches(e, "textarea,[contenteditable]") || r.matches(e, "button,[contenteditable]")
            }, n.removePsClasses = function(e) {
                for (var t = i.list(e), n = 0; n < t.length; n++) {
                    var r = t[n];
                    0 === r.indexOf("ps-") && i.remove(e, r)
                }
            }, n.outerWidth = function(e) {
                return this.toInt(r.css(e, "width")) + this.toInt(r.css(e, "paddingLeft")) + this.toInt(r.css(e, "paddingRight")) + this.toInt(r.css(e, "borderLeftWidth")) + this.toInt(r.css(e, "borderRightWidth"))
            }, n.startScrolling = function(e, t) {
                i.add(e, "ps-in-scrolling"), "undefined" != typeof t ? i.add(e, "ps-" + t) : (i.add(e, "ps-x"), i.add(e, "ps-y"))
            }, n.stopScrolling = function(e, t) {
                i.remove(e, "ps-in-scrolling"), "undefined" != typeof t ? i.remove(e, "ps-" + t) : (i.remove(e, "ps-x"), i.remove(e, "ps-y"))
            }, n.env = {
                isWebKit: "WebkitAppearance" in document.documentElement.style,
                supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
        }, {
            "./class": 2,
            "./dom": 3
        }],
        7: [function(e, t) {
            "use strict";
            var n = e("./plugin/destroy"),
                i = e("./plugin/initialize"),
                r = e("./plugin/update");
            t.exports = {
                initialize: i,
                update: r,
                destroy: n
            }
        }, {
            "./plugin/destroy": 9,
            "./plugin/initialize": 17,
            "./plugin/update": 20
        }],
        8: [function(e, t) {
            "use strict";
            t.exports = {
                wheelSpeed: 1,
                wheelPropagation: !1,
                swipePropagation: !0,
                minScrollbarLength: null,
                maxScrollbarLength: null,
                useBothWheelAxes: !1,
                useKeyboard: !0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0
            }
        }, {}],
        9: [function(e, t) {
            "use strict";
            var n = e("../lib/dom"),
                i = e("../lib/helper"),
                r = e("./instances");
            t.exports = function(e) {
                var t = r.get(e);
                t.event.unbindAll(), n.remove(t.scrollbarX), n.remove(t.scrollbarY), n.remove(t.scrollbarXRail), n.remove(t.scrollbarYRail), i.removePsClasses(e), r.remove(e)
            }
        }, {
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18
        }],
        10: [function(e, t) {
            "use strict";

            function n(e, t) {
                function n(e) {
                    return e.getBoundingClientRect()
                }
                var r = window.Event.prototype.stopPropagation.bind;
                t.event.bind(t.scrollbarY, "click", r), t.event.bind(t.scrollbarYRail, "click", function(r) {
                    var a = i.toInt(t.scrollbarYHeight / 2),
                        s = r.pageY - n(t.scrollbarYRail).top - a,
                        l = t.containerHeight - t.scrollbarYHeight,
                        c = s / l;
                    0 > c ? c = 0 : c > 1 && (c = 1), e.scrollTop = (t.contentHeight - t.containerHeight) * c, o(e)
                }), t.event.bind(t.scrollbarX, "click", r), t.event.bind(t.scrollbarXRail, "click", function(r) {
                    var a = i.toInt(t.scrollbarXWidth / 2),
                        s = r.pageX - n(t.scrollbarXRail).left - a;
                    console.log(r.pageX, t.scrollbarXRail.offsetLeft);
                    var l = t.containerWidth - t.scrollbarXWidth,
                        c = s / l;
                    0 > c ? c = 0 : c > 1 && (c = 1), e.scrollLeft = (t.contentWidth - t.containerWidth) * c, o(e)
                })
            }
            var i = e("../../lib/helper"),
                r = e("../instances"),
                o = e("../update-geometry");
            t.exports = function(e) {
                var t = r.get(e);
                n(e, t)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }],
        11: [function(e, t) {
            "use strict";

            function n(e, t) {
                function n(n) {
                    var r = i + n,
                        a = t.containerWidth - t.scrollbarXWidth;
                    t.scrollbarXLeft = 0 > r ? 0 : r > a ? a : r;
                    var s = o.toInt(t.scrollbarXLeft * (t.contentWidth - t.containerWidth) / (t.containerWidth - t.scrollbarXWidth));
                    e.scrollLeft = s
                }
                var i = null,
                    a = null,
                    l = function(t) {
                        n(t.pageX - a), s(e), t.stopPropagation(), t.preventDefault()
                    },
                    c = function() {
                        o.stopScrolling(e, "x"), t.event.unbind(t.ownerDocument, "mousemove", l)
                    };
                t.event.bind(t.scrollbarX, "mousedown", function(n) {
                    a = n.pageX, i = o.toInt(r.css(t.scrollbarX, "left")), o.startScrolling(e, "x"), t.event.bind(t.ownerDocument, "mousemove", l), t.event.once(t.ownerDocument, "mouseup", c), n.stopPropagation(), n.preventDefault()
                })
            }

            function i(e, t) {
                function n(n) {
                    var r = i + n,
                        a = t.containerHeight - t.scrollbarYHeight;
                    t.scrollbarYTop = 0 > r ? 0 : r > a ? a : r;
                    var s = o.toInt(t.scrollbarYTop * (t.contentHeight - t.containerHeight) / (t.containerHeight - t.scrollbarYHeight));
                    e.scrollTop = s
                }
                var i = null,
                    a = null,
                    l = function(t) {
                        n(t.pageY - a), s(e), t.stopPropagation(), t.preventDefault()
                    },
                    c = function() {
                        o.stopScrolling(e, "y"), t.event.unbind(t.ownerDocument, "mousemove", l)
                    };
                t.event.bind(t.scrollbarY, "mousedown", function(n) {
                    a = n.pageY, i = o.toInt(r.css(t.scrollbarY, "top")), o.startScrolling(e, "y"), t.event.bind(t.ownerDocument, "mousemove", l), t.event.once(t.ownerDocument, "mouseup", c), n.stopPropagation(), n.preventDefault()
                })
            }
            var r = e("../../lib/dom"),
                o = e("../../lib/helper"),
                a = e("../instances"),
                s = e("../update-geometry");
            t.exports = function(e) {
                var t = a.get(e);
                n(e, t), i(e, t)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }],
        12: [function(e, t) {
            "use strict";

            function n(e, t) {
                function n(n, i) {
                    var r = e.scrollTop;
                    if (0 === n) {
                        if (!t.scrollbarYActive) return !1;
                        if (0 === r && i > 0 || r >= t.contentHeight - t.containerHeight && 0 > i) return !t.settings.wheelPropagation
                    }
                    var o = e.scrollLeft;
                    if (0 === i) {
                        if (!t.scrollbarXActive) return !1;
                        if (0 === o && 0 > n || o >= t.contentWidth - t.containerWidth && n > 0) return !t.settings.wheelPropagation
                    }
                    return !0
                }
                var r = !1;
                t.event.bind(e, "mouseenter", function() {
                    r = !0
                }), t.event.bind(e, "mouseleave", function() {
                    r = !1
                });
                var a = !1;
                t.event.bind(t.ownerDocument, "keydown", function(s) {
                    if ((!s.isDefaultPrevented || !s.isDefaultPrevented()) && r) {
                        var l = document.activeElement ? document.activeElement : t.ownerDocument.activeElement;
                        if (l) {
                            for (; l.shadowRoot;) l = l.shadowRoot.activeElement;
                            if (i.isEditable(l)) return
                        }
                        var c = 0,
                            u = 0;
                        switch (s.which) {
                            case 37:
                                c = -30;
                                break;
                            case 38:
                                u = 30;
                                break;
                            case 39:
                                c = 30;
                                break;
                            case 40:
                                u = -30;
                                break;
                            case 33:
                                u = 90;
                                break;
                            case 32:
                            case 34:
                                u = -90;
                                break;
                            case 35:
                                u = s.ctrlKey ? -t.contentHeight : -t.containerHeight;
                                break;
                            case 36:
                                u = s.ctrlKey ? e.scrollTop : t.containerHeight;
                                break;
                            default:
                                return
                        }
                        e.scrollTop = e.scrollTop - u, e.scrollLeft = e.scrollLeft + c, o(e), a = n(c, u), a && s.preventDefault()
                    }
                })
            }
            var i = e("../../lib/helper"),
                r = e("../instances"),
                o = e("../update-geometry");
            t.exports = function(e) {
                var t = r.get(e);
                n(e, t)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }],
        13: [function(e, t) {
            "use strict";

            function n(e, t) {
                function n(n, i) {
                    var r = e.scrollTop;
                    if (0 === n) {
                        if (!t.scrollbarYActive) return !1;
                        if (0 === r && i > 0 || r >= t.contentHeight - t.containerHeight && 0 > i) return !t.settings.wheelPropagation
                    }
                    var o = e.scrollLeft;
                    if (0 === i) {
                        if (!t.scrollbarXActive) return !1;
                        if (0 === o && 0 > n || o >= t.contentWidth - t.containerWidth && n > 0) return !t.settings.wheelPropagation
                    }
                    return !0
                }

                function r(e) {
                    var t = e.deltaX,
                        n = -1 * e.deltaY;
                    return ("undefined" == typeof t || "undefined" == typeof n) && (t = -1 * e.wheelDeltaX / 6, n = e.wheelDeltaY / 6), e.deltaMode && 1 === e.deltaMode && (t *= 10, n *= 10), t !== t && n !== n && (t = 0, n = e.wheelDelta), [t, n]
                }

                function a(a) {
                    if (i.env.isWebKit || !e.querySelector("select:focus")) {
                        var l = r(a),
                            c = l[0],
                            u = l[1];
                        s = !1, t.settings.useBothWheelAxes ? t.scrollbarYActive && !t.scrollbarXActive ? (e.scrollTop = u ? e.scrollTop - u * t.settings.wheelSpeed : e.scrollTop + c * t.settings.wheelSpeed, s = !0) : t.scrollbarXActive && !t.scrollbarYActive && (e.scrollLeft = c ? e.scrollLeft + c * t.settings.wheelSpeed : e.scrollLeft - u * t.settings.wheelSpeed, s = !0) : (e.scrollTop = e.scrollTop - u * t.settings.wheelSpeed, e.scrollLeft = e.scrollLeft + c * t.settings.wheelSpeed), o(e), s = s || n(c, u), s && (a.stopPropagation(), a.preventDefault())
                    }
                }
                var s = !1;
                "undefined" != typeof window.onwheel ? t.event.bind(e, "wheel", a) : "undefined" != typeof window.onmousewheel && t.event.bind(e, "mousewheel", a)
            }
            var i = e("../../lib/helper"),
                r = e("../instances"),
                o = e("../update-geometry");
            t.exports = function(e) {
                var t = r.get(e);
                n(e, t)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }],
        14: [function(e, t) {
            "use strict";

            function n(e, t) {
                t.event.bind(e, "scroll", function() {
                    r(e)
                })
            }
            var i = e("../instances"),
                r = e("../update-geometry");
            t.exports = function(e) {
                var t = i.get(e);
                n(e, t)
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19
        }],
        15: [function(e, t) {
            "use strict";

            function n(e, t) {
                function n() {
                    var e = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                    return 0 === e.toString().length ? null : e.getRangeAt(0).commonAncestorContainer
                }

                function a() {
                    l || (l = setInterval(function() {
                        return r.get(e) ? (e.scrollTop = e.scrollTop + c.top, e.scrollLeft = e.scrollLeft + c.left, void o(e)) : void clearInterval(l)
                    }, 50))
                }

                function s() {
                    l && (clearInterval(l), l = null), i.stopScrolling(e)
                }
                var l = null,
                    c = {
                        top: 0,
                        left: 0
                    },
                    u = !1;
                t.event.bind(t.ownerDocument, "selectionchange", function() {
                    e.contains(n()) ? u = !0 : (u = !1, s())
                }), t.event.bind(window, "mouseup", function() {
                    u && (u = !1, s())
                }), t.event.bind(window, "mousemove", function(t) {
                    if (u) {
                        var n = {
                                x: t.pageX,
                                y: t.pageY
                            },
                            r = {
                                left: e.offsetLeft,
                                right: e.offsetLeft + e.offsetWidth,
                                top: e.offsetTop,
                                bottom: e.offsetTop + e.offsetHeight
                            };
                        n.x < r.left + 3 ? (c.left = -5, i.startScrolling(e, "x")) : n.x > r.right - 3 ? (c.left = 5, i.startScrolling(e, "x")) : c.left = 0, n.y < r.top + 3 ? (c.top = r.top + 3 - n.y < 5 ? -5 : -20, i.startScrolling(e, "y")) : n.y > r.bottom - 3 ? (c.top = n.y - r.bottom + 3 < 5 ? 5 : 20, i.startScrolling(e, "y")) : c.top = 0, 0 === c.top && 0 === c.left ? s() : a()
                    }
                })
            }
            var i = e("../../lib/helper"),
                r = e("../instances"),
                o = e("../update-geometry");
            t.exports = function(e) {
                var t = r.get(e);
                n(e, t)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }],
        16: [function(e, t) {
            "use strict";

            function n(e, t, n, o) {
                function a(n, i) {
                    var r = e.scrollTop,
                        o = e.scrollLeft,
                        a = Math.abs(n),
                        s = Math.abs(i);
                    if (s > a) {
                        if (0 > i && r === t.contentHeight - t.containerHeight || i > 0 && 0 === r) return !t.settings.swipePropagation
                    } else if (a > s && (0 > n && o === t.contentWidth - t.containerWidth || n > 0 && 0 === o)) return !t.settings.swipePropagation;
                    return !0
                }

                function s(t, n) {
                    e.scrollTop = e.scrollTop - n, e.scrollLeft = e.scrollLeft - t, r(e)
                }

                function l() {
                    w = !0
                }

                function c() {
                    w = !1
                }

                function u(e) {
                    return e.targetTouches ? e.targetTouches[0] : e
                }

                function d(e) {
                    return e.targetTouches && 1 === e.targetTouches.length ? !0 : e.pointerType && "mouse" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_MOUSE ? !0 : !1
                }

                function p(e) {
                    if (d(e)) {
                        b = !0;
                        var t = u(e);
                        g.pageX = t.pageX, g.pageY = t.pageY, m = (new Date).getTime(), null !== y && clearInterval(y), e.stopPropagation()
                    }
                }

                function f(e) {
                    if (!w && b && d(e)) {
                        var t = u(e),
                            n = {
                                pageX: t.pageX,
                                pageY: t.pageY
                            },
                            i = n.pageX - g.pageX,
                            r = n.pageY - g.pageY;
                        s(i, r), g = n;
                        var o = (new Date).getTime(),
                            l = o - m;
                        l > 0 && (v.x = i / l, v.y = r / l, m = o), a(i, r) && (e.stopPropagation(), e.preventDefault())
                    }
                }

                function h() {
                    !w && b && (b = !1, clearInterval(y), y = setInterval(function() {
                        return i.get(e) ? Math.abs(v.x) < .01 && Math.abs(v.y) < .01 ? void clearInterval(y) : (s(30 * v.x, 30 * v.y), v.x *= .8, void(v.y *= .8)) : void clearInterval(y)
                    }, 10))
                }
                var g = {},
                    m = 0,
                    v = {},
                    y = null,
                    w = !1,
                    b = !1;
                n && (t.event.bind(window, "touchstart", l), t.event.bind(window, "touchend", c), t.event.bind(e, "touchstart", p), t.event.bind(e, "touchmove", f), t.event.bind(e, "touchend", h)), o && (window.PointerEvent ? (t.event.bind(window, "pointerdown", l), t.event.bind(window, "pointerup", c), t.event.bind(e, "pointerdown", p), t.event.bind(e, "pointermove", f), t.event.bind(e, "pointerup", h)) : window.MSPointerEvent && (t.event.bind(window, "MSPointerDown", l), t.event.bind(window, "MSPointerUp", c), t.event.bind(e, "MSPointerDown", p), t.event.bind(e, "MSPointerMove", f), t.event.bind(e, "MSPointerUp", h)))
            }
            var i = e("../instances"),
                r = e("../update-geometry");
            t.exports = function(e, t, r) {
                var o = i.get(e);
                n(e, o, t, r)
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19
        }],
        17: [function(e, t) {
            "use strict";
            var n = e("../lib/class"),
                i = e("../lib/helper"),
                r = e("./instances"),
                o = e("./update-geometry"),
                a = e("./handler/click-rail"),
                s = e("./handler/drag-scrollbar"),
                l = e("./handler/keyboard"),
                c = e("./handler/mouse-wheel"),
                u = e("./handler/native-scroll"),
                d = e("./handler/selection"),
                p = e("./handler/touch");
            t.exports = function(e, t) {
                t = "object" == typeof t ? t : {}, n.add(e, "ps-container");
                var f = r.add(e);
                f.settings = i.extend(f.settings, t), a(e), s(e), c(e), u(e), d(e), (i.env.supportsTouch || i.env.supportsIePointer) && p(e, i.env.supportsTouch, i.env.supportsIePointer), f.settings.useKeyboard && l(e), o(e)
            }
        }, {
            "../lib/class": 2,
            "../lib/helper": 6,
            "./handler/click-rail": 10,
            "./handler/drag-scrollbar": 11,
            "./handler/keyboard": 12,
            "./handler/mouse-wheel": 13,
            "./handler/native-scroll": 14,
            "./handler/selection": 15,
            "./handler/touch": 16,
            "./instances": 18,
            "./update-geometry": 19
        }],
        18: [function(e, t, n) {
            "use strict";

            function i(e) {
                var t = this;
                t.settings = d.clone(l), t.containerWidth = null, t.containerHeight = null, t.contentWidth = null, t.contentHeight = null, t.isRtl = "rtl" === s.css(e, "direction"), t.event = new c, t.ownerDocument = e.ownerDocument || document, t.scrollbarXRail = s.appendTo(s.e("div", "ps-scrollbar-x-rail"), e), t.scrollbarX = s.appendTo(s.e("div", "ps-scrollbar-x"), t.scrollbarXRail), t.scrollbarXActive = null, t.scrollbarXWidth = null, t.scrollbarXLeft = null, t.scrollbarXBottom = d.toInt(s.css(t.scrollbarXRail, "bottom")), t.isScrollbarXUsingBottom = t.scrollbarXBottom === t.scrollbarXBottom, t.scrollbarXTop = t.isScrollbarXUsingBottom ? null : d.toInt(s.css(t.scrollbarXRail, "top")), t.railBorderXWidth = d.toInt(s.css(t.scrollbarXRail, "borderLeftWidth")) + d.toInt(s.css(t.scrollbarXRail, "borderRightWidth")), t.railXMarginWidth = d.toInt(s.css(t.scrollbarXRail, "marginLeft")) + d.toInt(s.css(t.scrollbarXRail, "marginRight")), t.railXWidth = null, t.scrollbarYRail = s.appendTo(s.e("div", "ps-scrollbar-y-rail"), e), t.scrollbarY = s.appendTo(s.e("div", "ps-scrollbar-y"), t.scrollbarYRail), t.scrollbarYActive = null, t.scrollbarYHeight = null, t.scrollbarYTop = null, t.scrollbarYRight = d.toInt(s.css(t.scrollbarYRail, "right")), t.isScrollbarYUsingRight = t.scrollbarYRight === t.scrollbarYRight, t.scrollbarYLeft = t.isScrollbarYUsingRight ? null : d.toInt(s.css(t.scrollbarYRail, "left")), t.scrollbarYOuterWidth = t.isRtl ? d.outerWidth(t.scrollbarY) : null, t.railBorderYWidth = d.toInt(s.css(t.scrollbarYRail, "borderTopWidth")) + d.toInt(s.css(t.scrollbarYRail, "borderBottomWidth")), t.railYMarginHeight = d.toInt(s.css(t.scrollbarYRail, "marginTop")) + d.toInt(s.css(t.scrollbarYRail, "marginBottom")), t.railYHeight = null
            }

            function r(e) {
                return "undefined" == typeof e.dataset ? e.getAttribute("data-ps-id") : e.dataset.psId
            }

            function o(e, t) {
                "undefined" == typeof e.dataset ? e.setAttribute("data-ps-id", t) : e.dataset.psId = t
            }

            function a(e) {
                "undefined" == typeof e.dataset ? e.removeAttribute("data-ps-id") : delete e.dataset.psId
            }
            var s = e("../lib/dom"),
                l = e("./default-setting"),
                c = e("../lib/event-manager"),
                u = e("../lib/guid"),
                d = e("../lib/helper"),
                p = {};
            n.add = function(e) {
                var t = u();
                return o(e, t), p[t] = new i(e), p[t]
            }, n.remove = function(e) {
                delete p[r(e)], a(e)
            }, n.get = function(e) {
                return p[r(e)]
            }
        }, {
            "../lib/dom": 3,
            "../lib/event-manager": 4,
            "../lib/guid": 5,
            "../lib/helper": 6,
            "./default-setting": 8
        }],
        19: [function(e, t) {
            "use strict";

            function n(e, t) {
                return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t
            }

            function i(e, t) {
                var n = {
                    width: t.railXWidth
                };
                n.left = t.isRtl ? e.scrollLeft + t.containerWidth - t.contentWidth : e.scrollLeft, t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - e.scrollTop : n.top = t.scrollbarXTop + e.scrollTop, o.css(t.scrollbarXRail, n);
                var i = {
                    top: e.scrollTop,
                    height: t.railYHeight
                };
                t.isScrollbarYUsingRight ? i.right = t.isRtl ? t.contentWidth - e.scrollLeft - t.scrollbarYRight - t.scrollbarYOuterWidth : t.scrollbarYRight - e.scrollLeft : i.left = t.isRtl ? e.scrollLeft + 2 * t.containerWidth - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : t.scrollbarYLeft + e.scrollLeft, o.css(t.scrollbarYRail, i), o.css(t.scrollbarX, {
                    left: t.scrollbarXLeft,
                    width: t.scrollbarXWidth - t.railBorderXWidth
                }), o.css(t.scrollbarY, {
                    top: t.scrollbarYTop,
                    height: t.scrollbarYHeight - t.railBorderYWidth
                })
            }
            var r = e("../lib/class"),
                o = e("../lib/dom"),
                a = e("../lib/helper"),
                s = e("./instances");
            t.exports = function(e) {
                var t = s.get(e);
                t.containerWidth = e.clientWidth, t.containerHeight = e.clientHeight, t.contentWidth = e.scrollWidth, t.contentHeight = e.scrollHeight, !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0, t.railXWidth = t.containerWidth - t.railXMarginWidth, t.scrollbarXWidth = n(t, a.toInt(t.railXWidth * t.containerWidth / t.contentWidth)), t.scrollbarXLeft = a.toInt(e.scrollLeft * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : (t.scrollbarXActive = !1, t.scrollbarXWidth = 0, t.scrollbarXLeft = 0, e.scrollLeft = 0), !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0, t.railYHeight = t.containerHeight - t.railYMarginHeight, t.scrollbarYHeight = n(t, a.toInt(t.railYHeight * t.containerHeight / t.contentHeight)), t.scrollbarYTop = a.toInt(e.scrollTop * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : (t.scrollbarYActive = !1, t.scrollbarYHeight = 0, t.scrollbarYTop = 0, e.scrollTop = 0), t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth), t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight), i(e, t), r[t.scrollbarXActive ? "add" : "remove"](e, "ps-active-x"), r[t.scrollbarYActive ? "add" : "remove"](e, "ps-active-y")
            }
        }, {
            "../lib/class": 2,
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18
        }],
        20: [function(e, t) {
            "use strict";
            var n = e("../lib/dom"),
                i = e("./destroy"),
                r = e("./initialize"),
                o = e("./instances"),
                a = e("./update-geometry");
            t.exports = function(e) {
                var t = o.get(e);
                t.scrollbarXRail && e.contains(t.scrollbarXRail) && t.scrollbarYRail && e.contains(t.scrollbarYRail) ? (n.css(t.scrollbarXRail, "display", "none"), n.css(t.scrollbarYRail, "display", "none"), a(e), n.css(t.scrollbarXRail, "display", "block"), n.css(t.scrollbarYRail, "display", "block")) : (i(e), r(e))
            }
        }, {
            "../lib/dom": 3,
            "./destroy": 9,
            "./initialize": 17,
            "./instances": 18,
            "./update-geometry": 19
        }]
    }, {}, [1]);
var docElem = window.document.documentElement,
    stopscroll = pjaxflag = ie = safari = !1,
    device = "pc",
    listPoint = 1480,
    categoryCols = 3,
    windowWidth, windowHeight, headerHeight, $scr, scrollVal = 0;
$(function() {
        $html = $("html"), $spMenu = $(".togglemenu_content"), deviceFromSize(), $html.addClass(getUA()), $fadeElems = $(".footer, .scrollTop, .page, .contact_page"), $hdInner = $(".header .inner > *"), $hdInner.velocity({
            translateY: "20px"
        }, {
            duration: 1
        }), load(), init(), $scr.on("scroll", scrollFunc)
    }), $(window).on("resize", function() {
        setsize(), wsSetsize(), delayInSetting(), wsResetImg()
    }), $.support.pjax && ($(document).on("click", "a.aj, .aj a", function(e) {
        if (e.preventDefault(), e.metaKey || e.ctrlKey) return window.open(this.href), !1;
        var t = $(this).attr("href");
        pjaxflag = !0, stopscroll = !1, $(".hdbar").addClass("notrans").velocity({
            opacity: 0
        }, {
            duration: 300,
            complete: function() {
                $(".hdbar").css({
                    opacity: 1,
                    width: 0
                }), $.pjax({
                    url: t,
                    container: ".page",
                    fragment: ".page",
                    timeout: 2e3,
                    wait: 1e3
                })
            }
        })
    }), $(document).on("pjax:send", function() {
        $html.removeClass("dirNext dirPrev").addClass("loading"), $fadeElems.velocity({
            opacity: 0
        }, {
            duration: 300
        }), $hdInner.velocity({
            opacity: 0,
            translateY: "20px"
        }, {
            duration: 300,
            delay: 300
        }), enable_scroll()
    }), $(document).on("pjax:success", function() {
        var sendUrl = window.location.pathname + window.location.search;
        ga("send", "pageview", sendUrl), $scr.scrollTop("0"), load()
    }), $(document).on("pjax:end", function() {
        init(), createVideo(), pjaxflag || (worksImgLoad(), $(".header .inner > *, .footer, .scrollTop, .page, .contact_page").css({
            opacity: "1",
            transform: "",
            "-webkit-transform": ""
        }), "pc" != device && $(".article_slider").perfectScrollbar("update"))
    }), $(document).on("pjax:popstate", function() {}), $(document).on("pjax:timeout", function() {
        location.reload()
    })), $(window).on("mousewheel", function(e) {
        var t = $("html");
        e.deltaY > 30 && t.is(".hdfixon") && !stopscroll ? t.addClass("pageUp") : e.deltaY < 0 && t.removeClass("pageUp")
    }), $(document).on("click", ".openPopup", function() {
        stopscroll = !0, stopscrollPos = $scr.scrollTop(), popupTgt = $(this).data("popup");
        var e = $(this).data("lang");
        $(".popup" + popupTgt).addClass("-o"), $(".overlay").fadeIn("400"), $(".learnmore_" + e).show(), setTimeout(function() {
            $(".nano").nanoScroller()
        }, 600)
    }), $(document).on("click", ".close, .overlay", function() {
        stopscroll = !1, $(".popup" + popupTgt).removeClass("-o"), $(".learnmore_lang").hide(), $(".overlay").fadeOut("800")
    }), $(document).on("click", ".swichbtn", function(e) {
        e.preventDefault();
        var t = $(this);
        if (t.is(".active")) return !1;
        var n = t.data("swich");
        $(".workslist").removeClass("showmode_titles showmode_images").addClass("showmode_" + n), t.addClass("active").siblings().removeClass("active")
    }), $(document).on("change", "input:checkbox", function() {
        $(this);
        $(this).parents("label").toggleClass("checked")
    }),
    function(e) {
        e.fn.thumbnailSlider = function(t) {
            var n = e.extend({}, e.fn.thumbnailSlider.defaults, t);
            return this.each(function() {
                var t = e(this),
                    i = e.meta ? e.extend({}, n, $pxs_container.data()) : n,
                    r = t.children(".slidenav_thumbnails"),
                    o = t.children(".slidenavs").children("li"),
                    a = o.length,
                    s = r.children(".slidenav_preview_wrapper"),
                    l = s.children(".slidenav_preview"),
                    c = i.thumb_width + 6,
                    u = i.thumb_height + 6 + 6,
                    d = o.eq(0),
                    p = d.position().left - .5 * c + .5 * d.width();
                r.css({
                    width: c + "px",
                    height: u + "px",
                    left: p + "px"
                }), l.css("width", a * i.thumb_width + "px"), s.css({
                    width: i.thumb_width + "px",
                    height: i.thumb_height + "px"
                }), o.on("mouseenter", function() {
                    var t = e(this),
                        n = t.index(),
                        o = t.position().left - .5 * c + .5 * t.width();
                    r.stop(!0).show().velocity({
                        left: o + "px"
                    }, i.speed, i.easing), l.stop(!0).velocity({
                        left: -n * i.thumb_width + "px"
                    }, i.speed, i.easing)
                }).on("mouseleave", function() {
                    r.stop(!0).hide()
                })
            })
        }, e.fn.thumbnailSlider.defaults = {
            speed: 200,
            easing: [.645, .045, .355, 1],
            thumb_width: 160,
            thumb_height: 90
        }
    }(jQuery);
var vidID = [],
    player = [],
    vidLen, tag = document.createElement("script");
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag), window.onYouTubeIframeAPIReady = function() {
    createVideo()
}, $(document).on({
    mouseover: function() {
        $(".navigator").hide()
    },
    mouseleave: function() {
        $(".navigator").show()
    },
    click: function(e) {
        e.preventDefault();
        var t = $(this).data("ytgt");
        $html.is(".playvideo") ? player[t].pauseVideo() : player[t].playVideo()
    }
}, ".playbtn"), $(document).on("click", ".togglemenu_btn", function() {
    $html.is(".menu-o") || ($spMenu.css({
        top: 0,
        left: 0
    }), $html.addClass("menu-o"))
}), $(document).on("click", ".menu-o .togglemenu_btn, .togglemenu_content a", function() {
    setTimeout(function() {
        $spMenu.css({
            top: -windowHeight / 2,
            left: -windowWidth / 2
        }), $html.removeClass("menu-o")
    }, 400)
}), $(document).on("click", ".scrollTop", function() {
    var e = scrollVal,
        t = 200,
        n = e / t * 100;
    return "pc" != device ? $scr.animate({
        scrollTop: 0
    }, n) : $("html, body").velocity("scroll", {
        duration: n,
        offset: 0
    }), $html.removeClass("hdfixon"), !1
});