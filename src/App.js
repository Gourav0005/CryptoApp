import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Header from "./Component/Header";
import Exchange from "./Component/Exchange";
import CoinDetails from "./Component/CoinDetails";
import Coins from "./Component/Coins";
import Chart from "./Component/Chart";
import Footer from "./Component/Footer";

function App() {
  return (
    
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/coins" element={<Coins/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
