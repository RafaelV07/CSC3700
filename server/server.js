require('dotenv').config({ quiet: true })
const express = require('express')
const cors = require('cors')

const courseRoutes = require('./routes/courses')
const completionRoutes = require('./routes/completions')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json())

app.use('/api', courseRoutes)
app.use('/api', completionRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
