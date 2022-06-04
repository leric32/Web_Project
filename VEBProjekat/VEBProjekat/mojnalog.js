$(document).ready(function(){

let trenutnikor=JSON.parse(localStorage.getItem("trenutnikorisnik"));
let recepti=JSON.parse(localStorage.getItem("recepti"));

function mojiRecepti(recepti){
    let rec=[];
    for(let i=0;i<recepti.length;i++){
        if(recepti[i].korisnik==trenutnikor.korisnickoime)rec.push(recepti[i]);
    }
    return  rec;
}
function obrisi(id){
    for(let i=0;i<recepti.length;i++){
        if(recepti[i].id==id)recepti.splice(i,1);
    }
    localStorage.setItem("recepti",JSON.stringify(recepti));
    window.location.href="mojnalog.html";
}
let moji=mojiRecepti(recepti);
let divwrap=$("#mojirecepti");
for(let i=0;i<moji.length;i++){
    
    let divtitle=$("<div class='tile'></div>");
    divtitle.attr("id",i);
    let image=$("<img>").attr("src",(moji[i].slike.length!=0)?recepti[i].slike[0]:"images/Kuhinjica.jpg");
    let divtext=$("<div class='text'></div>");
    let heder1=$("<h3 class='display-4'>"+moji[i].naziv + "</h3>");
    let heder2=$("<h4 class='animate-text display-5'>"+moji[i].kategorija+"</h4>");
    let par=$("<p class='animate-text'>"+ moji[i].opis_pripreme.substring(0,50)+'...'+"</p>");
    let dugme=$("<button class='animate-text' >obrisi</button>")
     dugme.on("click",function(){obrisi(moji[i].id)})
     divtext.append(heder1);
     divtext.append(heder2);
     divtext.append(par);    
     divtext.append(dugme);
     divtitle.append(image);
     divtitle.append(divtext);
     
  //   divtitle.on("click",function(){
  //      localStorage.setItem("trenutnirecept",JSON.stringify(recepti[i]));
//        window.location.href="recept.html";
//    });
    
     divwrap.append(divtitle);
}
let receptikorisnika=[];
let sumaocena=0;
let brojocena=0;
for(let i=0;i<recepti.length;i++){
    if(recepti[i].korisnik==trenutnikor.korisnickoime){
        receptikorisnika.push(recepti[i]);
        if(recepti[i].prosjecna_ocjena!=0){
        sumaocena+=recepti[i].prosjecna_ocjena;
        brojocena++;
        }
    }
}
$("#prosecnaocenakor").text(sumaocena/brojocena);
$("#brojrecepatakor").text(receptikorisnika.length);

for(let i=0;i<trenutnikor.komentari.length;i++){
    let p=$("<p></p><br/>").text(trenutnikor.komentari[i].tekst);
    $("#mojikomentari").append(p);
}

let sumapregleda=0;
for(let i=0;i<receptikorisnika.length;i++){
sumapregleda+=receptikorisnika[i].broj_pregleda;
}
$("#brojpregledakor").text(sumapregleda);

let svir=JSON.parse(localStorage.getItem("recepti"));
for(let i=0;i<trenutnikor.ocene.length;i++){
    let p=$("<p></p><br/>").text("Ocena "+trenutnikor.ocene[i].ocena+" za recept "+svir[trenutnikor.ocene[i].recept].naziv);
    $("#mojeocene").append(p);
}




});