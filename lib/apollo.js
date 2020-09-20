import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

// const apolloClient = new ApolloClient({
//   uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
//   cache: new InMemoryCache()
// });

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache()
});

export default withApollo(apolloClient)