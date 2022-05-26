import AllUsers from "./Component/AllUsers";
import AddUser from "./Component/AddUser";
import EditUser from "./Component/EditUser";
import NavBar from "./Component/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={AllUsers} />
        <Route path="/add" component={AddUser} />
        <Route path="/edit/:id" component={EditUser} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
