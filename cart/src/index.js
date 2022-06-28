const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(cors());
//app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/files', express.static("files"));
require('./app/routerHandler')(app)

app.get('/', (req, res) => {
    res.json({
        message: 'Arise MERN Developers'
    });
});
const port = process.env.PORT || 3000;
require("./config/mongoose.js")(app);
app.listen(port, () => {
    console.log(`Application is Running on ${port}`);
});