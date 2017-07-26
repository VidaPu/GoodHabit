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

// 获取习惯列表
function gethabit(options) {
    let {userId, startDate, endDate} = options;
    let reqStr = 'SELECT * FROM HABIT LEFT JOIN PUNCH_DATE ON HABIT.id=PUNCH_DATE.habitId';

    for(let opt in options) {
        if(['userId', 'startDate', 'endDate'].indexOf(opt) == -1) {
            reqStr += ' AND ' + opt + '=' + options[opt];
        }
    }

    reqStr += ' AND punch_date.date>' + (startDate || '2017-07-01');
    reqStr += ' AND punch_date.date<' + (endDate || '2017-07-31');

    return new Promise(function(resolve, reject) {
        connection.connect();

        return connection.query(reqStr, function(err, res) {
            return resolve(err || res);
        })
    }).then(function(data) {
        connection.end();
        return Promise.resolve(data);
    }).catch(function(err) {
        connection.end();
        return Promise.resolve(err);
    })
}

// 新增用户
function addUser(user) {
    let {name, password, email, mobile} = user;

    if(!name || !password) {
        return Promise.reject({errmsg: 'incomplete info'});
    }

    let reqStr = 'INSERT INTO HABIT (name, password, email, mobile) VALUES (' + name + ',' + password + ',' + (email || null) + ',' + (mobile || null) + ')';

    return new Promise(function(resolve, reject) {
        connection.connect();

        return connection.query(reqStr, function(err, res) {
            return resolve(err || res);
        })
    }).then(function(data) {
        connection.end();
        return Promise.resolve(data);
    }).catch(function(err) {
        connection.end();
        return Promise.resolve(err);
    })
}

module.exports = {
    gethabit: gethabit,
    addUser: addUser
};
