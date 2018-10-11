'use strict';

// Document ready
$(document).on('ready', function(){

  // E-mail Ajax Send
  // Documentation & Example: https://github.com/agragregra/uniMail
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled: true,
        tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    mainClass: 'popupBg',
    showCloseBtn: false
  });
  $('.popup__close, .popup__wrapper-close').on('click', function(e){
    e.preventDefault();
    $.magnificPopup.close();
  });

  navMobile();
  $('.working__block ul').equalHeights();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() {
  var width = $(window).width();
  if (width > 1199) {
    $('.header__btn').removeClass('is-active');
    $('.header__nav').removeClass('is-active');
    $('.header-shadow').removeClass('is-active');
  }
});

/*
version 2015-11-27 17:00 GMT +2
*/

function simpleForm(form, callback, precallback) {
   $(document).on('submit', form, function(e){
    e.preventDefault();

    var formData = {};

    var hasFile = false;

    if ($(this).find('[type=file]').length < 1 || $(this).find('[type=file]')[0]['files'].length == 0) {
        formData = $(this).serialize();
    }
    else {
        formData = new FormData();
        $(this).find('[name]').each(function(){

            switch($(this).prop('type')) {

                case 'file':
                    if ($(this)[0]['files'].length > 0) {
                        formData.append($(this).prop('name'), $(this)[0]['files'][0]);
                        hasFile = true;
                    }
                    break;

                case 'radio':
                case 'checkbox':
                    if (!$(this).prop('checked')) {
                        break;
                    }
                    formData.append($(this).prop('name'), $(this).val().toString());
                    break;

                default:
                    formData.append($(this).prop('name'), $(this).val().toString());
                    break;
            }
        });
    }

    $.ajax({
        url: $(this).prop('action'),
        data: formData,
        type: 'POST',
        contentType : hasFile ? false : 'application/x-www-form-urlencoded',
        cache       : false,
        processData : !hasFile,
        success: function(response) {
            $(form).removeClass('ajax-waiting');

            if (typeof precallback === 'function') {
                if (precallback(response) === false) {
                    return true;
                }
            }

            $(form).html($(response).find(form).html());


            if (typeof callback === 'function') {
                callback(response);
            }
        }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function navMobile(){
  var btn = $('.header__btn');
  var nav = $('.header__nav');
  var shadow = $('.header-shadow');
  btn.on('click', function(e){
    e.preventDefault();
    if($(this).hasClass('is-active')) {
      $(this).removeClass('is-active');
      nav.removeClass('is-active');
      shadow.removeClass('is-active');
    } else {
      $(this).addClass('is-active');
      nav.addClass('is-active');
      shadow.addClass('is-active');
    }
  });
}
