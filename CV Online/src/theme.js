import { createTheme } from '@mui/material/styles';

const gold = '#d4af37';
const dark = '#0f0f0f';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: gold,
      contrastText: '#111',
    },
    secondary: {
      main: '#c9a227',
    },
    background: {
      default: dark,
      paper: 'rgba(255,255,255,0.05)',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#bdbdbd',
    },
    divider: 'rgba(212, 175, 55, 0.28)',
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700, color: gold },
    h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700, color: gold },
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 600, color: gold },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: gold,
      fontSize: '1.85rem',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: gold,
      fontSize: '1.35rem',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: gold,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: dark,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url('/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        '::-webkit-scrollbar': { width: 8 },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(212,175,55,0.35)',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          paddingLeft: 20,
          paddingRight: 20,
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(212,175,55,0.25)',
          },
        },
        outlinedPrimary: {
          borderWidth: 1.5,
          letterSpacing: 0.6,
          whiteSpace: 'nowrap',
          '&:hover': {
            borderWidth: 1.5,
            backgroundColor: gold,
            color: '#111',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.22)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(212, 175, 55, 0.22)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(212,175,55,0.18)',
          transition: 'border-color 0.25s ease, transform 0.25s ease',
          '&:hover': {
            borderColor: 'rgba(212,175,55,0.45)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255,255,255,0.03)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: 'rgba(212,175,55,0.45)',
        },
      },
    },
  },
});

export default theme;
