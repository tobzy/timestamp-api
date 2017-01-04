var express = require("express");

var app = express();

app.get('/',function(req, res) {
    res.send('my timestamp service');
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