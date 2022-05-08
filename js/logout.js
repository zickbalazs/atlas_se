document.querySelector('#logout').addEventListener('click', ()=>{
    if (confirm("Biztosan ki akarsz lépni?")){
        sessionStorage.removeItem('atlaslogin');
        window.location.href="/admin";
    }
})

