import { useState, useEffect } from "react";
// import { fetchProducts } from "../Services/fetchApi";
import ProductAdder from "../Services/postApi";
// import firebaseApp from "../Services/fireBaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FetchProducts } from "../Services/fetchApi";
import { AuthContext } from "../Context/ContextProvider";
import { useContext } from "react";
import { QuantityContext } from "../Context/ContextProvider";

export const ProductList = () => {
  const {
    setCartCount,
    inputQuantity,
    setInputQuantity,
    qtySummery,
    setQtySummery,
  } = useContext(QuantityContext);
  const [products, setProducts] = useState([]);
  const { app } = useContext(AuthContext);

  const db = getFirestore(app);
  const productCollectionRef = collection(db, "products");

  const increment = (e, productId) => {
    let siblingValue = e.target.previousElementSibling.value;

    console.log(productId);

    const increaseQuantity = parseInt(siblingValue) + 1;
    console.log(increaseQuantity);

    setInputQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: increaseQuantity,
    }));
  };

  const decrease = (e, productId) => {
    let sibling = e.target.nextElementSibling.value;
    console.log(sibling);

    // console.log(quantity[itemId]);
    const decreaseQuantity = parseInt(sibling) - 1;
    console.log(decreaseQuantity);

    setInputQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: decreaseQuantity,
    }));
  };

  function handleQuantity(e, productId) {
    const newQuantity = parseInt(e.target.value);

    if (inputQuantity !== undefined) {
      setInputQuantity((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    }
  }

  const fetchProducts = async () => {
    try {
      const querySnapShot = await getDocs(productCollectionRef);
      const products = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(products);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const removeDuplicates = (products) => {
    const uniqueProducts = products.filter(
      (product, index, self) =>
        index ===
        self.findIndex(
          (p) => p.id === product.id // Compare relevant properties
        )
    );
    return uniqueProducts;
  };

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      const uniqueProduct = removeDuplicates(productsData);
      console.log(uniqueProduct);
      setProducts(uniqueProduct);
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length !== 0) {
      const initialQuantity = products.reduce((acc, item) => {
        if (item.id !== undefined && item.id !== null) {
          acc[item.id] = 0;
        }
        return acc;
      }, {});

      setInputQuantity(initialQuantity);
    }
  }, [products, setInputQuantity]);

  // function addToCart(e, productId, product) {
  //   // e.persist();
  //   // ;
  //   let totalQuantity = Object.values(inputQuantity).reduce((acc, qty) => {
  //     return acc + qty;
  //   }, 0);

  //   setCartCount(totalQuantity);

  //   const existingProductIndex = qtySummery.findIndex(
  //     (item) => item.productImgUrl === product.image
  //   );

  //   const newQuantity = inputQuantity[productId];

  //   if (existingProductIndex !== -1) {
  //     if (newQuantity > 0) {
  //       preventDuplicateOfExistingProduct(newQuantity, existingProductIndex);
  //     }
  //   } else {
  //     handleAddProductToCart(productId, product);
  //   }
  // }
  function addToCart(e, productId, product) {
    let totalQuantity = Object.values(inputQuantity).reduce((acc, qty) => {
      return acc + qty;
    }, 0);

    setCartCount(totalQuantity);

    const existingProductIndex = qtySummery.findIndex(
      (p) => p.productImgUrl === product.imageUrl
    );

    const newQuantity = inputQuantity[productId];

    if (existingProductIndex !== -1) {
      if (newQuantity > 0) {
        updateExistingProductQuantity(newQuantity, existingProductIndex);
      }
    } else {
      // If the product doesn't exist, add it to the cart
      if (newQuantity > 0) {
        addNewProductToCart(productId, product, newQuantity);
      }
    }
  }


  function updateExistingProductQuantity(newQuantity, existingProductIndex) {
    setQtySummery((prevSummery) => {
      return prevSummery.map((product, index) => {
        if (index === existingProductIndex) {
          return {
            ...product,
            QtySelected: product.QtySelected + newQuantity,
          };
        }
        return product;
      });
    });
  }

  function addNewProductToCart(productId, product) {
    setQtySummery((summery) => [
      ...summery,
      {
        productName: product.name,
        productImgUrl: product.imageUrl,
        productPrice: product.price,
        QtySelected: inputQuantity[productId],
      },
    ]);
  }

  return (
    <>
      <div>
        <ul className="shopProductContainer">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="container" key={product.id}>
                <li className="imageContainer">
                  <img src={product.imageUrl} alt={product.name} />
                </li>

                <div className="additionalInfoContainer">
                  <div className="titleContainer">
                    {" "}
                    <h4>{product.name}</h4>
                  </div>

                  <p>{`Price: $${product.price}`}</p>

                  <div className="quantityContainer">
                    <button onClick={(e) => decrease(e, product.id)}>-</button>

                    <input
                      type="number"
                      data-index={product.id}
                      maxLength="20"
                      value={inputQuantity?.[product.id] || 0}
                      onChange={(e) => handleQuantity(e, product.id)}
                    />

                    <button onClick={(e) => increment(e, product.id)}>+</button>
                  </div>

                  <div className="priceOrderEl">
                    <button
                      className="orderBtn"
                      onClick={(e) => addToCart(e, product.id, product)}
                    >
                      Order now!
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading product....</p>
          )}
        </ul>
      </div>
      <ProductAdder />
      <FetchProducts />
    </>
  );
};
