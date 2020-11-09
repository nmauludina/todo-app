class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: ['a',2,'Nabilla'],
            inputValue: '',
            isButtonClicked: false
        }
        this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount() {
        // console.log('nilai isbuttonclicked didMount adalah ' + this.state.isButtonClicked)
        this.setState({isButtonClicked: true})
        // this.handleButtonClicked = this.handleButtonClicked(this)

    }

    componentDidUpdate() {
        console.log('component did update')
        // console.log('inputValue setelah update: '+this.state.inputValue)
        // console.log('nilai isbuttonclicked didUpdate adalah ' + this.state.isButtonClicked)
        
    }

    handleInput(e) {
        let inputanValue = e.target.value
        this.setState({inputValue: inputanValue})
    }

    handleButtonClicked() {
        let currentInput = this.state.inputValue
        
        this.state.todo.push(currentInput)
        this.setState(prevState => ({
          todo : this.state.todo,
          inputValue : ''
        }))
      
      
        console.log('inputVal stlh button di klik: ' + currentInput)
        // this.setState({todo: this.state.todo.push(currentInput)})
        // console.log('console log dari handleButton menghasilkan data: [' + this.state.todo + ']')
        console.log('button di klik')
        // console.log('nilai isbuttonclicked dalam ButtonClicked adalah ' + this.state.isButtonClicked)
    }

    render() {
        this.state.isButtonClicked
        let todo = ''
        if(this.state.todo) {
            todo = <li><TodoItem value={this.state.todo} /></li>
        }
        return (
            <form >
                <div id="list-todo"><ListTodo todos={this.state.todo} /></div>
                <input type="text" name="todo" onChange={this.handleInput} value={this.state.inputValue}></input>
                {/* <input type="submit" value="Tambah"></input> */}
                <button type="button" onClick={() => this.handleButtonClicked()}>add</button>
            </form>
        );
    }
}

function TodoItem(props) {
    return <li>{props.value}</li>;
}

function ListTodo(props) {
    const todos = props.todos;
    const listTodos = todos.map((todo) => 
        <TodoItem key={todo.toString()}
                  value={todo} />
    );
    return <ul>{listTodos}</ul>;
}

ReactDOM.render(<App />, document.getElementById('root'));
