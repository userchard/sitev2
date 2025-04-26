const menuBtn = document.getElementById('menu-toggle');
const menuLista = document.getElementById('menu-lista');

menuBtn.addEventListener('click', function () {
  this.classList.toggle('active');
  menuLista.classList.toggle('open');
  const expanded = this.classList.contains('active');
  this.setAttribute('aria-expanded', expanded);
});