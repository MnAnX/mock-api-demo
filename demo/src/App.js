import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: '',
      mockResponse: '',
      error: '',
      mockUrl: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({
      error: '',
      mockUrl: '',
    })

    const request = {
			path: this.state.path,
			mockResponse: this.state.mockResponse,
		};

    let formData = new FormData();
  	formData.append('req', JSON.stringify(request));
  	let options = {
  		headers: {},
  		method: 'post',
      body: formData
  	};

    console.log("does console log work?")

		fetch('http://ec2-18-207-120-62.compute-1.amazonaws.com:8080/mock', options)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("get response: ", responseJson)
        let ret =  _.get(responseJson, 'response');
        console.log("ret: ", ret)
        this.setState({
          error: ret.error,
          mockUrl: ret.url,
        })
      })
      .catch((error) => {
        console.error("Error sending mock request to the server: " + error);
        this.setState({
          error: "Error connecting to server",
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Mock API</h1>
        </header>
        <br /><br />
        <label>
          Mock Path (e.g. test-mock-path):
          <input type="text" value={this.state.path} onChange={(event)=>{this.setState({path: event.target.value})}} />
        </label>
        <br /><br />
        <label>
          Mock Response:
          <textarea value={this.state.mockResponse} onChange={(event)=>{this.setState({mockResponse: event.target.value})}} />
        </label>
        <br /><br />
        <button onClick={this.handleSubmit}>Mock</button>
        <br /><br />
        <div>
          {!_.isEmpty(this.state.error) && <p>Error: {this.state.error}</p>}
          {!_.isEmpty(this.state.mockUrl) && <p>Your mock url is: <a href={this.state.mockUrl}>{this.state.mockUrl}</a></p>}
        </div>
      </div>
    );
  }
}

export default App;
