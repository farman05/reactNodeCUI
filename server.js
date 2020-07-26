require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
// const config = require('./config/config');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001
const user = require('./routes/user');



app.use(bodyParser.urlencoded({ extended: true ,limit: "50mb"}));
app.use(bodyParser.json({limit: "50mb"}));

// app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/user', user);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build/index.html'));
// })

app.listen(PORT, (err) => {
    if (err) console.log("err");

    console.log("port started",PORT);
})