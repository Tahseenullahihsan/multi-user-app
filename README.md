//User App
This is a User Application built with Node.js, Express, and MongoDB, 
featuring a simple frontend for adding and displaying users. 
The project also includes Docker support for easy deployment.

//Features
Add users through a user-friendly form.
Display all users stored in the MongoDB database.
Fully responsive and visually appealing frontend.
Supports both JSON and URL-encoded form data.
Integrated Docker support for containerized deployment.

//Prerequisites
Node.js (v16 or higher)
MongoDB (local or cloud instance)
Docker (optional for containerized deployment)
//Installation
Step 1: Clone the Repository
bash
Copy code
git clone https://github.com/Tahseenullahihsan/user-app.git
cd user-app
Step 2: Install Dependencies
bash
Copy code
npm install
Step 3: Configure MongoDB
Update the MongoDB connection URI in app.js:
Step 4: Run the Application
bash
Copy code
node app.js
The application will run at: http://localhost:3000

Using Docker
Step 1: Build the Docker Image
bash
Copy code
docker build . -t my_app
Step 2: Run the Docker Container
bash
Copy code
docker run -d  -p 5000:3000 my_app
The application will now be accessible at: http://<ip>:5000

Step 3: Stop and Remove the Container (if needed)
bash
Copy code
docker stop multi-user-app-container
docker rm multi-user-app-container
Dockerfile Explanation
The Dockerfile is used to containerize the application for consistent deployment across environments.

Project Structure
plaintext
Copy code
multi-user-app/
├── models/
│   └── User.js         # User schema for MongoDB
├── node_modules/       # Installed dependencies
├── app.js              # Main application logic
├── package.json        # Project metadata and dependencies
├── Dockerfile          # Docker configuration
└── README.md           # Project documentation
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License
This project is licensed under the MIT License.

Author
Tahseen Ullah
GitHub: @Tahseenullahihsan