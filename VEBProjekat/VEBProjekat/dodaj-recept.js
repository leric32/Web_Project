$(document).ready(
    function(){


        var recepti=[
          
        ];
if(localStorage.getItem("recepti")!=null)
recepti=JSON.parse(localStorage.getItem("recepti"));
$("#dodajdugme").on("click",
function(){
let nazivjela=$("#nazivrecepta").val();
let tezina=$("#tezina").val();
let vrstajela=$("#vrstajela").val();
let vrijemepripreme=$("#vrijeme").val();
let opispripreme=$("#opispripreme").val();
let slike=$("#slika").val();
let slikeSn=slike.split(";");
let video=$("#video").val();
let videoSn=video.split(";");
if(nazivjela=="" || vrijemepripreme=="" ||opispripreme==""){
    alert("Molimo vas popunite sve podatke");
}

    else{

        let id1=0;
        for(let i=0;i<recepti.length;i++){
            if(recepti[i].id>=id1)id1=recepti[i].id+1;
        }
    alert(nazivjela+tezina+vrstajela+vrijemepripreme+opispripreme);
    let kor=JSON.parse(localStorage.getItem("trenutnikorisnik"));
    let recept={
        id:id1,
        naziv:nazivjela,
        kategorija:vrstajela,
        vrijeme:vrijemepripreme,
        opis_pripreme:opispripreme,
        tezina:tezina,
        korisnik:kor.korisnickoime,
        prosjecna_ocjena:0,
        broj_ocjena:0,
        komentari:[],
        slike:slikeSn,
        video:videoSn,
        broj_pregleda:0

    }

    recepti.push(recept);
    localStorage.setItem("recepti",JSON.stringify(recepti));
    document.location.href="pocetna.html";

}

}
)



    }
);