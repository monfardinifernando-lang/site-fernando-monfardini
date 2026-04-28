/* =====================================================
   FERNANDO MONFARDINI — main.js v1.1
   Responsabilidades:
     1. Nav sticky (surge ao scrollar)
     2. Smooth scroll nos links internos
     3. Fade-in por IntersectionObserver
     4. Renderização dinâmica de artigos e notícias
   ===================================================== */

'use strict';

/* =====================================================
   1. ARTIGOS — textos assinados por Fernando Monfardini
      Editar aqui para adicionar conteúdo.
      No futuro, substituir por: fetch('artigos.json')
   ===================================================== */
const artigos = [
  {
    titulo: "Rede contra PLD e Compliance com riscos integrados",
    fonte: "LinkedIn",
    url: "https://www.linkedin.com/pulse/rede-contra-pld-e-compliance-com-riscos-integrados-monfardini-ngvrf/",
    data: ""
  },
  {
    titulo: "Integridade com propósito: uma nova perspectiva sobre o compliance",
    fonte: "LinkedIn",
    url: "https://www.linkedin.com/pulse/integridade-com-prop%C3%B3sito-uma-nova-perspectiva-sobre-o-monfardini-pkxyf/",
    data: ""
  },
  {
    titulo: "LGPD no futebol: desafios e oportunidades em um ambiente sem cultura de governança",
    fonte: "Trivela",
    url: "https://trivela.com.br/na-bancada/lgpd-no-futebol-os-desafios-e-oportunidades-em-um-ambiente-sem-cultura-de-governanca-corporativa-e-transparencia/",
    data: ""
  },
  {
    titulo: "Assombração sabe para quem aparece",
    fonte: "MW Family Office",
    url: "https://www.blog.mwfamilyoffice.com.br/post/assombracao-sabe-para-quem-aparece",
    data: ""
  }
];

/* =====================================================
   1b. NOTÍCIAS — menções e coberturas da imprensa
   ===================================================== */
const noticias = [
  {
    titulo: "Parceria com IC360 reforça ações de integridade no esporte",
    fonte: "Atlético Mineiro",
    url: "https://atletico.com.br/parceria-com-ic360-reforca-acoes-de-integridade-no-esporte/",
    data: ""
  },
  {
    titulo: "Fernando Monfardini: dar conforto técnico e confiança, mitigar riscos e fortalecer a cultura do clube",
    fonte: "G-M News",
    url: "https://g-mnews.com/pt/fernando-monfardini-atletico-mineiro-dar-conforto-tecnico-e-confianca-mitigar-riscos-e-fortalecer-a-cultura-do-clube/",
    data: ""
  },
  {
    titulo: "Evento de compliance e integridade do Leão reúne nomes nacionais do setor",
    fonte: "Sport Recife",
    url: "https://sportrecife.com.br/o-clube/evento-de-compliance-e-integridade-do-leao-reune-nomes-nacionais-do-setor-e-colaboradores-do-clube/",
    data: ""
  },
  {
    titulo: "Atlético Mineiro, compliance e manipulação",
    fonte: "SBC Notícias",
    url: "https://sbcnoticias.com/br/atletico-mineiro-compliance-manipulacao/",
    data: ""
  },
  {
    titulo: "Compromisso com a integridade e a ética nos negócios",
    fonte: "Boston Metal Brasil",
    url: "https://br.bostonmetal.com/noticias/compromisso-com-a-integridade-e-a-etica-nos-negocios/",
    data: ""
  }
];

/* =====================================================
   2. UTILIDADES
   ===================================================== */

/**
 * Formata data ISO (YYYY-MM-DD) para português-Brasil
 * Exemplo: "2024-09-10" → "10 set. 2024"
 */
