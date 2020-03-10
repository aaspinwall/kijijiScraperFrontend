import React, { Component } from "react";
import { SearchInput } from "evergreen-ui";
import { connect } from "react-redux";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }
  render() {
    return (
      <SearchInput
        id='keywords'
        type='text'
        submit={this.state.submit}
        value={this.state.input}
        onChange={e => this.setState({ input: e.target.value })}
        onBlur={e => {
          this.props.userInput(e);
        }}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === "Tab") {
            this.props.userInput(e);
            if (e.key === "Enter") {
              this.props.submit(e);
            }
          }
        }}
      ></SearchInput>
    );
  }
}

// Maps `state` to `props`:
// These will be added as props to the component.
function mapState(state) {
  const { keywords } = state;
  return {
    keywords: keywords,
  };
}

// Maps `dispatch` to `props`:
function mapDispatch(dispatch) {
  return {
    userInput(e) {
      const value = e.target.value;
      const id = e.target.id;
      dispatch({ type: "input", payload: value, id: id });
    },
  };
}

export default connect(mapState, mapDispatch)(Search);
