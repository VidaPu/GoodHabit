/**
 * @file
 * @author VidaPu
 * @date 2017/7/20
 */

'use strict';
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PUTYvida940930',
    database: 'goodhabit'
});


function queryDatabase(sql) {

    return new Promise(function(resolve, reject){

        connection.connect();

        return connection.query(sql, function(err, res) {
            return resolve(err || res);
        })
    }).then(function(data) {

        connection.end();

        return Promise.resolve(data);
    });

}

function saveToDatabase(sql, data) {

    return new Promise(function(resolve, reject){

        connection.connect();

        return connection.query(sql, data, function(err, res) {
            return resolve(err || res);
        })
    }).then(function(data) {

        connection.end();

        return Promise.resolve(data);
    });
}

function updateDatabase(sql, data) {

    return new Promise(function(resolve, reject){

        connection.connect();

        return connection.query(sql, data, function(err, res) {
            return resolve(err || res);
        })
    }).then(function(data) {

        connection.end();

        return Promise.resolve(data);
    });
}

function delDatabase(sql) {

    return new Promise(function(resolve, reject){

        connection.connect();

        return connection.query(sql, data, function(err, res) {
            return resolve(err || res);
        })
    }).then(function(data) {

        connection.end();

        return Promise.resolve(data);
    });
}

module.exports = {
    saveToDatabase: saveToDatabase,
    updateDatabase: updateDatabase,
    delDatabase: delDatabase,
    queryDatabase: queryDatabase
};
