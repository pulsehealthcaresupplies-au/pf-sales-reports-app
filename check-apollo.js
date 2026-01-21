const ApolloClient = require('@apollo/client');
console.log('useSuspenseQuery exported:', 'useSuspenseQuery' in ApolloClient);
console.log('useQuery exported:', 'useQuery' in ApolloClient);
console.log('skipToken exported:', 'skipToken' in ApolloClient);
console.log('Keys:', Object.keys(ApolloClient));
