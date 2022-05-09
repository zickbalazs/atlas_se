if (sessionStorage.getItem('atlaslogin')!=null) window.location.href="/admin/dashboard";
else{
    document.querySelector('#login').addEventListener('click', async ()=>{
        let headersL = {
            "Accept": "*/*",
            "Content-Type": "application/json"
            }
            bodyC = JSON.stringify({
               "username":document.querySelector('#username').value,
               "password":document.querySelector('#password').value
            }),
            login = await fetch("/admin/login", { 
             method: "POST",
             body: bodyC,
             headers: headersL
            })
        if (login.status==200) {
            sessionStorage.setItem('atlaslogin', JSON.stringify({
                "username":document.querySelector('#username').value,
                "password":document.querySelector('#password').value,
            }));
            window.location.href='/admin/dashboard';
        }
        else document.querySelector('#error').innerText = "Hibás bejelentkezési adatok!";
    })
}