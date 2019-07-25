import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProductAdmin extends Component {

  state = {
    isEditMode: false,
    updatedproductname: this.props.name
  }

  handleProductEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProduct(this.props.id, this.state.updatedproductname);
  }

  onAddProductNameChange = event => this.setState({ "updatedproductname": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleProductEdit} className="product-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteProduct(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit product name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedproductname}
                onChange={this.onAddProductNameChange}
              />
              <p className="product-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="product-title">{ this.props.name }</p>
              <h3 className="product-id">ID: { this.props.id }</h3>
              <h3 className="product-temp">Temperature: { this.props.temperature }˚F</h3>
              <h3 className="product-hum">Humidity: { this.props.hum }%</h3>
              <h3 className="product-min">Min Temperature: { this.props.rangeMin }˚F</h3>
              <h3 className="product-max">Max Temperature: { this.props.rangeMax }˚F</h3>
            </div>
        }
      </div>
    )
  }
}
