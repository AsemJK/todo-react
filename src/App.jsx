import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar";
import "./assets/css/style.css";
import Todo from "./components/Todo";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <section>
      <Navbar />
      <Todo />
    </section>
  </StrictMode>
);
