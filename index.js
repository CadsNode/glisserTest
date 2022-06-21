const express = require('express')
const indexRoute = require('./router')
const rateLimit =  require('express-rate-limit')
const app = express()
const port = 3000

app.use(rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 3,
  message: 'You have exceeded 100 requests in 24 hours limit!', 
  headers: true,
}))

app.use("/",indexRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})