import { BrowserRouter, Switch ,Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Home from './home';
import MySession from './mysession';
import ParticularSession from './particularsession';
import ProtectedRoute from './protectedRoute';
import SessionEditor from './sessionEditor';
import NotFound from './notfound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route  path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/my-sessions" component={MySession} />
        <ProtectedRoute path="/sessions/:id" component={ParticularSession} />
        <ProtectedRoute path="/session-editor" component={SessionEditor} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;