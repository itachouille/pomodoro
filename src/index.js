import { createRoot } from "react-dom/client";
import SettingsContextProvider from "./Context/SettingsContext";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <SettingsContextProvider>
    <App />
  </SettingsContextProvider>
);
