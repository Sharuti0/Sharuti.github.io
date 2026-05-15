/* ------------------------- JS QÜESTIONARI ------------------------ */
/**
 * Event listener per al botó de recomanació de perfum.
 * Aquest codi agafa les respostes del qüestionari, comprova si totes les preguntes estan contestades
 * i mostra una recomanació de perfum basada en les opcions seleccionades.
 */
document.getElementById("btnQuestionari")?.addEventListener("click", function () 
{

    // Obté les opcions seleccionades del qüestionari
    const ocasio = document.querySelector('input[name="ocasio"]:checked')?.value;
    const aroma = document.querySelector('input[name="aroma"]:checked')?.value;
    const intensitat = document.querySelector('input[name="intensitat"]:checked')?.value;
    const public = document.querySelector('input[name="public"]:checked')?.value;
    const temporada = document.querySelector('input[name="temporada"]:checked')?.value;

    const preguntes = document.querySelectorAll(".pregunta-container");
    let marcat = true; 

    // Comprova que cada grup de preguntes tingui una opció seleccionada
    preguntes.forEach(fieldset => {
        let inputRadio = fieldset.querySelector("input[type='radio']:checked");

        if (inputRadio) {
            fieldset.classList.remove("error");
            fieldset.classList.add("correcte");
        } else {
            fieldset.classList.add("error");
            fieldset.classList.remove("correcte");
            marcat = false;
        }
    });

    const resultat = document.getElementById("resultat");

    // Si alguna pregunta no està contestada, mostra un missatge d'error i surt de la funció
    if (!marcat) { 
        mostrarMissatge("Si us plau, respon totes les preguntes.", "error");
        return; 
    }

    //Abans de mostrar el resultat posa tots els fieldsets en verd
    preguntes.forEach(fieldset => {
        fieldset.classList.remove("error");
        fieldset.classList.add("correcte"); 
    });

    let perfumRecomanat = "";
    let linkPerfum = "";

    // Assignació del perfum recomanat segons les respostes del qüestionari
    if (ocasio === "dia" && aroma === "floral" && intensitat === "suau" && temporada === "primavera" && public === "dona") {
        perfumRecomanat = "Amber Blossom";
        linkPerfum = "/Parfum-de-Lune/html/info-productes/producte7.html";
    } else if (ocasio === "dia" && aroma === "cítric" && intensitat === "mitja" && temporada === "estiu" && public === "unisex") {
        perfumRecomanat = "Elegance Wave";
        linkPerfum = "/Parfum-de-Lune/html/info-productes/producte9.html";
    } else if (ocasio === "nit" && aroma === "dolç" && intensitat === "fort" && temporada === "hivern" && public === "unisex") {
        perfumRecomanat = "Lunar Essence";
        linkPerfum = "/Parfum-de-Lune/html/info-productes/producte1.html";
    } else if (ocasio === "especial" && aroma === "fusta" && intensitat === "mitja" && temporada === "tardor" && public === "unisex") {
        perfumRecomanat = "Mystique Lux";
        linkPerfum = "/Parfum-de-Lune/html/info-productes/producte5.html";
    } else if (ocasio === "especial" && aroma === "fusta" && intensitat === "mitja" && temporada === "tardor" && public === "unisex") {
        perfumRecomanat = "Gold Essence";
        linkPerfum = "/Parfum-de-Lune/html/info-productes/producte3.html";
    } else if (ocasio === "dia" && aroma === "floral" && intensitat === "mitja" && temporada === "primavera" && public === "unisex") {
        perfumRecomanat = "Velour Spiral";
        linkPerfum = "/Parfum-de-Lune/html/info-productes/producte8.html";
    } else if (ocasio === "nit" && aroma === "fusta" && intensitat === "fort" && temporada === "hivern" && public === "home") {
        perfumRecomanat = "Eclipse Noir"; 
        linkPerfum = "/Parfum-de-Lune/html/info-productes/producte6.html";
    } else {
        perfumRecomanat = "Crystal Charm"; // Recomanació per defecte
        linkPerfum = "/Parfum-de-Lune/html/info-productes/producte4.html";
    }

    // Mostrar el resultat com un enllaç
    document.getElementById("resultat").innerHTML = `El perfum ideal per a tu és: <a href="${linkPerfum}"> <strong>${perfumRecomanat}</strong> </a>`;
});

/* ------------------------- JS USUARI ------------------------ */
/**
 * Event listener per al botó de registre d'usuari.
 * Recull les dades del formulari, valida els camps i guarda l'usuari en localStorage si és vàlid.
 */
