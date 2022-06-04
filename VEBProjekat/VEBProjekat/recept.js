$(document).ready(function(){
    let trenutnirecept=JSON.parse(localStorage.getItem("trenutnirecept"));
    trenutnirecept.broj_pregleda++;
    localStorage.setItem("trenutnirecept",JSON.stringify(trenutnirecept));
    let receptisvi=JSON.parse(localStorage.getItem("recepti"));
    for(let i=0;i<receptisvi.length;i++){
        if(trenutnirecept.id==receptisvi[i].id){
            receptisvi[i]=trenutnirecept;
            localStorage.setItem("recepti",JSON.stringify(receptisvi));
        }
    }
     trenutnirecept=JSON.parse(localStorage.getItem("trenutnirecept"));

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

    if(trenutnirecept.slike.length==0){
        let div1=$("<div></div>").attr("class","carousel-item active");
        let slika=$("<img>").attr("class","d-block w-100").attr("src","images/Kuhinjica").attr("style","height:400px");
      
        div1.append(slika);
        $(".carousel-inner").append(div1);
    }
    else{

        for(let i=0;i<trenutnirecept.slike.length;i++){
            let div1=$("<div></div>").attr("class","carousel-item");
            if(i==0)div1.attr("class","carousel-item active");
            let slika=$("<img>").attr("class","d-block w-100").attr("src",trenutnirecept.slike[i]).attr("style","height:400px");
            div1.append(slika);
            $(".carousel-inner").append(div1);

           
        }
        
        let div1=$("<div></div>").attr("class","carousel-item");
        let slika=$("<video controls></video>").attr("class","d-block w-100");
        let sors=$("<source>").attr("src","videos/plaza.mp4").attr("type","video/mp4");
        slika.append(sors);
        div1.append(slika);
        $(".carousel-inner").append(div1);
    }

    $("#nazivrecepta").text(trenutnirecept.naziv);
    $("#vremepripreme").text(trenutnirecept.vrijeme);
    $("#tezina").text(trenutnirecept.tezina);
    $("#uputstvorecepta").text(trenutnirecept.opis_pripreme);
    if(trenutnirecept.prosjecna_ocjena!=0){
         $("#prosecnaocena").text(trenutnirecept.prosjecna_ocjena);
         $("#naslovprosecna").show();
        }
    else $("#naslovprosecna").hide();

    if(JSON.parse(localStorage.getItem("trenutnikorisnik")).length==0){
        $("#dodajkom").hide();
        $("#dodajocenu").hide();
    }else{
        $("#dodajkom").show();
        
        if(JSON.parse(localStorage.getItem("trenutnikorisnik")).korisnickoime==JSON.parse(localStorage.getItem("trenutnirecept")).korisnik){
            $("#dodajocenu").hide();
        }else $("#dodajocenu").show();
    }
    

    prikaziKomentare();
    $("#submitComment").on("click",function(){
        let kor=JSON.parse(localStorage.getItem("trenutnikorisnik"));
        let recept=JSON.parse(localStorage.getItem("trenutnirecept"));
      
        let txt=$("#addComment").val();
        let file=$("#customFile").val();
        if(txt=="" && file=="") alert("Nista niste uneli");
        else{
            let komentar={id: trenutnirecept.id,tekst:txt,file:file};
            kor.komentari.push(komentar);
            localStorage.setItem("trenutnikorisnik",JSON.stringify(kor));
            let svik=JSON.parse(localStorage.getItem("korisnici"));
           for(let i=0;i<svik.length;i++){
               if(svik[i].korisnickoime==kor.korisnickoime){
                   svik[i]=kor;
                   localStorage.setItem("korisnici",JSON.stringify(svik));
                  
               }
           }
           let komentar2={id: kor.korisnickoime,tekst:txt,file:file};
           recept.komentari.push(komentar2);
           localStorage.setItem("trenutnirecept",JSON.stringify(recept));
           let svir=JSON.parse(localStorage.getItem("recepti"));
          for(let i=0;i<svir.length;i++){
              if(svir[i].id==recept.id){
                  svir[i]=recept;
                  localStorage.setItem("recepti",JSON.stringify(svir));
                  
              }
          }
           
        }
        
    });
    $("#gledaj").on("click",prikaziKomentare);

    $("#rate").on("click",function(){
        let kor=JSON.parse(localStorage.getItem("trenutnikorisnik"));
        let recept=JSON.parse(localStorage.getItem("trenutnirecept"));
        for(let i=0;i<kor.ocene.length;i++){
            if(kor.ocene[i].recept==recept.id) {alert("Vec ste ocenili recept");return}
        }
        let rate=0;
       for(let i=1;i<=5;i++){
          
           if($("#star-"+i).is(':checked')) {
               rate=5-i+1;
               let tren=JSON.parse(localStorage.getItem("trenutnirecept"));
               tren.prosjecna_ocjena=((tren.prosjecna_ocjena*tren.broj_ocjena)+rate)/(tren.broj_ocjena+1);
               tren.broj_ocjena++;
               localStorage.setItem("trenutnirecept",JSON.stringify(tren));
               let rec=JSON.parse(localStorage.getItem("recepti"));
               for(let i=0;i<rec.length;i++){
                   if(rec[i].id==tren.id){
                       rec[i]=tren;
                       localStorage.setItem("recepti",JSON.stringify(rec));
                   }
               }
               let korr=JSON.parse(localStorage.getItem("trenutnikorisnik"));
               let o={recept:tren.id,ocena:rate};
               korr.ocene.push(o);
               localStorage.setItem("trenutnikorisnik",JSON.stringify(korr));
               let korrsvi=JSON.parse(localStorage.getItem("korisnici"));
               for(let i=0;i<korrsvi.length;i++){
                if(korrsvi[i].korisnickoime==korr.korisnickoime){
                    korrsvi[i]=korr;
                    localStorage.setItem("korisnici",JSON.stringify(korrsvi));
                }
            }
            return;

           }
       }
        
    });
        
   
     
});

function prikaziKomentare(){
    let recept=JSON.parse(localStorage.getItem("trenutnirecept"));
    let id=recept.id;
    let kor=JSON.parse(localStorage.getItem("trenutnikorisnik"));

    for(let i=0;i<recept.komentari.length;i++){
        let div1=$(".media-list");
        let div2=$("<li></li>").attr("class","media");
        let div3=$("<div></div>").attr("class","media-body");
        let div4=$("<div></div>").attr("class","well well-lg");
        let heder=$("<h6></h6>").attr("class","media-heading text-uppercase reviews");
        let par=$("<p></p>").attr("class","media-comment");

        heder.text(recept.komentari[i].id);
        par.text(recept.komentari[i].tekst);
        div4.append(heder);
        div4.append(par);
        div3.append(div4);
        div2.append(div3);
        div1.append(div2);
        $("#comments-logout").append(div1);

    }
}