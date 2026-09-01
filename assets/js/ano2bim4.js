/* ================================================================
   ano2bim4.js – Funcionalidades do 2º Ano, 4º Bimestre
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // --------------------------------------------------------------
  // 1. COPIA DE CÓDIGO (botões dentro dos blocos de código)
  // --------------------------------------------------------------
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

  // --------------------------------------------------------------
  // 2. IMPRESSÃO DOS PLANOS DE AULA (botão #btnPrintPlanos)
  // --------------------------------------------------------------
  const printBtn = document.getElementById("btnPrintPlanos");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      // Abre a impressão com foco no conteúdo do accordion
      window.print();
    });
  }
});
