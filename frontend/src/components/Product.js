import React from "react"

class Product extends React.Component {
  render() {
    return (
      <div className="product">
        <h1>{this.props.name}</h1>
        <div className="imageContainer">
          <img src={`${this.props.imageUrl}`} alt="product"></img>
        </div>
        <div className="productInfo">
          <p className="typeOfProduct">{this.props.type}</p>
          <p>
            <b>Substans: </b>{this.props.substance}<br />
            <b>Leveranstid: </b>{this.props.deliveryTime}<br />
            <b>Storlek per dos: </b>{this.props.size}<br />
            <b>Antal i förpackning: </b>{this.props.numberInPack}
          </p>
        <p className="productPrice"><b>{this.props.price}:-</b></p>
        </div>
        <p className="productDescription">{this.props.description}
          <br /><br /><span className="buyButton">KÖP</span>
        </p>
      </div>
    )
  }
}
export default Product
