// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

// Create an Express application
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON data (for Postman)
app.use(express.json()); // This is important for JSON parsing (Postman)

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://tahseenislamian900:tahseen176@cluster0.eowrgx8.mongodb.net/userdb',
     { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Route to display the form to create a new user
app.get('/', (req, res) => {
  res.send(`
    <h1>Great things takes times</h1>
    <h1>Enter Username</h1>
    <form method="POST" action="/add-user">
      <input type="text" name="username" placeholder="Enter your username" required>
      <button type="submit">Add User</button>
    </form>
    <br><br>
    <h2>All Users</h2>
    <ul id="users-list"></ul>
    <script>
      // Fetch users from the server and display them
      fetch('/get-users')
        .then(response => response.json())
        .then(users => {
          const usersList = document.getElementById('users-list');
          users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.username;
            usersList.appendChild(li);
          });
        });
    </script>
  `);
});

// Route to handle adding a new user
app.post('/add-user', (req, res) => {
 //  console.log(req.body); // Log the incoming request body
  const username = req.body.username;

  // Create a new User and save it to the database
  const newUser = new User({ username });
  newUser.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).send('Error saving user to database');
    });
});

// Route to get all users from the database
app.get('/get-users', (req, res) => {
  
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).send('Error fetching users');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
