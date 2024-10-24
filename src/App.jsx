import React, { Suspense, useState } from "react"
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

const Home = React.lazy(() => import("./components/Home"))
const FakultasList = React.lazy(() => import("./components/Fakultas/List"))
const ProdiList = React.lazy(() => import("./components/Prodi/List"))
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"))
const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"))
const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"))
const ProdiEdit = React.lazy(() => import("./components/Prodi/Edit"))
const Login = React.lazy(() => import("./components/Login"));
const Logout = React.lazy(() => import("./components/Logout"));

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  return (
    <Router>
      {/* <Navbar /> */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/fakultas">Fakultas</NavLink>
              </li><li className="nav-item">
                < NavLink className={({ isActive }) => 'nav-link $(isActive ? "active" : "")'} aria-current="page" to="/prodi">Program Studi</NavLink>
              </li>
              <li>
                {token ? (
                  <NavLink className="nav-link" to="/logout">Logout</NavLink>
                ) : (
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/fakultas" element={<ProtectedRoute>
            <FakultasList />
          </ProtectedRoute>}/>
          <Route path="/fakultas/create" element={<FakultasCreate />}/>
          <Route path="/fakultas/edit/:id" element={<FakultasEdit />} />

          <Route path="/prodi" element={<ProdiList />} />
          <Route path="/prodi/create" element={<ProdiCreate />}/>
          <Route path="/prodi/edit/:id" element={<ProdiEdit />} />
          
          <Route path="/login" element={Login} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App