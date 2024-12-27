# Google Portal for Restaurant Reviews ✨

This project is a web application that allows restaurants to view and reply to customer reviews. Users can log in using Google OAuth. The frontend is built with React, and the backend is implemented with Express.js. Axios is used for communication between the frontend and backend.

## Features 🔧

- **Google OAuth Authentication**: Users log in via their Google account.
- **View Reviews**: Restaurants can view customer reviews.
- **Reply to Reviews**: Restaurants can post replies to customer reviews.
- **Secure Login**: Authentication is managed securely with Google OAuth.
- **Seamless Frontend-Backend Integration**: Axios is used for API communication.

## Tech Stack 🛠️

### Frontend 🔄
- React
- Axios
- CSS Modules
- React Router (for navigation)

### Backend 💻
- Express.js
- MongoDB (for storing reviews and replies)
- Passport.js (for Google OAuth)

### Tools 🐞
- npm (for package management)
- Concurrently (for running frontend and backend simultaneously)

## Setup and Installation ⚙️

### Prerequisites ⚡
- Node.js and npm installed on your system.
- MongoDB instance running locally or a cloud-based MongoDB cluster.
- Google Cloud Console account with a configured OAuth 2.0 Client ID.

### Steps to Run the Project 🌟

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SyedFaisal30/RestReview.git
   cd google-portal-reviews
   ```

2. **Setup Backend** 🛡️
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your-mongodb-connection-string
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Setup Frontend** 🌄
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Run Both Servers Simultaneously** 🚀
   - Navigate back to the root folder and run both servers using Concurrently:
     ```bash
     npm install -g concurrently
     concurrently "npm run dev --prefix frontend" "npm start --prefix backend"
     ```

## Project Structure 🌐

### Frontend
- **`src/components`**: Contains React components such as Login, Reviews, and ReplyForm.

### Backend
- **`routes/auth.js`**: Manages authentication routes using Passport.js.
- **`routes/userRoute.js`**: Handles user and review related endpoints.

## API Endpoints 🔗

### Authentication 🔐
- `POST /auth/google`: Initiates Google login.
- `GET /auth/google/callback`: Handles Google OAuth callback.
- `GET /auth/logout`: Logs out the user.


## Environment Variables 🛠️

The following environment variables are required:

| Variable              | Description                         |
|-----------------------|-------------------------------------|
| `PORT`                | Port number for the backend server |
| `MONGO_URI`           | MongoDB connection string          |
| `GOOGLE_CLIENT_ID`    | Google OAuth Client ID             |
| `GOOGLE_CLIENT_SECRET`| Google OAuth Client Secret         |

## Usage 🔄

1. Log in to the application using your Google account.
2. View the list of reviews for your restaurant.
3. Post replies to reviews directly from the dashboard.

## Scripts 📋

### Frontend
- `npm run dev`: Starts the React development server.

### Backend
- `npm start`: Starts the Express server.

### Root
- `concurrently`: Runs both frontend and backend simultaneously.

## Deployment 🏠

For deployment, you can use services like Heroku, Vercel, or AWS. Make sure to set the environment variables on the hosting platform and adjust the MongoDB URI and OAuth redirect URIs accordingly.

## License 🌐

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributing 🎓

Contributions are welcome! Please fork the repository and submit a pull request for any feature or bug fix.

---

## Contact 📢

For any queries or issues, please contact:

- **Name**: Syed Faisal Abdul Rahman Zulfequar
- **Email**: sfarz172320@gmail.com

Happy coding! 🚀

