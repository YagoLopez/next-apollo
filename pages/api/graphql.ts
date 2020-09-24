import { ApolloServer, gql } from "apollo-server-micro";
import _remove from "lodash/remove"
import { v4 as uuidv4 } from 'uuid'

const id1 = uuidv4()
const id2 = uuidv4()
const id3 = uuidv4()

let items = [
  { id: id1, text: `Item`},
  { id: id2 + 1, text: `Item`},
  { id: id3 + 2, text: `Item`}
]

const typeDefs = gql`
  type Item {
    id: ID!
    text: String!
  }
  
  type Query {
    items: [Item]
  }
  
  type Mutation {
    removeItem(id: ID): Item
    addItem(text: String): ID
  }
`;

const resolvers = {
  Query: {
    items: (_, __, ctx) => ctx.items
  },

  Mutation: {
    removeItem: (_, { id }, ctx) => _remove(ctx.items, (item) => item.id === id)[0],
    addItem: (_, { text }, ctx) => {
      const id = uuidv4()
      ctx.items.push({ id, text })
      return id
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: (req, res) => ({ req, res, items })
})

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;