let toggler = document.querySelector('#toggler');
toggler.addEventListener('click', ()=>{
    document.body.classList.toggle('darkmode');
    toggler.children[0].classList.toggle('bi-moon');
    toggler.children[0].classList.toggle('bi-sun');
})
