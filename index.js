const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require("body-parser");
const app = express()
const port = 3000

let serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


app.post('/add-joke',(req,res) => {
    let jokeID = req.query.jokeid;
    let jokeText = req.query.joketext;
    console.log(jokeText)
    let docRef = db.collection('jokes').doc(jokeID);
    docRef.set({
    joketext: [jokeText]})
    res.send("Joke Added Successfully!!")
})


app.get('/get-joke', (req, res) => {
  let docRef = db.collection('jokes').doc('joke1'); // Return a single Joke    
  docRef.get().then((doc) => {
    if (doc.exists) {
        res.send(doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
})



app.listen(3000,() => {
console.log("Started on PORT 3000");
})
