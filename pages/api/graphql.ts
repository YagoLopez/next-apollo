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

const resolvers = {
  Query: {
    items: async (_, __) => {
      return []
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
