// Detecta o redimensionamento da janela e exibe no console o tipo de dispositivo
window.addEventListener("resize", () => {
    const larguraTela = window.innerWidth;

    if (larguraTela <= 768) {
        console.log("Dispositivo pequeno (celular)");
    } else if (larguraTela > 768 && larguraTela <= 1024) {
        console.log("Dispositivo médio (tablet)");
    } else {
        console.log("Dispositivo grande (desktop)");
    }
});

const menuBtn = document.getElementById('menu-toggle');
const menuLista = document.getElementById('menu-lista');

menuBtn.addEventListener('click', function () {
  this.classList.toggle('active');
  menuLista.classList.toggle('open');
  const expanded = this.classList.contains('active');
  this.setAttribute('aria-expanded', expanded);
});

// AQUI COMEÇA A PARTE NOVA:
let scrollInterval;

function iniciarScrollAutomatico() {
    if (scrollInterval) clearInterval(scrollInterval);

    const wrapper = document.querySelector('.benefits-wrapper');
    if (!wrapper) return;

    if (window.innerWidth <= 768) {
        let scrollDirection = 1;

        scrollInterval = setInterval(() => {
            wrapper.scrollLeft += 2 * scrollDirection;

            if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 1) {
                scrollDirection = -1;
            }
            if (wrapper.scrollLeft <= 0) {
                scrollDirection = 1;
            }
        }, 16);
    }
}

document.addEventListener('DOMContentLoaded', iniciarScrollAutomatico);
window.addEventListener('resize', iniciarScrollAutomatico);
