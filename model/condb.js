
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : "localhost",
        port : 3306,
        user : "root",
        password : "root",
        database : "cinema"
    },
    pool:{min: 2, max: 8}
});

knex.Promise.config({
    cancellation: true
});

Object.defineProperties(knex,{
    tableMovie: {
        get: function () {
            return 'movie'
        }
    },
    tableSetting: {
        get: function () {
            return 'setting'
        }
    },
    tableCategory: {
        get: function () {
            return 'category'
        }
    },
    tableManager: {
        get: function () {
            return 'manager'
        }
    }
});
module.exports = knex;
