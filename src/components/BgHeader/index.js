import { Box, Hidden, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import AnimatedBg from "../../assets/images/animatedbg.svg";
import ArcShape from "../../assets/images/arc-shape.png";
import fullImage from "../../assets/images/full.jpg";
const BgHeader = () => {
  const theme = useTheme();
  const imageUrl = 'https://drive.google.com/uc?export=view&id=1juNrek-Q54bFxPPyIbZN5e1kF6BahEUd';
  return (
    <Box
    sx={{
      backgroundImage: `url('https://media.licdn.com/dms/image/sync/D5627AQEhOzDhS-kx5g/articleshare-shrink_800/0/1711161724030?e=2147483647&v=beta&t=EQnCFE4JMfYotm2kwsJmwzt4OqOqyZxrRgQqHSNVlng')`,
      backgroundSize: 'contain', // or use 'cover' depending on the desired effect
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat', // Prevents repeating the image
      height: 400,
      width: '100%', // Ensure the Box takes up full width
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      {/* Animated Bubbles */}
      
      <Stack spacing={2} sx={{ position: 'absolute', textAlign: 'center' }}>
        <Typography variant="h3" sx={{ color: 'text.primary' }}>
          Ethereum Deposit Tracker
        </Typography>
      </Stack>
    </Box>
  );
};

export default BgHeader;
