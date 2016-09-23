/*global $:false */
/*global window: false */

(function(){
  "use strict";

$(function ($) {

// Menu Action
$('#sm-trigger, .sm-menu-close').on('click', function(){
    $('#sm-trigger').toggleClass('active');
    $('#home-wrap').toggleClass('sliding-toleft');
    $('#sm').toggleClass('sm-menu-open');
    $('#home-wrap').addClass('nav-opened');
});
$('#home-wrap').on('click', function(){
    $('#home-wrap').removeClass('sliding-toleft');
    $('#sm').removeClass('sm-menu-open');
});

});
// $(function ($)  : ends

})();
//  JSHint wrapper $(function ($)  : ends

