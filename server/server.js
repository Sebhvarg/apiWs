const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const TOKEN = "TOKEN";
const VERIFY_TOKEN = "";
const API_URL = "";

app.get('/webhook', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === VERIFY_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);          
    }  
    });

app.post('/webhook', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
    }
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


const sendMessage = async (phone, message) => {
    await axios.post(
        API_URL,
        {
            messagging_product: 'whatsapp',
            to: phone,
            type: 'text',
            text: {body: message}
        },
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );
};


    
