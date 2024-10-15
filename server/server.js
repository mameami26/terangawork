const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const connectDB = require('./config/connection');
const { typeDefs, resolvers } = require('./graphql');
const { initSocket } = require('./services/messageService');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware for parsing JSON data
app.use(express.json());

// MongoDB Connection
connectDB();

// Initialize Apollo Server for GraphQL
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
apolloServer.applyMiddleware({ app });

// Initialize Socket.io for real-time messaging
initSocket(server);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the TérangaWork Backend API');
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`GraphQL endpoint at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
