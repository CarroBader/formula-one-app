const express = require('express')
const path = require('path')
const app = express()
const https = require('https')
const request = require('request')
const cors = require('cors')
var corsOptions = {
  origin: [
    'https://lights-out-and-away-we-go.herokuapp.com',
    'http://localhost:3000',
    'https://lights-out-and-away-we-go.herokuapp.com',
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
require('dotenv').config()
const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'

var server = app.listen(
  port,
  console.log(`Server is running on host ${host} with port ${port} `)
)
const baseUrl = 'https://ergast.com/api/f1/'
const apiPre = '/api/f1/'
app.get(apiPre + ':path', (req, res) => {
  let url = `${baseUrl}${req.params.path}`
  request(url, { json: true }, (err, result, body) => {
    if (err) {
      return console.log(err)
    }
    return res.json(body)
  })
})

app.get(apiPre + ':path/:end', (req, res) => {
  let url = `${baseUrl}${req.params.path}/${req.params.end}`
  request(url, { json: true }, (err, result, body) => {
    if (err) {
      return console.log(err)
    }
    return res.json(body)
  })
})
app.get(apiPre + ':path/:middle/:end', (req, res) => {
  let url = `${baseUrl}${req.params.path}/${req.params.middle}/${req.params.end}`
  request(url, { json: true }, (err, result, body) => {
    if (err) {
      return console.log(err)
    }
    return res.json(body)
  })
})
app.use(express.static(path.join(__dirname, '../dist')))
console.log(__dirname)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})