document.getElementById("btn-register")?.addEventListener("click", function (event) {
    event.preventDefault(); // Evita la recàrrega de la pàgina
    
    // Obtenim els valors introduïts per l'usuari i eliminem espais en blanc
    const nomRegister = document.getElementById("registerUsuari")?.value.trim();
    const emailRegister = document.getElementById("registerEmail")?.value.trim();
    const passRegister = document.getElementById("registerPass")?.value.trim();

    // Comprovem si algun camp està buit
    if (nomRegister === "" || emailRegister === "" || passRegister === "") {
        mostrarMissatge("Si us plau, omple tots els camps.", "error");
        return; 
    }

    // Validació de correu electrònic
    const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validarEmail.test(emailRegister)) { //Serveix per comprovar si una cadena (string) compleix amb el patró especificat per l'expressió regular
        mostrarMissatge("Si us plau, introdueix un correu electrònic vàlid.", "error");
        return; 
    }

    // Validació de la contrasenya (mínim 8 caràcters, almenys 1 majúscula i 1 número)
    const validarPass = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!validarPass.test(passRegister)) {
        mostrarMissatge("La contrasenya ha de tenir almenys 8 caràcters, una majúscula i un número.", "error");
        return; 
    }

    // Registre de l'usuari
    registrarUsuari(emailRegister, nomRegister, passRegister);
});

/**
 * Funció per registrar un nou usuari.
 * @param {string} email - Correu electrònic de l'usuari
 * @param {string} nom - Nom d'usuari
 * @param {string} contrasenya - Contrasenya de l'usuari
 */
function registrarUsuari(email, nom, contrasenya) {
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("contrasenya", contrasenya);

    fetch("/Parfum-de-Lune/php/registre.php", {
        method: "POST",
        body: formData
    })
    .then(resposta => resposta.json())
    .then(data => {
        mostrarMissatge(data.missatge, data.tipus);

        if (data.tipus === "correcte") {
            document.getElementById("registerUsuari").value = "";
            document.getElementById("registerEmail").value = "";
            document.getElementById("registerPass").value = "";

            setTimeout(() => {
                window.location.href = "/Parfum-de-Lune/html/menu-desplegable/usuari.php";
            }, 2000);
        }
    })
    .catch(() => {
        mostrarMissatge("Error de connexió amb el servidor.", "error");
    });
}

/**
 * Event listener per al botó de login d'usuari.
 * Valida les dades introduïdes i comprova si l'usuari existeix en localStorage.
 */
document.getElementById("btn-login")?.addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el formulari es recarregui
    
    // Obtenim els valors introduïts per l'usuari
    const emailLogin = document.getElementById("loginEmail")?.value.trim();
    const passLogin = document.getElementById("loginPass")?.value.trim();

    // Comprovació de camps buits
    if (emailLogin === "" || passLogin === "") {
        mostrarMissatge("Si us plau, omple tots els camps.", "error");
        return;
    }

    // Validació del format de correu electrònic
    const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validarEmail.test(emailLogin)) {
        mostrarMissatge("Si us plau, introdueix un correu electrònic vàlid.", "error");
        return;
    }

    //Enviem dades al servidor
    const formData = new FormData();
    formData.append("email", emailLogin);
    formData.append("contrasenya", passLogin);

    fetch("/Parfum-de-Lune/php/login.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        mostrarMissatge(data.missatge, data.tipus);

        if (data.tipus === "correcte") {
            setTimeout(() => {
                window.location.href = "/Parfum-de-Lune/Index.html";
            }, 2000);
        }
    })
    .catch(() => {
        mostrarMissatge("Error de connexió amb el servidor.", "error");
    });

});

// Quan la pàgina carrega, preguntem al servidor si l'usuari està loguejat
document.addEventListener('DOMContentLoaded', () => {
  fetch('/Parfum-de-Lune/php/qui-soc.php')
    .then(res => res.json())
    .then(data => {
      const divMissatge = document.getElementById('missatge-login');

      if (divMissatge) {
        if (data.logejat) {
          // Si està loguejat, mostrem el seu nom
          divMissatge.textContent = `Hola, ${data.nom}! Ja estàs loguejat/da.`;
        } else {
          // Si no, indiquem que no ha iniciat sessió
          divMissatge.textContent = `No has iniciat sessió.`;
        }
      }
    })
    .catch(() => {
      console.error("Error consultant sessió.");
    });
});

function comprovarSessio(callback) {
  fetch("/Parfum-de-Lune/php/qui-soc.php") //Demanem al servidor si hi ha sessió
    .then(res => res.json())               //Convertim la resposta a format JSON
    .then(data => {
      callback(data.logejat);              //Truquem al callback amb true/false
    });
}

/* ------------------------- JS CISTELLA AMB BD ------------------------ 
/**
 * Aquest script gestiona la funcionalitat de la cistella de compra.
 * - Podem afegir productes a la cistella i guardar-los.   
 * - Mostra els productes a la pàgina de la cistella.
 * - Podem fer la eliminació de un producte o el buidar tota la cistella.
 * - Calcula i mostra el total de la compra.
 */
