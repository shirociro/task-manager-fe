// import './App.css'
// import Tasks from "./Tasks"

// function App() {
//   return (
//     <div className="app">
//       <h1>📝 React Task Evaluator</h1>
//       <Tasks />
//     </div>

// export

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/app/router";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
