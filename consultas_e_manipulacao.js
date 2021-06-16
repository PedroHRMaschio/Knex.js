var database = require("./database");
/*
var dados = {
    nome: "Sea of Thieves",
    preco: 50.67
}
*/

var dados = [
    {
        nome: "Sea of Thieves",
        preco: 50.67
    },
    {
        nome: "Battlefield V",
        preco: 199.99
    },
    {
        nome: "GTA V",
        preco: 22.36
    }
]
//funciona da mesma forma que apenas um json, como mostra no comentário a cima

database.insert(dados).into("games").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

database.select("id","preco").table("games").then(data => {//posso passar o select vazio, dai ele vai retornar todos os campos da tabela
    console.log(data)
}).catch(err => {
    console.log(err)
});//ainda posso colocar essa query dentro de uma query de inserção de dados, isso se chama NESTED QUERIES

//var query = database.Where({nome: "GTA V"}).table("games");

database.select(["nome","preco"])
    .Where({nome: "GTA V"})
    .orWhere({id: 2})// WhereRaw("preco < 50 OR preco > 50") neste comando eu digito como se estivesse usando a linguagem sql
    .table("games").then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });

//na função abaixo podemos digitar realmente como se estivessemos em um banco de dados
database.raw("SELECT * FROM games").then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

//para realizar um dele utilizamos a seguinte sintaxe
database.where({id: 3}).delete().table("games").then(data => {
    console.log(data);// Aqui ele mostra a quantidade de registros que ele deletou
}).catch(err => {
    console.log(err);
});

//para realizar update de dados utilizamos a sintaxe
database.where({id: 5}).update({preco: 40}).table("games").then(data => { //na função update a gente passa os campos que queremos alterar, não é necessário passar o valor anterior
    console.log(data);
}).catch(err => {
    console.log(err);
});

//ordenar tabela
database.select().table("games").orderBy("preco","desc").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

//inserção associada
database.insert({
    nome: "Blizzard",
    game_id: 5
}).table("estudios").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});