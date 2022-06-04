
$(document).ready(function(){



    $(".serbia").on("click",function(){
        var path = window. location. pathname;
        var page = path. split("/"). pop();
        if(page.endsWith("en.html")){
            var nov=page.substr(0,page.length-7);
            nov+=".html";
           
            window.location.href=nov;
        }
      
      
    })


    $(".uk").on("click",function(){
        
        var path = window. location. pathname;
        var page = path. split("/"). pop();
        if(page.endsWith("en.html"));
        else{
            var nov=page.substr(0,page.length-5);
            nov+="en.html";
           
            window.location.href=nov;
        }
    })




});


