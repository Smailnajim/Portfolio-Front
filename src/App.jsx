import { Routes, Route } from "react-router-dom";
import Profiles from "./pages/profiles";
import Layout from "./layouts/index";
import Portfolio from "./pages/portfolio";

export default function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Profiles />}/>
        <Route path="profiles" element={<Profiles />}/>
        <Route path="portfolio/:id" element={<Portfolio />}/>
      </Route>
    </Routes>
      {/* " */}
      {/* <Routes path='/smail-najim' element={</>}>
      </Routes> */}
    </>
  );
}