var database = require("./database");

//Modelando uma tabela para relacionamento 1 P 1

//                                      esse "as est_id" significa que a gente trás o id do estudio com aquele nome para eviar que seja sobrescrito pelo id do game
database.select(["games.id","estudios.id as est_id","games.nome as game_nome","estudios.nome as estudio_nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
//outro exemplo de busca em banco de dados com relacionamentos
database.select(["games.*","estudio.nome as estudio_nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
//Modelo de representação de busca de dados com relacionamento 1 para N usando o innerJoin
database.select(["games.*","estudio.nome as estudio_nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").then(data => {
    var estudiosGamesArray = data;
    var game = {
        id: 0,
        nome: "",
        estudios = []
    };

    game.id = data[0].id;
    game.nome = data[0].nome;

    data.forEach(estudios => {
        game.estudios.push({nome: estudio.estudio_nome});
    });

    console.log(game);
}).catch(err => {
    console.log(err);
});
//Modelo de representação de busca de dados com relacionamento N para N
//Neste modelo temos uma terceira tabela, a qual é responsável apenas pelo relacionamento, que recebe duas chaves estrangeiras, respectivamente ao relacionamento N para N
database.select([
        "estudios.nome as estudio_nome",
        "games.nome as game_nome"
    ])
    .table("games_estudios")//aqui estou especificando que quero os dados da tabela games_estudio, que é a tabela que representa o relacionamento n para n de games e estúdios
    .innerJoin("games","games.id","games_estudios","games_estudios.id")//aqui estou fazendo um join com a tabela de games
    .innerJoin("estudios","estudios.id","games_estudios.estudios_id")//aqui estou fazendo um join com a tabela de estudios
    .where("games.id",8)//aqui eu estou especificando que eu quero os relacionamentos com o game de id = 8
    .then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    });

//transactions
//é utilizada para manter todos os dados consistentes, exemplo, da erro no meio de um cadastro, então ele vai ficar um dado inconsistente no banco
//a não ser que eu tenha feito a transaction, que vai desfazer o que foi feito antes do erro
async function testeTransacao(){
    try{
        await database.transaction(async trans => {
            await database.insert({nome: "Actvision"}).table("estudios");
            await database.insert({nome: "Mojang"}).table("estudios");
            await database.insert({nome: "Microsoft"}).table("estudios");
            await database.insert({nome: "Nauty Dog"}).table("estudios");
            await database.insert({nome: "Pedrinho games"}).table("estudios");
        });
    }catch(err){
        console.log(err);
    }
}

//Knex é muito mais fácil pra configurar em algum banco já pronto