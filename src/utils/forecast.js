const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0e9f7b6b083fe467ca9aecc424c2a524&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                "Description: " + body.current.weather_descriptions[0] + 
                '\nIt is currently ' + body.current.temperature + ' degress out.'+
                '\nThere is a ' + body.current.precip + '% chance of rain.' + 
                "\nHumidity:" + body.current.humidity + 
                "\nVisibility: " + body.current.visibility)
        }
    })
}

module.exports = forecast