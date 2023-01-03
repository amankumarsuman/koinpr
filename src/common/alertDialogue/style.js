import { styled, createTheme, ThemeProvider } from "@mui/system";

export const style = styled((theme) => ({
  title: {
    minWidth: "800px",
    // background: "#2E4CBC",
    color: "white",
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    maxHeight: "80px",
  },
  message: {
    fontSize: "20px",
    fontWeight: "500",
    textAlign: "center",
    marginTop: "20px",
    color: theme.palette.text.primary,
  },
  wrapIcon: {
    display: "flex",
    fontSize: "20px",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: "30px",
    marginTop: "5px",
    marginRight: "5px",
  },
}));
