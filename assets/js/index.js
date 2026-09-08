/* ================================================================
   index.js – Funcionalidades principais
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

  // ============================================================
  // 2. BOTÃO DE IMPRESSÃO – APENAS O CONTEÚDO DO ACCORDION
  // ============================================================
  const btnPrint = document.getElementById("btnPrint");
  if (btnPrint) {
    btnPrint.addEventListener("click", function () {
      // Encontra o accordion de planos
      const accordion = document.getElementById("accordionPlanos");
      if (!accordion) {
        alert("⚠️ Nenhum conteúdo de plano encontrado para imprimir.");
        return;
      }

      // Abre todos os painéis do accordion antes de imprimir
      const collapseElements = accordion.querySelectorAll(
        ".accordion-collapse",
      );
      collapseElements.forEach(function (el) {
        el.classList.add("show");
      });

      // Força a atualização da interface para garantir que todos os painéis estejam visíveis
      setTimeout(function () {
        window.print();
      }, 300);
    });
  }

  // ============================================================
  // 3. COPIA DO TEXTO PLANO DA ÁRVORE (btn-copy-code-tree)
  // ============================================================
  const btnCopyTree = document.getElementById("btnCopyTree");
  if (btnCopyTree) {
    btnCopyTree.addEventListener("click", function () {
      const plainText = document.getElementById("treePlainText");
      if (!plainText) return;
      const text = plainText.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            const original = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            setTimeout(() => (this.innerHTML = original), 2000);
          })
          .catch(() => fallbackCopyTree(text, this));
      } else {
        fallbackCopyTree(text, this);
      }
    });
  }

  function fallbackCopyTree(text, btn) {
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
});
