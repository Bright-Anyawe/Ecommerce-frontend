import { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { QuantityContext } from "../Context/ContextProvider";
import { Delete } from "../Feature Components/Delete";
import { Checkout } from "../Payment Integration components/CheckoutForm";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

export function Cart() {
  const { qtySummery, setQtySummery } = useContext(QuantityContext);
  const [totalCostPrice, seTotalCostPrice] = useState([]);

  // Handle total cost calculation
  useMemo(() => {
    function handleCostPrice() {
      if (qtySummery.length !== 0) {
        const totalCost = qtySummery.reduce((acc, summery) => {
          return acc + summery.productPrice * summery.QtySelected;
        }, 0);
        seTotalCostPrice(totalCost);
      }
    }

    handleCostPrice();
  }, [qtySummery]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Cart Items List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {qtySummery.length !== 0 ? (
          qtySummery.map((summery, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              {/* Product Image */}
              <Box sx={{ border: "1px solid gray", padding: 2 }}>
                <img
                  src={summery.productImgUrl}
                  alt={summery.productName}
                  width={70}
                  height={70}
                />
              </Box>

              {/* Product Info */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h6">{summery.productName}</Typography>
                <Typography>${summery.productPrice}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>Qty: {summery.QtySelected}</Typography>
                  <IconButton
                    onClick={() => {
                      const updatedSummery = qtySummery.filter(
                        (_, idx) => idx !== index
                      );
                      setQtySummery(updatedSummery);
                    }}
                  >
                    <DeleteForever />
                  </IconButton>
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

      {/* Total Summary */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          border: "1px solid gray",
          borderRadius: 2,
          padding: 2,
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

        {/* CheckOut Button */}
        {/* <Button
          variant="contained"
          sx={{
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#ccc",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#aaa8a8cc" },
          }}
        >
          Checkout (${totalCostPrice})
        </Button> */}
      </Box>
    </Box>
  );
}
