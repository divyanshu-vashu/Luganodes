import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import theme from "../src/config/theme";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/config/theme/createEmotionCache";
import Layout from "../src/components/Layout";
import { StateContextProvider } from "../src/context";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <StateContextProvider>
          <CssBaseline />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
