import { Routes, Route } from "react-router-dom";
import Profiles from "./pages/profiles";
import Layout from "./layouts/index";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/login";
import AdminProfile from "./pages/adminProfile";

export default function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Profiles />}/>
        <Route path="profiles" element={<Profiles />}/>
        <Route path="profiles/:id" element={<Portfolio />}/>
        <Route path="profiles/auth" element={<Login/>}/>
        <Route path="admin" element={<AdminProfile />}/>
        <Route path="not-existe" element={< />}/>
      </Route>
      {/* " */}
      {/* <Route path='/smail-najim' element={</>}>
      </Route> */}
    </Routes>
    </>
  );
}