function formatarData(dataISO) {
  try {
    const [ano, mes, dia] = dataISO.split('-').map(Number);
    const data = new Date(ano, mes - 1, dia);
    return data.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (_) {
    return dataISO;
  }
}

/* =====================================================
   3. RENDERIZAR LISTAS NO DOM
      Função genérica — usada tanto para artigos quanto
      para notícias. Recebe array e ID do container.
   ===================================================== */
function renderizarLista(lista, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!lista || lista.length === 0) {
    container.innerHTML = '<p class="artigo-card__meta">Em breve.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();

  lista.forEach(function (item) {
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'artigo-card';
    link.setAttribute('aria-label', item.titulo + ' — ' + item.fonte);

    const titulo = document.createElement('span');
    titulo.className = 'artigo-card__titulo';
    titulo.textContent = item.titulo;

    const meta = document.createElement('span');
    meta.className = 'artigo-card__meta';
    /* Exibe data apenas se informada */
    meta.textContent = item.data
      ? item.fonte + ' · ' + formatarData(item.data)
      : item.fonte;

    link.appendChild(titulo);
    link.appendChild(meta);
    fragment.appendChild(link);
  });

  container.appendChild(fragment);
}

/* Atalhos para cada container */
function renderizarArtigos() {
  renderizarLista(artigos, 'artigos-container');
}

function renderizarNoticias() {
  renderizarLista(noticias, 'noticias-container');
}

/* =====================================================
   4. NAV STICKY — surge após scrollar 80px
   ===================================================== */
function iniciarNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let ultimoScroll = 0;

  function atualizarNav() {
    const scrollAtual = window.scrollY || window.pageYOffset;

    if (scrollAtual > 80) {
      nav.classList.add('nav--visible');
    } else {
      nav.classList.remove('nav--visible');
    }

    ultimoScroll = scrollAtual;
  }

  // Usar requestAnimationFrame para performance
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        atualizarNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Verificar estado inicial
  atualizarNav();
}

/* =====================================================
   5. SMOOTH SCROLL — links internos (#ancora)
      (reforça o scroll-behavior: smooth do CSS
       e garante compatibilidade com navegadores antigos)
   ===================================================== */
function iniciarSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const id = link.getAttribute('href');
      if (id === '#') return;

      const alvo = document.querySelector(id);
      if (!alvo) return;

      e.preventDefault();

      // Compensar altura da nav (60px)
      const navHeight = document.getElementById('nav')
        ? document.getElementById('nav').offsetHeight
        : 0;

      const posicao = alvo.getBoundingClientRect().top
                    + window.scrollY
                    - navHeight;

      window.scrollTo({
        top: posicao,
        behavior: 'smooth'
      });
    });
  });
}

/* =====================================================
   6. FADE-IN POR INTERSECTIONOBSERVER
      Adiciona classe .visible quando o elemento
      entra no viewport, disparando a transição CSS
   ===================================================== */
function iniciarFadeIn() {
  // Verificar suporte (todos os navegadores modernos)
  if (!('IntersectionObserver' in window)) {
    // Fallback: tornar tudo visível imediatamente
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const opcoes = {
    threshold: 0.12,       // 12% do elemento visível dispara
    rootMargin: '0px 0px -40px 0px'  // leve antecipação pela base
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Uma vez visível, para de observar (animação só ocorre uma vez)
        observer.unobserve(entry.target);
      }
    });
  }, opcoes);

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });
}

/* =====================================================
   7. INICIALIZAR LUCIDE ICONS
      O script Lucide é carregado via CDN com defer;
      aqui garantimos que o createIcons() seja chamado
      após o DOM estar pronto.
   ===================================================== */
function iniciarIcons() {
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

/* =====================================================
   8. INIT PRINCIPAL — aguarda DOMContentLoaded
   ===================================================== */
document.addEventListener('DOMContentLoaded', function () {
  renderizarArtigos();
  renderizarNoticias();
  iniciarNav();
  iniciarSmoothScroll();
  iniciarFadeIn();

  // Lucide pode carregar ligeiramente depois do DOMContentLoaded
  // (script tem defer), então tentamos agora e com fallback em load
  iniciarIcons();
});

window.addEventListener('load', function () {
  // Segunda tentativa após todos os recursos carregarem
  iniciarIcons();

  // Marcar elementos do hero como visíveis (já estão na viewport)
  document.querySelectorAll('.hero .fade-in').forEach(function (el) {
    el.classList.add('visible');
  });
});
