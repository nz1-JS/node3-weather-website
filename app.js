const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getCode = require('./src-express/utils/geoCode')
const forecast = require('./src-express/utils/forecast')

const app = express()
const publicDir = path.join(__dirname, '../web-server/src-express')
const viewsPath = path.join(__dirname, './src-express/views')
const partialsPath = path.join(__dirname, './src-express/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about me',
    name: 'Andrew Mead'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'help me!!!',
    title: 'help',
    name: 'Andrew Mead'
  })
})

app.get('/weather', (req, res) => {
  
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } else {
    {
      getCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({ error })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
          if (error) {
            return res.send({ error })
          } else {
            res.send([{
              forecast: forecastData,
              location: location,
              address: req.query.address
            }])
          }
          // console.log(location)
          // console.log(forecastData)
        })
      });
    }
  }
})

app.get('/products', (req, res) => {

  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    }) 
  }

  console.log(req.query.search);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Help article not found'
  }) 
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found'
  }) 
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
})