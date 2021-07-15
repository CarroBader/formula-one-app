const express = require("express");
const path = require('path');
const app = express();

const port = process.env.PORT || 5000;

var server = app.listen(
    port,
    console.log(
        `Server is running on port ${port} `
    )
);


app.use(express.static(path.join(__dirname, '../dist')));
console.log(__dirname)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


