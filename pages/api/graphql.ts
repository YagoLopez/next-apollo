import { ApolloServer, gql } from "apollo-server-micro";
import _remove from "lodash/remove"

const now = Date.now()

let recipes = [
  { id: now, title: `Recipe ${now}`, averageRating: 10 },
  { id: now + 1, title: `Recipe ${now + 1}`, averageRating: 20 },
  { id: now + 2, title: `Recipe ${now + 2}`, averageRating: 30 }
]

const typeDefs = gql`
  type Recipe {
    id: ID!
    title: String!
    averageRating: Int
  }
  
  type Query {
    recipes: [Recipe]
  }
  
  type Mutation {
    removeRecipe(id: ID): Recipe
    addRecipe(title: String, averageRating: Int): ID
  }
`;

const resolvers = {
  Query: {
    recipes: (_, __, ctx) => ctx.recipes,
  },

  Mutation: {
    removeRecipe: (_, { id }, ctx) => _remove(ctx.recipes, (recipe) => recipe.id === +id)[0],
    addRecipe: (parent, { title, averageRating }, ctx) => {
      const id = Date.now()
      ctx.recipes.push({ id, title, averageRating })
      return id
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: (req, res) => ({ req, res, recipes })
})

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;