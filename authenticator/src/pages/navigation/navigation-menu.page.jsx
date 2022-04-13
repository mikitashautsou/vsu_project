import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StateContext } from "../../state/state.context";

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px; */
`;

const MenuItemElement = styled.div`
  height: 100px;
  width: 100px;
  background-color: white;
  color: #9fb4ff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: bold;
  transition: transform ease-in-out 0.2s;
  margin: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  box-shadow: 1px 4px 8px 0px rgba(34, 60, 80, 0.2);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
  }
`;

const STYLES = {
  loading: {
    backgroundColor: "yellow",
  },
  ok: {
    backgroundColor: "white",
  },
  unavailable: {
    backgroundColor: "red",
  },
};

const MenuItem = ({ key, path, token, name }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    (async () => {
      try {
        await fetch(path);
        setStatus("ok");
      } catch (e) {
        setStatus("unavailable");
      }
    })();
  });

  return (
    <MenuItemElement
      key={key}
      style={STYLES[status]}
      onClick={() => {
        window.location.href = `${path}set-token/${token}`;
      }}
    >
      {name}
    </MenuItemElement>
  );
};
/**
 *
 * @param {{ services: { key: string, name: string, path: string }[] }} props
 * @returns
 */
const NavigationMenuPage = ({ services }) => {
  const state = useContext(StateContext);

  return (
    <Container>
      <Confetti></Confetti>

      {services
        .filter((s) => !s.visibleFor || s.visibleFor.includes(state.user.role))
        .map((s) => (
          <MenuItem
            key={s.key}
            name={s.name}
            token={state.token}
            path={s.path}
          />
        ))}
      <MenuItemElement key={"exit"} onClick={() => state.logout()}>
        {"Logout"}
      </MenuItemElement>
    </Container>
  );
};

export default NavigationMenuPage;
