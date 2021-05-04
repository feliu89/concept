const Note = require('../models/Note');
require('dotenv').config();
const { uploadFile } = require('../helpers/aws_buckets');

exports.getAllNote = async (req, res) => {
  try {
    const allNotes = await Note.findAll();
    res.status(200).send(allNotes);
  } catch (err) {
    console.log(err);
  }
};

exports.getNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const foundNote = await Note.findOne({ where: { noteId } });
    res.status(200).send(foundNote);
  } catch (err) {
    console.log(err);
  }
};

exports.addNote = async (req, res) => {
  const { noteName, noteDescription, noteImage, noteContent } = req.body;
  try {
    // await Note.sync({ force: true })
    const createdNote = await Note.create({
      noteName,
      noteDescription,
      noteImage: `https://${process.env.S3_BUCKET_IMG_POST}.s3-${process.env.S3_BUCKET_REGION}.amazonaws.com/${noteImage}`,
      noteContent,
      noteCreatedBy: req.userId,
    });
    res.status(201).send(createdNote);
  } catch (err) {
    console.log(err);
  }
};

exports.uploadImageFromMemory = async (req, res) => {
  try {
    uploadFile(req.file.originalname, req.file.buffer);
    res.status(200).send({ STATUS: 'OK' });
  } catch (err) {
    console.log(err);
  }
};

exports.thumbsUp = async (req, res) => {
  try {
    res.status(200).send({ STATUS: 'OK' });
  } catch (err) {
    console.log(err);
  }
};

exports.thumbsDown = async (req, res) => {
  try {
    res.status(200).send({ STATUS: 'OK' });
  } catch (err) {
    console.log(err);
  }
};
// const fs = require('fs'); // IF WE WANT TO UPLOAD FROM DISK
// exports.uploadImageFromDisk = async (req, res) => {
//   const content = fs.readFileSync(req.file);
//   try {
//     uploadImage(req.file.originalname, req.file.buffer)
//     res.status(200).send({"STATUS": "OK"});
//   } catch(err) {
//     console.log(err);
//   }
// }

// exports.getNoteImage = async (req, res) => {
//   const noteId = req.params.id;
//   const options = {
//     root: './uploads',
//     dotfiles: 'deny',
//     headers: {
//       'x-timestamp': Date.now(),
//       'x-sent': true,
//     },
//   };

//   try {
//     const foundNote = await Note.findOne({ where: { noteId } });
//     const fileName = foundNote.noteImage;
//     res.sendFile(fileName, options, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Sent:', fileName);
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
