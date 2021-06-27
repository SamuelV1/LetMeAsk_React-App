
// import do react
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// paginas
import { Home } from "./pages/Home";
import { NewRoom } from './pages/NewRoom'

// import autenticador
import { AuthContextProvider } from './context/Authcontext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/Adminroom';



function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>

  )
}


export default App;
