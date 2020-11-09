class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: [
                {id: 1, activity: 'Cuci motor'},
                // {id: 2, activity: 'Cuci piring'},
                
            ],
            currentId: 0,
            inputValue: '',
            delButtonOnClick: false,
            showClickMeButton: false,
        }
        this.handleInput = this.handleInput.bind(this)
        this.inputKeyup = this.inputKeyup(this)
    }

    componentDidMount() {
        this.setState({
            showClickMeButton: true,
            currentId: this.state.todo[this.state.todo.length-1].id
        })
    }

    componentDidUpdate() {
        console.log('component did update')
    }

    handleInput(e) {
        let inputanValue = e.target.value
        this.setState({inputValue: inputanValue})
    }

    inputKeyup(e){
        if (e.key === 'ENTER') {
                e.preventDefault();
                document.getElementById("btn-add").click();
        }
    }

    handleButtonClicked() {
        let currentInput = this.state.inputValue
        let currentId = this.state.currentId

        // console.log('inputVal stlh button di klik: ' + currentInput)
        this.state.todo.push({id: (currentId+1), activity: currentInput})
        this.setState({
            todo: this.state.todo,
            currentId: this.state.currentId+1,
            inputValue: ''
        })
        console.log('button di klik')
        document.getElementsByTagName('input').value=''
    }

    delButtonOnClick() {
        this.setState({showClickMeButton: !this.state.showClickMeButton})
        
        var button = document.getElementById('btn-click-here')
        button.parentNode.removeChild(button)

        var title = document.getElementById('title')
        title.style.marginTop = '50px'
        title.style.transition = 'margin-top ' + 1 + 's ease-out'
        this.setState({isButtonClicked: true})
        // console.log(this.state.isButtonClicked)
    }

    render() {
        this.state.isButtonClicked
        let todo = ''
        let todoList = ''
        if(this.state.todo) {
            todo = <td><TodoItem value={this.state.todo} /></td>
            todoList = <ListTodo todos={this.state.todo}/>
        }

        let todoForm = (
            <form>
                    <input type="text" name="todo" className="input-text" onChange={this.handleInput} onKeyPress={this.inputKeyup}></input>
                    <button id="btn-add" type="button" className="btn-add" onClick={() => this.handleButtonClicked()}>add</button>
                    <table id="list-todo">
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Activity</th>
                        </tr>
                        </thead>
                        {todoList}
                    </table>
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
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.value}</td>
        </tr>
    );
}

function ListTodo(props) {
    const todos = props.todos;
    const listTodos = todos.map((todo) => 
        <TodoItem key={todo.id}
                  id={todo.id}
                  value={todo.activity} />
    );
    return <tbody>{listTodos}</tbody>;
}

ReactDOM.render(<App />, document.getElementById('root'));
