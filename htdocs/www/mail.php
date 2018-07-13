<?php

$site = $_SERVER['HTTP_HOST'];
$dt = date("d F Y, H:i:s"); // дата и время
 
$mail="reg021@yandex.ru,skylanding@yandex.ru"; // e-mail куда уйдет письмо
	
	
$title="Заказ с сайта ".$site; // заголовок(тема) письма


//Работа с файлами

	$uploaddir = dirname(__FILE__)."/uploads/";
	$url_translit = array(
    'а' => 'a', 'б' => 'b', 'в' => 'v',
    'г' => 'g', 'д' => 'd', 'е' => 'e',
    'ё' => 'yo', 'ж' => 'zh', 'з' => 'z',
    'и' => 'i', 'й' => 'j', 'к' => 'k',
    'л' => 'l', 'м' => 'm', 'н' => 'n',
    'о' => 'o', 'п' => 'p', 'р' => 'r',
    'с' => 's', 'т' => 't', 'у' => 'u',
    'ф' => 'f', 'х' => 'x', 'ц' => 'c',
    'ч' => 'ch', 'ш' => 'sh', 'щ' => 'shh',
    'ь' => '\'', 'ы' => 'y', 'ъ' => '\'\'',
    'э' => 'e\'', 'ю' => 'yu', 'я' => 'ya',
    'А' => 'A', 'Б' => 'B', 'В' => 'V',
    'Г' => 'G', 'Д' => 'D', 'Е' => 'E',
    'Ё' => 'YO', 'Ж' => 'Zh', 'З' => 'Z',
    'И' => 'I', 'Й' => 'J', 'К' => 'K',
    'Л' => 'L', 'М' => 'M', 'Н' => 'N',
    'О' => 'O', 'П' => 'P', 'Р' => 'R',
    'С' => 'S', 'Т' => 'T', 'У' => 'U',
    'Ф' => 'F', 'Х' => 'X', 'Ц' => 'C',
    'Ч' => 'CH', 'Ш' => 'SH', 'Щ' => 'SHH',
    'Ь' => '\'', 'Ы' => 'Y\'', 'Ъ' => '\'\'',
    'Э' => 'E\'', 'Ю' => 'YU', 'Я' => 'YA',
    ' ' => '-'
);
  $lat_filename = strtr(basename($_FILES['file']['name']), $url_translit);
	$uploadfile = $uploaddir . $lat_filename;


	move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);

$file = "http://".$_SERVER["SERVER_NAME"]."/uploads/".$lat_filename;


$mess.="<b>Дата и Время:</b> $dt<br>";
  
  
  //print_r($_POST);
foreach($_POST as $key => $value )
{
	if($value!='')
		if($value =='on')
			$mess .= "<b>".$key."</b><br>";
		else
			$mess .= "<b>".$key."</b>: ".$value."<br>";
		
		
}

  
if(!empty($lat_filename)){
   $mess.="<b>Файл:</b> $file<br>";}
 

$headers="MIME-Version: 1.0\r\n";
$headers.="Content-type: text/html; charset=utf-8\r\n"; //кодировка
$headers.="From: no-reply@".$site."\r\n"; // откуда письмо (необязательнакя строка)


mail($mail, $title, $mess, $headers); // отправляем

if(preg_match('/index/',$_SERVER['HTTP_REFERER']))
	$fl = 1;


if($fl===1)
	header('Refresh: 3; URL=index.html');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<?
if($fl===1)
	echo '<meta http-equiv="refresh" content="3; url=index.html">';
?>
<title>С вами свяжутся</title>
<meta popupname="generator">
<style type="text/css">
body
{
   
   background: #22BFF7 url(images/zakaz.jpg) top -50% center no-repeat;
   
}

<script type="text/javascript">
<?
if($fl===1)
 echo "setTimeout('location.replace(\"/index.html\")', 3000)";
?>
/*Изменить текущий адрес страницы через 3 секунды (3000 миллисекунд)*/
</script> 
</head>
</body>
</html>
