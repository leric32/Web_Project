$(document).ready(function(){
    var recepti;
if(localStorage.getItem("prikazi")==null || localStorage.getItem("prikazi")=="undefined")
recepti=[];
else recepti=JSON.parse(localStorage.getItem("prikazi"));

let divwrap=$("<div class='wrap'></div>");
for(let i=0;i<recepti.length;i++){
    
    let divtitle=$("<div class='tile'></div>");
    divtitle.attr("id",i);
    let image=$("<img>").attr("src",(recepti[i].slike.length!=0)?recepti[i].slike[0]:"images/Kuhinjica.jpg");
    let divtext=$("<div class='text'></div>");
    let heder1=$("<h3 class='display-4'>"+recepti[i].naziv + "</h3>");
    let heder2=$("<h4 class='animate-text display-5'>"+recepti[i].kategorija+"</h4>");
    let par=$("<p class='animate-text'>"+ recepti[i].opis_pripreme.substring(0,50)+'...'+"</p>");
      
     divtext.append(heder1);
     divtext.append(heder2);
     divtext.append(par);    
    
     divtitle.append(image);
     divtitle.append(divtext);
     divtitle.on("click",function(){
        localStorage.setItem("trenutnirecept",JSON.stringify(recepti[i]));
        window.location.href="recept.html";
    });
    
     divwrap.append(divtitle);
}
$("#sadrzaj").append(divwrap);

var path = window. location. pathname;
var page = path. split("/"). pop();
var jezik;
if(page.endsWith("en.html"))jezik="uk";
else jezik="srb";



let tipRecepta=localStorage.getItem("tipRecepta");
if(jezik=="uk"){
tipRecepta=localStorage.getItem(tipRecepta);
//alert(tipRecepta);
}

document.getElementById("stranica").text=tipRecepta;

});