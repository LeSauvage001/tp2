const express = require('express')
const app = express()
const places = require('./places.json')
const {body, validationResult} = require("express-validator");

app.use(express.json());
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
      res.status(200).json(places);
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
        }

   places.create({
      id: req.body.id,
      name: req.body.name,
      address: req.body.address,
      about: req.body.about,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    }).then(user => res.json(places));
    },
);

app.put('/places/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let place = places.find(place=> place.id === id)
    place.name =req.body.name
        place.address =req.body.address
        place.about =req.body.about
        place.latitude =req.body.latitude
        place.longitude =req.body.longitude
        res.status(200).json(place)
})

app.delete('/places/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let place = places.find(place => place.id === id)
    places.splice(places.indexOf(place),1)
    res.status(200).json(places)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})
