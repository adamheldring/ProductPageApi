import React from "react"
import Product from "./Product"

// const productsJson = require("./../products.json")

class App extends React.Component {

state = {
  products: [],
  testProduct: {
		id: 3,
		name: "TEST-PRODUKT",
		type: "Filmdragerad tablett",
		size: "500 mg",
		numberInPack: "20",
		substance: "Ibuprofen",
		price: 23,
		deliveryTime: "1-3 vardagar",
		image: "https://www.apoteket.se/produktbilder/custom/179396s.jpg",
		description: "Skonsam mot magen. Samma substans som t ex Alvedon.Mot smärta & feber. Effekt på värk inom 30 min & feber efter 30-60 min. Effekten varar i 4-5 tim. Från 3 år."
  }
}


getProducts = () => {
  console.log('Getting products!')
  const query = "http://localhost:8080/products/"
  fetch(query)
    .then(response => response.json())
    .then(result => {
      this.setState({
        products: result
      }, () => console.log(this.state.products))
    })
}

componentDidMount() {
  this.getProducts()
}

postProduct = () => {
  console.log("Posting Test-Product")
  const newProduct = JSON.stringify(this.state.testProduct)
  const query = "http://localhost:8080/products/"
  console.log(newProduct)
  fetch(query, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: newProduct
  })
  .then((data) => {
    console.log('Request success: ', data)
    this.getProducts()
  })
  .catch((error) => {
    console.log('Request failure: ', error)
  })
}


  render() {
    let storeProducts = []
    // storeProducts = productsJson.products
    storeProducts = this.state.products

    // Removes the last word of product name if longer than 18 characters
    storeProducts.forEach((product) => {
      if (product.name.length > 18) {
        const lastWhiteSpace  = product.name.lastIndexOf(" ");
        const shorterName = product.name.slice(0, lastWhiteSpace)
        product.name = shorterName
      }
    })

    return (
      <div className="App">
        <div className="mainContainer">
          <section className="headerSection">
            <h1><span id="logo1">APP</span><br></br>[OTEKET]</h1>
          </section>
          <section className="productSection">
            <h1 className="categoryHeader"><span>BUTIKEN</span><span className="nrItems">({storeProducts.length} produkter)</span></h1>
            <div className="productContainer">
              {storeProducts.map((product, index) => {
                return <Product
                  name={product.name}
                  imageUrl={product.image}
                  deliveryTime={product.deliveryTime}
                  description={product.description}
                  key={product.id}
                  numberInPack={product.numberInPack}
                  price={product.price}
                  size={product.size}
                  substance={product.substance}
                  type={product.type}
                />
            })}
            </div>
          </section>
          <button onClick={this.postProduct}>New Product</button>
        </div>
      </div>
    )
  }

}

export default App
