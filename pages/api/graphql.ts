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
    items: async (_, __) => {
      const result = await db.select('*').from('items')
      return result
    }
  },

  Mutation: {
    removeItem: async (_, { id }) => {
      return 3
    },
    addItem: async (_, { text }) => {
      return { id: 4, text: "Item" }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: (req, res) => ({ req, res })
})

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
