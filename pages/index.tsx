import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";
import { BookInfo } from "../components/BookInfo";

const Index = ({ data }) => {
  const client = new ApolloClient({
    uri: "/api/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>NextJS GraphQL Apollo App</h1>
        <BookInfo />
      </div>
    </ApolloProvider>
  );
};

export default Index;