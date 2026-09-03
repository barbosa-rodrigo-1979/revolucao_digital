/* ================================================================
   ANO 3 – BIMESTRE 1 – FUNCIONALIDADES
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // 1. COPIA DE CÓDIGO (btn-copy-code)
  // ============================================================
  const copyButtons = document.querySelectorAll(".btn-copy-code");
  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const targetId = this.getAttribute("data-code-target");
      if (!targetId) return;
      const codeElement = document.getElementById(targetId);
      if (!codeElement) return;

      // Pega o texto bruto do código (sem a formatação extra)
      let codeText = codeElement.textContent.trim();

      // Se o código estiver dentro de um <pre> com quebras de linha,
      // mantemos a indentação. O textContent já preserva espaços.
      // Para melhor formatação, podemos pegar o innerText se necessário.
      // Mas o textContent é suficiente.

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
    } catch (e) {
      alert("❌ Não foi possível copiar. Copie manualmente.");
    }
    document.body.removeChild(ta);
  }

  // ============================================================
  // 2. BOTÃO DE IMPRESSÃO
  // ============================================================
  const btnPrint = document.getElementById("btnPrint");
  if (btnPrint) {
    btnPrint.addEventListener("click", function () {
      window.print();
    });
  }

  // ============================================================
  // 3. (OPCIONAL) FECHAR ACCORDION AO IMPRIMIR? Não necessário.
  //    A impressão já é controlada via CSS @media print.
  // ============================================================

  console.log("🚀 ano3bim1.js carregado com sucesso!");
});
