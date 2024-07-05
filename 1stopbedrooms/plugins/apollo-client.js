import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fragmentTypes from '~/fragmentTypes.json';

export default function ({ app }) {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: fragmentTypes
    });

    const cache = new InMemoryCache({ fragmentMatcher });

    const link = new HttpLink({
        uri: 'https://www.sandbox9.1sb.pp.ua/graphql/1/listing',
        headers: {
            Authorization: `Basic ${Buffer.from("user:ovietiiwai4Ooyi").toString("base64")}`,
        }
    });

    const client = new ApolloClient({
        link,
        cache,
    });

    app.apolloProvider.defaultClient = client;
}
