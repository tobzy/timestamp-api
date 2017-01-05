var express = require("express");
var sass = require("node-sass-middleware");
var path= require("path");

var app = express();

app.use(
    sass({
        src: __dirname + '/src/sass',
        dest: __dirname + '/public/css',
        debug: true,
        outputStyle: 'expanded'
    }
    )
);

app.use(express.static(path.join(__dirname, 'public/views')));
app.use(express.static(path.join(__dirname, 'public/css')));

app.get('/',function(req, res) {
    res.sendFile('index.html');
})

app.get('/:date', function(req, res) {
    var date_re = /(^Dec)|[^a-zA-Z](Dec)/i;
    var date;
    
    if(Number(req.params.date)){
        date = new Date(Number(req.params.date));
    }
    else{ 
        date = new Date(req.params.date);
        
    }
   
    var date_json = {
        unix: date.getTime() || null,
        natural: date.toDateString() == "Invalid Date"?null:date.toDateString()
    }
    res.send(date_json);
})

app.listen(process.env.PORT);