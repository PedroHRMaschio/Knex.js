const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'knex.js'
    }
  });//Falta criar um banco de dados ainda. Pode ser no MySQL Workbench ou no Heid SQL
  