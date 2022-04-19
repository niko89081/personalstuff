
$("#submit").on("click", (e)=>{
    let user = $("#user").val();
    let pass = $("#pass").val();
    let email = $("#email").val();
    if(user && pass && email){
        $.ajax({
            type: "POST",
            data: JSON.stringify({
                username: user,
                password: pass,
                email: email
            }),
            url: "http://localhost:8800/api/auth/register",
            contentType: "application/json; charset=utf-8",
            success: (data)=>{
                document.write(data);
            }
        });
    }
}); 

