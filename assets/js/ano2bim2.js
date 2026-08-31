/* ================================================================
   ano2bim2.js – Funcionalidades para o 2º Ano – 2º Bimestre
   Copiado dos anexos e adaptado para o contexto
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. COPIA DE CÓDIGO (botões .btn-copy-code) ---
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

  // --- 2. BOTÃO DE IMPRESSÃO GERAL (#btnPrint) ---
  const btnPrint = document.getElementById("btnPrint");
  if (btnPrint) {
    btnPrint.addEventListener("click", function () {
      window.print();
    });
  }

  // --- 3. BOTÃO DE IMPRESSÃO ESPECÍFICO PARA PLANOS (#btnPrintPlanos) ---
  const btnPrintPlanos = document.getElementById("btnPrintPlanos");
  if (btnPrintPlanos) {
    btnPrintPlanos.addEventListener("click", function () {
      // Abre a impressão com foco no accordion (todo o conteúdo já está na página)
      window.print();
    });
  }

  // --- 4. (Opcional) Simulador de pitch/banca – apenas para referência, não acionado automaticamente ---
  // O código Python está nos blocos de código; não há execução no navegador.
});
