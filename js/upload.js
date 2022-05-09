let form = document.querySelector('form');


document.querySelector('button').addEventListener('click', async ()=>{
    let post2 = new FormData();
    post2.append('category', form.category.value);
    post2.append('title', form.title.value);
    post2.append('short', form.short.value);
    post2.append('article', form.article.value);
    post2.append('author', JSON.parse(sessionStorage.getItem('atlaslogin')).username);
    post2.append('postimg', form.picture.files[0]);
   
    let response = await fetch('/api/upload-article', {
        method:"POST",
        body: post2
    })
    console.log(response);
})