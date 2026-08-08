import { Box, Typography } from '@mui/material';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 4, md: 5 },
        pt: 2.5,
        textAlign: 'center',
        borderTop: '1px solid rgba(212,175,55,0.18)',
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: 0.6, fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()}{' '}
        <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>
          {profile.name}
        </Box>
      </Typography>
    </Box>
  );
}
