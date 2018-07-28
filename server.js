var express = require('express');
var app = express();
var url = 'mongodb://guest-user:guest12345@ds259070.mlab.com:59070/music-selection';
var MongoClient = require('mongodb').MongoClient;
var dbo;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("music-selection");
    console.log('connected');
    let collection = dbo.collection('GradeU').find({}, ).toArray(function (err, result) {
        if (err) throw err;
    })
})
app.get('/api/pieces', (req, res) => {
    var pieces;
    const param = req.query.grade;
    if (!param) {
        res.json({
            error: 'Missing required parameter q'
        });
        return
    }
    let collection = dbo.collection(`Grade${param}`).find({}, ).toArray(function (err, result) {
        pieces = result
        return res.send(pieces)
    })
});

app.listen(3000 || process.env.PORT, () => console.log('server is running'))