# Annadaata Backend

The backend API for **Annadaata**, a platform connecting farmers and consumers. This application manages authentication, grain inventory, shopping carts, events, and AI-powered features.

## 🚀 Features

- **Authentication**: Secure user registration and login, including Google OAuth integration.
- **Grain Management**: API endpoints for managing grain listings (`/api/grains`).
- **Shopping Cart**: Functionality to manage user carts (`/api/cart`).
- **Events**: Event management system (`/api/events`).
- **AI Integration**: AI-powered features using OpenAI (`/api/ai`).
- **Security**: CORS enabled, environment variable configuration.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Passport.js (Google OAuth), JWT (JSON Web Tokens)
- **AI**: OpenAI API
- **Tools**: dotenv, cors, bcryptjs

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanmaydixit27/annadaata-backend.git
   cd annadaata-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   OPENAI_API_KEY=your_openai_api_key
   SESSION_SECRET=your_session_secret
   ```

4. **Start the Server**
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:5000`.

## 🔗 API Endpoints

### Auth (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /google` - Google OAuth login

### Grains (`/api/grains`)
- Manage grain listings (CRUD operations).

### Cart (`/api/cart`)
- Add/Remove items from the cart.

### Events (`/api/events`)
- Create and manage events.

### AI (`/api/ai`)
- interact with AI services.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
