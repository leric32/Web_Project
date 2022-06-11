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
    var container = $("#animal_data");
    container.html(`${autor} ${ime} itd ovde treba ispisati detalje o oglasu i ispisati komentare kao i da postoji dugme dodaj komentar`);

    for(kom of komentari){
        if(row_count % 3 == 0){
             row = $("<div>", {"class" : "row"});
             container.append(row);
             cols = "";
        }
        row_count += 1;
        var col = $("<div>").addClass("col-md-4 col-sm-6 col-xs-12");
        var thumb = $("<div>").addClass("thumbnail")
        thumb.html(`<div class="caption">
        
        <h5>Autor: autor</h5>
        </h5>
        <p>
            opis
        </p>
        </div>`);
        thumb.append($("<button>").html("Komentari").addClass("btn btn-primaty oglas_btn").css("width", "100%").on("click", function(){
            let polje = field;
            generatePage(polje);
        }))
        col.append(thumb)
        cols += col;
        row.append(col)

    }
    container.append($("<button>").html("nazad").on("click", function (){
        populateOglas();
    }))

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
    var cols;
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
        col.append(thumb)
        cols += col;
        row.append(col)

    }
}