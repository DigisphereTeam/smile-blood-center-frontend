import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#C62828",
      light: "#EF5350",
      dark: "#B71C1C",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#1565C0",
      light: "#42A5F5",
      dark: "#0D47A1",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#2E7D32",
    },

    warning: {
      main: "#ED6C02",
    },

    error: {
      main: "#D32F2F",
    },

    info: {
      main: "#0288D1",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },

    divider: "#E2E8F0",
  },

  typography: {
    fontFamily: "Roboto, sans-serif",

    h1: {
      fontSize: "36px",
      fontWeight: 700,
    },

    h2: {
      fontSize: "32px",
      fontWeight: 700,
    },

    h3: {
      fontSize: "28px",
      fontWeight: 600,
    },

    h4: {
      fontSize: "24px",
      fontWeight: 600,
    },

    h5: {
      fontSize: "20px",
      fontWeight: 600,
    },

    h6: {
      fontSize: "16px",
      fontWeight: 600,
    },

    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
    },

    subtitle2: {
      fontSize: "14px",
      fontWeight: 500,
    },

    body1: {
      fontSize: "16px",
    },

    body2: {
      fontSize: "14px",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: "#F8FAFC",
          boxSizing: "border-box",
        },

        "*": {
          boxSizing: "border-box",
        },

        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
          fontWeight: 600,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        color: "inherit",
        elevation: 1,
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
  },
});

export default theme;