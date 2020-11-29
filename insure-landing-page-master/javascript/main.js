const navbarMenu = document.querySelector('.navbar__menu');
const hamburguerMenuIcon = document.querySelector('.navbar__menu-hamburguer');
const closeMenuIcon = document.querySelector('.navbar__menu-close');

hamburguerMenuIcon.addEventListener('click', (event)=>{
        event.preventDefault();
        navbarMenu.classList.toggle('open');
});

closeMenuIcon.addEventListener('click', (event)=>{
    event.preventDefault();
    navbarMenu.classList.remove('open');
});

window.addEventListener('resize', ()=>{
  
    if(window.innerWidth>1024){
        console.log('working')
        navbarMenu.classList.remove('open')
    }
})