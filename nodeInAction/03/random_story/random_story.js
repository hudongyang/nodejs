var fs              = require('fs'),
    request         = require('request'),
    htmlparser      = require('htmlparser'),
    configfilename  = './rss_feeds.txt';


function checkFormRSSFile() {
    fs.exists(configfilename, function(exit) {
        if(!exit) return next(new Error('missing rss file ' + configfilename));

        next(null, configfilename);
    });
}    

function readRSSFile(configfilename) {
    fs.readFile(configfilename, function(err, feedlist) {
        if(err) return next(err);

        feedlist = feedlist
                    .toString()
                    .replace(/^\s+|\s+$/g, '')
                    .split('\n');

        var random = Math.floor(Math.random() * feedlist.length);

        next(null, feedlist[random]);
    });
}

function downloadRSSFeed(feedUrl) {
    request({uri: feedUrl}, function(err, res, body) {
        if(err) return next(err);

        if(res.statusCode != 200) return next(new Error('Abnormal response status code'));

        next(null, body);
    });
}

function parseRSSFeed(rss) {
    var handler = new htmlparser.RssHandler(),
        parser = new htmlparser.Parser(handler);

    parser.parseComplete(rss);

    if(!handler.dom.items.length) return next(new Error('No RSS items found'));

    var item = handler.dom.items.shift();

    console.log(item.title, item.link);
}

var tasks = ['checkFormRSSFile', 'readRSSFile', 'downloadRSSFeed', 'parseRSSFeed'];

function next(err, result) {
    if(err) throw err;

    var currentTask = tasks.shift();

    if(currentTask) {
        currentTask(result);
    }
}

next();



















