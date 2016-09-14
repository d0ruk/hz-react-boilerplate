import React, { PropTypes, Component } from "react";
import verge from "verge";

import { connect } from "react-hz";
import ChatList from "./list";
import ChatInput from "./input";

class ChatApp extends Component {
  static defaultProps = { authorId: '_' + Math.random().toString(36).substr(2, 9) }
  static childContextTypes = { viewport: PropTypes.object }

  constructor(props) {
    super(props);
    this.state = {
      "viewport": {},
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
        }, 66); // rate of 15fps
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  render() {
    const { authorId, messages, sendMessage } = this.props;
    return (
      <div id="app">
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
