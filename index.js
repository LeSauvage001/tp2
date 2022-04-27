const express = require('express')
const app = express()
const places = require('./places.json')



// tourism api

app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome To tourism API" });
  });
  


// Middleware
app.use(express.json())




app.get('/places/', (req,res) => {
    res.status(200).json(places)
})




app.get('/places/:id', (req,res) => {

    const id = parseInt(req.params.id)
    const  place = places.find (place => place.id === id)
    res.status(200).json(place)
})


//  l'ajout de places

const { body, validationResult } = require('express-validator');


app.post(
  '/places',


  body('id').isDecimal({ min: 0 }),
  body('name').isAlpha(),
  body('about').isAlpha(),
  body('longitude').isFloat,
  body('latitude').isFloat,




  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions :

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };
    places.push(req.body)
     return res.status(200).json(places)
  })


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


//Error Handling 

app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`
     
    });
    
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;
    
    next(err);
  });


app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

module.exports = app;
