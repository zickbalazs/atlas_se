async function News(){
    return await (await fetch(`/api/get-articles?page=0&posts=100`)).json();
}

let posts = 10,
    articles = async ()=>{return await News(posts)},
    moarBtn = document.querySelector('#moarpls');
    
    
async function DisplayPosts(){
    let ar = await articles();
    document.querySelector('main').innerHTML="";
    for (let i = 0; i < ar.length; i++){
        document.querySelector('main').append(CreatePost(ar[i]));
    }
}
DisplayPosts();

function CreatePost(object){
    let post = document.createElement('article')
    post.innerHTML=`
        <img src="../${object.url}">
        <h3>${object.title}</h3>
        <h4>${object.author}@${object.date.toString().split('.')[0]}</h4>
        <p>${object.description}</p>
        <input type="button" id="toA${object.id}" value="Tovább...">`;
    post.querySelector('input').addEventListener('click', ()=>{
        DisplayPost(object.id);
    })
    return post;
}
async function DisplayPost(id){
    document.querySelector('main').innerHTML="";
    let article = await (await fetch(`/api/article?id=${id}`)).json();
    article = article[0];
    document.querySelector('main').innerHTML = await (await fetch('/html/articletemplate.html')).text();
    document.querySelector('#Title').innerHTML = article.title;
    document.querySelector('#description').innerHTML = article.description;
    document.querySelector('#Data').innerHTML = `${article.author}, ${article.date.toString().split('.')[0]}`;
    document.querySelector('#media').src="../"+article.url;
    for (let i = 0; i < article.article.split('\n').length; i++){
        document.querySelector('#article').innerHTML += `<p>${article.article.split('\n')[i]}</p>`;
    }
    document.querySelector('input').addEventListener('click', ()=>{
        document.querySelector('main').innerHTML="";
        DisplayPosts();
    })
}