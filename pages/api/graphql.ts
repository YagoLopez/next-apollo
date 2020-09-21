import { ApolloServer, gql } from "apollo-server-micro";
import _remove from "lodash/remove"

let recipes = [
  { id: 1, title: "Recipe 1", averageRating: 10 },
  { id: 2, title: "Recipe 2", averageRating: 20 },
  { id: 3, title: "Recipe 3", averageRating: 30 }
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
  context: { recipes }
});

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;