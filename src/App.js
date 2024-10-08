import './App.css';
import React, {useState} from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NotesState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
   <>
   <NoteState>
    <Router>
      <Navbar />
      <Alert alert={alert} />
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert} />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login showAlert={showAlert} />} />
        <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
   </>
  );
}

export default App;
