# My Café - MERN Stack Café Website

A highly modular, scalable, and animated Café Website built with React, Vite, Tailwind CSS, Redux Toolkit, anime.js, Node.js, Express, and MongoDB Atlas.

## Project Structure

```
My-Cafe/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── features/      # Feature-based modules
│   │   ├── store/         # Redux store and slices
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                 # Node.js + Express backend
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── config/            # Configuration files
│   └── package.json
└── README.md
```

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **anime.js** - Animation library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RakeshMarati/My-Cafe.git
   cd My-Cafe
   ```

2. **Setup Client (Frontend)**
   ```bash
   cd client
   npm install
   ```

3. **Setup Server (Backend)**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Variables**
   - Copy `server/.env.example` to `server/.env`
   - Update `MONGODB_URI` with your MongoDB Atlas connection string

### Running the Application

1. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on `http://localhost:5000`

2. **Start the Client**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

## API Endpoints

### Test Endpoints
- `GET /` - Server health check
- `GET /api/test/db` - Test database connection

## Development Status

✅ **Step 1 Complete**: Base setup with React, Vite, Tailwind, Redux, Router, anime.js, Express, and MongoDB connection

## Next Steps

- Phase 2: Navbar + Hero Section + Landing animations
- Phase 3: Reusable UI components
- Phase 4: Backend APIs (menu, categories, testimonials)
- Phase 5: Frontend + API integration with Redux thunks
- Phase 6: Deployment (Vercel + Render)

## License

ISC

