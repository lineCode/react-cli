// @flow strict

import * as React from "react";
import ReactCLI, { Section } from "../index";

class TestComponent extends React.Component<{}, { count: number }> {
  state = {
    count: 0
  };
  render() {
    return <Section>Counter: {this.state.count}</Section>;
  }
}

const componentReference = React.createRef();
let updateCount = 0;
test("components should be able to use local state to manage updates", done => {
  ReactCLI(
    <TestComponent ref={componentReference} />,
    () => {
      if (componentReference.current) {
        componentReference.current.setState({ count: 1 });
      }
    },
    50,
    outputString => {
      updateCount++;
      // this should get called twice
      expect(outputString).toMatchSnapshot();
      if (updateCount === 2) {
        done();
      }
    },
    "+"
  );
});
