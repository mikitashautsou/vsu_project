import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StateContextProvider } from "./state/state.context";

function App() {
  return (
    <StateContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/authenticate">

          </Route>
        </Switch>
      </BrowserRouter>
    </StateContextProvider>
  );
}

export default App;
