import {
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useStateContext } from "../../context";

const SearchBox = () => {
  const { searchTerm, setSearchTerm } = useStateContext();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/transaction-details/${searchTerm}`);
  };

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 5,
          boxShadow: "0 0 34px 0 rgba(63, 66, 87, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search hash or transaction..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    sx={{ minWidth: 0, px: 1.5 }}
                    disabled={!searchTerm}
                    type="submit"
                  >
                    <SearchIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Paper>
    </Container>
  );
};

export default SearchBox;
