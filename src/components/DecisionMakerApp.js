import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './AddOption';
import Header from './Header';
import Option from './Option';
import DecisionButton from './DecisionButton';
import Options from './Options';

class DecisionMakerApp extends React.Component {
    constructor(props) {
      super(props);
      this.pickRandomOption = this.pickRandomOption.bind(this);
      this.removeAllOptions = this.removeAllOptions.bind(this);
      this.removeOption = this.removeOption.bind(this);
      this.addOption = this.addOption.bind(this);
      this.state = {
        options: []
      };
    }
    componentDidMount(){
      try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
  
        if (options){
          this.setState(()=>({ options }));
        }
      } catch(e){
        
      }
    }
    componentDidUpdate(prevProps,prevState){
      if(prevState.options.length !== this.state.options.length){
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  
    removeAllOptions() {
      this.setState(() => ({options: []}));
    }
    removeOption(optionToRemove) {
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => optionToRemove !== option)
      }));
    }
    pickRandomOption() {
      const randomOption = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomOption];
      alert(option);
    }
    addOption(option) {
      if (!option) {
        return 'Enter valid value to add option';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option was already provided';
      }
      this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }
    render() {
      const title = 'Decision Maker'
      const subtitle = 'Place Holder'
  
      return (<div>
        <Header title={title} subtitle={subtitle}/>
        <DecisionButton hasOptions={this.state.options.length > 0} makeDecision={this.pickRandomOption}/>
        <Options options={this.state.options} removeAll={this.removeAllOptions} removeOption = {this.removeOption}/>
        <AddOption addOption={this.addOption}/>
      </div>);
    }
  }

  export default DecisionMakerApp;