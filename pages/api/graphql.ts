import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Item {
    id: Int
    text: String
  }
  
  type Query {
    items: [Item]
  }
  
  type Mutation {
    removeItem(id: Int): Int
    addItem(text: String): Item
  }
`;

const db = require("knex")({
  client: "pg",
  connection: {
    host: "ec2-54-247-79-178.eu-west-1.compute.amazonaws.com",
    user: "vniyjodlqouigi",
    password: "ea694508a7a30456653341727a9bc3ee7aa1e55bc89a0c808d49d283e43a9554",
    database: "d4c5jva0v72hpk",
    ssl: { rejectUnauthorized: false }
  }
});

const resolvers = {
  Query: {
    items: async (_, __, { db }) => {
      return  await db.select('*').from('items')
    }
  },

  Mutation: {
    removeItem: async (_, { id }, { db }) => {
      const removed_rows = await db('items').where({ id }).del()
      return id
    },
    addItem: async (_, { text }, { db }) => {
      const idList: number[] = await db('items').insert({text}).returning('id')
      return { id: idList[0], text }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: (req, res) => ({ req, res, db })
})

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
