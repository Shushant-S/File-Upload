var cloudinary = require('cloudinary').v2;
const File = require('../models/File');



exports.localFileUpload = async (req, res) => {
    try{
        const file = req.files.file;

        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`; 

        file.mv(path);

        res.json({success: true, message: "file uploaded successfully"})
    }
    catch(err){
        console.log(err);
    }
};


function isFileTypeSupported(fileType, supportedFormat){
    return supportedFormat.includes(fileType);
}

async function uploadToCloudinary(file, folder, quality){
    const options = {folder};
    options.resource_type = "auto";

    if(quality){
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}



exports.imageUpload = async (req, res) => {
    try{
        const {name, email} = req.body;

        const file = req.files.imageFile;

        const supportedFormat = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        

        if(!isFileTypeSupported(fileType, supportedFormat)){
            return res.status(400).json({success: false, message: "File type not supported"});
        }

        const response = await uploadToCloudinary(file, "codehelp");

        const fileData = await File.create({
            name,
            email,
            imageUrl: response.secure_url,
        });

        res.json({success: true, imageUrl:  response.secure_url, message: "file uploaded succcessfully to the cloud"});
    }
    catch(err){
        console.log(err);
    }
}




exports.videoUpload = async (req, res) => {
    try{
        const {name, email} = req.body;
        
        const file = req.files.videoFile;

        const supportedFormat = ["mp4", "mov"];

        const fileType = file.name.split('.')[1].toLowerCase(); 
        console.log("fileType: ", fileType);
        
        if(!isFileTypeSupported(fileType, supportedFormat)){
            return res.status(400).json({success: true, message: "file type not supported"})
        }
 
        console.log("uploading to the cloud");
        const response = await uploadToCloudinary(file, "codehelp");

        const fileData = await File.create({
            name,
            email,
            imageUrl: response.secure_url,
        });

        console.log("upload done!")
        return res.json({success: true, videoUrl: response.secure_url, message: "video uploaded to cloud successfully"})
    }
    catch(err){
        console.log(err);
    }
}




exports.compressImage = async (req, res) => {
    try{
        const {name, email} = req.body;

        const file = req.files.imageFile;

        const supportedFormat = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        

        if(!isFileTypeSupported(fileType, supportedFormat)){
            return res.status(400).json({success: false, message: "File type not supported"});
        }

        const response = await uploadToCloudinary(file, "codehelp", 10);

        const fileData = await File.create({
            name,
            email,
            imageUrl: response.secure_url,
        });

        res.json({success: true, imageUrl:  response.secure_url, message: "file uploaded succcessfully to the cloud"});
    }
    catch(err){
        console.log(err);
    }
}