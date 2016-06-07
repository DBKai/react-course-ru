'use strict';

window.ee = new EventEmitter();

var my_news = [
  {
    author: 'Sasha Pechkin',
    text: 'In thursday four number...',
    bigText: 'four and a quarter hours four black devils drew a black ink drawing.'
  },
  {
    author: 'Prosto Vasya',
    text: 'I think that dollar should cost 35 rubles!',
    bigText: 'And euro 42!'
  },
  {
    author: 'Guest',
    text: 'Free. Download. The best site - http://localhost:3000',
    bigText: 'Actually a fee, just need to read the license agreement very long.'
  }
];

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },

  getInitialState: function () {
    return {
      visible: false
    }
  },

  readMoreClick: function (e) {
    e.preventDefault();
    this.setState({
      visible: true
    });
  },

  render: function () {
    var {author, text, bigText} = this.props.data,
      {visible} = this.state;

    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>
        <a href='#'
           onClick={this.readMoreClick}
           className={'news__readmore ' + (visible ? 'none' : '')}>Read more</a>
        <p className={'news__big-text ' + (visible ? '' : 'none')}>{bigText}</p>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    return {
      counter: 0
    }
  },

  render: function () {
    var data = this.props.data;
    var newsCount = data.length;
    var newsTemplate;

    if (newsCount > 0) {
      newsTemplate = data.map(function (item, index) {
        return (
          <div key={index}>
            <Article data={item}/>
          </div>
        )
      })
    } else {
      newsTemplate = <p>Sorry, not have news.</p>
    }

    return (
      <div className='news'>
        {newsTemplate}
        <strong className={'news__count ' + (newsCount > 0 ? '' : 'none')}>News count: {newsCount}</strong>
      </div>
    )
  }
});

var Add = React.createClass({
  getInitialState: function () {
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    }
  },

  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },

  onButtonClickHandler: function (e) {
    e.preventDefault();

    var textEl = ReactDOM.findDOMNode(this.refs.text);
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = textEl.value;

    var item = [{
      author: author,
      text: text,
      bigText: '...'
    }];

    window.ee.emit('News.add', item);

    textEl.value = '';
    this.setState({textIsEmpty: true});
  },

  onCheckRuleClick: function (e) {
    //ReactDOM.findDOMNode(this.refs.alert_button).disabled = !e.target.checked; //version 1 - DOM
    this.setState({agreeNotChecked: !this.state.agreeNotChecked}); // version 2 - state
  },

  onFieldChange: function (fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]: false});
    } else {
      this.setState({[''+fieldName]: true});
    }
  },

  render: function () {
    var {agreeNotChecked, authorIsEmpty, textIsEmpty} = this.state;

    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          placeholder='your name'
          ref='author'/>
        <textarea
          className='add__text'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          placeholder='news text'
          ref='text'/>
        <label
          className='add__checkrule'>
          <input
            type='checkbox'
            defaultChecked={false}
            ref='checkrule'
            onChange={this.onCheckRuleClick}/>I agree
        </label>
        <button
          className='add__button'
          onClick={this.onButtonClickHandler}
          ref='alert_button'
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>Add news
        </button>
      </form>
    )
  }
});

var App = React.createClass({
  getInitialState: function () {
    return {
      news: my_news
    };
  },

  componentDidMount: function () {
    /*Listen event "news create"
    * if event proizoshlo, update this.state.news*/
var self = this;
    window.ee.addListener('News.add', function (item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news: nextNews});
    });
  },

  componentWillUnmount: function () {
    /*Bolshe not listen event "news create"*/
    window.ee.removeListener('News.add');
  },

  render: function () {
    console.log('render');
    return (
      <div className='app'>
        <Add />
        <h3>News</h3>
        <News data={this.state.news}/>
      </div>
    )
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

