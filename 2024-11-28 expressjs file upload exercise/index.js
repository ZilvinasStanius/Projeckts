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
//____________
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//SEASION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
//publik file directory
const publicFilesPath = path.join(root, 'public');
/// private file directory
const privateFilesPath = path.join(root, 'private');
// Pages file directory
const staticPublicPath = path.join(root, 'pages');

const stylePath = path.join(root, 'styles');

//STATIC FILE USING_______________
app.use('/public', express.static(publicFilesPath));
app.use('/private', express.static(privateFilesPath));
app.use('/styles', express.static(stylePath));
//ROUTES_____________________________

//get User
app.get('/user', (req, res) => {
  const username = req.session.user;
  if (!username) {
    return res.status(401).json({ message: 'Unautorized' });
  }
  res.json({ username });
});

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

// Login page ________________________
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPublicPath, 'login.html'));
});
//Public files page______________________________
app.get('/public', (req, res) => {
  res.sendFile(path.join(staticPublicPath, 'public.html'));
});
//Registration page______________________
app.get('/register', (req, res) => {
  res.sendFile(path.join(staticPublicPath, 'register.html'));
});

//Protectred page route___________________
app.get('/protected', (req, res) => {
  const usr = req.session.user;
  if (!usr) {
    return res.redirect('/');
  }
  console.log('User logged in with username:', usr);
  res.sendFile(path.join(staticPublicPath, 'protected.html'));
});
//File add page_________________________
app.get('/file-add', (req, res) => {
  const usr = req.session.user;
  if (!usr) {
    return res.redirect('/');
  }
  res.sendFile(path.join(staticPublicPath, 'add-file.html'));
});
//Seasion destroy "LOGOUT" route_____________
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
// LogIn route__________________________
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect password' });
    }
    //Store username in session
    req.session.user = user.username;
    // res.redirect('/protected');
    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    console.log(err);
    res.status(500).send('error logging in');
  }
});
//Registration route________________________
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    //checking if user already exist
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exist' });
    }
    // create user
    const newUser = await User.create({ username, password });
    res.status(200).json({ message: 'User created' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error registering user' });
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

//FILE UPLOAD____________
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.redirect('/file-add');
  } else {
    res.redirect('/file-add');
  }
});

//____________________________________
await User.sync({ alter: true });
app.listen(7999, () => {
  console.log('Connected to http://localhost:7999');
});
