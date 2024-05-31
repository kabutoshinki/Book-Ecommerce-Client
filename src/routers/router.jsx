import { BrowserRouter } from "react-router-dom";

import AppRouter from "./AppRouter";
export default function router() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
