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