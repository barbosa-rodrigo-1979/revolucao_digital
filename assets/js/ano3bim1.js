/* ================================================================
   ano3bim1.js – Funcionalidades unificadas
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // --- COPIA DE CÓDIGO (modelo_planos_aula.js) ---
  const copyButtons = document.querySelectorAll(".btn-copy-code");
  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const targetId = this.getAttribute("data-code-target");
      if (!targetId) return;
      const codeElement = document.getElementById(targetId);
      if (!codeElement) return;
      const codeText = codeElement.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(codeText)
          .then(() => {
            const original = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            setTimeout(() => (this.innerHTML = original), 2000);
          })
          .catch(() => fallbackCopy(codeText, this));
      } else {
        fallbackCopy(codeText, this);
      }
    });
  });

  function fallbackCopy(text, btn) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0;";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
      setTimeout(() => (btn.innerHTML = original), 2000);
    } catch {
      alert("❌ Não foi possível copiar. Copie manualmente.");
    }
    document.body.removeChild(ta);
  }

  // --- NAVEGAÇÃO DE SLIDES (modelo_apresentacao_bimestre.js) ---
  // (opcional, pode ser removido se não for usado)
  // Mas mantido para compatibilidade com a estrutura de slides se existir.

  // --- BOTÃO DE IMPRIMIR PLANOS (accordion) ---
  const btnImprimir = document.getElementById("btnImprimirPlanos");
  if (btnImprimir) {
    btnImprimir.addEventListener("click", function () {
      // Abre a janela de impressão com foco no accordion
      window.print();
    });
  }
});
