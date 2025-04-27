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
