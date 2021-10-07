$("#changeUserButton").on("click",()=>{
    if($("#changeUserName").css("display") === "block"){
        $("#changeUserName").css("display", "none")
    }else{
        $("#changePassword").css("display", "none")
        $("#changeUserName").css("display", "block")
    }  
})
$("#changePassButton").on("click",()=>{
    if($("#changePassword").css("display") === "block"){
        $("#changePassword").css("display", "none")
    }else{
        $("#changeUserName").css("display", "none")
        $("#changePassword").css("display", "block")
    }  
})