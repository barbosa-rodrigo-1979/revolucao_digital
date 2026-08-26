/* ================================================================
   ano1_bimestre_1.js – Funcionalidades unificadas
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ================================================================
  // 1. FUNÇÕES DE COPIA DE CÓDIGO
  // (copiado integralmente de ano1_bimestre_1_planos_de_aula.js)
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
  // 2. BOTÃO DE IMPRESSÃO GERAL
  // (copiado integralmente de modelo_apresentacao_bimestre.js)
  // ================================================================
  const btnPrint = document.getElementById("btnPrint");
  if (btnPrint) {
    btnPrint.addEventListener("click", function () {
      window.print();
    });
  }

  // ================================================================
  // 3. BOTÃO DE IMPRESSÃO ESPECÍFICO DOS PLANOS DE AULA (accordion)
  // (funcionalidade adicional para imprimir apenas a seção de planos)
  // ================================================================
  const btnPrintPlanos = document.getElementById("btnPrintPlanos");
  if (btnPrintPlanos) {
    btnPrintPlanos.addEventListener("click", function () {
      const planosSection = document.getElementById("planos-section");
      if (!planosSection) return;

      // Salva o conteúdo atual do body
      const originalBody = document.body.innerHTML;

      // Cria um novo documento para impressão
      const printWindow = window.open("", "_blank", "width=800,height=600");
      if (!printWindow) {
        alert(
          "Permita pop-ups para imprimir os planos. Caso contrário, use a impressão geral.",
        );
        return;
      }

      // Conteúdo que será impresso (apenas a seção de planos)
      const planosHTML = planosSection.outerHTML;

      // Monta o HTML da janela de impressão
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Planos de Aula – 1º Bimestre</title>
          <!-- Bootstrap 5 -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
          <!-- Font Awesome -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,600;14..32,700&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
          <style>
            /* Estilos mínimos para impressão */
            body { font-family: 'Inter', sans-serif; background: #fff; color: #212529; padding: 20px; }
            .glass-card { background: #fff; border: 1px solid #dee2e6; border-radius: 1.5rem; padding: 1.5rem; margin-bottom: 1.5rem; }
            .card-title { color: #e9b400; border-bottom: 3px solid #ffd200; padding-bottom: 0.75rem; margin-bottom: 1.5rem; }
            .text-utfpr-yellow { color: #e9b400 !important; }
            .table-utfpr-yellow { background-color: #ffd200 !important; }
            .table-utfpr-yellow th { background-color: #e9b400 !important; color: #fff !important; }
            .table tbody { background-color: #f8f9fa !important; }
            .accordion-button { background: #f8f9fa !important; border: 1px solid #dee2e6 !important; }
            .accordion-collapse { display: block !important; }
            .accordion-button::after { display: none !important; }
            .btn-print-planos, .btn-print, .d-print-none { display: none !important; }
            .code-block { background: #212529; border-radius: 1rem; padding: 1rem; border-left: 6px solid #ffd200; color: #ebf0eb; }
            .code-block pre { margin: 0; font-family: 'Fira Code', monospace; font-size: 0.9rem; }
            .badge { border: 1px solid #dee2e6; background: #f8f9fa !important; color: #212529 !important; }
          </style>
        </head>
        <body>
          <div class="container">
            ${planosHTML}
          </div>
          <script>
            // Garante que os accordions fiquem expandidos na impressão
            document.addEventListener('DOMContentLoaded', function() {
              document.querySelectorAll('.accordion-collapse').forEach(el => {
                el.classList.add('show');
              });
            });
          <\/script>
        </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      // Aguarda o carregamento dos recursos e dispara a impressão
      printWindow.onload = function () {
        setTimeout(function () {
          printWindow.print();
          // Fecha a janela após a impressão (ou se cancelar)
          printWindow.onafterprint = function () {
            printWindow.close();
          };
        }, 500);
      };
    });
  }

  // ================================================================
  // 4. FUNÇÕES PARA ACORDION (expansão/recolhimento)
  // (copiado integralmente de modelo_fechamento_bimestre.js)
  // ================================================================
  window.expandirTodos = function () {
    document
      .querySelectorAll(".accordion-button.collapsed")
      .forEach((b) => b.click());
  };

  window.recolherTodos = function () {
    document
      .querySelectorAll(".accordion-button:not(.collapsed)")
      .forEach((b) => b.click());
  };

  // ================================================================
  // 5. MENSAGENS DE BOAS-VINDAS NO CONSOLE
  // (copiado de modelo_apresentacao_bimestre.js e modelo_fechamento_bimestre.js)
  // ================================================================
  console.log(
    "%c🚀 CODANDO O FUTURO – 1º BIMESTRE",
    "font-size:24px; font-weight:bold; color:#FFD200;",
  );
  console.log(
    "%c📚 Use o botão de impressão para gerar PDF ou papel.",
    "font-size:16px; color:#aaa;",
  );
  console.log(
    "%c🔧 Dica: expandirTodos() e recolherTodos() no console.",
    "font-size:14px; color:#aaa;",
  );
  console.log(
    '%c💡 Lembre-se: "Se não está no HTML, não existe."',
    "font-size:14px; color:#FFD200;",
  );
});
