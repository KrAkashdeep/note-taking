import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteList from "./components/NoteList";


const App = () => {
  return (
    <>
      {/* <NoteList /> */}
      <Router>
        <Routes>
          <Route path="/" element={<NoteList />} />
       
        </Routes>
      </Router>
    </>
  );
};

export default App;
