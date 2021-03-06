'use strict';

import Inputmask from "inputmask";
import $ from 'jquery';

$(document).ready(function () {
    /**
     * Отправка формы обратной связи
     */
    $('#button_contacts').click(function () {
        let form_name = $('#form_name').val();
        let form_email = $('#form_email').val();
        let form_phone = $('#form_phone').val();
        $.ajax({
            url: "feedback/mail.php",
            type: "post",
            dataType: "json",
            data: {
                "form_name": form_name,
                "form_email": form_email,
                "form_phone": form_phone
            },
            success: function (data) {
                $('.messages').html(data.textError);
                if (data.result === 'error') {
                    $('.messages').addClass('errors-messages');
                } else {
                    $('.messages').removeClass('errors-messages');
                    $('.success-form-block').removeClass('success-form-block');
                    $('#contact-form').addClass('block-hide');
                }
            }
        });
    });
    /**
     * END
     */

    /**
     * Отправка центральной формы обратной связи
     */
    $('#center-button-form').click(function () {
        let form_name = $('#form-center_name').val();
        let form_email = $('#form-center_email').val();
        $.ajax({
            url: "feedback/central-form.php",
            type: "post",
            dataType: "json",
            data: {
                "form_name": form_name,
                "form_email": form_email,
            },
            success: function (data) {
                if (data.result === 'success') {
                    $('#form-center_name').val('');
                    $('#form-center_email').val('');
                }
                $('.central-messages').html(data.textError);
                if (data.result === 'error') {
                    $('.central-messages').addClass('errors-messages');
                } else {
                    $('.central-messages').removeClass('errors-messages');
                    //$('.success-form-block').removeClass('success-form-block');
                    //$('#contact-form').addClass('block-hide');
                }
            }
        });
    });
    /**
     * END
     */

    /**
     * Медленная прокрутка по странице
     */
    $("nav a, #footer a").click(function () {
        let elementClick = $(this).attr("href");
        let destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination}, 1000);
    });

    /**
     * END
     */

    $('[data-fancybox="gallery"]').fancybox({
        loop: true,
        gutter : 10,
        keyboard: true,
        arrows: true,
        infobar: true,
        smallBtn: true,
        toolbar: true,
        idleTime: 3,
        animationEffect: "zoom-in-out",
        animationDuration: 600,
    });

    var inputmask = new Inputmask("+7 (999) 999-99-99",{ "placeholder": "+7 (___) ___-__-__" });
    inputmask.mask($('#form_phone'));
    //$('#form_telephone').inputmask({"mask": "+7 (999) 999-9999"});




});