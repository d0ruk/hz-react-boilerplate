import React, { Component } from "react";

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = { text: "" };
  }

  _handleSubmit(event) {

    const { onSave } = this.props;
    const { text } = this.state;

    if (event.keyCode === 13) {

      const value = text.trim();

      if (value) {
        onSave(value);
        this.setState({ text: "" });
      }
    }
  }
  render() {

    const { text } = this.state;

    return (
      <div id="inputContainer">
        <input
          value={text}
          onChange={(event) => this.setState({ text: event.target.value })}
          onKeyDown={::this._handleSubmit}
          autoFocus={true}
          placeholder="input" />
      </div>
    );
  }
}

export default ChatInput;
