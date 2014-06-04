
<?php
  $email = $_POST['email'];

  $options = $_POST['options'];
  echo $email . " Submitted Sucessfully! " . $options;
  $fields = array(
			"email" => $email,
			"options"=> $options
		);
  
  $ch = curl_init();
  curl_setopt($ch,CURLOPT_URL, "https://script.google.com/macros/s/AKfycbwISUZDKMK-ekJaiQv8gDHKtPxXm-LcT7IZX0Y5nkVBsPppG8Q/exec");
  curl_setopt($ch,CURLOPT_POST, 1);
  curl_setopt($ch,CURLOPT_POSTFIELDS, $fields);
  $result = curl_exec($ch);
  curl_close($ch);
  

  
?>