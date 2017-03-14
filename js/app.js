var Header = React.createClass({
    render: function () {
        return (
            <h1 className="title">{this.props.text}</h1>
        );
    }
});

var SearchBar = React.createClass({
    getInitialState: function() {
        return {searchKey: ""};
    },
    searchHandler: function(event) {
        var searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.searchHandler(searchKey);
    },
    render: function () {
        return (
            <input type="search" value={this.state.symbol} onChange={this.searchHandler}/>
        );
    }
});

var GameListItem = React.createClass({
    render: function () {
        return (
            <li>
                <a href={"#games/" + this.props.game.id}>
                    {this.props.game.firstName} {this.props.game.lastName}
                </a>
            </li>
        );
    }
});

var GameList = React.createClass({
    render: function () {
        var items = this.props.games.map(function (game) {
            return (
                <GameListItem key={game.id} game={game} />
            );
        });
        return (
            <ul>
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    getInitialState: function() {
        return {games: []}
    },
    searchHandler:function(key) {
        this.props.service.findByName(key).done(function(result) {
            this.setState({searchKey: key, games: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header text="Gamification"/>
                <SearchBar searchHandler={this.searchHandler}/>
                <GameList games={this.state.games}/>
            </div>
        );
    }
});

React.render(
    <HomePage service={gameService}/>,
    document.body
);