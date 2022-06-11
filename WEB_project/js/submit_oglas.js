function submit_oglas(){
    var ime = $("#ime");
    var opis = $("#opis");
    var kontakt = $("#kontakt");
    var autor = localStorage.getItem("_user");
    var oglasi = localStorage.getItem("oglasi");
    if(oglasi == null){
        oglasi = []
    }else{
        oglasi = JSON.parse(oglasi);
    }
    
    oglasi.push({
        "ime" : ime.val(),
        "opis" : opis.val(),
        "autor" :autor,
        "kontakt" : kontakt.val(),
        "komentari" : []
    })
    localStorage.setItem("oglasi", JSON.stringify(oglasi));
    ime.val("");
    opis.val("");
    kontakt.val("");
}
