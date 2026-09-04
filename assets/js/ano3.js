/* ================================================================
   ano3bim1.js – Funcionalidades para o 3º ano, 1º bimestre
   Baseado nos arquivos modelo_planos_aula.js e outros
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // --- COPIA DE CÓDIGO ---
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

  // --- IMPRESSÃO DOS PLANOS (ACCORDION) ---
  const btnPrintPlanos = document.getElementById("btnPrintPlanos");
  if (btnPrintPlanos) {
    btnPrintPlanos.addEventListener("click", function () {
      // Seleciona o container do accordion
      const accordion = document.getElementById("accordionPlanos");
      if (!accordion) return;

      // Abre todos os painéis do accordion para impressão
      const collapseElements = accordion.querySelectorAll(
        ".accordion-collapse",
      );
      collapseElements.forEach(function (el) {
        el.classList.add("show");
      });

      // Configura para impressão em A4
      const printWindow = window.open("", "_blank", "width=1000,height=800");
      if (!printWindow) {
        alert("Permita pop-ups para imprimir os planos.");
        return;
      }

      // Monta o conteúdo HTML para impressão
      const styles = document.querySelector(
        "link[rel='stylesheet'][href='ano3bim1.css']",
      );
      const styleHref = styles ? styles.getAttribute("href") : "";

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Planos de Aula - 3º Ano 1º Bimestre</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
          <link rel="stylesheet" href="${styleHref}">
          <style>
            body { padding: 20px; background: white; }
            .accordion-button { pointer-events: none; cursor: default; background: #f8f9fa !important; border: 1px solid #dee2e6 !important; }
            .accordion-button::after { display: none !important; }
            .accordion-collapse { display: block !important; }
            .accordion-item { margin-bottom: 10px; }
            .btn-copy-code, .btn-print { display: none !important; }
            .code-block { page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="text-center mb-4">Planos de Aula Detalhados - 3º Ano 1º Bimestre</h1>
            ${accordion.outerHTML}
          </div>
          <script>
            // Impressão automática ao carregar
            window.onload = function() { window.print(); }
          <\/script>
        </body>
        </html>
      `);

      printWindow.document.close();

      // Fecha a janela após a impressão (opcional, mas pode ser útil)
      // printWindow.onafterprint = function() { printWindow.close(); };
    });
  }
});
