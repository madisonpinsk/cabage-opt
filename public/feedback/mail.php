<?php

$msg_box = ""; // в этой переменной будем хранить сообщения формы
$errors = array(); // контейнер для ошибок
function isValidEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function isValidPhone($phone)
{
    $regexp = '#^\+[0-9]{1,2}\s?\([0-9]{3}\)\s?[0-9]+\-[0-9]+\-[0-9]+$#';
    return preg_match($regexp, $phone);
}

//
// проверяем корректность полей
if ($_POST['form_email'] == "" || !isValidEmail($_POST['form_email'])) {
    $errors[] = "Поле <span style='color: #666;'>Ваш e-mail</span> не заполнено";
}
if ($_POST['form_name'] == "" || strlen($_POST['form_name']) < 2) {
    $errors[] = "Поле <span style='color: #666;'>Ваше имя</span> не заполнено";
}
if ($_POST['form_phone'] == "" || !isValidPhone($_POST['form_phone'])) {

    $errors[] = "Поле <span style='color: #666;'>Ваш Телефон</span> не заполнено";
}

// если форма без ошибок
if (empty($errors)) {
    // собираем данные из формы
    $message = "Имя пользователя: " . $_POST['form_name'] . "<br>";
    $message .= "E-mail пользователя: " . $_POST['form_email'] . "<br><br>";
    $message .= "Телефон: " . $_POST['form_phone'];
    send_mail($message); // отправим письмо
    // выведем сообщение об успехе
    $msg_box = "<span style='color: green;'>Спасибо за обращение, сообщение успешно отправлено! <br> В течении 24 часов я Вам отвечу!<br></span><br>";
    $result = 'success';
} else {
    // если были ошибки, то выводим их
    $msg_box = "";
    foreach ($errors as $one_error) {
        $msg_box .= "<style>.messages{margin-bottom: 20px;}</style><span style='color: red;'>$one_error</span><br>";
    }
    $result = 'error';
}

// делаем ответ на клиентскую часть в формате JSON
echo json_encode(array(
    'textError' => $msg_box,
    'result' => $result
));


// функция отправки письма
function send_mail($message)
{
    // почта, на которую придет письмо
    $mail_to = "madisonpinsk@mail.ru";
    // тема письма
    $subject = "Письмо с обратной связи";

    // заголовок письма
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
    $headers .= "From: new.laminaria.ru/ \r\n"; // от кого письмо

    // отправляем письмо
    mail($mail_to, $subject, $message, $headers);
}