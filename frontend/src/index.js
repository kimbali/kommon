import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { MarathonProvider } from './context/marathonContext';
import { ProgressProvider } from './context/progressContext';
import { UserProvider } from './context/userContext';
import { DateProvider } from './context/dateContext';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import store from './store';
import './traducciones/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <DateProvider>
          <UserProvider>
            <MarathonProvider>
              <ProgressProvider>
                <App />
              </ProgressProvider>
            </MarathonProvider>
          </UserProvider>
        </DateProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
