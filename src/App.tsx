
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CoinsList from './ui/modules/coins_list';
import CoinDetails from './ui/modules/coin_details';
import HomePage from './ui/modules/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/" element={<CoinsList />} />
          <Route path="coin-details" element={<CoinDetails />} >
            <Route path=":coin" element={<CoinDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;