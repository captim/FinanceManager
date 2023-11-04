import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./mainLayout/mainLayout";
import {FluentProvider, webDarkTheme, webLightTheme} from "@fluentui/react-components";
import {getCurrentUser} from "./storage/storage";
import {BudgetTab} from "./tabs/budgetTab/budgetTab";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <div>404</div>,
    },
    {
        path: "/budget",
        element: <BudgetTab/>,
        errorElement: <div>404</div>,
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <RouterProvider router={router} />
        </FluentProvider>
    </React.StrictMode>
);

