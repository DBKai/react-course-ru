var Comments = React.createClass({
  render: function () {
    return (
      <div className="comments">
        Not have news - is nothing to comment.
      </div>
    )
  }
});

var News = React.createClass({
  render: function() {
    return (
      <div className="news">
        Sorry, not have news.
      </div>
    )
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        Hi all, i am App component! I know how show news.
        <News/>
        <Comments/>
      </div>
    )
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);