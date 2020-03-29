'use strict';
import $ from 'jquery';

/**
 * Отправка формы обратной связи
 */
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

/**
 * Валидирует Почту
 *
 * @param emailAddress
 * @returns {boolean}
 */
function isValidEmailAddress(emailAddress) {
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function isValidName(name) {
    return name.length >= 2;
}

function isValidMessage(message) {
    return message.length > 2;
}

/**
 * Вешаем событие инпут на почту, и проверяем на валидность
 */
$('#form_email').on('input', function () {
    let email = $('#form_email').val();
    let validMail = isValidEmailAddress(email);
    if (validMail) {
        $('#form_email').removeClass('error').addClass('ok');
    } else {
        $('#form_email').removeClass('ok').addClass('error');
    }
});

/**
 * Событие инпут ввода имени, и проверяем на валидность
 */
$('#form_name').on('input', function () {
    let name = $('#form_name').val();
    let validName = isValidName(name);
    if (validName) {
        $('#form_name').removeClass('error').addClass('ok');
    } else {
        $('#form_name').removeClass('ok').addClass('error');
    }
});

/**
 * Событие инпут ввода сообщения, и проверяем на валидность
 */
$('#form_message').on('input', function () {
    let message = $('#form_message').val();
    let validMessage = isValidMessage(message);
    console.log(111, message, validMessage);
    if (validMessage) {
        $('#form_message').removeClass('error').addClass('ok');
    } else {
        $('#form_message').removeClass('ok').addClass('error');
    }
});