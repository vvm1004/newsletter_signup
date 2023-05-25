const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const request = require('request');
const https = require('https');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/11d7dd3167/members"
    const options = {
        method: "POST",
        auth: "ceren:3fcbd754d301aad1895e70a0e5908dfa-us21"
    };

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data))
        })
    });

    request.write(jsonData);
    request.end();

})

app.post("/failure", function (req, res) {
    res.redirect("/")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//3fcbd754d301aad1895e70a0e5908dfa-us21
// 11d7dd3167.

