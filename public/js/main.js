setTimeout(function(){ $('.progress-bar').css("width",
    function() {
        return $(this).attr("aria-valuenow") + "%";
    })
}, 300);

setTimeout(function(){
    var content_height = $('.sidebar_left').height();
    $('.friend-content .friend-tab-content').css('min-height', content_height - 41);
},500);

$(document).ready(function() {

    // $(window).scroll(function() {
    //     if($(this).scrollTop() >= $('._content').offset().top - 100) {
    //         $('#back-to-top').addClass('active');
    //     } else {
    //         $('#back-to-top').removeClass('active');
    //     }
    // });
    $(window).on('load', function() {
        $('.owl-stage').parents('.owl-item').remove();
        $('#back-to-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    });
});


setTimeout(function(){
    var content_height = $('.sidebar_left').height();
    $('.friend-content .friend-tab-content').css('min-height', content_height - 41);
},500);
