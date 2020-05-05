const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name:'Vinícius Nakasone Dilda'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Vinícius Nakasone Dilda'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        text:"Helpful text",
        name:'Vinícius Nakasone Dilda'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {location,latitude,longitude} = {}) => {
        if(error)
        {
            return console.log(error)
        }
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error)
            {
                return console.log('Error', error)
            }
            res.send({
                Location:location,
                Forecast:forecastdata
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
        console.log(req.query.search)
        res.send({
            products:[]
        })
   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Vinícius Nakasone Dilda",
        errorMessage:'Help article not Found'
    })
})

//match anything that hasn't been match sor far
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Vinícius Nakasone Dilda",
        errorMessage:'Page not Found'
    })
})

app.listen(port,()=>
{
    console.log("Server is up on port " + port)
})