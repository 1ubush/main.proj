<?php
parse_str($_POST['orderlist'], $orderlist);
parse_str($_POST['userdata'], $userdata);
/*
$orderlist - массив со списком заказа
$userdata - данные заказчика
*/

// При желании, можно посмотреть полученные данные, записав их в файл:
file_put_contents('cart_data_log.txt', var_export($orderlist, 1) . "\r\n");
file_put_contents('cart_data_log.txt', var_export($userdata, 1), FILE_APPEND);

function getNumber() {
$filename = 'orderNum.txt';
$number = file_get_contents($filename);
$number++;
file_put_contents($filename, $number);
return $number;
}

//echo(getNumber());

$sub = $_POST['zakaz'].getNumber();

// Заголовок письма

$subject = 'Заказ от ' . date('d.m.Y').'г.';
// ваш Email
//
$admin_mail = 'support@vobu.com.ua';
// Email заказчика (как fallback - ваш же Email)
// $to = !empty($userdata['user_mail']) ? $userdata['user_mail'] : $admin_mail;
$to = $admin_mail;

// Формируем таблицу с заказанными товарами
$tbl = '<table style="width: 100%; border-collapse: collapse;">
	<tr>
		<th style="width: 1%; border: 1px solid #333333; padding: 5px;">ID</th>
		<th style="width: 1%; border: 1px solid #333333; padding: 5px;"></th>
		<th style="border: 1px solid #333333; padding: 5px;">Наименование</th>
		<th style="border: 1px solid #333333; padding: 5px;">Цена</th>
		<th style="border: 1px solid #333333; padding: 5px;">Кол-во</th>
	</tr>';
$total_sum = 0;

foreach($orderlist as $id => $item_data) {
	$total_sum += (float)$item_data['count'] * (float)$item_data['price'];
	$tbl .= '
	<tr>
		<td style="border: 1px solid #333333; padding: 5px;">'.$item_data['id'].'</td>
		<td style="border: 1px solid #333333;"><img src="'.$item_data['img'].'" alt="" style="max-width: 64px; max-height: 64px;"></td>
		<td style="border: 1px solid #333333; padding: 5px;">'.$item_data['title'].'</td>
		<td style="border: 1px solid #333333; padding: 5px;">'.$item_data['price'].' грн</td>
		<td style="border: 1px solid #333333; padding: 5px;">'.$item_data['count'].' л</td>
	</tr>';
}
$tbl .= '<tr>
		<td  style="border: 1px solid #333333; padding: 5px;" colspan="3">Итого:</td>
		<td style="border: 1px solid #333333; padding: 5px;"><b>'.$total_sum.'</b> грн.</td>
		<td style="border: 1px solid #333333;">&nbsp;</td>
	</tr>
</table>';
// Тело письма
$body = '
<html>
<head>
  <title>'.$subject.'</title>
</head>
<body>
  <p>Информация о заказчике:</p>
	<ul>
		<li><b>Заказ номер:</b> '.$sub = $_POST['zakaz'].getNumber().'</li>
		<li><b>Ф.И.О.:</b> '.$userdata['user_name'].'</li>
		<li><b>Тел.:</b> '.$userdata['user_phone'].'</li>
		<li><b>Email:</b> '.$userdata['user_mail'].'</li>
		<li><b>Адрес:</b> '.$userdata['user_address'].'</li>
		<li><b>Комментарий:</b> '.$userdata['user_comment'].'</li>
	</ul>
	<p>Информация о заказае:</p>
  '.$tbl.'
	<p>Письмо создано автоматически. Пожалуйста, не отвечайте на него, т.к. все ушли на пляж!</p>
</body>
</html>';

// if ($total_sum < 345){
// 	echo "Eror";
// }

// Заголовки
$headers = array(); // или $headers = array() для версии ниже 5.4
$headers[] = 'MIME-Version: 1.0'; // Обязательный заголовок
$headers[] = 'Content-type: text/html; charset=utf-8'; // Обязательный заголовок. Кодировку изменить при необходимости
$headers[] = 'From: Радой - Справжнє крафтове пиво <' . $admin_mail . '>' ; // От кого
//$headers[] = 'Bcc: Admin <'.$admin_mail.'>'; // скрытая копия админу сайта, т.е. вам
$headers[] = 'X-Mailer: PHP/' . phpversion();
// Отправка
$send_ok = mail($to, $subject, $body, implode("\r\n", $headers));

// Ответ на запрос
$response = array(
	'errors' => !$send_ok,
	'message' => $send_ok ? '<p style="font-size:28px; margin-bottom:15px">Дякую <b>' . $userdata['user_name'] . '</b>. Ваше замовлення № <b>' . $sub = $_POST['zakaz'] . getNumber() . '</b> прийняте в обробку!<br></p>
							<p style="margin-bottom:15px; font-size:20px">Загальна вартість: <b>' . $total_sum . '</b> грн</p>
							<p style="margin-bottom:15px; font-size:20px">Адрес доставки: <b>' . $userdata['user_address'] . '</b></p>
							<p style="margin-bottom:15px; font-size:20px">Ми передзвонимо Вам за номером - <b>' . $userdata['user_phone'] . '</b> для підтвердження замовлення.</p>
							' : 'Хьюстон! У нас проблемы!'
);

exit( json_encode($response) );