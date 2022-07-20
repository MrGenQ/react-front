import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Main from "./components/main/Main";
import Register from "./components/auth/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UserProvider} from "./context/UserContext";
import AllPokesHistory from "./components/pokes/AllPokesHistory";
import UserSearch from "./components/users/UserSearch";
import UpdateUser from "./components/users/UpdateUser";
import ImportPokes from "./components/imports/ImportPokes";
import ImportUsers from "./components/imports/ImportUsers";
function App() {
    const notify = () => toast;
      return(
          <div>
              <UserProvider>
                <Router>
                    <div className="absolute">
                        <button onClick={notify}></button>
                        <ToastContainer />
                    </div>
                    <Routes>
                        <Route exact path="/" element={<Register/>}/>
                        <Route exact path="/autentifikuota" element={<Main/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/visu-poke-istorija" element={<AllPokesHistory/>}/>
                        <Route exact path="/vartotoju-paieska" element={<UserSearch/>}/>
                        <Route exact path="/redaguoti-profili" element={<UpdateUser/>}/>
                        <Route exact path="/poke-importas" element={<ImportPokes/>}/>
                        <Route exact path="/vartotoju-importas" element={<ImportUsers/>}/>
                    </Routes>
                </Router>
              </UserProvider>
          </div>
      )
}

export default App;
