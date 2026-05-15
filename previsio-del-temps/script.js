/*Llista dels codis més comuns de l’AEMET i la seva imatge. 
 Vaig trobar una llista gran de els codis de AEMET (encara que no és oficial) 
 i només he posat els que considero mes importants: sol, núvols, pluja, tempesta, neu...
(La llista la he trobat a: https://www.domoticadomestica.com/como-integrar-la-informacion-meteorologica-de-aemet-en-eedomus/)*/

let llistaTemps = [
  ["11",  "01d.png"],   // despejat de dia
  ["11n", "01n.png"],   // despejat de nit

  ["12",  "02d.png"],   // Poc ennuvolat
  ["12n", "02n.png"],   // Poc ennuvolat de nit

  ["13",  "03d.png"],   // Intervalos de núvols
  ["13n", "03n.png"],   // Intervalos de núvols de nit

  ["14",  "04d.png"],   // Ennuvolat
  ["14n", "04n.png"],   // Ennuvolat de nit

  ["24",  "10d.png"],   // Ennuvolat amb pluja
  ["24n", "10n.png"],   // Ennuvolat amb pluja de nit

  ["51",  "11d.png"],   // Tempesta
  ["51n", "11n.png"],   // Tempesta de nit

  ["71",  "13d.png"],   // Neu de dia
  ["71n", "13n.png"],   // Neu de nit
];

const $ = e => document.getElementById(e);

//Agafem elements del HTML
const select = $("select-Ubicacios"); // menú desplegable de ciutats
const spanUbicacio = $("ubicacio"); // on es mostra el nom de la ciutat
let errorMsg = $("missatge") // on es mostraran errors

// Quan canviï el selector
select.addEventListener("change", function() {
  // agafa el text de l'opció seleccionada
  const ciutatSeleccionada = select.options[select.selectedIndex].text;
  // i posa aquest text al <span>
  spanUbicacio.textContent = ciutatSeleccionada;

    // crida la funció per llegir les dades
  llegirTemps();
});


//Funció  per llegir les dades
function llegirTemps(){
    
    // Clau d'accés a l’API
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMjQwOTg3N0BpbnN0aXR1dG1vbnRpbGl2aS5jYXQiLCJqdGkiOiI2ZWE4MTEzMy00OWUyLTQxOWMtODJmNS1jMWQ5OTE1NjhmY2QiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTc2MjQyNTAzNywidXNlcklkIjoiNmVhODExMzMtNDllMi00MTljLTgyZjUtYzFkOTkxNTY4ZmNkIiwicm9sZSI6IiJ9.ZAeAwDzSovWAGiuOdYU_QtzkXJTcQxCS0Zt83FLg5rE";
    
    // Agafem el codi del municipi seleccionat
    let codiMunicipi = select.value;

    // URL de l’API amb el codi del municipi i la clau
    const url = "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/" +
    codiMunicipi + "?api_key=" + apiKey;

    //Primer fetch 
    fetch(url)
        .then(function(resposta) {
            // Si la resposta no és correcta error
            if(!resposta.ok) {
                throw new Error("Error:" + resposta.status);
            }
            // Convertim la resposta a JSON
            return resposta.json();
        })
        .then(function(dades){
            // URL on hi ha les dades
            const urlDades = dades.datos;
            return fetch(urlDades); //Segon fetch (les dades completes)
        })
        .then(function(resposta2){
            if(!resposta2.ok) {
                throw new Error("Error:" + resposta2.status);
            }
            return resposta2.json();
        })
        .then(function(dadesCompletes){ //Aquí ja tenim totes les dades del temps
            console.log(dadesCompletes)
            // Dins de les dades, agafem els dies de la predicció
            const dies = dadesCompletes[0].prediccion.dia;

            //Bucle per mostrar informació dels 5  dies
            for(let i = 0; i < 5; i++){
                //agafem el dia actual
                let dia = dies[i];

                //Creem una data per calcular quin dia de la setmana és
                let data = new Date(dia.fecha);
                let diaSetmana = data.getDay(); // retorna un número del 0 al 6(0=diumenge, 1=dilluns...)
                let nomDia = "";

                // Convertim el número del dia a nom
                if (diaSetmana == 0) { nomDia = "diumenge"; }
                if (diaSetmana == 1) { nomDia = "dilluns"; }
                if (diaSetmana == 2) { nomDia = "dimarts"; }
                if (diaSetmana == 3) { nomDia = "dimecres"; }
                if (diaSetmana == 4) { nomDia = "dijous"; }
                if (diaSetmana == 5) { nomDia = "divendres"; }
                if (diaSetmana == 6) { nomDia = "dissabte"; }

                //Posem la data i altres dades
                $("dataHora-" + i).innerHTML = nomDia + "<br>" + dia.fecha.slice(5,10).replace("-","/");
                $("temperatura-" + i).innerHTML = dia.temperatura.maxima + "ºC";
                $("humitat-" + i).innerHTML = "HR " + dia.humedadRelativa.maxima + "%";

                //Agafem el codi de l'estat del cel (per exemple "11", "11n", "24"...)
                let codi = "";
                if (dia.estadoCielo && dia.estadoCielo[0] && dia.estadoCielo[0].value) {
                    codi = dia.estadoCielo[0].value;
                }

                //posem una imatge per defecte (núvols)
                let img = "04d.png";

                //busquem el codi dins de la nostra llista de codis
                let resultat = llistaTemps.find(function(element) {
                    return element[0] == codi;
                });

                //si el trobem, agafem la seva imatge
                if (resultat) {
                    img = resultat[1];
                }

                //Mostrem la imatge corresponent
                $("icon-" + i).src = "img/" + img;
            }
        })
        .catch(function(error){
            errorMsg.textContent = error;
        })

}

//Cridem la funció una vegada en carregar la pàgina
llegirTemps();