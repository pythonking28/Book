import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#e0e0ed",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    backgroundColor: "#655aa4",
  },
});
export default function Navbar() {
  const input = useRef();
  const router = useRouter();
  const search = async (e) => {
    e.preventDefault();
    const searchText = input.current.value;
    if (searchText == "") return; //give user some message
    router.push(`/search/?s=${searchText}`);
  };
  const goToCart = () => {
    router.push(`/my_cart`);
  };
  const cartItemsCount = useSelector((state) => {
    return state.bookStore.cart.totalItemsCount;
  });
  return (
    <>
      {router.asPath != "/admin/orders" && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            sx={{ backgroundColor: "rgba(0,0,0,0.05);", color: "#373535" }}
            position="static"
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontWeight: 550,
                }}
              >
                One_more Chapter
              </Typography>
              <Link href="/">
                <a style={{ margin: "0 10px" }}>Home</a>
              </Link>
              <Link href="/">
                <a style={{ margin: "0 10px" }}>About</a>
              </Link>
              {router.asPath === "/" ? (
                ""
              ) : (
                <form onSubmit={search}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search books"
                      inputRef={input}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                </form>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      )}
      {router.asPath !== "/my_cart" &&
        router.asPath != "/admin/orders" &&
        cartItemsCount != 0 && (
          <div className="cart_button_container">
            <Tooltip title="Your cart" arrow>
              <StyledBadge
                color="primary"
                badgeContent={cartItemsCount}
                max={10}
              >
                <Fab
                  sx={{
                    background: "rgba(80, 80, 80, 1)",
                    "&:hover": { background: "rgba(40, 40, 40, 1)" },
                  }}
                  color="primary"
                  aria-label="add to cart"
                  onClick={goToCart}
                >
                  <ShoppingCartIcon />
                </Fab>
              </StyledBadge>
            </Tooltip>
          </div>
        )}
    </>
  );
}
