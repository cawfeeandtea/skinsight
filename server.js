const app = require('express')();
const http = require('http').Server(app);
//const datastore = require('./data.js');

//app.local = {};
//app.local.datastore = require('./data.js');

app.get('/analyze', (req, res) => {
    console.log("data");
    console.log(__dirname);
    res.sendFile(`${__dirname}/analyze.html`);
});


http.listen(3000, (s) => {
    console.log('listening on *:3000');
});
        