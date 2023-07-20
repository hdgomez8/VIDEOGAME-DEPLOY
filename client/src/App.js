import "./App.css";
import { Home, Landing, Detail, Form } from "../src/views";
import NavBar from "../src/components/NavBar/NavBar";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import axios from "axios";
axios.defaults.baseURL='http://localhost:3001'

function App() {
  const location = useLocation();

  const videoGames = useSelector((state) => state.videoGames);

  return (
    <div className="App">
      {/* Forma para mostrar un componente */}
      {location.pathname !== "/" && <NavBar />}
      {/* Forma para mostrar un componente */}
      <Route exact path="/">
        <Landing />
      </Route>
      {/* Otra forma para mostrar un componente pero no se pueden enviar Props*/}
      {/* <Route path="/home" component={Home} /> */}
      <Route path="/home">
        <Home filtered={videoGames} />
      </Route>
      <Route path="/detail/:id" render={() => <Detail />} />
      <Route path="/form" render={() => <Form />} />
    </div>
  );
}

export default App;
