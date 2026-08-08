import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen({ onEnter }) {
  const [visible, setVisible] = useState(true);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    audioRef.current = new Audio('/backsound.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnter = () => {
    audioRef.current?.play().catch(() => {});
    setVisible(false);
    setTimeout(() => {
      onEnter?.(audioRef.current);
      navigate('/');
    }, 700);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        bgcolor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.7s ease',
        px: 2,
      }}
    >
      <Box
        textAlign="center"
        sx={{
          animation: 'welcomeIn 0.9s ease',
          '@keyframes welcomeIn': {
            from: { opacity: 0, transform: 'translateY(16px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: 1.2, fontSize: { xs: '2rem', md: '2.75rem' }, letterSpacing: 0.5 }}
        >
          Selamat Datang
        </Typography>
        <Typography
          sx={{
            color: '#999',
            letterSpacing: 3,
            fontSize: '0.85rem',
            mb: 0.8,
            textTransform: 'uppercase',
          }}
        >
          Portofolio Digital
        </Typography>
        <Typography sx={{ color: '#666', fontSize: '0.85rem', mb: 4.5 }}>
          Klik tombol di bawah untuk membuka
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleEnter}
          sx={{ px: 5.5, py: 1.1, letterSpacing: 2 }}
        >
          BUKA PROFIL
        </Button>
      </Box>
    </Box>
  );
}
