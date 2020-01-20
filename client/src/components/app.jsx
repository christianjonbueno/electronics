import React from 'react';
import Item from './item.jsx';
import Axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      electronicsList: [],
      form: {
        start: true,
        step1: false,
        step2: false,
        end: false
      },
      name: '',
      description: '',
      color: '',
      price: '',
      pictureURL: ''
    }
    this.getElectronics = this.getElectronics.bind(this);
    this.startToStep1 = this.startToStep1.bind(this);
    this.step1ToStep2 = this.step1ToStep2.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onSubmitStep1 = this.onSubmitStep1.bind(this);
    this.onSubmitStep2 = this.onSubmitStep2.bind(this);
    this.onSubmitItem = this.onSubmitItem.bind(this);
    this.endToStart = this.endToStart.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.sendToPut = this.sendToPut.bind(this);
  }

  componentDidMount(){
    this.getElectronics();
  }

  getElectronics(){
    Axios.get('/products')
      .then((list) => {
        this.setState({
          electronicsList: list.data
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  onChangeForm(e){
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  onSubmitItem(e){
    e.preventDefault()
    let item = {
      name: this.state.name,
      description: this.state.description,
      color: this.state.color,
      price: this.state.price,
      pictureURL: this.state.pictureURL
    }
    Axios.post('/products', item)
      .then(()=> {
        this.getElectronics()
        document.getElementById('form').reset()
        this.endToStart()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  deleteItem(_id){
    Axios.delete(`/products/${_id}`)
      .then(() => {
        this.getElectronics()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  sendToPut(item){
    console.log(`Got item`, item)
    Axios.put(`/products/${item._id}`, item)
      .then(() => {
        this.getElectronics()
      })
      .catch((err) => {
        console.error(err)
      })
  }
  startToStep1(){
    this.setState({
      form: {
        start: false,
        step1: true
      }
    })
  }

  step1ToStep2(){
    this.setState({
      form: {
        step1: false,
        step2: true
      }
    })
  }

  step2ToEnd(){
    this.setState({
      form: {
        step2: false,
        end: true
      }
    })
  }

  endToStart(){
    this.setState({
      form: {
        end: false,
        start: true
      }
    })
  }

  onSubmitStep1(e){
    e.preventDefault()
    this.step1ToStep2()
  }

  onSubmitStep2(e){
    e.preventDefault()
    this.step2ToEnd()
  }

  render() {
    return(
      <div className="container">
        <h1 className="display-5">Electronics Inventory:</h1>
        <br />

        {this.state.form.start ? (
          <Start startToStep1={this.startToStep1} />
        ): (null)}

        {this.state.form.step1 ? (
          <Step1 onChangeForm={this.onChangeForm} onSubmitStep1={this.onSubmitStep1} />
        ): (null)}

        {this.state.form.step2 ? (
          <Step2 onChangeForm={this.onChangeForm} onSubmitStep2={this.onSubmitStep2} />
        ): (null)}

        {this.state.form.end ? (
          <End onChangeForm={this.onChangeForm} onSubmitItem={this.onSubmitItem} />
        ): (null)}

          {this.state.electronicsList.map((item) => {
            return <Item
            item={item}
            deleteItem={this.deleteItem}
            sendToPut={this.sendToPut}
            />
          })}
      </div>
    )
  }

}

let Start = (props) => (
    <button type="button" className="btn btn-primary" onClick={props.startToStep1}>Add Item</button>
)

let Step1 = (props) => {
  return (
    <form id="form" className="row" onSubmit={props.onSubmitStep1}>
      <div className="col-6">
        <textarea required className="form-control" placeholder="Item Description" onChange={props.onChangeForm} name="description"></textarea>
      </div>
      <div className="col-4">
        <input required className="form-control" type="text" name="name" placeholder="Item name" onChange={props.onChangeForm}></input>
      </div>
      <div className="col-2">
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  )
}

let Step2 = (props) => {
  return (
    <form id="form" className="row" onSubmit={props.onSubmitStep2}>
      <div className="col-6">
      <input required className="form-control" type="text" name="color" placeholder="Color" onChange={props.onChangeForm}></input>
      </div>
      <div className="col-4">
        <input required className="form-control" type="number" step=".01" name="price" placeholder="Item Price" onChange={props.onChangeForm}></input>
      </div>
      <div className="col-2">
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  )
}

let End = (props) => {
  return(
    <form id="form" className="row" onSubmit={props.onSubmitItem}>
      <div className="col-8">
        <input type="text" className="form-control" name="pictureURL" placeholder="Image URL" onChange={props.onChangeForm}></input>
      </div>
      <div className="col-4">
        <button type="submit" className="btn btn-success">Add To Inventory</button>
      </div>
    </form>
  )
}