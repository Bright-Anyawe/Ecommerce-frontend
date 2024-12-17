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
    cartCount,
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
    if (products.length !== 0 && Object.keys(inputQuantity).length === 0) {
      const initialQuantity = products.reduce((acc, item) => {
        if (item.id !== undefined && item.id !== null) {
          acc[item.id] = 0;
        }
        return acc;
      }, {});
      setInputQuantity(initialQuantity);
    }
  }, [products, setInputQuantity, inputQuantity]);

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("qtySummery", JSON.stringify(qtySummery));
    localStorage.setItem("inputQuantity", JSON.stringify(inputQuantity));
  }, [cartCount, qtySummery, inputQuantity]);

  // function addToCart(e, productId, product) {
  //   let totalQuantity = Object.values(inputQuantity).reduce((acc, qty) => {
  //     return acc + qty;
  //   }, 0);

  //   setCartCount(totalQuantity);

  //   const newQuantity = inputQuantity[productId];
  //   if (newQuantity > 0) {
  //     setQtySummery((prevSummery) => {
  //       const existingProductIndex = prevSummery.findIndex(
  //         (p) => p.productImgUrl === product.imageUrl
  //       );

  //       if (existingProductIndex !== -1) {
  //         // Update quantity for existing product
  //         return prevSummery.map((product, index) => {
  //           if (index === existingProductIndex) {
  //             return {
  //               ...product,
  //               QtySelected: product.QtySelected + newQuantity,
  //             };
  //           }
  //           return product;
  //         });
  //       } else {
  //         // Add new product to cart
  //         return [
  //           ...prevSummery,
  //           {
  //             productName: product.name,
  //             productImgUrl: product.imageUrl,
  //             productPrice: product.price,
  //             QtySelected: newQuantity,
  //           },
  //         ];
  //       }
  //     });
  //   }
  // }

  // function addToCart(e, productId, product) {
  //   // let totalQuantity = Object.values(inputQuantity).reduce((acc, qty) => {
  //   //   return acc + qty;
  //   // }, 0);

  //   // setCartCount(totalQuantity);
  //   const newQuantity = inputQuantity[productId];

  //   if(newQuantity > 0) {
  //     const existingProductIndex = qtySummery.findIndex(
  //       (p) => p.productImgUrl === product.imageUrl
  //     );

  //   }

  //   if (existingProductIndex !== -1) {
  //     if (newQuantity > 0) {
  //       updateExistingProductQuantity(newQuantity, existingProductIndex);
  //     }
  //   } else {
  //     if (newQuantity > 0) {
  //       addNewProductToCart(productId, product, newQuantity);
  //     }
  //   }

  //     setInputQuantity((prevQuantities) => ({
  //       ...prevQuantities,
  //       [productId]: 0,
  //     }));

  //        const totalQuantity = Object.values(inputQuantity).reduce(
  //     (acc, qty) => acc + qty,
  //     0
  //   ) + newQuantity; /
  //   setCartCount(totalQuantity);
  // }
  // }

  // function addToCart(e, productId, product) {
  //   const newQuantity = inputQuantity[productId];

  //   if (newQuantity > 0) {
  //     const existingProductIndex = qtySummery.findIndex(
  //       (p) => p.productImgUrl === product.imageUrl
  //     );

  //     if (existingProductIndex !== -1) {
  //       updateExistingProductQuantity(newQuantity, existingProductIndex);
  //     } else {
  //       addNewProductToCart(productId, product, newQuantity);
  //     }
      
  //           const totalQuantity =
  //             Object.values(inputQuantity).reduce((acc, qty) => acc + qty, 0) 
       
  //           setCartCount(totalQuantity);

  //     setInputQuantity((prevQuantities) => ({
  //       ...prevQuantities,
  //       [productId]: 0,
  //     }));
  //   }
  // }
function addToCart(e, productId, product) {
  const newQuantity = inputQuantity[productId];

  if (newQuantity > 0) {
    const existingProductIndex = qtySummery.findIndex(
      (p) => p.productImgUrl === product.imageUrl
    );

    if (existingProductIndex !== -1) {
      updateExistingProductQuantity(newQuantity, existingProductIndex);
    } else {
      addNewProductToCart(productId, product);
    }

    const totalQuantity = cartCount + newQuantity;
    setCartCount(totalQuantity);

    setInputQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: 0,
    }));
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
