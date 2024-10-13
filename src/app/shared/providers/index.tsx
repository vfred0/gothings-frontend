import AppQueryClientProvider from './query-client';
import AppRouterProvider from './router';

export default function AppProviders() {
  return (
    <AppQueryClientProvider>
        <AppRouterProvider />
    </AppQueryClientProvider>
  );
}
