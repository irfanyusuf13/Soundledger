import { BrowserRouter as Router } from 'react-router-dom';
import { useSoundLedger } from "./hooks/useSoundLedger";
import Layout from "./components/layout";
import AppRoutes from "./AppRoutes";

function App() {
  const { contract, account } = useSoundLedger();
  
  return (
    <Router>
      <Layout>
        <AppRoutes contract={contract} account={account} />
      </Layout>
    </Router>
  );
}

export default App;