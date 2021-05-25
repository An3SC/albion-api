import { Route, Switch } from 'react-router';
import Event from './components/Event';
import Events from './components/Events';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Player from './components/Player';

function App() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/player" exact>
                    <Player />
                </Route>
                <Route path="/events" exact>
                    <Events />
                </Route>
                <Route path="/event/:id" exact>
                    <Event />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
