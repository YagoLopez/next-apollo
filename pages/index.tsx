import withApollo from '../lib/apollo'
import { BookInfo } from "../components/BookInfo";
// import { withApollo } from "@apollo/client/react/hoc";

const Index = ({ data }) => {
  return (
    <div>
      <h1>NextJS GraphQL Apollo App</h1>
      <BookInfo />
    </div>
  );
};

export default withApollo({ ssr: true })(Index);