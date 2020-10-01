// todo: example with knex lib and sqlite in a new branch
// todo: add prisma and crud example
// todo: study pooling in official docs to achieve realtime
// todo: try with pouchdb for realtime

import withApollo from '../lib/apolloClient'
import { useQuery, useMutation } from '@apollo/react-hooks'
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

const ADD_ITEM = gql`
  mutation addItem($text: String) {
    addItem(text: $text) {
      id
      text
    }
  }
`

const REMOVE_ITEM = gql`
  mutation removeItem($id: Int) {
    removeItem(id: $id)
  }
`

declare var global

// export async function getStaticProps(context) {
//
//
//   // Create a table
//   db.schema
//     .createTable('items', table => {
//       table.increments('id');
//       table.string('text');
//     })
//   // Then query the table...
//   .then((data) => {
//       // console.log('db', db)
//       console.log('data', data)
//       // db('items').insert({text: 'Item'})
//     }
//   ).catch((error) => console.error(error))
//
//
//   global.test = 'test'
//   global.db = db
//
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

const Index = () => {

  const onCompleted = (result: object) => {
    console.log('mutation completed', result)
  }

  const { loading, error, data, fetchMore } = useQuery(GET_ITEMS, {notifyOnNetworkStatusChange: true});
  const [ addItemMutation ] = useMutation(ADD_ITEM, { onCompleted })
  const [ removeItemMutation ] = useMutation(REMOVE_ITEM, { onCompleted })

  const onAddItem = (text: string) => {
    addItemMutation({
      variables: { text },
      refetchQueries: [{query: GET_ITEMS}],
    })
  }

  const onRemoveItem = (itemId: number) => {
    removeItemMutation({
      variables: { id: itemId },
      refetchQueries: [{query: GET_ITEMS}],
    })
  }

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
                  <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                </span>
              </div>
            )
          })
        }
        <p><button onClick={() => onAddItem('Item')}>Add Item</button></p>
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