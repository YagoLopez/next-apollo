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
  }

`;

const resolvers = {
  Query: {
    recipes: () => recipes,
  },

  Mutation: {
    removeRecipe: (_, { id }) => _remove(recipes, (recipe) => recipe.id === +id)[0]
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;