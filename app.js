var express = require('express');
var path = require('path');var mysql = require('mysql');

var action = require('./app/action');

var app = express();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PUTYvida940930',
    database: 'goodhabit'
});


// 根据习惯id获取打卡日期
app.get('/habit/dates', function(req, res, next) {
    var habitId = req.query.habitId;

    action.queryDatabase('SELECT DATE FROM punch_date WHERE HABITID=' + habitId + ';')
    .then(function(data) {

        res.send(data);
    }).catch(function(err){
        console.log(err);
        res.send();
    })

});

// 获取用户习惯列表
app.get('/habit/gethabits', function(req, res, next) {
    var query = req.query;

    action.gethabit(query).then(function(data) {
        res.send(data);
    })



});


app.get('/', function(req, res, next) {
    res.send('a good habit every month ^_^');
});

function getDates(habit) {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM punch_date WHERE HABITID=' + habit.ID + ';', function(err, data) {
            return resolve(data);
        })
    })
}


var server = app.listen(1234, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});