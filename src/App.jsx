import { Routes, Route } from "react-router-dom";
import Profiles from "./pages/profiles";
import Layout from "./layouts/index";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/login";
import AdminProfile from "./pages/adminProfile";
import NotExist from "./pages/NotExist";
// import useLogout from "./middleware/useLogout";
import ProtectedRoute from "./middleware/ProtectedRoute";
import iCan from "./middleware/iCan";

export default function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Profiles />}/>
        <Route path="profiles" element={<Profiles />}/>
        <Route path="profiles/:id" element={<Portfolio />}/>
        <Route path="profiles/auth" element={<Login/>}/>
        <Route path="admin" element={
          <ProtectedRoute middlewares={[iCan]}>
            <AdminProfile />
          </ProtectedRoute>
          }/>
        <Route path="not-exist" element={<NotExist />}/>
        {/* <Route path="logout" element={useLogout() }/> */}
      </Route>
      {/* " */}
      {/* <Route path='/smail-najim' element={</>}>
      </Route> */}
    </Routes>
    </>
  );
}
