import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactChildren } from '../types';

const ReactQueryProvider = ({ children }: ReactChildren) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
