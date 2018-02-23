 import React from 'react';
 
 // Displays the Options Array
 const Option = (props) => {
    return (<div>
      {props.optionList}
      <button onClick = {(e)=>{
        props.removeOption(props.optionList);
      }}>Remove</button>
    </div>);
  };

  export default Option;