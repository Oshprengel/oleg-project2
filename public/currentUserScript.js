$("#changeUserButton").on("click",()=>{
    $("#error").css("display", "none")
    if($("#changeUserName").css("display") === "block"){
        $("#changeUserName").css("display", "none")
    }else{
        $("#changePassword").css("display", "none")
        $("#changeUserName").css("display", "block")
    }  
})
$("#changePassButton").on("click",()=>{
    $("#error").css("display, none")
    if($("#changePassword").css("display") === "block"){
        $("#changePassword").css("display", "none")
    }else{
        $("#changeUserName").css("display", "none")
        $("#changePassword").css("display", "block")
    }  
})