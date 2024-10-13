import { useLoadSession } from '@app/shared/hooks/use-load-session.ts';
import AppProviders from '@app/shared/providers';
import "@arco-design/web-react/dist/css/arco.css";

export default function App() {
  useLoadSession();

  return <AppProviders />;
}
