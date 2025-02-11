import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";

function App() {
  return (
    <Router>
      <Routes>
    
        <Route path="/" element={<Login />} />

      
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
