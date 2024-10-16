const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    services: [Service]
    reviews: [Review]
  }

  type Service {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    location: String
    worker: User!
  }
    type Auth {
    token: ID
    user: User
  }

  type Job {
    _id: ID!
    client: User!
    service: Service!
    status: String!
    scheduleDate: String
  }

  type Review {
    _id: ID!
    client: User!
    worker: User!
    rating: Int!
    review: String
  }

  type Query {
    user(id: ID!): User
    service: [Service]
    job(clientId: ID): [Job]
    review: [Review]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addService(title: String!, description: String!, price: Float!, workerId: ID!): Service
    addJob(clientId: ID!, serviceId: ID!, scheduleDate: String!): Job
    addReview(clientId: ID!, workerId: ID!, rating: Int!, review: String!): Review
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
