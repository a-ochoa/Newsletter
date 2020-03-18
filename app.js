const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;

//Provides the path for the static files to refer to them by a relative URL
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post('/', (req,res) => {
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var email = req.body.email;

    console.log("First name is: " + fname);
    console.log("Last name is: " + lname);
    console.log("Email is: " + email);
})

app.listen(port, () => console.log('Server is listening on port 3000'));