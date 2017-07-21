var express = require('express');
var path = require('path');

var action = require('./app/action');

var app = express();


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
    var userId = query.userId;
    var reqStr = '';

    for(var q in query) {
        if(q !== 'userId') {
            reqStr += ' AND ' + q + "='" + query[q] + "'";
        }
    }

    action.queryDatabase('SELECT * FROM habit WHERE USERID=' + userId + reqStr + ';')
    .then(function(data) {

        res.send(data);
    }).catch(function(err){
        console.log(err)
        res.send();
    })
});


app.get('/', function(req, res, next) {
    res.write('a good habit every month ^_^');
});


var server = app.listen(1234, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});