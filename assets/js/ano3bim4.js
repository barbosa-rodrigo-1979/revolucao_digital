/* ================================================================
   ano3bim4.js – Funcionalidades para o 4º Bimestre do 3º Ano
   UTFPR – Campus Siqueira Campos
   ----------------------------------------------------------------
   Responsabilidades:
     1. Copiar blocos de código (.btn-copy-code)
     2. Imprimir planos de aula (btnImprimir) com accordion expandido
     3. Expandir todos os planos (btnExpandir)
     4. Recolher todos os planos (btnRecolher)
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ============================================================
     1. COPIA DE CÓDIGO
     ============================================================ */
  const copyButtons = document.querySelectorAll(".btn-copy-code");

  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-code-target");
      if (!targetId) return;

      const codeElement = document.getElementById(targetId);
      if (!codeElement) return;

      const codeText = codeElement.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(codeText)
          .then(() => feedbackCopiado(this))
          .catch(() => fallbackCopy(codeText, this));
      } else {
        fallbackCopy(codeText, this);
      }
    });
  });

  /**
   * Exibe feedback visual de "Copiado!" por 2 segundos.
   */
  function feedbackCopiado(btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    setTimeout(function () {
      btn.innerHTML = original;
    }, 2000);
  }

  /**
   * Fallback para navegadores sem suporte à Clipboard API.
   */
  function fallbackCopy(text, btn) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0;";
    document.body.appendChild(ta);
    ta.select();

    try {
      document.execCommand("copy");
      feedbackCopiado(btn);
    } catch (err) {
      alert("❌ Não foi possível copiar. Copie manualmente.");
    }

    document.body.removeChild(ta);
  }

  /* ============================================================
     2. BOTÃO IMPRIMIR
     Expande todos os itens do accordion antes de imprimir
     ============================================================ */
  const btnImprimir = document.getElementById("btnImprimir");
  if (btnImprimir) {
    btnImprimir.addEventListener("click", function () {
      // Expande todos os itens do accordion
      const collapses = document.querySelectorAll(
        "#accordionPlanos .accordion-collapse"
      );
      collapses.forEach(function (el) {
        if (!el.classList.contains("show")) {
          el.classList.add("show");
        }
      });

      // Remove a classe "collapsed" dos botões para consistência visual
      const buttons = document.querySelectorAll(
        "#accordionPlanos .accordion-button"
      );
      buttons.forEach(function (b) {
        b.classList.remove("collapsed");
        b.setAttribute("aria-expanded", "true");
      });

      // Pequeno delay para garantir a renderização antes da impressão
      setTimeout(function () {
        window.print();
      }, 250);
    });
  }

  /* ============================================================
     3. EXPANDIR TODOS
     ============================================================ */
  const btnExpandir = document.getElementById("btnExpandir");
  if (btnExpandir) {
    btnExpandir.addEventListener("click", function () {
      const collapses = document.querySelectorAll(
        "#accordionPlanos .accordion-collapse"
      );
      const buttons = document.querySelectorAll(
        "#accordionPlanos .accordion-button"
      );

      collapses.forEach(function (el) {
        el.classList.add("show");
      });

      buttons.forEach(function (b) {
        b.classList.remove("collapsed");
        b.setAttribute("aria-expanded", "true");
      });
    });
  }

  /* ============================================================
     4. RECOLHER TODOS
     ============================================================ */
  const btnRecolher = document.getElementById("btnRecolher");
  if (btnRecolher) {
    btnRecolher.addEventListener("click", function () {
      const collapses = document.querySelectorAll(
        "#accordionPlanos .accordion-collapse"
      );
      const buttons = document.querySelectorAll(
        "#accordionPlanos .accordion-button"
      );

      collapses.forEach(function (el) {
        el.classList.remove("show");
      });

      buttons.forEach(function (b) {
        b.classList.add("collapsed");
        b.setAttribute("aria-expanded", "false");
      });
    });
  }
});
