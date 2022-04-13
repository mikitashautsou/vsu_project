import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignInPage } from "./pages/auth/sign-in.page";
import { SignUpPage } from "./pages/auth/sign-up.page";
import NavigationMenuPage from "./pages/navigation/navigation-menu.page";
import { StateContext, StateContextProvider } from "./state/state.context";
// auth
//   auth-backend: 4000
//   authenticator-frontend: 4001
//   users-frontend: 4002
// bank:
//   backend: 4010
//   frontend: 4011
// drivers:
//   backend: 4020
//   frontend: 4021
// cars:
//   backend: 4030
//   frontend: 4031
// fines:
//   backend: 4040
//   frontend: 4041

const Router = () => {
  const state = useContext(StateContext);
  console.log({ state });
  if (state.isLoading) {
    return <>Loading</>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to={"/menu"} />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/menu"
          element={
            state.user ? (
              <NavigationMenuPage
                services={[
                  { name: "Bank", key: "bank", path: "http://localhost:4011/" },
                  {
                    name: "Users",
                    key: "user",
                    path: "http://localhost:4002/",
                  },
                  {
                    name: "Drivers",
                    key: "drivers",
                    path: "http://localhost:4021/",
                  },
                  { name: "Cars", key: "cars", path: "http://localhost:4031/" },
                  {
                    name: "Fines(Unity)",
                    key: "fines",
                    path: "http://localhost:4041/",
                  },
                ]}
              />
            ) : (
              <Navigate to={"/sign-in"} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
function App() {
  return (
    <StateContextProvider>
      <Router />
    </StateContextProvider>
  );
}

export default App;
