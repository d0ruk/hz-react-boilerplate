console.log("%cLoaded", "background:blue; color:white; padding: 2px");
import React, { Component } from "react";
import { render } from "react-dom";
import { HorizonProvider, HorizonRoute } from "react-hz";
import ChatApp from "./components/chat";
// import { createDevTools } from "horizon-devtools";

require("./main.css");

const hrz = window.Horizon();
// let DevTools = createDevTools(hrz);

const App = () => (
  <HorizonProvider instance={hrz}>
  <HorizonRoute
    renderSuccess={() => (
      <div>
        <ChatApp />
      </div>
    )}
    renderConnecting={() => <h1 style={{background:"black", color:"white", padding: "2px"}}>[BUNDLE] connecting..</h1>}
    renderDisconnected={() => <h1 style={{background:"red", color:"white", padding: "2px"}}>You are offline</h1>}
    renderConnected={() => <h1 style={{background:"red", color:"white", padding: "2px"}}>[BUNDLE] connected</h1>}
    renderFailure={(error) => <h1>[BUNDLE] error</h1>}
      />
  </HorizonProvider>
);

hrz.onSocketError(e => console.log("error", e))
hrz.onReady(() => console.log("%c[BUNDLE] onReady", "background:green; color:white; padding: 2px"))
hrz.onDisconnected(() => hrz.onReady(() => console.log("%c[BUNDLE] onDisconnected", "background:red; color:white; padding: 2px")))

render(<App />, document.getElementById("app1"));
render(<App />, document.getElementById("app2"));

if (module.hot) {
  module.hot.accept();
}
