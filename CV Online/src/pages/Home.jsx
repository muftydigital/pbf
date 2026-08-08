import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { profile } from '../data/profile';
import { InfoCard } from '../components/SectionBits';
import { useRandomQuote } from '../hooks/useExternalApi';
import PageShell from '../components/PageShell';
import Footer from '../components/Footer';

export default function Home() {
  const { quote, loading } = useRandomQuote();

  return (
    <PageShell center>
      <Avatar
        src="/Foto_Profil.jpg"
        alt={profile.name}
        sx={{
          width: { xs: 150, md: 180 },
          height: { xs: 150, md: 180 },
          mx: 'auto',
          mb: 2.5,
          border: '3px solid',
          borderColor: 'primary.main',
          p: '5px',
          bgcolor: 'transparent',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.04)',
            boxShadow: '0 0 24px rgba(212,175,55,0.35)',
          },
          '& img': { borderRadius: '50%' },
        }}
      />

      <Typography
        variant="h3"
        sx={{ fontSize: { xs: '1.85rem', md: '2.4rem' }, mb: 1, lineHeight: 1.2 }}
      >
        {profile.name}
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: 2.2,
          mb: 4,
          fontSize: { xs: '0.85rem', md: '0.95rem' },
        }}
      >
        {profile.title}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          textAlign: 'left',
          mb: 4,
        }}
      >
        <InfoCard label="Alamat" value={profile.address} />
        <InfoCard label="Asal Daerah" value={profile.origin} />
        <InfoCard label="Email" value={profile.email} />
        <InfoCard label="Telepon" value={profile.phone} />
      </Box>

      <Box
        sx={{
          bgcolor: 'rgba(212,175,55,0.07)',
          border: '1px solid rgba(212,175,55,0.22)',
          borderRadius: 2,
          p: { xs: 2, md: 2.5 },
          mb: 4,
          textAlign: 'left',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
          <FormatQuoteIcon color="primary" fontSize="small" />
          <Typography variant="subtitle2" color="primary.main" fontWeight={600}>
            Quote of the Day
          </Typography>
        </Box>
        {loading ? (
          <CircularProgress size={22} color="primary" />
        ) : (
          <>
            <Typography variant="body1" fontStyle="italic" sx={{ lineHeight: 1.7 }}>
              &ldquo;{quote?.content}&rdquo;
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1.2, display: 'block' }}>
              — {quote?.author}
            </Typography>
          </>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Button variant="contained" color="primary" component={RouterLink} to="/about">
          Tentang Saya
        </Button>
        <Button variant="outlined" color="primary" component={RouterLink} to="/projects">
          Projects
        </Button>
        <Button variant="outlined" color="primary" component={RouterLink} to="/demo">
          Demo Video
        </Button>
        <Button variant="outlined" color="primary" component={RouterLink} to="/contact">
          Contact
        </Button>
      </Box>

      <Footer />
    </PageShell>
  );
}
