const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { startDatabase, getDatabase } = require("./db/mongo");

const app = express();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.post('/stats', upload.single('uploaded_file'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   console.log(req.file, res.body)
});
// allow to use body as json file 
app.use(express.json({ limit: "50mb" }))


// accessing public folder
app.use(express.static(__dirname + '/public'));

// adding Helmet to enhance your API's security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.get(`/test`, (req, res) => {
  res.status(200).json({ et: `done test` });
});
app.use(`/api`, require(`./api`));

startDatabase().then(async () => {
  try {
    const db = await getDatabase();
    
  } catch (e) {
    console.log(`error`, e);
  }
});

// start the server
app.listen(3001, async () => {
  console.log("listening on port 3001");
});
