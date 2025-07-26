import { AuthProvider } from "./Auth/AuthProvider";
import About from "./Components/About/About";
import Login from "./Components/Login/Login";
import List from "./Components/TodoList/List";
import ProtectedRoute from "./ProtectRoute/ProtectRoute";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const routeData = [
    {
      path: "/",
      element: <Login />
    },
    {
      path: "about",
      element: <About />
    },
    {
      path: "list",
      element: (
        <ProtectedRoute>
          <List />
        </ProtectedRoute>
      )
    },

  ];

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {routeData?.map((item, index) => (
              <Route key={index} path={item?.path} element={item?.element}></Route>
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
