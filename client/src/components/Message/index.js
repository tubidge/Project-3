import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class Message extends Component {
  state = {
    show: true
  };
  render() {
    const handleDismiss = () => this.setState({ show: false });
    if (this.state.show) {
      return (
        <Alert variant="danger" onClose={handleDismiss} dismissible="true">
          <p>{this.props.msg}</p>
        </Alert>
      );
    }
  }
}

export default Message;
