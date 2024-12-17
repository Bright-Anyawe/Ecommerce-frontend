import { IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import PropTypes from "prop-types";

export function Delete({ qtySummery, productIndex, setSummery, setCartCount }) {
  function removeItem() {
    const productQty = qtySummery[productIndex].QtySelected;

    const newProductSummery = qtySummery.filter(
      (product, index) => index !== productIndex
    );

    setSummery(newProductSummery);

    setCartCount((prevCount) => prevCount - productQty);

    localStorage.setItem("qtySummery", JSON.stringify(newProductSummery));
    localStorage.setItem(
      "cartCount",
      newProductSummery.length
        ? newProductSummery.reduce(
            (acc, summery) => acc + summery.QtySelected,
            0
          )
        : 0
    );
  }

  return (
    <IconButton
      onClick={removeItem}
      sx={{
        color: "error.main",
        "&:hover": {
          backgroundColor: "rgba(255, 0, 0, 0.1)",
        },
        padding: 0,
      }}
      aria-label="delete"
    >
      <DeleteForever sx={{ fontSize: 24 }} />
    </IconButton>
  );
}

Delete.propTypes = {
  qtySummery: PropTypes.array.isRequired,
  productIndex: PropTypes.number.isRequired,
  setSummery: PropTypes.func.isRequired,
  setCartCount: PropTypes.func.isRequired,
};
