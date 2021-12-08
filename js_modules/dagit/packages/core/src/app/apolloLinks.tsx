import {ApolloLink} from '@apollo/client';

import {formatElapsedTime, debugLog} from './Util';

export const logLink = new ApolloLink((operation, forward) =>
  forward(operation).map((data) => {
    const context = operation.getContext();
    const time = performance.now() - context.start;
    const callCounts = JSON.parse(context.response.headers.get('x-dagster-call-counts'));
    debugLog(`${operation.operationName} took ${formatElapsedTime(time)}`, {
      operation,
      data,
      callCounts,
    });
    return data;
  }),
);

export const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({start: performance.now()});
  return forward(operation);
});
