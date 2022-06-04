var recepti=[];
var path = window. location. pathname;
var page = path. split("/"). pop();
var jezik;
if(page.endsWith("en.html"))jezik="uk";
else jezik="srb";
function ucitaj(){

   
    
    

    let $k=JSON.parse(localStorage.getItem("trenutnikorisnik"));
    if($k.length!=0){
        document.getElementById("korisnik").innerHTML=$k.korisnickoime;
        if(document.getElementById("korisnik2")!=null)document.getElementById("korisnik2").innerHTML=$k.korisnickoime;
    }
    else  document.getElementById("korisnik").innerHTML="";

    

    if(localStorage.getItem("recepti")!=null){
   
        recepti=JSON.parse(localStorage.getItem("recepti"));
       recepti=sortirajPoOcjeniO(recepti);
       document.getElementById("nazivprvog").innerHTML=recepti[0].naziv;
       document.getElementById("prvaslika").setAttribute("src",recepti[0].slike[0]);
       $("#prvaslika").on("click",idinaprvi);
       document.getElementById("nazivdrugog").innerHTML=recepti[1].naziv;
       document.getElementById("drugaslika").setAttribute("src",recepti[1].slike[0]);

       document.getElementById("nazivtreceg").innerHTML=recepti[2].naziv;
       document.getElementById("trecaslika").setAttribute("src",recepti[2].slike[0]);

    }
    
    function sortirajPoOcjeniO(recepti){
        for(let i=0;i<recepti.length-1;i++){
            for(let j=i+1;j<recepti.length;j++){
                if(recepti[i].ocjena<recepti[j].ocjena){
                    let tmp=recepti[i];
                    recepti[i]=recepti[j];
                    recepti[j]=tmp;
                }
            }
        }
    
        return recepti;
    }
   
}


function idinaprvi(){
    let tren=localStorage.setItem("trenutnirecept",JSON.stringify(recepti[0]));
    if(jezik=="srb")
    window.location.href="recept.html";
    else window.location.href="recepten.html";
}

function idinadrugi(){
    let tren=localStorage.setItem("trenutnirecept",JSON.stringify(recepti[1]));
    if(jezik=="srb")
    window.location.href="recept.html";
    else window.location.href="recepten.html";
}

function idinatreci(){
    let tren=localStorage.setItem("trenutnirecept",JSON.stringify(recepti[2]));
    if(jezik=="srb")
    window.location.href="recept.html";
    else window.location.href="recepten.html";
}

function ucitaj1(){
    let $k=JSON.parse(localStorage.getItem("trenutnikorisnik"));
    if($k.length!=0){
        document.getElementById("korisnik").innerHTML=$k.korisnickoime;
        if(document.getElementById("korisnik2")!=null)document.getElementById("korisnik2").innerHTML=$k.korisnickoime;
    }
    else  document.getElementById("korisnik").innerHTML="";

    

}

