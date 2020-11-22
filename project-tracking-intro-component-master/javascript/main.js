const menuIcon = document.querySelector('.navbar-hamburguer-menu');
const closeIcon = document.querySelector('.navbar-close-menu');
const navbarCollapse = document.querySelector('.navbar-collapse');

menuIcon.addEventListener('click', ()=>{    
    navbarCollapse.classList.toggle('open');
    menuIcon.classList.toggle('open');
    closeIcon.classList.toggle('open');
});

closeIcon.addEventListener('click', ()=>{
    navbarCollapse.classList.remove('open');
    menuIcon.classList.remove('open');
    closeIcon.classList.remove('open');
});

const navbarController = ()=>{
    if(window.innerWidth>1024)
    navbarCollapse.classList.remove('open');
    menuIcon.classList.remove('open');
    closeIcon.classList.remove('open');
}

window.addEventListener('resize', navbarController);

