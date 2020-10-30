const request = require('postman-request')

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoieXNrLXMiLCJhIjoiY2tncDNiZjA1MGo0MjJybXRmYnNxMmY3eiJ9.eOzfXZNJlooGnwdNk9M-ZQ`

  request({ url, json: true }, (error, { body }) => {
    const { features } = body
    if (error) {
      callback('Unable to connect to Geo service')
    } else if (features.length === 0) {
      callback('No matching result')
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].text
      })
    }
  })
}

module.exports = geoCode