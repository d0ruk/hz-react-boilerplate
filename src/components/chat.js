import React, { PropTypes, Component } from "react";
import verge from "verge";

import { connect } from "react-hz";
import ChatList from "./list";
import ChatInput from "./input";
import Responsive from "./responsive"

// www.paulirish.com/2009/random-hex-color-code-snippets/
const genRandColor = () => "0123456789abcdef".split("").map((v, i, a) => i > 5 ? null : a[Math.floor(Math.random()*16)]).join("");

class ChatApp extends Component {
  static defaultProps = { authorId: genRandColor() }
  static childContextTypes = { viewport: PropTypes.object }

  constructor(props) {
    super(props);
    this.state = {
      "viewport": null,
    };
    this.resizeTimeout = 0;
  }

  getChildContext() {
    return { viewport: this.state.viewport };
  }

  componentDidMount() {

    const resizeThrottler = () => {
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = null;
          updateViewportDimensions();
        }, 2016);
      }
    }

    const updateViewportDimensions = () => {
      this.setState({
        viewport: {
          w: verge.viewportW(),
          h: verge.viewportH()
        }
      });
    };

    window.addEventListener("resize", resizeThrottler, false);
    resizeThrottler();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    console.log(arguments);
  }

  render() {
    const { authorId, messages, sendMessage } = this.props;
    return (
      <div id="app">
        <Responsive />
        <ChatList messages={messages} />
        <ChatInput onSave={(text) => sendMessage({ t: new Date(), text, authorId })} />
      </div>
    );
  }
}

const ChatAppContainer = connect(ChatApp, {
  subscriptions: {
    messages: (hz) => hz("messages")
      .order("t", "descending")
      .limit(25)
  },
  mutations: {
    sendMessage: (hz) => (message) => hz("messages").store(message)
  }
});

export default ChatAppContainer;
