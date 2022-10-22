var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        // console.log("inside filename func oriname" + originalName);
        const type = file.mimetype;
        // console.log("inside filename func type" +type);
        const size = file.size;
        // console.log("inside filename func size" +size);

        // const nameArray = originalName.split('.');
        // const extension = nameArray[nameArray.length - 1];

        // const newFileName = originalName + "." + extension;
        // newFileName = uuid.v1() + "." + extension;

        cb(null, originalName);
    }
});

const upload = multer({
    storage: storage,
});

// const upload = multer({ dest: 'uploads/' })

app.post("/api/fileanalyse", upload.single("upfile"), async function (req, res) {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.json({ success: false, error: "file-not-uploaded" });
  }

  // console.log("filename " + uploadedFile.filename);
  // console.log("type " + uploadedFile.mimetype);
  // console.log("size "+ uploadedFile.size);

  if(uploadedFile.size/1024 < 1.0) {
    var size = uploadedFile.size.toFixed(2) + " bytes"
  } else {
    var size = (uploadedFile.size/1024).toFixed(1)+ " Kilobytes"
  }
  //   var size = (uploadedFile.size/1024) + "Kilobytes"
  
  // var size = uploadedFile.size/1024 < 1.0 ? "size in bytes: " + uploadedFile.size : "size in Kilobytes: " + uploadedFile.size/1024
  
  res.json({
    name: uploadedFile.originalname,
    type: uploadedFile.mimetype,
    size: size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
