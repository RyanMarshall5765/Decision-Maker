  import React from 'react';
// Generates the decision for the user
  const DecisionButton = (props) => {
    return (<div>
      <button onClick={props.makeDecision} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>);
  };

  export default DecisionButton;