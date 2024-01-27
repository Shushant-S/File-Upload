const express = require('express');
const app = express();
const db = require("./config/database");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true
}));
app.use(express.json());


//db connection 
db.dbConnect();

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();


app.get('/', (req, res) => {
    res.json({message: "hello from backend"});
})

const upload = require('./routes/FileUpload');
app.use('/api/v1/upload', upload);


app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
})