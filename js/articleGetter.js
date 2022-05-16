async function GetArticles(){
    return await(await (fetch('/api/get-articles?page=0&posts=15'))).json();;
}
let articles = async ()=>{
    return await GetArticles();
}

UpdateTable();

async function UpdateTable(){
    let arts = await articles(),
        table = document.querySelector('tbody');
    for (let i = 0; i < arts.length; i++) {
        console.log(arts[i]);
        let tr = document.createElement('tr');
        tr.append(
            Object.assign(document.createElement('td'), {textContent:arts[i].id}),
            Object.assign(document.createElement('td'), {textContent:arts[i].author}),
            Object.assign(document.createElement('td'), {textContent:arts[i].date}),
            Object.assign(document.createElement('td'), {textContent:arts[i].title}),
            Object.assign(document.createElement('td'), {textContent:arts[i].description}),
            Object.assign(document.createElement('td'), {textContent:arts[i].article}),
            Object.assign(document.createElement('td'), {textContent:arts[i].mediaid}),
            Object.assign(document.createElement('button'), {innerHTML:'Edit <i class="bi bi-tools"></i>', id:`edit${i}`, className:"btn btn-outline-success", onclick:()=>{Edit(i)}}),
            Object.assign(document.createElement('button'), {innerHTML:'Remove <i class="bi bi-trash"></i>', id:`del${i}`, className:"btn btn-outline-danger", onclick:()=>{Delete(i)}})
        )
        table.append(tr);
    }
}

async function Edit(index){
    let arts = await articles();
    document.querySelector('table').style.display="none";
    document.querySelector('main').append(await Editor(arts[index]));
}
function Delete(index){

}
async function Editor(article){
    document.querySelector('.editor').innerHTML = await (await fetch(`/admin/change.html`)).text();
    let form = document.querySelector('form');
    form.title.value=article.title;
    form.short.value=article.description;
    form.article.value=article.article;
    document.querySelector('#return').addEventListener('click', ()=>{
        document.querySelector('table').style.display=null;
        document.querySelector('.editor').innerHTML="";
    });
    document.querySelector('#update').addEventListener('click', async ()=>{
        let response = await (await fetch('/api/update-article', {
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                'title':form.title.value,
                'description':form.short.value,
                'article':form.article.value,
                'id':article.id
            })
        }));
        if (response.status==200) {
            alert('Sikeres szerkesztés!');
            document.querySelector('table').style.display=null;
            document.querySelector('.editor').innerHTML="";
        }
    })
}