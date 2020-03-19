const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = process.env.PORT;

//Provides the path for the static files to refer to them by a relative URL
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post('/', (req,res) => {
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    //Format our object into json
    const jsonData = JSON.stringify(data);

    const url = 'https://us19.api.mailchimp.com/3.0/lists/00f13cceeb';

    const options = {
        method: "POST",
        auth: "alan1:c6d63058748d1e7795479ec7c4656b63-us19"
    } 

    const request = https.request(url, options, (response) => {
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }

        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

    
})

app.post("/failure", (req,res) => {
    res.redirect("/")
})

app.listen(port, () => console.log('Server is listening on port 3000'));

//API Key
//c6d63058748d1e7795479ec7c4656b63-us19


//List id
//00f13cceeb