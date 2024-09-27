import { BrowserRouter } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./App.css"
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';

import AuthProvider from "./context/authContext";
import TaskProvider from "./context/taskContext";
import Router from "./Router";

export default function App() {
  return (
    <MantineProvider>
      <Notifications />
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
