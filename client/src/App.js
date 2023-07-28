import { Home, Landing, Form, Detail } from "./views";
import NavBar from "./components/NavBar";
import { Route, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={Landing} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/detail" component={Detail} />

      <Route path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
