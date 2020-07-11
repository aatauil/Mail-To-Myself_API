const multer = require('multer');
const path = require('path');
const chalk = require('chalk');


// Sets storage destination & name
export const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



// Check File Type
export const checkFileType = (file, callback) => {
    
    // Allowed ext
    const fileTypes = /jpg|jpeg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    // Checkk mime
    const mimeType = fileTypes.test(file.mimetype)

    if(mimeType && extName){
        console.log(chalk`{bold.yellow [Uploader.js]} {cyan MimeType and Extention name correct}`)
        return callback(null, true);
    } else {
        console.log('File Type Error')
        callback('Error: This file type is not allowed to be send through mail.')
    }
}



