import React, { Component, Fragment } from "react";
import Product from "./Product";
import TempCard from "../components/Cards/TempCard";
import axios from "axios";
const config = require("../config.json");

export default class ProductAdmin extends Component {
  state = {
    // newproduct: {
    //   "productname": "",
    //   "id": ""
    // },
    newDevice: {
      id: "",
      settings: {
        currentTemp: "",
        rangeMin: "",
        rangeMax: "",
        hum: ""
      }
    },
    devices: []
  };

  handleAddProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    // try {
    //   const params = {
    //     "id": id,
    //     "productname": this.state.newproduct.productname
    //   };
    //   await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
    //   this.setState({ products: [...this.state.products, this.state.newproduct] });
    //   this.setState({ newproduct: { "productname": "", "id": "" }});
    // }catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }

    try {
      const params = {
        id,
        settings: [
          {
            currentTemp: this.state.newDevice.currentTemp,
            rangeMin: this.state.newDevice.rangeMin,
            rangeMax: this.state.newDevice.rangeMax,
            hum: this.state.newDevice.hum
          }
        ]
      };

      await axios.post(`${config.api.invokeUrl}/devices/${id}`, params);
      this.setState({ devices: [...this.state.devices, this.state.newDevice] });
    } catch (err) {
      console.log(`An error has occured: ${err}`);
    }
    this.setState({ devices: [...this.state.devices, this.state.newDevice] });
  };

  handleUpdateProduct = async (id, name) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        id: id,
        productname: name
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      const productToUpdate = [...this.state.products].find(
        product => product.id === id
      );
      const updatedProducts = [...this.state.products].filter(
        product => product.id !== id
      );
      productToUpdate.productname = name;
      updatedProducts.push(productToUpdate);
      this.setState({ products: updatedProducts });
    } catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  };

  handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedProducts = [...this.state.products].filter(
        product => product.id !== id
      );
      this.setState({ products: updatedProducts });
    } catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  };

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/devices`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  onAddProductNameChange = event =>
    this.setState({
      newDevice: { ...this.state.newDevice, productname: event.target.value }
    });
  onAddProductIdChange = event =>
    this.setState({
      newDevice: { ...this.state.newDevice, id: event.target.value }
    });
  onAddTempChange = event =>
    this.setState({
      newDevice: {
        settings: [
          ...this.state.newDevice.settings,
          (this.state.newDevice.settings.currentTemp: event.target.value)
        ]
      }
    });
  onAddHumChange = event =>
    this.setState({
      newDevice: {
        settings: [
          ...this.state.newDevice.settings,
          (this.state.newDevice.settings.hum: event.target.value)
        ]
      }
    });
  onAddMinChange = event =>
    this.setState({
      newDevice: {
        settings: [
          ...this.state.newDevice.settings,
          (this.state.newDevice.settings.rangeMin: event.target.value)
        ]
      }
    });
  onAddMaxChange = event =>
    this.setState({
      newDevice: {
        settings: [
          ...this.state.newDevice.settings,
          (this.state.newDevice.settings.rangeMax: event.target.value)
        ]
      }
    });

  componentDidMount = () => {
    this.fetchProducts();
  };

  render() {
    const [
      { currentTemp, rangeMin, rangeMax, hum }
    ] = this.state.newDevice.settings;

    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Product Admin</h1>
            <p className="subtitle is-5">
              Add and remove products using the form below:
            </p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form
                  onSubmit={event =>
                    this.handleAddProduct(this.state.newDevice.id, event)
                  }
                >
                  {/* <div className="field has-addons"> */}
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter id"
                      value={this.state.newDevice.id}
                      onChange={this.onAddProductIdChange}
                    />
                  </div>
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter Temperature"
                      value={this.state.newDevice.settings.currentTemp}
                      onChange={this.onAddTempChange}
                    />
                  </div>
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter Humidity"
                      value={this.state.newDevice.settings.hum}
                      onChange={this.onAddHumChange}
                    />
                  </div>
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter Minimum Temperature"
                      value={this.state.newDevice.settings.rangeMin}
                      onChange={this.onAddMinChange}
                    />
                  </div>
                  <div className="control">
                    <input
                      className="input is-medium"
                      type="text"
                      placeholder="Enter Max Temperature"
                      value={this.state.newDevice.settings.rangeMax}
                      onChange={this.onAddMaxChange}
                    />
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary is-medium"
                    >
                      Add product
                    </button>
                  </div>
                  {/* </div> */}
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {// this.state.products.map((product, index) =>
                    //   <Product
                    //     isAdmin={true}
                    //     handleUpdateProduct={this.handleUpdateProduct}
                    //     handleDeleteProduct={this.handleDeleteProduct}
                    //     name={product.productname}
                    //     id={product.id}
                    //     key={product.id}
                    //   />)

                    this.state.devices.map(val => {
                      return (
                        <TempCard
                          key={val.id}
                          id={val.id}
                          isAdmin={true}
                          handleUpdateProduct={this.handleUpdateProduct}
                          handleDeleteProduct={this.handleDeleteProduct}
                          temperature={val.settings.currentTemp}
                          rangemax={val.settings.rangeMax}
                          rangemin={val.settings.rangeMin}
                          hum={val.settings.hum}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
