import React from 'react';
import './App.css';
import Item from './Item.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      error: [],
      errorid: '',
      errortimestamp: '',
      errorCode: '',
      key: '',
      mainkey: '',
      valuefirst: '',
      valuesecond: '',
      newItems:[] 
    

    };
       this.handleDelete = this.handleDelete.bind(this);
       this.update = this.update.bind(this);
       this.Showall = this.Showall.bind(this);
       this.deleteAll = this.deleteAll.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.handleChangeErrorsWarning = this.handleChangeErrorsWarning.bind(this);

  }

  Showall() {
   // var that = this;
    var url = 'https://api.myjson.com/bins/j7v8v'

    fetch(url).then((response)=> {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();

    })
      .then((data)=> {
        this.setState({error: data.errorsHistory});
       // console.log(data.errorsHistory);
      });
  }
  deleteAll() {
    this.setState({error: []})
    var newItems=[];
    this.update(newItems);
  }

  handleDelete(ItemToBeDeleted) {
    var newItems = this
      .state
      .error 
      .filter((_err) => {
        return _err.errorCode !== ItemToBeDeleted
        
      });
      
    this.setState({error: newItems})
    this.update(newItems);
  }

   update(newItems) {
    var toRemove = {errorsHistory : newItems};
    
    fetch('https://api.myjson.com/bins/j7v8v', {
    method: 'put',
    body: JSON.stringify(toRemove),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
 }

  handleChange(event) {
    this.setState({valuefirst: event.target.value});
  }
  handleChangeErrorsWarning(event) {
    this.setState({valuesecond: event.target.value});
  }
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <button className="closemodal" onClick={this.props.closePopup}>Close popup</button>
          <button type="button" className="delete_all" onClick={this.deleteAll}>Clear all errors &times;</button>

          <h1>{this.props.text}</h1>

          <select className="allwidth" onChange={this.handleChange}>
            <option value="">Select</option>
            <option value="error-logs">Errors Log</option>
          </select>
          <select
            className="multiple form-control"
            onChange={this.handleChangeErrorsWarning}
            multiple="multiple">

            <option value="errors">Errors</option>
            <option value="warning">Warnings</option>
          </select>
          <button onClick={this.Showall}>Show</button>

          <div className="card-deck row">
            {(this.state.error && this.state.valuefirst)
              ? this.state.error.map((erro, i) => <Item
                handleDelete={this.handleDelete}
                key={i}
                errorid={erro.deviceId}
                errortimestamp={erro
                .timestamp
                .replace("T", " ")}
                errorCode={erro.errorMessage}
                mainkey={erro.errorCode}></Item>)
              : <div className="empty_erro">No values</div>}
          </div> 
        </div>
      </div>
    );
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div className='app'>
       <button
          className='btn_main'
          onClick={this
          .togglePopup
          .bind(this)}>show popup</button>
        {this.state.showPopup
          ? <Popup
              text='Hello'
              closePopup={this
              .togglePopup
              .bind(this)}
              showError={this.eroor}
              changeData={this.newItems}/>
          : null
}
      </div>
    );
  }
};

export default App;
