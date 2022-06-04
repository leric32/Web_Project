$(".logovanje").click(function(){
	$(".logovanje").addClass("active-dx");
	$(".registracija").addClass("inactive-sx");
	$(".registracija").removeClass("active-sx");
	$(".logovanje").removeClass("inactive-dx");
});

$(".back").click(function(){
	$(".registracija").addClass("active-sx");
	$(".logovanje").addClass("inactive-dx");
	$(".logovanje").removeClass("active-dx");
	$(".registracija").removeClass("inactive-sx");
});

$korisnici=[];
$trenutnikorisnik=[];

$greska=false;

$(document).ready(function(){
	if(localStorage.getItem("korisnici")==null){
	}
	else $korisnici=JSON.parse(localStorage.getItem("korisnici"));

	$("#dugmelog").click(function(){
		if($("#logovanje").is(':checked')){
			$greska=false;
			 var mejl=$("#email").val();
			var lozinka=$("#password").val();
			if(mejl=='' || lozinka=='') {alert("Unesite sve podatke!");}
			else{
				$cnt=0;
				$korisnici.forEach($k => {
					if($k.mejl==mejl) {
						if($k.lozinka!=lozinka){
							alert("Pogresna lozinka!"); 
							$greska=true;
						} else {
							$greska=false;
							$trenutnikorisnik=$k;
							localStorage.setItem("trenutnikorisnik",JSON.stringify($trenutnikorisnik));
							document.location.href="pocetnaen.html";
					return;
				}
					}
					else $cnt++;
				});
				if($cnt==$korisnici.length) {
					alert("Ne postoji korisnik!"); 
					$greska=true;
					return;
				}
			}
		}
		else {
		$greska=false;
		var mejl=$("#email").val();
		var lozinka=$("#password").val();
		var korisnickoime=$("#username").val();
		var lozinkaopet=$("#passwordagain").val();
		if(mejl=='' || lozinka=='' || korisnickoime=='' || lozinkaopet=='') {alert("Unesite sve podatke!");}
		else{
			if(lozinka!=lozinkaopet){ alert("Lozinka i ponovljena lozinka se moraju poklapati!");}
			else{
				$korisnici.forEach($k => {
					if($k.korisnickoime==korisnickoime) { alert("Korisnicko ime vec postoji!");$greska=true;}
					if($k.mejl==mejl) { alert("Mejl vec postoji!"); $greska=true;}
				});
				if($greska==false){
					let k={korisnickoime:korisnickoime,mejl:mejl,lozinka:lozinka,komentari:[],ocene:[]};
					$korisnici.push(k);
					localStorage.setItem("korisnici",JSON.stringify($korisnici));
			}
			}
		}
	}
	});
	
});