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

// Pushs the user specified option onto the options array
class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  addOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.addOption(option);

    this.setState(() => ({error}));

  }
  render() {
    return (<div>
      {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.addOption}>
        <input type="text" name="option"/>
        <button>Add Option</button>
      </form>
    </div>);
  }
}

// Displays the Title and Subtitle
const Header = (props) => {
  return (<div>
    <h1>{props.title}</h1>
    <h2>{props.subtitle}</h2>
  </div>);
};

// Generates the decision for the user
const DecisionButton = (props) => {
  return (<div>
    <button onClick={props.makeDecision} disabled={!props.hasOptions}>
      What should I do?
    </button>
  </div>);
};

// Displays the Options Array
const Option = (props) => {
  return (<div>
    {props.optionList}
    <button onClick = {(e)=>{
      props.removeOption(props.optionList);
    }}>Remove</button>
  </div>);
};

// Populates and Clears the Options Arry
const Options = (props) => {
  return (<div>
    <button onClick={props.removeAll}>Remove All</button>
    {props.options.map((option) => (<Option key={option} optionList={option} removeOption={props.removeOption}/>))}

  </div>);
};

ReactDOM.render(<DecisionMakerApp/>, document.getElementById('app'));
