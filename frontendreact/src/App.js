import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// Bootstrap Resources
import { Col, Row, Form } from 'react-bootstrap'

const containerFluidFull = {
  margin: '0 auto',
  width: '100%',
  minHeight: '100%',
};

const todoBoxStyle = {
  backgroundColor: '#efefef',
  marginBottom: '20px',
  border: '1px solid #8B8C8F',
  padding: '3px'
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      todos: []
    };
  }

  url = 'http://localhost:4000/todo/';

  async componentDidMount () {
    axios.get(this.url)
      .then(response => {
          this.setState({ todos: [...response.data.results]})
      })
  }

  handleTitleChange = event => {
    event.preventDefault();
    this.setState({ title: event.target.value })
  };

  handleDescriptionChange = event => {
    event.preventDefault();
    this.setState({ description: event.target.value })
  };

  handleSubmit = event => {
    event.preventDefault();

    // create request body
    let body = {
        title: this.state.title,
        description: this.state.description
    };

    axios.post(this.url, body)
      .then(response => {
        const id = response.data['id'];
        const title = response.data['title'];
        const description = response.data['description'];
        const completed = response.data['completed'];

        this.setState({
          todos: [
            ...this.state.todos,
            {
              id,
              title,
              description,
              completed
            }
          ]
        });
    })
  };

  renderTodoList = () => (
      <div style={{ textAlign: 'center' }}>
          <h1>Todo List</h1>
          {
            this.state.todos.map(todo => (
                this.renderTodoItem(todo)
          ))}
      </div>
  );

  renderTodoItem = (todo) => (
      <Row>
          <Col md={6} className="offset-md-3"  style={todoBoxStyle}>
              <h5><strong>{todo.title}</strong></h5>
              <p>{todo.description}</p>
          </Col>
      </Row>
  );

  render () {
    return (
      <div style={containerFluidFull} >

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />

          <p style={{ textAlign: 'center' }}><strong>Create a New Task</strong></p>
          <hr/>
          <Form onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
              <Row>
                  <Col md={4} className="offset-md-2">
                    <label>
                        <strong>Title:</strong>
                      <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                    </label>
                  </Col>
                <Col md={4}>
                    <label>
                        <strong>Description:</strong>
                      <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </Col>
              </Row>
          </Form>
          {this.renderTodoList()}
      </div>
    );
  }
}

export default App;
