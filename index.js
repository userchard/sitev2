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
    const elements = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para de observar depois que ficou visível
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        observer.observe(el);
    });
}

// Atualiza o init para incluir o fade-in
function init() {
    detectDevice();
    toggleMenu();
    fadeInOnScroll();
}
