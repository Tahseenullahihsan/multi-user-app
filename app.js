// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

// Create an Express application
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON data (for Postman)

// Connect to MongoDB (replace with your MongoDB URI)
mongoose
  .connect('mongodb+srv://tahseenislamian900:tahseen176@cluster0.eowrgx8.mongodb.net/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Route to display the form to create a new user
app.get('/', (req, res) => {
  res.send(`
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        text-align: center;
      }
      .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin-bottom: 15px;
      }
      h1, h2 {
        color: #333;
      }
      form {
        margin-top: 20px;
      }
      input[type="text"] {
        padding: 10px;
        width: 80%;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }
      button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
        color: #777;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        padding: 5px 0;
        color: #555;
      }
    </style>
    <div class="container">
      <img src="https://via.placeholder.com/100" alt="Your Photo" />
      <h1>Welcome to My Application</h1>
      <h2>Integration with Jenkins - My DevOps Journey</h2>
      <p>Start by entering a username below:</p>
      <form method="POST" action="/add-user">
        <input type="text" name="username" placeholder="Enter your username" required />
        <button type="submit">Add User</button>
      </form>
      <br />
      <h2>All Users</h2>
      <ul id="users-list"></ul>
      <script>
        // Fetch users from the server and display them
        fetch('/get-users')
          .then((response) => response.json())
          .then((users) => {
            const usersList = document.getElementById('users-list');
            users.forEach((user) => {
              const li = document.createElement('li');
              li.textContent = user.username;
              usersList.appendChild(li);
            });
          });
      </script>
      <div class="footer">
        <p>
          Developed by Tahseen Ullah | 
          <a href="https://github.com/Tahseenullahihsan/multi-user-app" target="_blank">GitHub Project</a> | Follow my journey on LinkedIn</p>
      </div>
    </div>
  `);
});

// Route to handle adding a new user
app.post('/add-user', (req, res) => {
  const username = req.body.username;

  // Create a new User and save it to the database
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.status(500).send('Error saving user to the database');
    });
});

// Route to get all users from the database
app.get('/get-users', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send('Error fetching users');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
