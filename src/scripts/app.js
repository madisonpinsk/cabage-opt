'use strict';
import $ from 'jquery';

$('#button_contacts').click(function () {
    var form_name = $('#form_name').val();
    var form_email = $('#form_email').val();
    var form_message = $('#form_message').val();
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
            console.log(11111111, data);
            $('.messages').html(data.result);
        }
    });
});
