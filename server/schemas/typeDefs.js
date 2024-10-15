const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    services: [Service]
    reviews: [Review]
  }

  type Service {
    id: ID!
    title: String!
    description: String!
    price: Float!
    location: String!
    worker: User!
  }

  type Job {
    id: ID!
    client: User!
    service: Service!
    status: String!
    scheduleDate: String
  }

  type Review {
    id: ID!
    client: User!
    worker: User!
    rating: Int!
    review: String
  }

  type Query {
    getUsers(role: String): [User]
    getUser(id: ID!): User
    getServices: [Service]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User
    createService(title: String!, description: String!, price: Float!, workerId: ID!): Service
    createJob(clientId: ID!, serviceId: ID!, scheduleDate: String!): Job
    createReview(clientId: ID!, workerId: ID!, rating: Int!, review: String!): Review
  }
`;

module.exports = typeDefs;
