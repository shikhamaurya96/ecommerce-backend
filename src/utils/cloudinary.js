const cloudinary = require("cloudinary");
const fs = require("fs");
//cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View Credentials' below to copy your API secret
});
exports. uploadOnCloudinary = async(localFilePath,folder)=>{
    try{
     if(!localFilePath) return null;
     const uploadResult = await cloudinary.uploader
       .upload(
          localFilePath,
          function(res){console.log(res);},
          {folder:folder },   
       )

       //file has been uploaded
       console.log("file uploaded on cloudinary", uploadResult.url)
       //delete the file from local
       fs.unlinkSync(localFilePath,(err)=>{
        if(err){
            console.log(`Error removing file: ${err}`)
            return;
        }
        console.log(`File ${filePath} has been successfully removed.`);

       })
       return uploadResult
    }
    catch(err){
   fs.unlinkSync(localFilePath) //remove the locally saved temporary file as file upload on cloudinary got failed
   return null;
    }
   
}