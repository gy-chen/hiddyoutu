import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ApiKeyProvidedRoute from './component/ApiKeyProvidedRoute';
import ApiKeyInput from './container/ApiKeyInput';
import YoutubeApp from './YoutubeApp';



/**
 * App
 *
 * - Add routing, if user is not entered
 */
class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={ApiKeyInput} />
                    <Route path="/player" component={() => <Link to="/">Input ApiKey</Link>} />
                    <ApiKeyProvidedRoute path="/player" component={YoutubeApp} />
                </div>
            </Router>
        );
    }
}

export default App;
