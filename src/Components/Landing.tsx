import React, { useContext, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import logo from '../logo.svg';
import ToDo from './toDo/toDo'
import './Landing.scss';

const LandingPage = (props: RouteComponentProps): React.ReactElement => {
  document.title = "JStep - Landing Page";


  const landingPageContent = (
    <main className="landing-page">

    <div className="App">
      <header className="App-header">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* <div className="loader">
          <img src={logo} alt="logo" />
        </div> */}
        {/* <div className="page-content">
        <div className="App-logo-wrapper">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
          <p>
            Edit <code>src/Componets/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div> */}


      </header>
      <body className="page-content">
        <ToDo />
      </body>

    </div>

    </main>
  );

  return landingPageContent;
};

export default LandingPage;