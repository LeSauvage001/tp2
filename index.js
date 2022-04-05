const express = require('express')
const app = express()
const places = require('./places.json')
const {body, validationResult} = require("express-validator");

app.use(express.json());
/*app.post('/places/', (req,res) => {
    places.push(req.body)
    res.status(200).json(places)
}) */
//middleware


app.get('/places/', (req,res) => {
    res.status(200).json(places)
})

app.get('/places/:id', (req,res) => {

    const id = parseInt(req.params.id)
    const  place = places.find(place => place.id === id)
    res.status(200).json(place)
})


// post route with validation
app.post(
    '/places',

    // id
    body('id').isInt(),
    // name
   body('name').not().isEmpty().trim().escape(),
    // address
    body('address').not().isEmpty().trim().escape(),
    // about
    body('about').not().isEmpty().trim().escape(),
    //lat
    body('latitude').isFloat(),
    //long
    body('longitude').isFloat(),
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
        }


    },
);


app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})