var my_news = [
  {
    author: 'Sasha Pechkin',
    text: 'In thursday four number...'
  },
  {
    author: 'Prosto Vasya',
    text: 'I think that dollar should cost 35 rubles!'
  },
  {
    author: 'Guest',
    text: 'Free. Download. The best site - http://localhost:3000'
  }
];

var Article = React.createClass({
  render: function () {
    var { author, text } = this.props.data;

    return (
      <div className="article">
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
      </div>
    )
  }
});

var News = React.createClass({
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
      <div className="news">
        {newsTemplate}
        <strong className={'news__count ' + (newsCount > 0 ? '' : 'none')}>News count: {newsCount}</strong>
      </div>
    )
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div className="app">
        <h3>News</h3>
        <News data={my_news}/>
      </div>
    )
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

