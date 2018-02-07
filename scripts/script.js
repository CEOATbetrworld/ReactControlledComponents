function PostButton(props) {
    var style = {
        width: 24,
        height: 24
    };

    return (
        <button style={style} onClick={() => props.handleClick()}>
      {props.label}
    </button>
    );
}

function PostText(props) {
    var style = {
        border: "1px solid black",
        width: props.width
    };

    return <div style={style}>{props.text}</div>;
}

function Post(props) {
    var style = {
        display: "flex"
    };
    return (
        <div style={style}>
      <PostButton label="x" handleClick={() => props.removeIt()} />
      <PostText text={props.title} width="200" />
      <PostButton label="-" handleClick={() => props.decrementScore()} />
      <PostText text={props.score} width="20" />
      <PostButton label="+" handleClick={() => props.incrementScore()} />
    </div>
    );
}

function PostList(props) {
    var list = props.postList.map((item, index) => {
        if (item.title.length > 0) {
            console.log(typeof item.title);

            return (
                <Post
          title={
            item.title[0].toUpperCase() + item.title.slice(1, item.title.length)
          }
          key={index}
          score={item.score}
          incrementScore={() => props.updateScore(index, 1)}
          decrementScore={() => props.updateScore(index, -1)}
          removeIt={() => props.remove()}
        />
            );
        }
    });
    return <ol>{list}</ol>;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Enter post title",
            items: []
        };
    }

    onChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    addItem() {
        var itemsCopy = this.state.items.slice();
        var truncatedString = this.state.value.substring(0, 20);
        itemsCopy.push({
            title: truncatedString,
            score: 0
        });
        itemsCopy.sort((a, b) => {
            return b.score - a.score;
        });
        this.setState({
            items: itemsCopy,
            value: ""
        });
    }

    updateScore(index, val) {
        var itemsCopy = this.state.items.slice();
        itemsCopy[index].score += val;
        itemsCopy.sort((a, b) => {
            return b.score - a.score;
        });
        this.setState({
            items: itemsCopy
        });
    }

    removeItem(index) {
        var itemsCopy = this.state.items.slice();
        itemsCopy.splice(index, 1);
        itemsCopy.sort((a, b) => {
            return b.score - a.score;
        });

        this.setState({
            items: itemsCopy
        });
    }

    keyHandler(event) {
        if (event.key == "Enter") {
            this.addItem();
        }
    }

    render() {
        return (
            <div>
        <input
          value={this.state.value}
          onChange={this.onChange.bind(this)  }
          onKeyPress={this.keyHandler.bind(this)}
        />
        <button onClick={() => this.addItem()}>Submit</button>
        <PostList
          postList={this.state.items}
          updateScore={this.updateScore.bind(this)}
          remove={this.removeItem.bind(this)}
        />
      </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));