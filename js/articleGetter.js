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
            Object.assign(document.createElement('td'), {textContent:arts[i].postdate}),
            Object.assign(document.createElement('td'), {textContent:arts[i].title}),
            Object.assign(document.createElement('td'), {textContent:arts[i].short}),
            Object.assign(document.createElement('td'), {textContent:arts[i].article}),
            Object.assign(document.createElement('td'), {textContent:arts[i].picture}),
            Object.assign(document.createElement('td'), {textContent:arts[i].category}),
            Object.assign(document.createElement('button'), {textContent:"Edit", id:`_${i}`}),
            Object.assign(document.createElement('button'), {textContent:"Remove", id:`_del${i} delete`}),
        )
        table.append(tr);
    }
}