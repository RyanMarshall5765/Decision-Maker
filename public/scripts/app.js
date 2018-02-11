'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DecisionMakerApp = function (_React$Component) {
  _inherits(DecisionMakerApp, _React$Component);

  function DecisionMakerApp(props) {
    _classCallCheck(this, DecisionMakerApp);

    var _this = _possibleConstructorReturn(this, (DecisionMakerApp.__proto__ || Object.getPrototypeOf(DecisionMakerApp)).call(this, props));

    _this.pickRandomOption = _this.pickRandomOption.bind(_this);
    _this.removeAllOptions = _this.removeAllOptions.bind(_this);
    _this.removeOption = _this.removeOption.bind(_this);
    _this.addOption = _this.addOption.bind(_this);
    _this.state = {
      options: []
    };
    return _this;
  }

  _createClass(DecisionMakerApp, [{
    key: 'removeAllOptions',
    value: function removeAllOptions() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'removeOption',
    value: function removeOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: 'pickRandomOption',
    value: function pickRandomOption() {
      var randomOption = Math.floor(Math.random() * this.state.options.length);
      var option = this.state.options[randomOption];
      alert(option);
    }
  }, {
    key: 'addOption',
    value: function addOption(option) {
      if (!option) {
        return 'Enter valid value to add option';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option was already provided';
      }
      this.setState(function (prevState) {
        return { options: prevState.options.concat(option) };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var title = 'Decision Maker';
      var subtitle = 'Place Holder';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(DecisionButton, { hasOptions: this.state.options.length > 0, makeDecision: this.pickRandomOption }),
        React.createElement(Options, { options: this.state.options, removeAll: this.removeAllOptions, removeOption: this.removeOption }),
        React.createElement(AddOption, { addOption: this.addOption })
      );
    }
  }]);

  return DecisionMakerApp;
}(React.Component);

// Pushs the user specified option onto the options array


var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.addOption = _this2.addOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'addOption',
    value: function addOption(e) {
      e.preventDefault();

      var option = e.target.elements.option.value.trim();
      var error = this.props.addOption(option);

      this.setState(function () {
        return { error: error };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.addOption },
          React.createElement('input', { type: 'text', name: 'option' }),
          React.createElement(
            'button',
            null,
            'Add Option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

// Displays the Title and Subtitle


var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

// Generates the decision for the user
var DecisionButton = function DecisionButton(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.makeDecision, disabled: !props.hasOptions },
      'What should I do?'
    )
  );
};

// Displays the Options Array
var Option = function Option(props) {
  return React.createElement(
    'div',
    null,
    props.optionList,
    React.createElement(
      'button',
      { onClick: function onClick(e) {
          props.removeOption(props.optionList);
        } },
      'Remove'
    )
  );
};

// Populates and Clears the Options Arry
var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.removeAll },
      'Remove All'
    ),
    props.options.map(function (option) {
      return React.createElement(Option, { key: option, optionList: option, removeOption: props.removeOption });
    })
  );
};

ReactDOM.render(React.createElement(DecisionMakerApp, null), document.getElementById('app'));
