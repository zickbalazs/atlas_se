let form = document.querySelector('form');

function ArticleFeldolgoz(article){
    let art = "";
    article.split('\n').forEach(line=>{
        if (line[0]=="-") art+=`<li>${line}</li>\\n`;
    })
}
document.querySelector('button').addEventListener('click', async ()=>{
    let post2 = new FormData();
    post2.append('title', form.title.value);
    post2.append('description', form.short.value);
    post2.append('article', form.article.value);
    post2.append('author', JSON.parse(sessionStorage.getItem('atlaslogin')).username);
    post2.append('media', form.picture.files[0]);
    let response = await fetch('/api/upload-article', {
        method:"POST",
        body: post2
    })
    if (await response.status==200){
        alert("Sikeres felvétel!");
        ResetForm();
    }
})


function ResetForm(){
    form.title.value="";
    form.short.value="";
    form.article.value="";
    form.picture.value="";
}