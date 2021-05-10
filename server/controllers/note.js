const Note = require('../models/Note');
const UserSocials = require('../models/UserSocials');
const { uploadFile } = require('../helpers/aws_buckets');
require('dotenv').config();

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
    // await Note.sync({ force: true });
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

exports.thumbs = async (req, res) => {
  const noteId = req.params.id;
  const thumbs = req.params.thumbs;
  if (thumbs === 'up' || thumbs === 'down') {
    try {
      const thumbStatus = await UserSocials.findOne({
        where: { UserSocialsNoteId: noteId, UserSocialsUserId: req.userId },
      });

      if (thumbStatus === null) {
        await UserSocials.upsert(
          {
            UserSocialsNoteId: noteId,
            UserSocialsUserId: req.userId,
            UserSocialsThumbsState: thumbs,
          },
          {
            where: { UserSocialsNoteId: noteId, UserSocialsUserId: req.userId },
          }
        );
        if (thumbs === 'up') {
          await Note.increment('thumbsUp', { where: { noteId } });
        }
        if (thumbs === 'down') {
          await Note.increment('thumbsDown', { where: { noteId } });
        }
      }

      if (thumbStatus !== null) {
        if (thumbStatus.dataValues.UserSocialsThumbsState !== thumbs) {
          await UserSocials.upsert(
            {
              UserSocialsNoteId: noteId,
              UserSocialsUserId: req.userId,
              UserSocialsThumbsState: thumbs,
            },
            {
              where: {
                UserSocialsNoteId: noteId,
                UserSocialsUserId: req.userId,
              },
            }
          );

          if (thumbs === 'up') {
            await Note.increment('thumbsUp', { where: { noteId } });
            if (thumbStatus.dataValues.UserSocialsThumbsState !== null) {
              await Note.decrement('thumbsDown', { where: { noteId } });
            }
          }

          if (thumbs === 'down') {
            await Note.increment('thumbsDown', { where: { noteId } });
            if (thumbStatus.dataValues.UserSocialsThumbsState !== null) {
              await Note.decrement('thumbsUp', { where: { noteId } });
            }
          }
        }
        if (thumbStatus.dataValues.UserSocialsThumbsState === thumbs) {
          await UserSocials.upsert(
            {
              UserSocialsNoteId: noteId,
              UserSocialsUserId: req.userId,
              UserSocialsThumbsState: null,
            },
            {
              where: {
                UserSocialsNoteId: noteId,
                UserSocialsUserId: req.userId,
              },
            }
          );

          if (thumbs === 'up') {
            await Note.decrement('thumbsUp', { where: { noteId } });
          }

          if (thumbs === 'down') {
            await Note.decrement('thumbsDown', { where: { noteId } });
          }
        }
      }
      res.status(200).send({});
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(404).send('Not a valid request');
  }
};

exports.toogleFavourite = async (req, res) => {
  const noteId = req.params.id;
  try {
    const recordExist = await UserSocials.findOne({
      where: { UserSocialsNoteId: noteId, UserSocialsUserId: req.userId },
    });
    if (recordExist === null) {
      await UserSocials.create(
        {
          UserSocialsNoteId: noteId,
          UserSocialsUserId: req.userId,
          UserSocialsFavourite: true,
        },
        {
          where: { UserSocialsNoteId: noteId, UserSocialsUserId: req.userId },
        }
      );
      await Note.increment('favourites', { where: { noteId } });
    }
    if (recordExist !== null) {
      await UserSocials.update(
        {
          UserSocialsFavourite: !recordExist.dataValues.UserSocialsFavourite,
        },
        {
          where: {
            UserSocialsNoteId: noteId,
            UserSocialsUserId: req.userId,
          },
        }
      );
      if (recordExist.dataValues.UserSocialsFavourite) {
        await Note.decrement('favourites', { where: { noteId } });
      } else {
        await Note.increment('favourites', { where: { noteId } });
      }
    }
    res.status(200).send({});
  } catch (err) {
    console.log(err);
  }
};

exports.getNoteSocialsByUser = async (req, res) => {
  const noteId = req.params.id;
  try {
    const noteSocials = await UserSocials.findOne({
      where: { UserSocialsNoteId: noteId, UserSocialsUserId: req.userId },
    });

    if (noteSocials !== null) {
      const {
        UserSocialsNoteId,
        UserSocialsFavourite,
        UserSocialsThumbsState,
      } = noteSocials.dataValues;
      res.status(200).send({
        UserSocialsNoteId,
        UserSocialsFavourite,
        UserSocialsThumbsState,
      });
    } else {
      res.status(404).send({ STATUS: 'none' });
    }
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
