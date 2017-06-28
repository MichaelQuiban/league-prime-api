$(document).ready(function() {

    $("#sign-up").submit(function(e) {
        e.preventDefault();
        var register = {};
        register.username = $("#signup-username").val();
        register.password = $("#signup-password").val();
        console.log(register)
        $.ajax({
            type: "POST",
            url : "/users/signup",
            data: JSON.stringify(register),
            dataType: "json",
            contentType: "application/json", 
            success: function(data, textStatus, jqXHR)
                {
                    //data - response from server
                    console.log(data);
                    window.location.href='/main.html';
                },
            error: function (jqXHR, textStatus, errorThrown)
                {
                    //quick and easy console log command
                    //Add client side success indicator
                    console.log('login failed');
                }
        });

        $("#ranked-form").submit(function(e) {
            e.preventDefault();
            var ranked = {};
            ranked.ranking = $("#ranked-input").val();
            ranked.elo = $("#ranked-elo").val();
            ranked.role = $("#ranked-role").val();
            ranked.progress = $("#ranked-progress").val();
            console.log(ranked)
            $.ajax({
                type: "POST",
                url: "/users/ranking",
                data: JSON.stringify(ranked),
                dataType: "json",
                contentType: "application/json",
                success: function(data, textStatus, jqXHR)
                {
                    //data - response from server
                    //Add client side Success indicator
                    let message = "Successfully logged in!";
                    $("#response").append(${message});
                },
            error: function(jqXHR, textStatus, errorThrown)
                {
                    //Add client side success indicator
                    console.log("failed!")
                }
            })
        });
    });
});
