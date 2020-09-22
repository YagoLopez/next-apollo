// todo: example with knex lib and sqlite in a new branch
// todo: add prisma and crud example
// todo: study pooling in official docs to achieve realtime
// todo: try with pouchdb for realtime

import withApollo from '../lib/apolloClient'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Link from "next/link";

const GET_RECIPES = gql`
  query {
    recipes{
      id
      title
    }
  }
`

const ADD_RECIPE = gql`
  mutation addRecipe($title: String, $averageRating: Int = 0) {
    addRecipe(title: $title, averageRating: $averageRating)
  }
`

const REMOVE_RECIPE = gql`
  mutation removeRecipe($id: ID) {
    removeRecipe(id: $id) {
      id
      title
      averageRating
    }
  }
`

const Index = () => {

  const onCompleted = (result: object) => {
    console.log('mutation completed', result)
  }

  const { loading, error, data, fetchMore } = useQuery(GET_RECIPES, {notifyOnNetworkStatusChange: true});
  const [ addRecipe ] = useMutation(ADD_RECIPE, { onCompleted })
  const [ removeRecipe ] = useMutation(REMOVE_RECIPE, { onCompleted })

  const onAddRecipe = (title: string, averageRating?: number) => {
    addRecipe({
      variables: { title, averageRating },
      refetchQueries: [{query: GET_RECIPES}],
    })
  }

  const onRemoveRecipie = (recipeId: number) => {
    removeRecipe({
      variables: { id: recipeId },
      refetchQueries: [{query: GET_RECIPES}],
    })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  if (data?.recipes) {
    return (
      <div>
        {
          data.recipes.map((recipe, index) => {
            return (
              <div key={index} className="recipe">
                <span>
                  <div>{recipe.title}</div>
                  <div>id: {recipe.id}</div>
                </span>
                <span className="btnRemove">
                  <button onClick={() => onRemoveRecipie(recipe.id)}>Remove</button>
                </span>
              </div>
            )
          })
        }
        <p><button onClick={() => onAddRecipe(`Recipe ${Date.now()}`)}>Add Recipe</button></p>
        <p>
          <Link href="/api/graphql">
            <a>/api/graphql ➡</a>
          </Link>
        </p>
      </div>
    );
  }
}

export default withApollo({ ssr: true })(Index);