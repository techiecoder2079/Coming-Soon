function initNike(){
    "use strict";
    firstload();
    function firstload(){
        TweenMax.to($(".loader"),1.5, {
            force3D:false,
            scale : "0",
            ease : Expo.easeInOut,
            onComplete:function(){
                $(".cs-loader-layer").addClass('closing');
                $("#main").animate({
                    opacity : 1
                }, 500);
                setTimeout(function() {
                    $(".loader-wrap").fadeOut(1);
                }, 1300)
            }
        });
    }

    // background image
    var a = $(".bg");
    a.each(function (a){
        if($(this).attr("data-bg")) $(this).css("background-image", "url(" + $(this).data("bg") + ")");
    });

    //video popup
    $(".image-popup").lightGallery({
        selector : "this",
        cssEasing : "cubic-beizer(0.25,0,0.25,1)",
        download : false,
        counter : false
    });
    var o = $(".lightgallery"),
    p = o.data("looped");
    o.lightGallery({
        selector : ".lightgallery a.popup-image",
        cssEasing : "cubic-beizer(0.25,0,0.25,1)",
        download: false,
        loop : false,
        counter: false
    });

    //menu tabs

    var transitionLayer2 = $('.cd-tabs-layer'),
    transitionBackground2 = transitionLayer2.children(),
    frameProportion2 = 1.78,
    frames = transitionLayer2.data('frame'),
    resize2 = false;
    $(window).on('resize', function(){
        if(!resize2){
            resize2 = true,
            (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions2, 300) : window.requestAnimationFrame(setLayerDimensions2);
        }
    });
    $(".change_bg a").on("click", function(){
        transitionLayer2.addClass('visible opening');
        setTimeout(function() {
            transitionLayer2.removeClass('opening');
        },500);
        setTimeout(function() {
            transitionLayer2.addClass('closing');
            transitionBackground2.one('webkitAnimationEnd oanimationed msAnimationEnd animationed', function(){
                transitionLayer2.removeClass('closing opening visible');
                transitionBackground2.off('webkitAnimationEnd oanimationed msAnimationEnd animationend');
            });
        }, 500);

        var bgt = $(this).data("bgtab");
        $(".bg_tabs").delay(600).queue(function (next){
            $(this).css("background-image", "url(" + bgt + ")");
            next();
        });
    });

    function setLayerDimensions2(){
        var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        layerHeight, layerWidth;
        if(windowWidth / windowHeight > frameProportion2){
            layerWidth = windowWidth;
            layerHeight = layerWidth / frameProportion2;
        } else{
            layerHeight = windowHeight * 1.2;
            layerWidth = layerHeight * frameProportion2;
        }
        transitionBackground2.css({
            'width':layerWidth * frames + 'px',
            'height' : layerHeight + 'px',
        });
        resize2 = false;
    }
    if($(".multi-slideshow_fs").length > 0){
        var ms1 = new Swiper(".multi-slideshow_fs .swiper-container",{
            preloadImages : false,
            loop : true,
            speed : 1400,
            spaceBetween : 0,
            effect :"fade",
            init : false ,
            autoplay : {
                delay : 3500,
                disableOnInteraction : false
            },
        });
        setTimeout(function(){
            ms1.init();
        },2000);
    }
    
    function csselem(){
        $(".ms-item_fs").css({
            height : $(".multi-slideshow_fs").outerHeight(true)
        });
    }   
    csselem();

    
    $("#res_date").daterangepicker({
        autoUpdateInput : false,
        parentE1 : $(".date-container2"),
        singleDatePicker : true,
        timePicker : false,
        locale: {
            cancelLabel : 'Clear'
        }
    });

    $("#res_date").on('apply.daterangepicker', function(ev, picker){
        $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });
    $("#res_date").on('cancel.daterangepicker', function(ev,picker){
        $(this).val('');
    });
    $('.chosen-select').niceSelect();
    var transitionLayer3 = $('.cd-reserv-overlay-layer'),
    transitionBackground3 = transitionLayer3.children(),
    frameProportion3 = 1.78,
    frames3 = transitionLayer3.data('frame'),
    resize3 = false;
    setLayerDimensions2();
    $(window).on('resize', function(){
        if(!resize3){
            resize3 = true,
            (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions2, 300) : window.requestAnimationFrame(setLayerDimensions2);
        }
    });

    function showResForm(){
        $(".reservation-modal-wrap").fadeIn(1);
        transitionLayer3.addClass('visible opening');
        $("html, body").addClass("hid-body");
        TweenMax.to($(".reservation-modal-container"), 0.8, {
            force3D : true,
            y : "0",
            opacity : "1",
            ease : Power2.easeOut,
        });
    }
    function hideResForm(){
        $("html, body").addClass("hid-body");
        TweenMax.to($(".reservation-modal-container"), 0.6, {
            force3D : true,
            y : "50px",
            opacity : "0",
            ease : Power2.easeOut,
            onComplete:function(){
                transitionLayer3.addClass('closing');
                transitionBackground3.one('webkitAnimationEnd oanimationend msAnimationEnd animationed', function() {
                    transitionLayer3.removeClass('closing opening visible');
                    transitionBackground3.off('webkitAnimationEnd oanimationend msAnimationEnd animationed');
                    $(".reservation-modal-wrap").delay(100).fadeOut(400);
                });
            }
        });
    }
    $(".show-rb").on("click", function(e){
        e.preventDefault();
        showResForm();
    });
    $(".crm").on("click", function(){
        hideResForm();
        setTimeout(function () {
            $("#reservationform")[0].reset();
            $("#reserv-message").slideUp(1500);
            $(".chosen-select").niceSelect('update');
        }, 1500)
    });

    // cursor
    $(".hero-wrap, .cs-content-container, .column-wrap-bg").on({
        mouseenter : function() {
            $(".element-item").addClass("white_blur");
        },
        mouseleave : function() {
            $(".element-item").removeClass("white_blur");
        }
    });
    $("a, .btn, textarea, input , .show-reserv_button, .close-reservation-modal").on({
        mouseenter : function() {
            $(".element-item").addClass("elem_hover");
        },
        mouseleave : function() {
            $(".element-item").removeClass("elem_hover");
        }
    });
    $(".single-slider .swiper-slide, .grid-carousel .swiper-slide, .fs-slider .swiper-slide").on({
        mouseenter : function() {
            $(".element-item").addClass("slider_hover");
        },
        mouseleave : function() {
            $(".element-item").removeClass("slider_hover");
        }
    });
    $(".reserv-overlay").on({
        mouseenter : function() {
            $(".element-item").addClass("close-icon");
        },
        mouseleave : function() {
            $(".element-item").removeClass("close-icon");
        }
    });
    
    var mouse = {
        x:0,
        y:0
    };
    var pos = {
        x:0,
        y:0
    };

    var ratio = 0.15;
    var active = false;
    var ball = document.querySelector('.element-item');
    TweenLite.set(ball, {
        xPercent : -50,
        yPercent : -50
    });
    document.addEventListener("mousemove", mouseMove);
    function mouseMove(e){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        mouse.x = e.pageX;
        mouse.y = e.pageY - scrollTop;
    }
    TweenMax.ticker.addEventListener("tick",updatePosition);
    function updatePosition() {
        if(!active){
            pos.x += (mouse.x - pos.x) * ratio;
            pos.y += (mouse.y - pos.y) * ratio;
            TweenMax.set(ball,{
                x:pos.x,
                y : pos.y
            });
        }
    }



}

$(document).ready(function() {
    initNike();
});