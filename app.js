const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) =>{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/9aee44145c"
    const options = {
        method: "POST",
        auth: "tirth:bba7a1b00023c155eabd1c8a3eb78627-us7"
    }
    
    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure" , (req,res) => {
    res.redirect("/");
});

app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})

// bba7a1b00023c155eabd1c8a3eb78627-us7

// 9aee44145c