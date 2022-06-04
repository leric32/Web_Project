$(document).ready(function(){


    var recepti=[ ];
    
 
let tipRecepta=localStorage.getItem("tipRecepta");
document.getElementById("stranica").text=tipRecepta;

if(localStorage.getItem("recepti")!=null){
   
    recepti=JSON.parse(localStorage.getItem("recepti"));
    recepti=dohvati_Po_Tipu(recepti);
}

function dohvati_Po_Tipu(recepti){
   let rec=[];
    for(let i=0;i<recepti.length;i++){
        if(recepti[i].kategorija==tipRecepta)rec.push(recepti[i]);
    }
    return rec;
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
function sortirajPoTeziniR(recepti){
    for(let i=0;i<recepti.length-1;i++){
        for(let j=i+1;j<recepti.length;j++){
            if(recepti[i].tezina>recepti[j].tezina){
                let tmp=recepti[i];
                recepti[i]=recepti[j];
                recepti[j]=tmp;
            }
        }
    }

    return recepti;
}
function sortirajPoTeziniO(recepti){
    for(let i=0;i<recepti.length-1;i++){
        for(let j=i+1;j<recepti.length;j++){
            if(recepti[i].tezina<recepti[j].tezina){
                let tmp=recepti[i];
                recepti[i]=recepti[j];
                recepti[j]=tmp;
            }
        }
    }

    return recepti;
}
function traziPoNaslovu(recepti,imeRecepta){
    let povratniRecepti=[];
    for(let i=0;i<recepti.length;i++){
        if(recepti[i].naziv.match(imeRecepta))povratniRecepti.push(recepti[i]);
    }
    return povratniRecepti;
}


$("#pretraga").on("click",function(){
$tip=$("#category").val();
if($tip=="Po nazivu" && $("#jelo").val()!=""){
    let pom=traziPoNaslovu(recepti);
    if(pom.length==0) localStorage.setItem("prikazi","undefined");
    else localStorage.setItem("prikazi",JSON.stringify(traziPoNaslovu(recepti)));
}
else if($tip=="Svi recepti"){
   alert(recepti);
    if(recepti.length==0) localStorage.setItem("prikazi","undefined");
    else
localStorage.setItem("prikazi",JSON.stringify(recepti));
}
else if($tip=="Po oceni(opadajuce)")
{
    let pom=sortirajPoOcjeniO(recepti);
    if(pom.length==0) localStorage.setItem("prikazi","undefined");
else
localStorage.setItem("prikazi",JSON.stringify(sortirajPoOcjeniO(recepti)));
}
else if($tip=="Po tezini(rastuce)")
{
    let pom=sortirajPoTeziniR(recepti);
    if(pom.length==0) localStorage.setItem("prikazi","undefined");
else
    localStorage.setItem("prikazi",JSON.stringify(sortirajPoTeziniR(recepti)));

}
else if($tip=="Po tezini(opadajuce)")
{
    let pom=sortirajPoTeziniO(recepti);
    if(pom.length==0) localStorage.setItem("prikazi","undefined");
else
    localStorage.setItem("prikazi",JSON.stringify(sortirajPoTeziniO(recepti)));
}
else if($tip=="Po nazivu" && $("#jelo").val()==""){
  
    return;
}

window.location.href="galerija.html";

})


});

