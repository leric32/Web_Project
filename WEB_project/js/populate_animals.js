var dokument = null;
var podaci = null;

function loadData(){
    if(localStorage.getItem("psi_data")==null){
        var psi = JSON.stringify(data["psi"]);
        localStorage.setItem("psi_data", psi)
    }
    if(localStorage.getItem("macke_data")==null){
        var psi = JSON.stringify(data["macke"]);
        localStorage.setItem("macke_data", psi)
    }
    if(localStorage.getItem("ptice_data")==null){
        var psi = JSON.stringify(data["ptice"]);
        localStorage.setItem("ptice_data", psi)
    }
}

function setDoc(name){
    dokument = name;
    podaci = JSON.parse(localStorage.getItem(name));
}

function populateData(){
    var data = podaci;
    var container = $("#animal_data");
    container.html("");
    var row;
    var cols;
    var row_count = 0;
    for(field of data){
        if(row_count % 3 == 0){
             row = $("<div>", {"class" : "row"});
             container.append(row);
             cols = "";
        }
        row_count += 1;
        var jpg = field['slika'];
        var ime = field['ime'];
        var opis = field['opis'];
        var link = field['link'];
        var col = `<div class="col-md-4 col-sm-6 col-xs-12">
        <a href="${link}" class="btn-link">
        <div class="thumbnail">
            <img src="${jpg}" class="zivotinja_slika" alt="">

            <div class="caption">
                <h4>
                    <a href="#">
                        ${ime}
                    </a>
                </h4>

                <p>
                    ${opis}
                </p>
            </div>
        </div>
        </a>
    </div>`
        cols += col;
        row.html(cols);

    }
}

function generatePage(field){
    let autor = field['autor'];
    let komentari = field['komentari'];
    let kontakt = field['kontakt'];
    let ime = field['ime'];
    let opis = field['opis'];
    $("#pageTitle").html(`${ime}`)
    var container = $("#animal_data");
    container.html("");
    
    var ro = $("<div>").addClass("row");
    ro.append($("<div>").addClass("col-sm-12 display-flex justify-content-center").append($("<button>").html("Nazad").addClass("btn btn-primaty oglas_btn").attr("id", "glupi_js")));
    container.append(ro)

    container.html(container.html()+`
    <div class="row oglas_razmak">
        <div class="col-lg-6 col-sm-12 oglas_text">
         Autor:
        </div>
    <div class="col-lg-6 col-sm-12 oglas_input">
        ${autor}
    </div>
</div>
<div class="row oglas_razmak">
        <div class="col-lg-6 col-sm-12 oglas_text">
         Kontakt
        </div>
    <div class="col-lg-6 col-sm-12 oglas_input">
        ${kontakt}
    </div>
</div>
<div class="row oglas_razmak">
        <div class="col-lg-6 col-sm-12 oglas_text">
         OPis:
        </div>
    <div class="col-lg-6 col-sm-12 oglas_input">
        ${opis}
    </div>
</div>
        `);
    $("#glupi_js").on("click", function(){
        populateOglas();
    })
    var r = $("<div>").addClass("row");
    r.append($("<div>").addClass("col-sm-12 col-lg-10").html(`<textarea name="opis" cols="30" rows="10" style="width: 100%;
    height: 10vh" id="kom"></textarea>`));
    r.append($("<div>").addClass("col-sm-12 col-lg-2").append($("<button>").html("Komentariši").addClass("btn btn-primaty oglas_btn").on("click", {"field":field}, function(event){
        let kom = $("#kom").val();
        event.data.field['komentari'].push({
            "autor":localStorage.getItem("_user"),
            "sadrzaj": kom
        })
        var data = localStorage.getItem("oglasi");
        data = JSON.parse(data);
        for(d of data){
            if(d["autor"]==event.data.field["autor"] && d["ime"]==event.data.field["ime"]){
                d["komentari"] = event.data.field["komentari"];
                localStorage.setItem("oglasi", JSON.stringify(data));
            }
        }
        generatePage(field);
    })))
    container.append(r);
    for(kom of komentari){

        row = $("<div>", {"class" : "row"});
        container.append(row);

        var col = $("<div>").addClass("col-sm-12");
        var thumb = $("<div>").addClass("thumbnail")
        thumb.html(`<div class="caption">
        
        <h5>Autor: ${kom['autor']}</h5>
        </h5>
        <p>
        ${kom['sadrzaj']}
        </p>
        </div>`);
        thumb.append()
        col.append(thumb)
        row.append(col)

    }
    

}

function populateOglas(){
    var data = localStorage.getItem("oglasi");
    data = JSON.parse(data);
    if(data==null){
        return;
    }
    var container = $("#animal_data");
    container.html("");
    var row;
    var row_count = 0;
    for(field of data){
        if(row_count % 3 == 0){
             row = $("<div>", {"class" : "row"});
             container.append(row);
        }
        row_count += 1;
        var autor = field['autor'];
        var kontakt = field['kontakt'];
        var ime = field['ime'];
        var opis = field['opis'];
        var col = $("<div>").addClass("col-md-4 col-sm-6 col-xs-12");
        var thumb = $("<div>").addClass("thumbnail")
        thumb.html(`<div class="caption">
        <h4>
            <a href="#">
                ${ime}
            </a>
        </h4>
        <h5>Kontakt: ${kontakt}</h5>
        <h5>Autor: ${autor}</h5>
        </h5>
        <p>
            ${opis}
        </p>
        </div>`);
        thumb.append($("<button>").html("Komentari").addClass("btn btn-primaty oglas_btn").css("width", "100%").on("click",{"polje":field}, function(event){
            generatePage(event.data.polje);
        }))
        col.append(thumb);
        row.append(col);

    }
}

function sortiraj(){
    var kriterijum = $("#kriterijum").val();
    var novi_podaci = new Array();
    novi_podaci.push(podaci[0]);
    for(var i = 1; i<podaci.length; i++){
        for(var j=0; j< novi_podaci.length + 1 ; j++){
            if(kriterijum == "g"){
                if(j == novi_podaci.length){
                    novi_podaci.push(podaci[i]);
                    break;
                }
                if(podaci[i].godine < novi_podaci[j].godine){
                    novi_podaci.splice(j,0, podaci[i]);
                    break;
                }
            }else{
                if(j == novi_podaci.length){
                    novi_podaci.push(podaci[i]);
                    break;
                }
                if(podaci[i].ime.localeCompare(novi_podaci[j].ime) < 0){
                    novi_podaci.splice(j,0, podaci[i]);
                    break;
                }
            }
        }
    }
    podaci = novi_podaci;
    populateData();
}

function filter(){
    setDoc(dokument);
    var kriterijum = $("#kriterijum").val();
    var search = $("#search_form").val();
    if(search == ""){
        populateData();
        return;
    }
    if(kriterijum=="g"){
        search = parseInt(search);
    }
    var novi_podaci = new Array();
    for(podatak of podaci){
        if(kriterijum=="g"){
            if(podatak.godine == search){
            novi_podaci.push(podatak);
            }
        }else{
            if(podatak.ime.includes(search)){
                novi_podaci.push(podatak);
            }
        }
    }
    podaci = novi_podaci;
    populateData();
}