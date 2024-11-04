import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // Disable horizontal scrolling
      "@media (max-width: 768px)": {
        body: {
          overflowX: "hidden",
        },
      },
      // Custom scrollbar styles
      "::-webkit-scrollbar": {
        width: "8px",
        height: "4px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#4A5568", // Scrollbar thumb color
        borderRadius: "10px",
        border: "2px solid transparent",
        backgroundClip: "content-box",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#718096", // Hover state for scrollbar thumb
      },
      "::-webkit-scrollbar-track": {
        background: "#2D3748", // Scrollbar track color
        borderRadius: "10px",
      },
    },
  },
});

export default theme;
