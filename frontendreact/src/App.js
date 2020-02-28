import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// Bootstrap Resources
import { Col, Row, Form, Button } from 'react-bootstrap'

const containerFluidFull = {
  margin: '0 auto',
  width: '100%',
  minHeight: '100%',
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      imgurl: '',
      title: '',
    };
  }

  async componentDidMount () {
    let url = 'http://localhost:4000/todo/';

    // Axios API call.
    axios.get(url)
      .then(response => {
          console.log(response);
      })
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ value: event.target.value })
  };

  handleSubmit = event => {
    event.preventDefault();
    // call api with dynamic isbn and put it into our url
    // const isbn = this.state.value;
    let url = 'http://localhost:4000/todo/"';

    // Axios API call.
    axios.get(url)
      .then(response => {
        // const bookkey = 'ISBN:' + this.state.value;
        // let title = response.data[bookkey].info_url;
        // let imgurl = response.data[bookkey].thumbnail_url;
        // let temp = title.split('/');
        // title = temp[temp.length - 1];
        // this.setState({
        //   title,
        //   imgurl
        // });
        console.log(response);
    })
  };

  renderTodoList = () => (
      <div style={{ textAlign: 'center' }}>
          <h1>Todo List</h1>
          {this.renderTodoItem()}
      </div>
  );

  renderTodoItem = () => (
      <Row>
          <Col md={6} className="offset-md-3" style={{ backgroundColor: '#efefef' }}>
            <p>TODO ITEM HERE</p>
          </Col>
      </Row>
  );

  render () {
    return (
      <div className="containerFluidFull">

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />

          <p style={{ textAlign: 'center' }}>Create a New Task</p>

          <Form onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </Form>
          {this.renderTodoList()}
      </div>
    );
  }
}

export default App;
