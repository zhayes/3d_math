import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";
import "./styles/global.css";
import "highlight.js/styles/atom-one-dark.css"
import "./chapters/register-demos";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found. Ensure index.html has <div id='root'></div>");
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root
);