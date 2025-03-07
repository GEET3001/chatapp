const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Message = require('./models/Message');
const ws = require('ws');
const fs = require('fs');
const helmet = require('helmet');

dotenv.config();
if (!process.env.MONGO_URL || !process.env.JWT_SECRET || !process.env.CLIENT_URL) {
  throw new Error('Missing required environment variables');
}

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
app.use(helmet());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

// Routes and WebSocket logic here...

const server = app.listen(4040, () => {
  console.log('Server is running on port 4040');
});

const wss = new ws.WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (connection, req) => {
  console.log(`New connection from ${req.socket.remoteAddress}`);
  clients.add(connection);

  // Authentication and other WebSocket logic here...

  connection.on('close', () => {
    console.log(`Connection closed for user ${connection.username}`);
    clients.delete(connection);
    notifyAboutOnlinePeople();
  });
});