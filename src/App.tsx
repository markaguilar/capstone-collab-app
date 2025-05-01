import { RouterProvider } from "react-router-dom";
import "./App.css";

import Router from "@/routes/Router.tsx";
function App() {
  return <RouterProvider router={Router} />;
}

export default App;
