require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const ctrl = require('./controller');
const session = require('express-session');

const {
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.post('/register', ctrl.registerUser);
app.post('/api/login', ctrl.loginUser);
app.get('/api/posts/:userid', ctrl.getPosts);
app.get('/api/post/:postid', ctrl.getPost);
app.post('/api/createPost/:userid', ctrl.createPost);

const PORT = 8080;
massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    app.listen(PORT, () => {
    console.log(`yo yo yo from port: ${PORT}`)
    });
});