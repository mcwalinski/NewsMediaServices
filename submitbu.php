
<?php
//$email = $opt1 = $opt2 = $opt3 = $opt4 = $opt5 = "empty";
//if (isset($_POST['email'])){ $email = $_POST['email']; }
//if (isset($_POST['opt1'])){ $opt1 = $_POST['opt1']; }
$email = $_POST['email'];
   
$data = array(
	"email"=>$email,
	"opt1"=>$opt1,
	"opt2"=>$opt2,
	"opt3"=>$opt3,
	"opt4"=>$opt4,
	"opt5"=>$opt5	
);
  
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL, "https://script.google.com/macros/s/AKfycbwISUZDKMK-ekJaiQv8gDHKtPxXm-LcT7IZX0Y5nkVBsPppG8Q/exec");
curl_setopt($ch,CURLOPT_POST, 1);
curl_setopt($ch,CURLOPT_POSTFIELDS, "email=".$email);
$result = curl_exec($ch);
curl_close($ch);
  
?>