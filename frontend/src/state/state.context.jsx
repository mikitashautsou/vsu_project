import React from "react";

export const StateContext = React.createContext({
  user: {},
  isAuthenticated: false,
  currentPage: "",
  token: "",
  pageParams: {},
  setCurrentPage: (page) => {},
  setPageParams: (page) => {},
  authenticate: (token, user) => {},
});
export class StateProvider extends React.Component {
  constructor(props) {
    super(props);
    const setCurrentPage = (page) => {
      this.setState({
        currentPage: page,
      });
    };
    const authenticate = (token, user) => {
      this.setState({
        token,
        user,
        isAuthenticated: true,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    };
    const setPageParams = (pageParams) => {
      this.setState({
        pageParams,
      });
    };
    this.state = {
      user: {},
      isAuthenticated: false,
      currentPage: "",
      pageParams: {},
      setCurrentPage: setCurrentPage.bind(this),
      authenticate: authenticate.bind(this),
      setPageParams: setPageParams.bind(this),
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({
        token,
        isAuthenticated: true,
        user: JSON.parse(localStorage.getItem("user")),
      });
    }
  }

  render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    );
  }
}
