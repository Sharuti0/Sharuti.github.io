/* ================= BTN TORNA AMUNT ================= */
const botoTornaAmunt  = document.getElementById("btnTornaAmunt");

// Mostrar o ocultar botó "Torna amunt" en fer scroll
window.onscroll = function() {
    if (botoTornaAmunt ) {
        if (window.scrollY > 500) {
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

/* ================= MODE FOSC ================= */
const switchToggle = document.getElementById("switch");

if (switchToggle) {
  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    switchToggle.checked = true;
  }

  switchToggle.addEventListener("change", () => {
    if (switchToggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  });
}

/* ================= MENÚ HAMBURGUESA ================= */
const hamburger = document.querySelector(".hamburger input");
const navMenu = document.getElementById("main-nav");
const hamburgerLabel = document.querySelector(".hamburger");

if (hamburger && navMenu && hamburgerLabel) {
  hamburger.addEventListener("change", () => {
    navMenu.classList.toggle("active");
    hamburgerLabel.setAttribute("aria-expanded", hamburger.checked);
  });
}

/* ================= HEADER SCROLL ================= */
const header = document.getElementById("main-header");

if (header) {
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("hide-top", "partial");
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add("hide-top");
      header.classList.remove("partial");
    } else {
      header.classList.add("partial");
      header.classList.remove("hide-top");
    }

    lastScroll = currentScroll;
  });
}

/* ================= FORMULARIS ================= */

/* Mostrar / amagar contrasenya */
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword && password) {
  togglePassword.addEventListener("change", function () {
    password.type = this.checked ? "text" : "password";
  });
}

const toggleVerificacio = document.getElementById("toggleVerificacio");
const verificacio = document.getElementById("verificacio");

if (toggleVerificacio && verificacio) {
  toggleVerificacio.addEventListener("change", function () {
    verificacio.type = this.checked ? "text" : "password";
  });
}

/*Formulari personalitza*/
/*From https://youtu.be/ySQB42xQnPU?si=tE9xjwBFVnid7At8*/
document.addEventListener('DOMContentLoaded', function() {
  const opcio = document.querySelectorAll('.opcio');
    
  opcio.forEach(function(opcio) {
    opcio.addEventListener('click', function() {
      const opcions = this.closest('.option-group');
      if (opcions) {
        const opcionsDelGrup = opcions.querySelectorAll('.opcio');
            
        opcionsDelGrup.forEach(function(opcioDelGrup) {
          opcioDelGrup.classList.remove('active');
        });
            
        this.classList.add('active');
      }
    });
  });
    
  const passos = document.querySelectorAll('.form-step');
  const btnsSeguent = document.querySelectorAll('.btn-next');
  const btnsAnterior = document.querySelectorAll('.btn-prev');
  const btnFinalitzar = document.querySelector('.sparkle-button'); 
    
  let pasActual = 0;
    
  function mostrarPas(numeroPas) {
    passos.forEach(function(pas) {
      pas.classList.remove('active');
    });
        
    passos[numeroPas].classList.add('active');
    pasActual = numeroPas;
        
    actualitzarBarraProgres();
  }
    
  if (btnFinalitzar) {
    btnFinalitzar.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = "disseny.html";
    });
  }
  
  btnsSeguent.forEach(function(boto) {
    boto.addEventListener('click', function() {
      if (pasActual < passos.length - 1) {
        mostrarPas(pasActual + 1);
      }
    });
  });
    
  btnsAnterior.forEach(function(boto) {
    boto.addEventListener('click', function() {
      if (pasActual > 0) {
        mostrarPas(pasActual - 1);
      }
    });
  });
    
  function actualitzarBarraProgres() {
    const passosProgres = document.querySelectorAll('.progres-step');
    const barraProgres = document.getElementById('progress');
    
    passosProgres.forEach(function(pas) {
      pas.classList.remove('active');
      pas.classList.remove('completed');
    });
    
    passosProgres[pasActual].classList.add('active');
    
    for (let i = 0; i < pasActual; i++) {
      passosProgres[i].classList.add('completed');
    }
    
    const totalPassos = passosProgres.length;
    let ampladaPercentatge;
    
    if (pasActual === 0) {
      ampladaPercentatge = 0;
    } 
    
    else if (pasActual === totalPassos - 1) {
      ampladaPercentatge = 90; 
    } 
    
    else {
      ampladaPercentatge = (pasActual / (totalPassos - 1)) * 100;
    }
    
    barraProgres.style.width = ampladaPercentatge + '%';
  }

  actualitzarBarraProgres();

  // opcions de talles d'anells
  const opcioAnell = document.querySelector('.opcio[data-value="anell"]');
  const opcioPolsera = document.querySelector('.opcio[data-value="polsera"]');
  const opcioCollaret = document.querySelector('.opcio[data-value="collaret"]');
  const tallaAnellContainer = document.getElementById('tallaAnellContainer');

  if (opcioAnell && tallaAnellContainer) {
    function gestionarTallaAnell(mostrar) {
      if (mostrar) {
        tallaAnellContainer.style.display = 'block';
        setTimeout(function() {
          tallaAnellContainer.style.opacity = '1';
          tallaAnellContainer.style.transform = 'translateY(0)';
        }, 10);
        
      } 
      
      else {
        tallaAnellContainer.style.opacity = '0';
        tallaAnellContainer.style.transform = 'translateY(-10px)';
        setTimeout(function() {
          tallaAnellContainer.style.display = 'none';
        }, 300);
      }
    }

    function comprovarJoiaSeleccionada() {
      if (opcioAnell.classList.contains('active')) {
        gestionarTallaAnell(true);
      } else {
        gestionarTallaAnell(false);
      }
    }

    opcioAnell.addEventListener('click', function() {
      setTimeout(comprovarJoiaSeleccionada, 10);
    });

    if (opcioPolsera) {
      opcioPolsera.addEventListener('click', function() {
        setTimeout(comprovarJoiaSeleccionada, 10);
      });
    }

    if (opcioCollaret) {
      opcioCollaret.addEventListener('click', function() {
        setTimeout(comprovarJoiaSeleccionada, 10);
      });
    }

    comprovarJoiaSeleccionada();
  }
});