import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Amplify from "aws-amplify";
import App from './App';
import config from "./config";
import * as serviceWorker from './serviceWorker';

// plugins styles from node_modules

// plugins styles downloaded
import "./assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "./assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "./assets/vendor/select2/dist/css/select2.min.css";
import "./assets/vendor/quill/dist/quill.core.css";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-pro-react.scss";

Amplify.configure({
    Auth: {
      mandatorySignId: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
  });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
