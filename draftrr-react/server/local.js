const app = require('./server');
const port = process.env.PORT || 4000
// run the server locally
app.listen(port, () => console.log(`Server is listening on port: ${port}`))