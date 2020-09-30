// todo: example with knex lib and sqlite in a new branch
// todo: add prisma and crud example
// todo: study pooling in official docs to achieve realtime
// todo: try with pouchdb for realtime

import withApollo from '../lib/apolloClient'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Link from "next/link";

const GET_ITEMS = gql`
  query {
    items {
      id
      text
    }
  }
`

const Index = () => {

  const { loading, error, data, fetchMore } = useQuery(GET_ITEMS, {notifyOnNetworkStatusChange: true});

  if (loading) return <div>Loading...</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  if (data?.items) {
    return (
      <>
        {
          data.items.map((item, index) => {
            return (
              <div key={index} className="item">
                <span>
                  <div>{item.text}</div>
                  <div>{item.id}</div>
                </span>
                <span className="btnRemove">
                  <button>Remove</button>
                </span>
              </div>
            )
          })
        }
        <p><button>Add Item</button></p>
        <p>
          <Link href="/api/graphql">
            <a>/api/graphql ➡</a>
          </Link>
        </p>
      </>
    );
  }
}

export default withApollo({ ssr: true })(Index);