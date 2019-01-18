var DETAIL_IMAGE_SELECTOR = '[id="container2"]';


function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

$(function() {
   $('#navmenu').load("./navbar.html");
});

$(document).ready(function() {
  setTimeout(function(){
   $('body').addClass('loaded');
    document.getElementById("loader").style.display = "none";
  }, 250);

  /* Get iframe src attribute value i.e. YouTube video url
  and store it in a variable */
  var url = $("#cartoonVideo").attr('src');
  console.log(5);
  /* Remove iframe src attribute on page load to
  prevent autoplay in background */
  $("#cartoonVideo").attr('src', '');


  /* Assign empty url value to the iframe src attribute when
  modal hide, which stop the video playing */
  $("#myModal").on('hide.bs.modal', function() {
    $("#cartoonVideo").attr('src', '');
  });

  var w = $(window).width();
  $('.logo').css('left', (w / 2) - 50);
});

function setLogoPosition() {
  var w = $(window).width();
  $('.logo').css('left', (w / 2) - 50);
}

function start() {
  window.addEventListener('resize', setLogoPosition);
}

start();
// binds the set equal height method to the window via JQUERY
// $(window).resize(function () {
//     setEqualHeight( $('#border') );
// });
