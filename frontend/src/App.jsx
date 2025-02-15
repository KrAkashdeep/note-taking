import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NoteList from "./components/NoteList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <NoteList />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/notes" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
