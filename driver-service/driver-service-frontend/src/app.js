import { useEffect, useState } from "react";
import { DRIVERS_SERVICE_URL } from "./config/constants";
import { Page } from "./core/components/page.component";
import { Main } from "./main";
import { StateProvider } from "./state/state.context";

function App() {

  return (
    <StateProvider>
      <Main />
    </StateProvider>
  );
}

export default App;
