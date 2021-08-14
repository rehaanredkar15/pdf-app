import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';


class App extends Component {
  state = {
    name: '',
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('https://pdf-gen20.herokuapp.com/create-pdf', this.state)
      .then(() => axios.get('https://pdf-gen20.herokuapp.com/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
      
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <br/>
        <button class="btn" onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;