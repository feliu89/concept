const router = require('express').Router();
const {
  getAllNote,
  getNote,
  addNote,
  uploadImageFromMemory,
  thumbs,
  toogleFavourite,
  getNoteSocialsByUser,
} = require('./controllers/note');
const { getAllUser, getUser, addUser } = require('./controllers/user');
const { upload } = require('./middlewares/multerInMemory');
const { getAuth, validateAuth } = require('./middlewares/auth');
const { logger } = require('./middlewares/logger');

// Auth
router.post('/login', getAuth);

// Users
router.get('/user', getAllUser);
router.get('/user/:id', getUser);
router.post('/user', addUser);

// Notes
router.get('/note', validateAuth, logger, getAllNote);
router.get('/note/:id', validateAuth, logger, getNote);
router.put('/note/:id/vote/:thumbs', validateAuth, logger, thumbs);
router.put('/note/:id/favourite', validateAuth, logger, toogleFavourite);
router.post('/note', validateAuth, logger, addNote);
router.post(
  '/image/upload',
  // validateAuth,
  logger,
  upload.single('photo'),
  uploadImageFromMemory
);
router.get('/note/:id/socials', validateAuth, logger, getNoteSocialsByUser);

module.exports = router;
