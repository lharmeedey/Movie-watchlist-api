# Movie Watchlist API

A RESTful API for managing a personal movie watchlist, built with Node.js, Express, and Prisma ORM.

## Features

- User authentication (register, login, logout)
- Add movies to your watchlist
- Track watchlist status (planned, watching, completed, dropped)
- Rate and add notes to movies
- PostgreSQL database with Prisma ORM

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lharmeedey/Movie-watchlist-api.git
   cd movie-watchlist
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/movie_watchlist"
   JWT_SECRET="your_jwt_secret_key"
   PORT=5001
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. (Optional) Seed the database with sample movies:
   ```bash
   npm run seed:movies
   ```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will run on `http://localhost:5001` (or the port specified in your `.env`).

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/register` - User registration (Note: This endpoint may need to be added to routes)

### Watchlist
- `POST /watchlist` - Add a movie to watchlist

### Movies
- (Endpoints not yet implemented)

## Database Schema

The application uses three main models:
- **User**: Stores user information
- **Movie**: Stores movie details
- **WatchlistItem**: Links users to movies with status, rating, and notes

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run seed:movies` - Seed the database with sample movies
- `npm test` - Run tests (not implemented yet)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

