import {
  AppBar,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import useScrollPosition from "../../hooks/useScrollPosition";

const Navbar = () => {
  const scrollPosition = useScrollPosition();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        py: 3,
        ...(scrollPosition < 70 && { bgcolor: "transparent" }),
        [theme.breakpoints.up("sm")]: {
          ...(scrollPosition < 200 && { bgcolor: "transparent" }),
        },
      }}
    >
      <Container>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Link
            href="/transactions"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h5" sx={{ color: 'black' }}>Luganodes</Typography>
          </Link>

          <IconButton sx={{ color: "inherit" }}>
            <MenuIcon
              sx={{
                fontSize: 30,
                [theme.breakpoints.up("sm")]: {
                  fontSize: 34,
                },
              }}
            />
          </IconButton>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
