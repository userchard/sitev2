// Detecta o redimensionamento da janela e identifica o dispositivo
function detectDevice() {
  const larguraTela = window.innerWidth;

  if (larguraTela <= 768) {
      console.log("Dispositivo pequeno (celular)");
  } else if (larguraTela > 768 && larguraTela <= 1024) {
      console.log("Dispositivo médio (tablet)");
  } else {
      console.log("Dispositivo grande (desktop)");
  }
}

// Ativa ou desativa o menu mobile
function toggleMenu() {
  const menuBtn = document.getElementById('menu-toggle');
  const menuLista = document.getElementById('menu-lista');

  if (!menuBtn || !menuLista) return;

  menuBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      menuLista.classList.toggle('open');
      const expanded = this.classList.contains('active');
      this.setAttribute('aria-expanded', expanded);
  });
}

// Inicializa todos os scripts
function init() {
  detectDevice();
  toggleMenu();
}

// Detecta resize e reexecuta detecção de dispositivo
window.addEventListener("resize", detectDevice);

// Inicializa assim que o conteúdo da página carregar
document.addEventListener("DOMContentLoaded", init);

// Fade-in nos elementos ao rolar
function fadeInOnScroll() {
  const elements = document.querySelectorAll('.fade-in-section:not(.is-visible)');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Para de observar após a animação
      }
    });
  }, {
    threshold: 0.1 // Ativa quando 10% do elemento está visível
  });

  elements.forEach(el => observer.observe(el));
}

// Atualiza o init para incluir o fade-in
function init() {
  detectDevice();
  toggleMenu();
  fadeInOnScroll();
}

// Buscar notícias sobre o mercado agro usando Mediastack
function fetchAgroNews(page = 1) {
  const accessKey = 'a1f606a083e0deeb0a297c4a515f9cd9'; // Substitua pela sua chave real
  const url = `http://api.mediastack.com/v1/news?access_key=${accessKey}&categories=business&keywords=agriculture&languages=pt&limit=8&page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayNews(data.data); // Exibe as notícias
    })
    .catch(error => console.error('Erro ao buscar notícias:', error));
}

// Mostrar as notícias na página
function displayNews(newsArray) {
  const newsList = document.getElementById('news-list');
  if (!newsList) return;

  newsArray.forEach(news => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item', 'fade-in-section'); // Adiciona a classe para animação

    // Verifica se a imagem está disponível, caso contrário, usa uma imagem padrão
    const imageUrl = news.image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Substitua 'placeholder.jpg' pelo caminho da sua imagem padrão

    // Adiciona imagem, título, descrição, categoria e botão "Leia mais"
    newsItem.innerHTML = `
      <img src="${imageUrl}" alt="${news.title}" class="news-image">
      <h3>${news.title}</h3>
      <p>${news.description || 'Descrição não disponível.'}</p>
      <a href="${news.url}" target="_blank" class="news-button">Leia mais</a>
    `;

    newsList.appendChild(newsItem);
  });

  // Reaplica o IntersectionObserver para os novos elementos
  fadeInOnScroll();
}

// Adicionar funcionalidade ao botão "Ver mais notícias"
function setupLoadMoreButton() {
  const loadMoreButton = document.getElementById('load-more-news');
  let currentPage = 1;

  if (!loadMoreButton) return;

  loadMoreButton.addEventListener('click', () => {
    loadMoreButton.disabled = true; // Desativa o botão enquanto carrega
    currentPage++;
    fetchAgroNews(currentPage).finally(() => {
      loadMoreButton.disabled = false; // Reativa o botão após carregar
    });
  });
}

// Inicializa todos os scripts
function init() {
  detectDevice();
  toggleMenu();
  fadeInOnScroll();
  fetchAgroNews(); // Carrega a primeira página de notícias
  setupLoadMoreButton(); // Configura o botão "Ver mais notícias"
}

// Detecta resize e reexecuta detecção de dispositivo
window.addEventListener("resize", detectDevice);

// Inicializa assim que o conteúdo da página carregar
document.addEventListener("DOMContentLoaded", init);
