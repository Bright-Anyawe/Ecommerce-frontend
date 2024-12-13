import { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { GeneralContext } from "../Context/ContextProvider";
import useShopProduct from "./getProductFromFakeApi.jsx";

const ProductAdder = () => {
  const { db, items } = useContext(GeneralContext);
  console.log(items);
  const storageProduct = items;
  console.log(storageProduct);
// useShopProduct()
  const addProduct = async () => {
    const formattedProducts = storageProduct.map((product) => ({
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.image,
      rating: product.rating.rate,
      category: product.category || "unCategorized",
    }));
      console.log("Sending request:", formattedProducts);

    try {
      console.log("Sending request:", formattedProducts);
      for (const product of formattedProducts) {
        const docRef = await addDoc(collection(db, "products"), product);
        console.log("Document written with  successfully ID: ", docRef.id);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    //   console.log(storageProduct)
    if (storageProduct.length > 0) {
      // addProduct();
    }
  }, []);
};

export default ProductAdder;
