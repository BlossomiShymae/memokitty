/**
 * Represents a JSS stylesheet of our userscript application.
 */
export const Styles = {
  "@global": {
    body: {
      position: "relative",
    },
    memokitty: {
      position: "relative",
    },
    ".memokitty-settings": {
      visibility: "hidden",
    },
    ".memokitty-controls": {
      position: "sticky",
      bottom: "0",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      userSelect: "all",
      pointerEvents: "auto",
    },
  },
};
