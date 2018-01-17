
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : "localhost",
        port : 3306,
        user : "cinema",
        password : "admin@HomeCinema",
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
    }
});
module.exports = knex;
