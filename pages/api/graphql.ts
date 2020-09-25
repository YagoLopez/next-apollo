import { ApolloServer, gql } from "apollo-server-micro";
// const { PHASE_PRODUCTION_BUILD } = require('next/constants')
// var db = new sqlite3.Database( path.resolve(__dirname, 'db.sqlite') );
const path = require('path')
const fullDbpath = path.resolve('data.db')

let filename
console.log('dirname', __dirname)
console.log('filename', __filename)
console.log('fullDbPath', fullDbpath)
console.log('process.cwd()', process.cwd())
console.log('resolve', path.resolve('.'))


declare const process

if (process.env.NODE_ENV === 'production') {
  filename = './_next/static/data.db'
}

if (process.env.NODE_ENV === 'development') {
  filename = './data.db'
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV)


const fullDbPath2 = path.join(process.cwd(), path.sep + 'data.db')
console.log('fullDbPath2', fullDbPath2)

const db = require('knex')({
  client: 'sqlite3',
  connection: { filename: '../../data.db' },
  useNullAsDefault: true
});

// Create a table
db.schema
  .createTable('items', table => {
    table.increments('id');
    table.string('text');
  })
// Then query the table...
.then((data) => {
    // console.log('db', db)
    console.log('data', data)
    // db('items').insert({text: 'Item'})
  }
).catch((error) => console.error(error))


const typeDefs = gql`
  type Item {
    id: ID!
    text: String!
  }
  
  type Query {
    items: [Item]
  }
  
  type Mutation {
    removeItem(id: ID): ID
    addItem(text: String): Item
  }
`;

const resolvers = {
  Query: {
    items: (_, __, { db }) => {
      return db.select('*').from('items')
    }
  },

  Mutation: {
    removeItem: async (_, { id }, { db }) => {
      const removed_rows = await db('items').where({ id }).del()
      return id
    },
    addItem: async (_, { text }, { db }) => {
      const idList: number[] = await db('items').insert({text: 'Item'}).returning('id')
      return { id: idList[0], text }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: (req, res) => ({ req, res, db })
})

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;