const path = require('path');
const express = require('express');     //Express exposes only a function
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mk'
    });
});              

// helps us config what the server should do when someone tries to access a specific url
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mk'
    });
});            

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mk',
        helpText:'This is some helpful text'
    });
});           


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'mk',
        errorMessage: 'Help page not found'
    });
});           

app.get('/weather', (req, res) => {

    // if address query is not present
    console.log(`the request is:  ${req.query.address}`);
    if(!req.query.address || req.query.address == "") {
        return res.send({
            error: "You must provide an address"
        })
    }
    // if it exists
    geoCode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error });
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) 
                return res.send({ error });

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })  
        })
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'mk',
        errorMessage: 'Page not found'
    });
})

//Port no and a Callback Function

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})