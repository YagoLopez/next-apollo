import withApollo from '../lib/apolloClient'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Link from "next/link";

const RECIPES_PER_PAGE = 10;

const GET_RECIPES = gql`
  query {
    recipes{
      id
      title
    }
  }
`

const ADD_RECIPE = gql`
  mutation {
    addRecipe(id: 99, title: "recipe 99") {
      id
      title
      averageRating
    }
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

  const { loading, error, data, fetchMore } = useQuery(GET_RECIPES, {
    variables: { skip: 0, first: RECIPES_PER_PAGE },
    notifyOnNetworkStatusChange: true
  });

  // const [onAddRecipe] = useMutation(ADD_RECIPE, {refetchQueries: [{query: GET_RECIPES}]});
  const [ removeRecipe ] = useMutation(REMOVE_RECIPE);

  const onRemoveRecipie = (recipeId: number) => {
    removeRecipe({
      variables: { id: recipeId },
      refetchQueries: [{query: GET_RECIPES}]
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
              <p key={index}>
                Recipe:&nbsp;
                <span>{recipe.title}</span> | Id: <span>{recipe.id}</span>&nbsp;
                <span><button onClick={() => onRemoveRecipie(recipe.id)}>Remove</button></span>
              </p>
            )
          })
        }
        {/*<p><button onClick={() => onAddRecipe()}>Add Recipe</button></p>*/}
        <p>
          <Link href="/api/graphql">
            <a>/api/graphql</a>
          </Link>
        </p>
      </div>
    );
  }
}

export default withApollo({ ssr: true })(Index);