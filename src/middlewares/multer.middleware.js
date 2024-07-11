const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("dest folder")
      cb(null, './public/temp/profile-uploads')
    },
    filename: function (req, file, cb) {
      console.log("file name")
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  //now you will have access of file path 
  module.exports = upload;