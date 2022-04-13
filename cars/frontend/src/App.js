import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SetToken from "./pages/auth/set-token";
import CarEditPage from "./pages/cars/edit";
import CarsPage from "./pages/cars/list";
import { TaxPaymentPage } from "./pages/cars/pay-taxes";
import { SellCarPage } from "./pages/cars/sell";
import PoaEditPage from "./pages/poas/edit";
import PoasPage from "./pages/poas/list";
import { BuyCarPage } from "./pages/sales/buy";
import SalesPage from "./pages/sales/list";
import { StateContextProvider } from "./state/state.context";

import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

toast.configure();


const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <button
            onClick={() => {
              window.location.href = process.env.REACT_APP_FRONTEND_AUTH_URL;
            }}
          >
            Main menu
          </button>
          <button>
            <Link to="/cars">Cars</Link>
          </button>
          <button>
            <Link to="/sales">Sales</Link>
          </button>

          <button>
            <Link to="/poas">Power of attorneys</Link>
          </button>
        </div>
        <Routes>
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/sales/:saleId" element={<BuyCarPage />} />

          <Route path="/cars" element={<CarsPage />} />
          <Route path="/poas" element={<PoasPage />} />
          <Route path="/poas/:poaId" element={<PoaEditPage />} />
          <Route path="/cars/:carId/sell" element={<SellCarPage />} />
          <Route path="/cars/:carId/pay-tax" element={<TaxPaymentPage />} />
          <Route path="/cars/:carId" element={<CarEditPage />} />
          <Route path="/set-token/:token" element={<SetToken />} />
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
    </div>
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
