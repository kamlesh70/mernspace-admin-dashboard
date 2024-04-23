import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/login";
import { APP_PATHS } from "./router-path";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: APP_PATHS.login.root,
        element: <LoginPage />
    }
])
