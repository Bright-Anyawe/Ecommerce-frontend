import { useState, useEffect } from "react";
import { useContext } from "react";
import { GeneralContext } from "../Context/ContextProvider";

const useShopProduct = () => {
  const { items, setItems } = useContext(GeneralContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`, {
          mode: "cors",
        });

        const itemsJson = await response.json();
        console.log(itemsJson);
        setItems(itemsJson);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })(); 
  }, []);


  return { items };
};

export default useShopProduct;
