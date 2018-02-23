  import React from 'react';
  import Option from './Option';

  // Populates and Clears the Options Arry
  const Options = (props) => {
    return (<div>
      <button onClick={props.removeAll}>Remove All</button>
      {props.options.map((option) => (<Option key={option} optionList={option} removeOption={props.removeOption}/>))}
  
    </div>);
  };

  export default Options;