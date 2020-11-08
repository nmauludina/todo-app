class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: ['Cuci baju', 'Tugas PBO', 'UAS semester ganjil'],
            inputValue: '',
            delButtonOnClick: false,
            showClickMeButton: false,
        }
        this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount() {
        this.setState({showClickMeButton: true})
    }

    componentDidUpdate() {
        console.log('component did update')
    }

    handleInput(e) {
        let inputanValue = e.target.value
        this.setState({inputValue: inputanValue})
    }

    handleButtonClicked() {
        let currentInput = this.state.inputValue
        // console.log('inputVal stlh button di klik: ' + currentInput)
        this.state.todo.push(currentInput)
        console.log('nilai todo dalam ButtonClicked sekarang adalah ' + this.state.todo)
        this.setState({
            todo : this.state.todo,
            inputValue : ''
            })
        console.log('button di klik')

    }

    delButtonOnClick() {
        this.setState({showClickMeButton: !this.state.showClickMeButton})
        
        var button = document.getElementById('btn-click-here')
        button.parentNode.removeChild(button)

        var title = document.getElementById('title')
        title.style.marginTop = '50px'
        title.style.transition = 'margin-top ' + 1 + 's ease-out'
        this.setState({isButtonClicked: true})
        console.log(this.state.isButtonClicked)
    }

    render() {
        this.state.isButtonClicked
        let todo = ''
        if(this.state.todo) {
            todo = <li><TodoItem value={this.state.todo} /></li>
        }

        let todoForm = (
            <form>
                    <input type="text" name="todo" className="input-text" onChange={this.handleInput}></input>
                    <button type="button" className="btn-add" onClick={() => this.handleButtonClicked()}>add</button>
                    <div id="list-todo"><ListTodo todos={this.state.todo}/></div>
            </form>
        )

        return (
            <div>
                <h1 id="title" className="title">List The Thing <br /> You Want To Do Below</h1>
                <button id="btn-click-here" className="btn-here" onClick={() => this.delButtonOnClick()}>Click Here</button>
                {this.state.showClickMeButton ? (<div></div>) : todoForm}
            </div>
            
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
