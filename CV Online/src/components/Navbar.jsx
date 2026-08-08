import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/demo', label: 'Demo Video' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 70 },
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {isMobile ? (
            <IconButton color="primary" onClick={() => setOpen(true)} aria-label="menu">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'center', justifyContent: 'center' }}>
              {links.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Button
                    key={link.to}
                    component={NavLink}
                    to={link.to}
                    sx={{
                      color: active ? 'primary.main' : 'text.secondary',
                      borderRadius: 0,
                      px: 1.4,
                      minWidth: 'auto',
                      fontSize: '0.9rem',
                      borderBottom: active ? '2px solid' : '2px solid transparent',
                      borderColor: active ? 'primary.main' : 'transparent',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#0f0f0f',
            width: 280,
            borderLeft: '1px solid rgba(212,175,55,0.3)',
          },
        }}
      >
        <List sx={{ px: 1, pt: 2 }}>
          {links.map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              onClick={() => setOpen(false)}
              selected={location.pathname === link.to}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                justifyContent: 'center',
                '&.Mui-selected': {
                  bgcolor: 'rgba(212,175,55,0.12)',
                  color: 'primary.main',
                },
              }}
            >
              <ListItemText primary={link.label} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
