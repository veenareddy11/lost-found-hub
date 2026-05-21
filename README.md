# Lost & Found Hub

A full-stack web application where users can post, search, and manage lost and found items.

## Live Demo
Frontend: https://lost-found-hub-38rd.onrender.com  
Backend: https://lost-found-hub-1.onrender.com

## Features
- User Authentication (JWT)
- Post lost/found items
- Upload item images
- Search and browse items
- Responsive UI
- Protected routes

## Tech Stack
### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Cloud Services
- Cloudinary
- Render
- MongoDB Atlas

## Installation

### Clone repository
```bash
git clone https://github.com/veenareddy11/lost-found-hub.git
```

### Install frontend dependencies
```bash
cd client
npm install
```

### Install backend dependencies
```bash
cd ../server
npm install
```

### Run frontend
```bash
npm run dev
```

### Run backend
```bash
node server.js
```

## Environment Variables

Create a `.env` file inside `server`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

## Author
Veena Reddy
