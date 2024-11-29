import express from 'express';
import root from './lib/dirname.js';
import path from 'path';
import multer from 'multer';
import sequelize from './config/sequelize.js';
import User from './models/User.model.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { readdir } from 'node:fs/promises';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//publik file directory
const publicFilesPath = path.join(root, 'public');
/// private file directory
const privateFilesPath = path.join(root, 'private');
// setting up session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
//____________________________
app.use('/public', express.static(publicFilesPath));
app.use('/private', express.static(privateFilesPath));
//_____________________________

const staticPublicPath = path.join(root, 'pages');

//Getting all files :
app.get('/all-files', async (req, res) => {
  try {
    const privFiles = await readdir(privateFilesPath);
    const pFiles = privFiles.map((file) => ({
      fileName: file,
      filePath: `/private/${file}`,
    }));

    const pubFiles = await readdir(publicFilesPath);
    const pbFiles = pubFiles.map((file) => ({
      fileName: file,
      filePath: `/public/${file}`,
    }));

    const allFiles = [...pFiles, ...pbFiles];
    res.json(allFiles);
  } catch (err) {
    console.error('Error  reading files', err);
    res.status(500).json({ error: 'Unable to read files' });
  }
});

//GETTING ALL PRIVATE FILES
app.get('/private/all-files', async (req, res) => {
  const privateFiles = await readdir(privateFilesPath);
  const privFiles = privateFiles.map((file) => ({
    fileName: file,
    filePath: `/private/${file}`,
  }));
  res.json(privFiles);
});

//GETING ALLL PUBLIC FILES
app.get('/public/all-files', async (req, res) => {
  const publicFiles = await readdir(publicFilesPath);
  const pblFiles = publicFiles.map((file) => ({
    fileName: file,
    filePath: `/public/${file}`,
  }));
  res.json(pblFiles);
});

//Login page ________________________
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPublicPath, 'login.html'));
});

app.get('/public', (req, res) => {
  res.sendFile(path.join(staticPublicPath, 'public.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(staticPublicPath, 'register.html'));
});
app.get('/protected', (req, res) => {
  const usr = req.session.user;
  if (!usr) {
    return res.redirect('/');
  }
  console.log('User logged in with username:', usr);
  res.sendFile(path.join(staticPublicPath, 'protected.html'));
});

app.get('/file-add', (req, res) => {
  const usr = req.session.user;
  if (!usr) {
    return res.redirect('/');
  }
  res.sendFile(path.join(staticPublicPath, 'add-file.html'));
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
// trying to log in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).send('User not found');
    }
    if (user.password !== password) {
      return res.status(400).send('Incorrect password');
    }
    //Store user ID in seasion
    req.session.user = user.username;
    res.redirect('/protected');
  } catch (err) {
    console.log(err);
    res.status(500).send('error logging in');
  }
});

//__________multer
const storage = multer.diskStorage({
  destination: function async(req, file, cb) {
    console.log(req.body);
    const isPublic = req.body.public === 'on';

    cb(
      null,
      isPublic ? path.join(root, '/public') : path.join(root, '/private')
    );
  },
  filename: function (req, file, cb) {
    const timeStamp = Date.now() % 100;
    cb(null, timeStamp + '-' + file.originalname);
  },
});
const upload = multer({ storage, dest: path.join(root, '/private') });
//FILE UPLOAD

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body.public);
  res.send('file uploaded');
});

// trying to register user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    //checking if user already exist
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      // return res.status(400).send('Username already exist');

      return res.redirect('/register');
    }
    // create user
    const newUser = await User.create({ username, password });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error registering user');
  }
});
//_______________________________________________________

await User.sync({ alter: true });
app.listen(7999, () => {
  console.log('Connected to http://localhost:7999');
});
