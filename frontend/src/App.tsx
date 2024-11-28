import { AuthProvider } from "./context/AuthContext.tsx";
import AppRouter from "./routes/appRouter.tsx";

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

export default App;