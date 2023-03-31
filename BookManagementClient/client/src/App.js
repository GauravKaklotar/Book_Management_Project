import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import AllBooks from "./components/AllBooks";
import AvailableBooks from "./components/AvailableBooks";
import SharedBooks from "./components/SharedBooks";

export default function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" exact element={<AllBooks />} />
        <Route path="/availableBooks" exact element={<AvailableBooks />}></Route>
        <Route path="/sharedBooks" exact element={<SharedBooks />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}