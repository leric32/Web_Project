
function populatePage(){
    var data = localStorage.getItem("oglasi");
    data = JSON.parse(data);
    var komentari_container = $("#komentari");
    komentari_container.html("");
    var oglasi_container = $("#oglasi");
    oglasi_container.html("");
    var user = localStorage.getItem("_user");
    var row_count = 0;
    var row1;
    var row;
    var button;
    if(user!=null){
        for(var i=0; i<data.length; i++){
            if(data[i].autor == user){
                if(row_count % 3 == 0){
                    row1 = $("<div>", {"class" : "row"});
                    oglasi_container.append(row1);
                    row_count += 1;
                }
                var field = data[i];
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
                button = $("<button>").html("Izbrisi").addClass("btn btn-primaty oglas_btn").css("width", "100%");
                button.on("click",{"index": i}, function(event){
                    data.splice(event.data.index, 1);
                    localStorage.setItem("oglasi", JSON.stringify(data))
                    populatePage();
                })
                thumb.append(button);
                col.append(thumb);
                row1.append(col);
            }
            for(komentar of data[i].komentari){
                if(komentar.autor == user){
                    row = $("<div>", {"class" : "row"});
                    komentari_container.append(row);

                    var col = $("<div>").addClass("col-sm-12");
                    var thumb = $("<div>").addClass("thumbnail")
                    thumb.html(`<div class="caption">
                    
                    <h5>Autor: ${komentar['autor']}</h5>
                    </h5>
                    <p>
                    ${komentar['sadrzaj']}
                    </p>
                    </div>`);
                    thumb.append()
                    col.append(thumb)
                    row.append(col)
                }
            }
        }
    }


}

$(document).ready(populatePage());