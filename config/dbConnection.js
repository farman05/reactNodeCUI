const mysql = require('mysql')
const util = require('util')
const {DB_DATABASE,DB_HOST,DB_USER,DB_PASSWORD} = require('./constants');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
// pool.on(
//     "connect",
//     function() {
//             console.log("@connected to db");
//     },
//     "end",
//     function(err) {
//             console.log("@end ", err);
//             throw err;
//     },
//     "close",
//     function(err) {
//             console.log("@closed ", err);
//             throw err;
//     },
//     "error",
//     function(err) {
//             console.log("@error ", err);
//             throw err;
//     }
// );
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})
pool.query = util.promisify(pool.query)


module.exports = pool