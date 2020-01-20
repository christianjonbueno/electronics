import React from 'react';
import EditItem from './editItem.jsx';

class Item extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      _id: this.props._id,
      name: this.props.name,
      description: this.props.description,
      color: this.props.color,
      price: this.props.price,
      pictureURL: this.props.pictureURL,
      editForm: {
        text: true,
        input: false
      }
    }
    this.flipForm = this.flipForm.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);

  }

  flipForm(item) {
    this.setState({
      _id: item._id,
      name: item.name,
      description: item.description,
      color: item.color,
      price: item.price,
      pictureURL: item.pictureURL,
      editForm: {
        text: !this.state.editForm.text,
        input: !this.state.editForm.input
      }
    })
  }

  onChangeForm(e){
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  onUpdateClick(e){
    e.preventDefault()
    let item = {
      _id: this.state._id,
      name: this.state.name,
      description: this.state.description,
      color: this.state.color,
      price: this.state.price,
      pictureURL: this.state.pictureURL
    }
    document.getElementById('updateForm').reset()
    this.setState({
      editForm: {
        text: !this.state.editForm.text,
        input: !this.state.editForm.input
      }
    })
    this.props.sendToPut(item)
  }

  render(){
    return (
      <div className="itemContainer">
        <hr />
        {this.state.editForm.text ? (
          <span>
            <h4 className="productName">{this.props.item.name}</h4>
            <div className="row">
              <span className="col-4">
                <img className="itemImg img-thumbnail" src={this.props.item.pictureURL} />
                <p>Color: {this.props.item.color}</p>
                <p>Price: ${this.props.item.price}</p>
              </span>
              <span className="col-8 description overflow-auto">
                <div>
                  {this.props.item.description}
                </div>
              </span>
            </div>
            <div className="row justify-content-end">
              <div className="col-2">
              <button type="button" className="btn btn-outline-warning" onClick={() => this.flipForm(this.props.item)}>Edit</button>
              </div>
              <div className="col-2">
                <button type="button" className="btn btn-outline-danger" onClick={() => this.props.deleteItem(this.props.item._id)}>Delete</button>
              </div>
            </div>
          </span>
        ): (
          <form onSubmit={this.onUpdateClick} id="updateForm">
            <div className="form-group">
              {/* <input type="hidden" name="_id" value={this.props.item._id}></input> */}
              <input type="text" name="name" className="form-control" defaultValue={this.props.item.name} onChange={this.onChangeForm}></input>
            </div>
            <div className="row">
              <span className="col-4">
                <img className="itemImg img-thumbnail" src={this.props.item.pictureURL} />
                <p>Color: <input type="text" name="color" defaultValue={this.props.item.color} onChange={this.onChangeForm}></input></p>
                <p>Price: $<input type="number" step=".01" defaultValue={this.props.item.price} onChange={this.onChangeForm}></input></p>
                <p>Image URL: <input type="text" name="pictureURL" defaultValue={this.props.item.pictureURL} onChange={this.onChangeForm}></input></p>
              </span>
              <span className="col-8 d-flex justify-content-between">
                <textarea className="form-control" name="description" defaultValue={this.props.item.description} onChange={this.onChangeForm}></textarea>
              </span>
            </div>
            <div className="row justify-content-end">
              <div className="col-2">
                <button type="button" className="btn btn-outline-warning" onClick={() => this.flipForm(this.props.item)}>Cancel</button>
              </div>
              <div className="col-5">
                <button type="submit" className="btn btn-outline-success" >Submit Changes</button>
              </div>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default Item