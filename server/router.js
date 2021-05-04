const router = require('express').Router();
const {
  getAllNote,
  getNote,
  addNote,
  uploadImageFromMemory,
  thumbsUp,
  thumbsDown,
} = require('./controllers/note');
const { getAllUser, getUser, addUser } = require('./controllers/user');
// const messageController = require('./controllers/message');
const { upload } = require('./middlewares/multerInMemory');
const { authMiddleware, checkAuth } = require('./middlewares/auth');
const { logger } = require('./middlewares/logger');

// Auth
router.post('/login', authMiddleware);

// Users
router.get('/user', getAllUser);
router.get('/user/:id', checkAuth, getUser);
router.post('/user', addUser);

// Notes
router.get('/note', getAllNote);
router.get('/note/:id', getNote);
router.put('/note/:id/vote/up', thumbsUp);
router.put('/note/:id/vote/down', thumbsDown);
router.post('/note', logger, checkAuth, addNote);
router.post('/image/upload', upload.single('photo'), uploadImageFromMemory);

// Chats

// Messages
// router.get('/message', messageController.getAllMessage);
// router.get('/message/:id', messageController.getMessage);
// router.post('/message', messageController.addMessage);

module.exports = router;
