import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { Auth } from "aws-amplify";
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_AUTH_APP_SYNC_API_URL
});

const authLink = setContext(async (_, { headers }) => {
  const dataToken: any = await Auth.currentSession();
  return {
    headers: {
      ...headers,
      authorization: dataToken ? `Bearer ${dataToken?.idToken.jwtToken}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
