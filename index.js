const AWS = require('aws-sdk');
const S3Presigner = require('@aws-sdk/s3-request-presigner');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

// const { S3Client } = require("aws-sdk")
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_BUCKET_NAME,
} = process.env;


// Configure S3 client (replace with your credentials or use temporary security credentials)
const S3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION // Specify your AWS region
});


const uploadImage = async (file, folder, fileName) => {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: folder + fileName,
        Body: file,
        // ACL: "public-read",
    };

    try {
        const data = await S3.upload(params).promise();
        console.log('Image uploaded successfully:', data.Location);
        return data.Location; // The uploaded image URL
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

const getPresignedUrl = async (bucketName, fileName, expiresIn) => {
    const presigner = new S3Presigner({ region: AWS_REGION }); // Replace with your region

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Expires: expiresIn // Time in seconds for which the URL is valid
    };

    try {
        const url = await presigner.getSignedUrl('getObject', params);
        console.log('Presigned URL:', url);
        return url;
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        throw error;
    }
}
const filename = `image_${Date.now()}_.jpg`;

const init=async()=>{
    try {
        const uploadedFileLocation = await uploadImage("helloworld", "chat/image/", filename);
        console.log("Uploaded file location:", uploadedFileLocation); // For reference
    
        const presignedUrl = await getPresignedUrl(AWS_BUCKET_NAME, filename, 3600); // Replace with your bucket name
        console.log("Use this presigned URL to access the uploaded image:", presignedUrl);
        
    } catch (error) {
        console.error('Error:', error);
    }
}
init();