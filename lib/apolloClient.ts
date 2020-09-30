import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
// import {createHttpLink} from "apollo-link-http";

// const link = createHttpLink({
//   uri: '/api/graphql',
//   credentials: 'include'
// });

const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

// const apolloClient = new ApolloClient({
//   uri: '/api/graphql',
//   cache: new InMemoryCache(),
// });

export default withApollo(apolloClient)