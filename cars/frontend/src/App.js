import { BrowserRouter, Route, Routes } from "react-router-dom";
import SetToken from "./pages/auth/set-token";
import CarEditPage from "./pages/cars/edit";
import CarsPage from "./pages/cars/list";
import { StateContextProvider } from "./state/state.context";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:carId" element={<CarEditPage />} />
        <Route path="/" element={<SetToken />} />
        {/* <Route path="/sign-up" element={<SignUpPage />} />
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
        />*/}
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
