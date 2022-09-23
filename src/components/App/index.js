import Header from "../Header";
import "../../assets/css/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../Search";
import MyLists from "../MyLists";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Search />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/mylists" element={<MyLists />}></Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
