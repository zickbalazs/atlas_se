let username = JSON.parse(sessionStorage.getItem('atlaslogin')).username
document.querySelector('h1').innerText = `Üdv, ${username}!`;
document.head.title=`Adminisztráció - ${username}`;