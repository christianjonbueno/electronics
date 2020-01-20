import React from 'react';

let EditItem = (props) => {
  return (
    <form onSubmit={this.props.onUpdateClick} id="updateForm">
      <div className="form-group">
        <input type="hidden" name="_id" value={this.props.item._id}></input>
        <input type="text" name="name" className="form-control" defaultValue={this.props.item.name} onChange={this.props.onChangeForm}></input>
      </div>
      <div className="row">
        <span className="col-4">
          <img className="itemImg img-thumbnail" src={this.props.item.pictureURL} />
          <p>Color: <input type="text" name="color" defaultValue={this.props.item.color} onChange={this.props.onChangeForm}></input></p>
          <p>Price: $<input type="number" step=".01" defaultValue={this.props.item.price} onChange={this.props.onChangeForm}></input></p>
        </span>
        <span className="col-8 d-flex justify-content-between">
          <textarea className="form-control" name="description" defaultValue={this.props.item.description} onChange={this.props.onChangeForm}></textarea>
        </span>
      </div>
      <div className="row justify-content-end">
        <div className="col-2">
        <button type="button" className="btn btn-outline-warning" onClick={() => this.props.flipForm(this.props.item)}>Cancel</button>
        </div>
        <div className="col-5">
          <button type="submit" className="btn btn-outline-success" >Submit Changes</button>
        </div>
      </div>
    </form>
  )
}

export default EditItem