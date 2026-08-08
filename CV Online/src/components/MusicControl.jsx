import { Fab } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from 'react';

export default function MusicControl({ audio }) {
  const [playing, setPlaying] = useState(true);

  if (!audio) return null;

  const toggle = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <Fab
      color="primary"
      size="medium"
      onClick={toggle}
      aria-label="kontrol musik"
      sx={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 1200,
        bgcolor: 'rgba(0,0,0,0.85)',
        color: 'primary.main',
        border: '2px solid',
        borderColor: 'primary.main',
        boxShadow: playing ? '0 0 0 0 rgba(212,175,55,0.7)' : 'none',
        animation: playing ? 'pulseGold 2s infinite' : 'none',
        '@keyframes pulseGold': {
          '0%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(212,175,55,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0)' },
        },
        '&:hover': {
          bgcolor: 'primary.main',
          color: '#111',
        },
      }}
    >
      {playing ? <PauseIcon /> : <PlayArrowIcon />}
    </Fab>
  );
}
