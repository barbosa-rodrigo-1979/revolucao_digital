/* ================================================================
   ano2bim1.js – Funcionalidades para o 2º Ano 1º Bimestre
   Inclui: cópia de código e impressão dos planos de aula (A4)
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ================================================================
  // 1. COPIA DE CÓDIGO (dos blocos <pre><code>)
  // ================================================================
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

  // ================================================================
  // 2. IMPRESSÃO DOS PLANOS DE AULA (em A4)
  // ================================================================
  const btnPrint = document.getElementById("btnPrintPlanos");
  if (btnPrint) {
    btnPrint.addEventListener("click", function () {
      // Aciona a impressão – as regras CSS @media print farão o restante
      window.print();
    });
  }

  // ================================================================
  // 3. (Opcional) Fechar accordions automaticamente na impressão?
  //    Não é necessário, pois o CSS já força a exibição de todos.
  // ================================================================

  console.log("🚀 ano2bim1.js carregado com sucesso.");
  console.log(
    "📌 Botão de impressão: " + (btnPrint ? "encontrado" : "não encontrado"),
  );
});
