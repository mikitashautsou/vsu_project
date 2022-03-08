import { useContext, useEffect, useState } from "react";
import { LoginComponent } from "./auth/login.component";
import { DRIVERS_SERVICE_URL } from "./config/constants";
import { Page } from "./core/components/page.component";
import { StateContext } from "./state/state.context";

export const Main = () => {
  const { currentPage, isAuthenticated, setCurrentPage, setPageParams } =
    useContext(StateContext);
  const [models, setModel] = useState();

  useEffect(() => {
    fetch(`${DRIVERS_SERVICE_URL}/describe-yourself`)
      .then((res) => res.json())
      .then((res) => {
        setModel(res.models);
      });
  }, []);

  if (!isAuthenticated) {
    return <LoginComponent />;
  }
  if (!models) {
    return "Loading pages...";
  }
  return (
    <div className="main" style={{ display: "flex" }}>
      <div className="left-navigation-panel">
        <span>
          {models.map((m) => (
            <a
              style={{ display: "block" }}
              href="-"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(m.systemName);
                setPageParams({
                  type: "list",
                });
              }}
            >
              {m.pluralName}
            </a>
          ))}
        </span>
      </div>
      <div className="main">
        {models.map(
          (m) =>
            m.systemName === currentPage && (
              <Page baseUrl={DRIVERS_SERVICE_URL} model={m} />
            )
        )}
      </div>
    </div>
  );
};
