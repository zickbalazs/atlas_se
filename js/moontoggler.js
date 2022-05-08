let toggler = document.querySelector('#toggler');
toggler.addEventListener('click', ()=>{
    document.body.classList.toggle('darkmode');
    toggler.children[0].classList.toggle('bi-moon');
    toggler.children[0].classList.toggle('bi-sun');
    if (document.location.toString().includes('admin')){
        for (let i = 0; i<document.querySelectorAll('.flex').length; i++){
            document.querySelectorAll('.flex')[i].querySelectorAll('a').forEach(e=>{
                e.classList.toggle('lightmode');
            })
        }
        for (let i = 0; i<document.querySelector('footer').querySelectorAll('p').length; i++){
            document.querySelector('footer').querySelectorAll('p')[i].classList.toggle('lightmode-f');
        }
    }
})
