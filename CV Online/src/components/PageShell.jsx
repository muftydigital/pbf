import { Container, Paper } from '@mui/material';

export default function PageShell({ children, center = false }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 3, md: 5 },
        animation: 'pageIn 0.45s ease',
        '@keyframes pageIn': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          bgcolor: 'rgba(10,10,10,0.55)',
          textAlign: center ? 'center' : 'left',
        }}
      >
        {children}
      </Paper>
    </Container>
  );
}
