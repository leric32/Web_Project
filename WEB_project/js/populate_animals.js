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

function populateData(name){
    var data = localStorage.getItem(name);
    data = JSON.parse(data);

    var container = $("#animal_data");
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
    r.append($("<div>").addClass("col-sm-12 col-lg-2").append($("<button>").html("Komentariši").addClass("btn btn-primaty oglas_btn").on("click", function(){
        let kom = $("#kom").val();
        let f = field;
        f['komentari'].push({
            "autor":localStorage.getItem("_user"),
            "sadrzaj": kom
        })
        var data = localStorage.getItem("oglasi");
        data = JSON.parse(data);
        for(d of data){
            if(d["autor"]==f["autor"] && f["ime"]==f["ime"]){
                d["komentari"] = f["komentari"];
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
        cols += col;
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
             cols = "";
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
        thumb.append($("<button>").html("Komentari").addClass("btn btn-primaty oglas_btn").css("width", "100%").on("click", function(){
            let polje = field;
            generatePage(polje);
        }))
        col.append(thumb);
        row.append(col);

    }
}