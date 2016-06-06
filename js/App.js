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

var TestInput = React.createClass({
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs.myTestInput).focus();
  },

  onButtonClickHandler: function () {
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  },

  render: function () {
    return (
      <div>
        <input className='test-input'
               defaultValue=''
               placeholder='enter value'
               ref='myTestInput'/>
        <button onClick={this.onButtonClickHandler}>Send</button>
      </div>
    )
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div className='app'>
        <h3>News</h3>
        <TestInput />
        <News data={my_news}/>
      </div>
    )
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

