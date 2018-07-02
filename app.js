const http = require('http');
const fs = require('fs');
const apikey = fs.readFileSync('./.owmapikey', 'utf8');

const colors = require('colors');
const debug = require('debug');
const info = debug('WPiCore:info');
const error = function(err) {debug('WPiCore:error')(err.red);};

function getCurrent (location, callback) {
    var req = http.request({
        hostname: 'api.openweathermap.org',
        path: '/data/2.5/weather?APPID='+apikey+'&q='+location+'&units=metric&lang=fr'
    }, function(res) {
        if (res.statusCode !== 200) {
            error('Error while getting weather data!');
            callback({});
        } else {
            var data = "";
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                callback(JSON.parse(data));
            });
        }
    });
    req.on('error', function(err) {
        error(err.message);
        callback({});
    });
    req.end();
}
function getForecast (location, callback) {
    var req = http.request({
        hostname: 'api.openweathermap.org',
        path: '/data/2.5/forecast/daily?APPID='+apikey+'&q='+location+'&units=metric&lang=fr'
    }, function(res) {
        if (res.statusCode !== 200) {
            error('Error while getting weather data!');
            callback({});
        } else {
            var data = "";
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                callback(JSON.parse(data));
            });
        }
    });
    req.on('error', function(err) {
        error(err.message);
        callback({});
    });
    req.end();
}

module.exports.current = getCurrent;
module.exports.forecast = getForecast;