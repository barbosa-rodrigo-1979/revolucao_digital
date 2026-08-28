/* ================================================================
   ano1bim4.js – Funcionalidades do 4º Bimestre
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

  // --- IMPRESSÃO ESPECÍFICA DOS PLANOS (accordion) ---
  const btnPrintPlanos = document.getElementById("btnPrintPlanos");
  if (btnPrintPlanos) {
    btnPrintPlanos.addEventListener("click", function () {
      // Seleciona apenas a seção de planos (accordion)
      const planosSection = document.getElementById("planos-section");
      if (!planosSection) {
        alert("Seção de planos não encontrada.");
        return;
      }

      // Salva o conteúdo original da página para restaurar depois
      const originalContent = document.body.innerHTML;

      // Cria um clone da seção de planos para impressão
      const planosClone = planosSection.cloneNode(true);

      // Abre todas as abas do accordion no clone
      const accordionItems = planosClone.querySelectorAll(
        ".accordion-collapse",
      );
      accordionItems.forEach(function (item) {
        item.classList.add("show"); // força a exibição
        item.style.display = "block"; // garante visibilidade
      });

      // Remove os botões de copiar e outros elementos desnecessários no clone
      const copyBtns = planosClone.querySelectorAll(".btn-copy-code");
      copyBtns.forEach(function (btn) {
        btn.remove();
      });

      // Cria um contêiner para a impressão
      const printContainer = document.createElement("div");
      printContainer.id = "print-container";
      printContainer.style.cssText =
        "padding: 20px; background: white; max-width: 100%;";
      printContainer.appendChild(planosClone);

      // Substitui o body pelo conteúdo apenas da seção de planos
      document.body.innerHTML = "";
      document.body.appendChild(printContainer);

      // Adiciona estilos específicos para impressão (já incluídos no CSS)
      window.print();

      // Restaura o conteúdo original após a impressão
      document.body.innerHTML = originalContent;

      // Reatribui os eventos (pois o DOM foi recriado)
      // Recarregar a página é mais simples para garantir que tudo funcione
      // Mas podemos reaplicar os eventos manualmente, ou apenas recarregar.
      // Vamos recarregar para garantir consistência.
      location.reload();
    });
  }
});
