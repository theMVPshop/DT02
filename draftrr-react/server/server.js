require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')
const emailRoutes = require('./routes/mailer')
const db = require("./mongodb/models");

const port = process.env.PORT || 4000

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/home', (req, res) => { res.send("Backend says Welcome Home!") })

// use the /api prefix to divert requests for data from request for pages
app.use('/', userRoutes)
app.use('/', projectRoutes)
app.use('/', emailRoutes)

// ! You MUST create a .env file
// ! You MUST create an app.yaml file to host on GoogleCloud App Engine

require("./mongodb/routes/draftrr.routes")(app)

app.listen(port, () => console.log(`Server is listening on port: ${port}`))

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the mongo database!");
  })
  .catch(err => {
    console.log("Cannot connect to the mongo database!", err);
    process.exit();
  });



