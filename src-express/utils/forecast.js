const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

  const url = `http://api.weatherstack.com/current?access_key=deb2e3ce6f725a74f38ea14e26bcf605&query=${longitude},${latitude}`

  request({ url, json: true }, (handleError, { body }) => {
    const { error, current } = body
    if (handleError) {
      callback('Unable to connect to weather service', undefined)
    } else if (error) {
      callback('Unable to find the location', undefined)
    } else {
      const temp = current.temperature
      const feelsLike = current.feelslike
      callback(undefined, `It is currently ${temp} degrees out. It feels like ${feelsLike} degrees out`)
    }
  })
}

module.exports = forecast