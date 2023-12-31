import { Home, Landing, Form, Detail } from "./views";
import NavBar from "./components/NavBar/NavBar";
import { Route, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/" component={Landing} />
      <Route exact path="/create" component={Form} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
