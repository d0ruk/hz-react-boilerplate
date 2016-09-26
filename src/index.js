import React, { Component } from "react";
import { render } from "react-dom";
import { HorizonProvider, HorizonRoute } from "react-hz";
import ChatApp from "./components/chat";
// import { createDevTools } from "horizon-devtools";

import "./main.styl";

const opts = process.env.NODE_ENV === "development"
  ? { host: "localhost:7001" }
  : {}

const hrz = window.Horizon(opts);
// let DevTools = createDevTools(hrz);

const App = () => (
  <HorizonProvider instance={hrz}>
  <HorizonRoute
    renderSuccess={() => (
      <div>
        <ChatApp />
      </div>
    )}
    renderConnecting={() => <h1 style={{background:"black", color:"white", padding: "2px"}}>connecting</h1>}
    renderDisconnected={() => <h1 style={{background:"red", color:"white", padding: "2px"}}>offline</h1>}
    renderConnected={() => <h1 style={{background:"red", color:"white", padding: "2px"}}>connected</h1>}
    renderFailure={(error) => <h1>error</h1>}
      />
  </HorizonProvider>
);

hrz.onSocketError(e => console.log("%cSocket error", "background:red; color:white; padding: 2px"));
hrz.onReady(() => console.log("%cReady", "background:green; color:white; padding: 2px"));
hrz.onDisconnected(() => hrz.onReady(() => console.log("%cInstance disconnected", "background:red; color:white; padding: 2px")))

render(<App />, document.getElementById("app1"));
render(<App />, document.getElementById("app2"));

if (module.hot) {
  module.hot.accept();
}
