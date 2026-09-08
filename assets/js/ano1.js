/* ================================================================
   ano1.js – Funcionalidades do Panorama Completo do 1º Ano
   ================================================================ */

document.addEventListener("DOMContentLoaded", function () {

  // ============================================================
  // 1. COPIA DE CÓDIGO (dos blocos <pre><code>)
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
  // 2. NAVEGAÇÃO DOS SLIDES (Semana 10 – Apresentação)
  // ============================================================
  const slidesContainer = document.getElementById("slideContainer");
  if (slidesContainer) {
    // Dados dos slides (copiados do HTML inline original)
    var slides = [
      { titulo: '🚀 Abertura', html: `<span class="emoji-grande" style="font-size:4rem;">🎬</span><h1>Projeto Integrador</h1><h2>1º Bimestre Codando o Futuro</h2><p>Equipe: <strong>[Nomes]</strong></p><p>Tema: <strong>[Tema]</strong></p>` },
      { titulo: '📖 Sobre o Projeto', html: `<h2>📖 O que construímos?</h2><p>Desenvolvemos um <strong>[descrever o projeto]</strong> que resolve [qual problema].</p>` },
      { titulo: '🛠️ Tecnologias Usadas', html: `<h2>🛠️ Nossa caixa de ferramentas</h2><ul><li><strong>HTML</strong> Estrutura</li><li><strong>CSS</strong> Estilização</li><li><strong>JS</strong> Interatividade</li><li><strong>DOM</strong> Manipulação</li><li><strong>Eventos</strong> Interações</li><li><strong>Arrays</strong> Dados</li><li><strong>Funções</strong> Modularização</li></ul>` },
      { titulo: '⚡ Funcionalidades', html: `<h2>⚡ O que nosso projeto faz?</h2><ul><li>Funcionalidade 1: [desc]</li><li>Funcionalidade 2: [desc]</li><li>Funcionalidade 3: [desc]</li><li>Funcionalidade 4: [desc]</li></ul>` },
      { titulo: '🎮 Demonstração ao Vivo', html: `<span class="emoji-grande" style="font-size:4rem;">🎮</span><h2>Vamos ver funcionando!</h2><p>Agora é a hora da demonstração ao vivo.</p>` },
      { titulo: '🧠 Desafios e Aprendizados', html: `<h2>🧠 O que foi desafiador?</h2><ul><li>Desafio 1: [ex]</li><li>Desafio 2: [ex]</li><li>Desafio 3: [ex]</li></ul><h3>📈 O que aprendemos?</h3><ul><li>Aprendizado 1: [ex]</li><li>Aprendizado 2: [ex]</li><li>Aprendizado 3: [ex]</li></ul>` },
      { titulo: '🔮 Próximos Passos', html: `<h2>🔮 O que vem por aí?</h2><ul><li>Melhoria 1: [ex]</li><li>Melhoria 2: [ex]</li><li>Melhoria 3: [ex]</li></ul>` },
      { titulo: '🏆 Fechamento', html: `<span class="emoji-grande" style="font-size:4rem;">🏆</span><h1>Obrigado!</h1><h2>Esta foi a nossa jornada.</h2><p>Construímos, erramos, aprendemos, celebramos.</p>` }
    ];

    var slideAtual = 0;
    var total = slides.length;
    var content = document.getElementById('slideContent');
    var slideNumero = document.getElementById('slideNumero');
    var slideTitulo = document.getElementById('slideTitulo');
    var slideAtualSpan = document.getElementById('slideAtual');
    var totalSlidesSpan = document.getElementById('totalSlides');
    var btnAnterior = document.getElementById('btnAnterior');
    var btnProximo = document.getElementById('btnProximo');

    function carregarSlide(index) {
      content.innerHTML = slides[index].html;
      slideNumero.textContent = `Slide ${index + 1} / ${total}`;
      slideTitulo.textContent = slides[index].titulo;
      slideAtualSpan.textContent = index + 1;
      totalSlidesSpan.textContent = total;
      btnAnterior.disabled = (index === 0);
      btnProximo.disabled = (index === total - 1);
    }

    if (btnProximo) {
      btnProximo.addEventListener('click', function () {
        if (slideAtual < total - 1) {
          slideAtual++;
          carregarSlide(slideAtual);
        }
      });
    }

    if (btnAnterior) {
      btnAnterior.addEventListener('click', function () {
        if (slideAtual > 0) {
          slideAtual--;
          carregarSlide(slideAtual);
        }
      });
    }

    // Navegação por teclado (setas)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (slideAtual < total - 1) {
          slideAtual++;
          carregarSlide(slideAtual);
          e.preventDefault();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (slideAtual > 0) {
          slideAtual--;
          carregarSlide(slideAtual);
          e.preventDefault();
        }
      }
    });

    // Inicializa o primeiro slide
    if (totalSlidesSpan) totalSlidesSpan.textContent = total;
    carregarSlide(0);
    console.log('🎬 APRESENTAÇÃO CARREGADA!');
    console.log('📌 Navegação: setas do teclado ← →');
  }

  // ============================================================
  // 3. BOTÃO DE IMPRESSÃO (imprime apenas o accordion em A4)
  // ============================================================
  const btnPrint = document.getElementById('btnPrint');
  if (btnPrint) {
    btnPrint.addEventListener('click', function () {
      // Seleciona o elemento que contém o accordion (todos os planos)
      const accordion = document.getElementById('accordionPlanos');
      if (!accordion) {
        alert('Nenhum conteúdo para imprimir.');
        return;
      }

      // Expande todos os accordions para garantir que todo conteúdo seja impresso
      const collapseElements = accordion.querySelectorAll('.accordion-collapse');
      collapseElements.forEach(el => {
        el.classList.add('show');
      });

      // Abre a janela de impressão
      window.print();
    });
  }

  // ============================================================
  // 4. AJUSTE PARA IMPRESSÃO: garantir que o accordion fique totalmente expandido
  // ============================================================
  // (O botão já faz isso, mas também podemos forçar antes de imprimir)
  window.addEventListener('beforeprint', function () {
    const accordion = document.getElementById('accordionPlanos');
    if (accordion) {
      const collapses = accordion.querySelectorAll('.accordion-collapse');
      collapses.forEach(el => {
        el.classList.add('show');
      });
    }
  });

});