// Selecciona tots els botons "Afegir a la cistella"
document.querySelectorAll(".cartBtn").forEach(btn => {
  btn.addEventListener("click", function () {
    // Primer, comprovem si l'usuari està loguejat
    fetch("/Parfum-de-Lune/php/qui-soc.php")
      .then(res => res.json())
      .then(data => {
        if (!data.logejat) {
          mostrarMissatge("Has d'iniciar sessió per afegir productes al carret.", "error");
          return; //No afegim si no està loguejat
        }

        // Està loguejat → afegim el producte a la BD
        const formData = new FormData();
        formData.append("nom", btn.dataset.nom);
        formData.append("preu", btn.dataset.preu);

        fetch("/Parfum-de-Lune/php/control-cistella/cistella.php?accio=afegir", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            mostrarMissatge(data.missatge, data.tipus);
        })
        .catch(() => {
            mostrarMissatge("Error al desar el producte.", "error");
        });

      });
  });
});


/**
 * Mostra tots els productes de la cistella de l'usuari.
 * - Fa una petició fetch al servidor amb acció "llistar".
 * - Crea elements HTML per cada producte.
 * - Calcula el total i l'actualitza.
 */
if (document.getElementById("llistaCistella")) {
    function mostrarCistella() {
        // Fem petició al servidor per obtenir els productes
        fetch("/Parfum-de-Lune/php/control-cistella/cistella.php?accio=llistar")
            .then(res => res.json()) // Convertim la resposta a format JSON
            .then(productes => {     // Aquí tenim l’array de productes retornat pel PHP

                const llista = document.getElementById("llistaCistella"); // Contenidor HTML on llistarem els productes
                const totalElement = document.getElementById("total");   // Element on mostrarem el total €

                llista.innerHTML = ""; // Netegem la llista abans d’afegir productes nous
                let total = 0;         // Variable per acumular el preu total

                // Recorrem cada producte rebut del servidor
                productes.forEach(producte => {
                    const div = document.createElement("div");
                    div.classList.add("cistella-producte"); // Classe per estilitzar el div

                    const spanNom = document.createElement("span");
                    // Mostrem el nom i preu formatat a 2 decimals
                    spanNom.textContent = `${producte.nom_producte} - ${parseFloat(producte.preu).toFixed(2)}€`;

                    const btnEliminar = document.createElement("button");
                    btnEliminar.textContent = "X"; // Botó per eliminar el producte
                    btnEliminar.classList.add("cistella-eliminar");
                    // Quan fem clic al botó, cridem a eliminarProducte amb l'id
                    btnEliminar.addEventListener("click", () => eliminarProducte(producte.id));

                    // Afegim el nom i el botó dins del div
                    div.appendChild(spanNom);
                    div.appendChild(btnEliminar);
                    // Afegim el div a la llista general
                    llista.appendChild(div);

                    // Afegim el preu al total
                    total += parseFloat(producte.preu);
                });

                // Mostrem el total formatat a 2 decimals
                totalElement.textContent = total.toFixed(2);
            })
            .catch(() => mostrarMissatge("Error en carregar la cistella", "error")); // Si falla la petició
    }

/**
 * Elimina un producte concret de la cistella.
 * @param {number} id - ID del producte a eliminar
 */
    function eliminarProducte(id) {
        const formData = new FormData();
        formData.append("id", id); // Passem l'id del producte a eliminar

        // Petició POST per eliminar-lo des del servidor
        fetch("/Parfum-de-Lune/php/control-cistella/cistella.php?accio=eliminar", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(() => mostrarCistella()); // Tornem a mostrar la cistella actualitzada
    }

    // Quan l'usuari fa clic a "Buidar cistella"
    document.getElementById("buidarCistella").addEventListener("click", () => {
        fetch("/Parfum-de-Lune/php/control-cistella/cistella.php?accio=buidar")
            .then(res => res.json())
            .then(() => mostrarCistella()); // Tornem a mostrar buida
    });

    // Quan fa clic a "Tornar al catàleg"
    document.getElementById("tornarCataleg").addEventListener("click", () => {
        window.location.href = "/Parfum-de-Lune/html/catàleg.html"; // Redireccionem al catàleg
    });

    mostrarCistella();
}

/* ------------------------- JS CARRUSEL IMG PRODUCTES ------------------------ */
/**
 * Aquest script gestiona una carrusel d'imatges per a un producte.
 * - Podem navegar entre diferents imatges gracies a botons.
 * - Les imatges es carreguen des d'un atribut `data-imatges` del contenidor.
 * - La navegació permet avançar i retrocedir.
 */
function iniciarCarrusel() {
    const imgContainer = document.querySelector(".producte-img");

    if (!imgContainer) {
        return;
    }

    const imgElement = document.getElementById("imatge-producte");
    const botoEnrere = document.querySelector(".boto-enrere");
    const botoEndavant = document.querySelector(".boto-endavant");

    //Llegir les imatges des del `data-imatges`
    const imatges = JSON.parse(imgContainer.getAttribute("data-imatges"));

    let index = 0; // Primera imatge

    // Funció per passar a la següent imatge
    function passarEndavant() {
        index = (index + 1) % imatges.length;
        imgElement.src = imatges[index];
    }

    // Funció per tornar a la imatge anterior
    function tornarEnrere() {
        index = (index - 1 + imatges.length) % imatges.length;
        imgElement.src = imatges[index];
    }

    // Afegir funcionalitat als botons
    botoEndavant.addEventListener("click", passarEndavant);
    botoEnrere.addEventListener("click", tornarEnrere);
}
//Executar la funció
iniciarCarrusel();

/* ------------------------- JS BOM ------------------------ */
/**
 * Aquest script gestiona la visibilitat i funcionalitat del botó "Torna amunt".
 * - Mostra o oculta el botó segons la posició de l'usuari en la pàgina.
 * - Permet tornar a la part superior amb un desplaçament suau quan es fa clic.
 */
const botoTornaAmunt  = document.getElementById("btnTornaAmunt");

// Mostrar o ocultar botó "Torna amunt" en fer scroll
window.onscroll = function() {
    if (botoTornaAmunt ) {
        if (window.scrollY > 450) {
            botoTornaAmunt .style.display = "block";
        } else {
            botoTornaAmunt .style.display = "none";
        }
    }
};

//Quan l'usuari fa clic al botó, torna a la part superior de la pàgina amb un efecte suau.
if (botoTornaAmunt ) {
    botoTornaAmunt .onclick = function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

/* ------------------------- JS Google Charts ------------------------ */
/**
 * Aquest script carrega i dibuixa un gràfic de barres amb Google Charts.
 * - Mostra les vendes dels perfums més populars.
 * - S'executa automàticament quan Google Charts està carregat.
 */
// Carregar Google Charts
if (window.location.pathname.includes('estadistiques.html')) {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(dibuixarGrafic);
}

function dibuixarGrafic() {
    // Dades simulades dels perfums més populars
    var data = google.visualization.arrayToDataTable([
        ['Perfum', 'Vendes'],
        ['Lunar Grace', 150],
        ['Lunar Essence', 200],
        ['Gold Essence', 95],
        ['Crystal Charm', 120],
        ['Mystique Lux', 180],
        ['Eclipse Noir', 140],
        ['Amber Blossom', 130],
        ['Velour Spiral', 160],
        ['Elegance Wave', 170]
    ]);   

    // Opcions del gràfic
    var options = {
        title: 'Perfums més populars',
        titleTextStyle: {
            fontSize: 22,
            fontName: 'Lexend'
        },
        chartArea: {width: '60%'},
        hAxis: {
            title: 'Vendes',
            minValue: 0,
            title: 'Vendes',
            minValue: 0,
            textStyle: { fontSize: 14, fontName: 'Lexend' },
            titleTextStyle: { fontSize: 16, fontName: 'Lexend' }
        },
        vAxis: {
            title: 'Perfums',
            textStyle: { fontSize: 14, fontName: 'Lexend' }, 
            titleTextStyle: { fontSize: 16, fontName: 'Lexend' } 
        },
        colors: ['#715f91'] 
    };

    // Dibuixar el gràfic dins del div 'perfums-chart'
    var chart = new google.visualization.BarChart(document.getElementById('perfums-chart'));
    chart.draw(data, options);
}
/* ------------------------- JS ALERTES PERSONALITZADES ------------------------ */
/**
 * Mostra un missatge temporal a l'usuari dins d'un contenidor específic.
 * - Assigna el missatge a l'element HTML corresponent.
 * - Aplica la classe CSS segons el tipus de missatge (info, correcte, error).
 * - Desapareix automàticament després de 5 segons.
 *
 * @param {string} missatge - El text del missatge a mostrar.
 * @param {string} [tipus='info'] - El tipus de missatge ('info', 'correcte' o 'error').
 */
function mostrarMissatge(missatge, tipus = "info") {
    let missatgeContainer = document.getElementById("missatge-container");

    if (!missatgeContainer) {
        return;
    }

    // Assignem el text del missatge
    missatgeContainer.textContent = missatge;

    // Eliminem classes anteriors i afegim la classe adequada
    missatgeContainer.classList.remove("correcte", "error", "info");
    missatgeContainer.classList.add(tipus, "visible");

    // Amagar el missatge després de 5 segons
    setTimeout(() => {
        missatgeContainer.classList.remove("visible");
    }, 5000);
}
