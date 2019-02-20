$(document).ready(function(){
    $("#createAccount").click(function(){
        if($("#sign_in_title").text() === "Please sign into your DylBot account to get started!"){
            $("#sign_in_title").text("Please enter a username and password for your DylBot account!");
            $(this).text("I Already have an Account");
        }
        else
        {
            $("#sign_in_title").text("Please sign into your DylBot account to get started!");
            $(this).text("Create an Account")
        }
    });

    $("#createAccount").hover(function(){
        $(this).css("text-decoration", "underline");
    },
    function(){
        $(this).css("text-decoration", "none");
    });

    $("#login_button").click(function(){

        var xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("result").innerHTML = this.responseText;
            }
	    };
        xhttp.open("POST", "game_login.php", true);
        //Send the proper header information along with the request
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
        //send the values in each of the input forms
        xhttp.send("username="+ document.getElementById("username").value +
				"&password="+ document.getElementById("password").value);

    })

});