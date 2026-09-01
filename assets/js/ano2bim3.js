/* ================================================================
   ano1bim3.js – Funcionalidades do 3º Bimestre
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // --- 1. BOTÃO DE IMPRESSÃO (imprime toda a página, com accordions expandidos) ---
  var btnPrint = document.getElementById("btnPrint");
  if (btnPrint) {
    btnPrint.addEventListener("click", function () {
      window.print();
    });
  }

  // --- 2. COPIA DE CÓDIGO (para todos os blocos .code-block) ---
  var copyButtons = document.querySelectorAll(".btn-copy-code");
  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var targetId = this.getAttribute("data-code-target");
      if (!targetId) return;
      var codeElement = document.getElementById(targetId);
      if (!codeElement) return;
      var codeText = codeElement.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(codeText)
          .then(
            function () {
              var original = this.innerHTML;
              this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
              setTimeout(
                function () {
                  this.innerHTML = original;
                }.bind(this),
                2000,
              );
            }.bind(this),
          )
          .catch(
            function () {
              fallbackCopy(codeText, this);
            }.bind(this),
          );
      } else {
        fallbackCopy(codeText, this);
      }
    });
  });

  function fallbackCopy(text, btn) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0;";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      var original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
      setTimeout(function () {
        btn.innerHTML = original;
      }, 2000);
    } catch (e) {
      alert("❌ Não foi possível copiar. Copie manualmente.");
    }
    document.body.removeChild(ta);
  }
});
