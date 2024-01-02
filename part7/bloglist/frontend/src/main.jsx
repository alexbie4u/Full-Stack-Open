import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationContextProvider } from './reducers/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './reducers/UserContext';
import ViewsRouter from './ViewsRouter';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <ViewsRouter>
            <App />
          </ViewsRouter>
        </NotificationContextProvider>
      </UserContextProvider>
  </QueryClientProvider>
);