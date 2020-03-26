'use strict';
import $ from 'jquery';

$('#button_contacts').click(function () {
    let form_name = $('#form_name').val();
    let form_email = $('#form_email').val();
    let form_message = $('#form_message').val();
    $.ajax({
        url: "feedback/mail.php",
        type: "post",
        dataType: "json",
        data: {
            "form_name": form_name,
            "form_email": form_email,
            "form_message": form_message
        },
        success: function (data) {
            $('.messages').html(data.result);
        }
    });
});

$("nav a, #footer a").click(function () {
    let elementClick = $(this).attr("href");
    let destination = $(elementClick).offset().top;
    $("body,html").animate({scrollTop: destination }, 800);
});