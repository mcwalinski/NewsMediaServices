<script>
	function validateForm()
	{
	var x=document.forms["newsletter-form"]["email"].value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	  {
	  alert("Not a valid e-mail address");
	  return false;
	  }
	SubmitForm();
}


function SubmitForm() {
	var email=document.forms["newsletter-form"]["email"].value;
	$.post("submit.php", { email: email },
	   function(data) {
		 document.getElementById("NLstatus").innerHTML ="Thank you! ";
	   });
}
</script>