import {  useMemo, useState} from "react";
import { useContext } from "react";
import { QuantityContext } from "../Context/ContextProvider";
import { Delete } from "../Feature Components/Delete";
import { Checkout } from "../Payment Integration components/CheckoutForm";
import { Box, Typography } from "@mui/material";
import { useViewport } from "react-viewport-hooks";

export function Cart() {
  const { qtySummery, setQtySummery, setCartCount } =
    useContext(QuantityContext);
  const [totalCostPrice, setTotalCostPrice] = useState([]);
  const { vw } = useViewport();
  

  useMemo(() => {
    function handleCostPrice() {
      if (qtySummery.length !== 0) {
        const totalCost = qtySummery
          .reduce((acc, summery) => {
            return acc + summery.productPrice * summery.QtySelected;
          }, 0)
          .toFixed(2);
        setTotalCostPrice(totalCost);
      } else {
        setTotalCostPrice(0);
      }
    }

    handleCostPrice();
  }, [qtySummery]);

  return (
    <Box className="cart-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          maxWidth: vw < 500 ? "500px" : "746px",
        }}
      >
        {qtySummery.length !== 0 ? (
          qtySummery.map((summery, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: vw < 500 && "column",
                alignItems: "center",
                gap: 2,
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                maxWidth: vw < 500 ? "250px" : vw > 1110 ? "703px" : "703",
                width: vw > 1110 ? "700px" : "100%",
                textAlign: "center",
              }}
            >
              <Box sx={{ border: "1px solid gray", padding: 2 }}>
                <img
                  src={summery.productImgUrl}
                  alt={summery.productName}
                  width={70}
                  height={70}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  justifyContent: "center",
                  alignItems: vw < 500 ? "center" : "start",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {summery.productName}
                </Typography>
                <Typography sx={{ fontWeight: "700" }}>
                  ${summery.productPrice}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ fontWeight: "700" }}>
                    Qty: {summery.QtySelected}
                  </Typography>
                  <Delete
                    qtySummery={qtySummery}
                    productIndex={index}
                    setSummery={setQtySummery}
                    setCartCount={setCartCount}
                  />
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            You have not selected any product yet!
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifySelf: "center",
          alignItems: "center",
          maxWidth: "500px",
          // marginBottom: "50px",
          maxHeight: "300px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            border: "1px solid gray",
            borderRadius: 2,
            padding: 2,
            // justifySelf: "center",
            // alignItems: "center",
            // maxWidth: "300px",
          }}
        >
          <Typography variant="h6">Summary</Typography>
          <Typography color="textSecondary">
            Congratulations! on free shipping
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 2,
              borderTop: "1px solid #ddd",
            }}
          >
            <Typography variant="body1">SubTotal:</Typography>
            <Typography variant="body1">${totalCostPrice}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 1,
              borderTop: "1px solid #ddd",
            }}
          >
            <Typography variant="body1">Total:</Typography>
            <Typography variant="body1">${totalCostPrice}</Typography>
          </Box>

            <Checkout totalAmount={totalCostPrice} />
        </Box>
      </Box>
    </Box>
  );
}
