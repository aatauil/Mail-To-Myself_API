const multer = require('multer');
const path = require('path');
// Multer Config
const storage =  multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
  });

  
  // Check File Type
  function checkFileType(file, callback){
    // Allowed ext
    const fileTypes = /jpeg|jpg|png|gif|json/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    // Checkk mime
    const mimeType = fileTypes.test(file.mimetype)
  
    if(mimeType && extName){
      return callback(null, true);
    } else {
    console.log(mimeType)
      callback('Error: This file type is not allowed to be send through mail.')
    }
  }
 
export const upload = multer({
  storage : storage,
  limits: {fileSize: 10000000},
  fileFilter: (req, file, callback) => {
   checkFileType(file, callback)
  }
 }).any();

