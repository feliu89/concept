const aws = require('aws-sdk');
require('dotenv').config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCES_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

exports.uploadFile = (fileName, fileBody) => {
  const params = {
    Bucket: process.env.S3_BUCKET_IMG_POST,
    Key: fileName,
    Body: fileBody,
  };

  s3.upload(params, (err, data) => {
    if (err) throw new Error(err);
    else console.log(data);
  });
};
