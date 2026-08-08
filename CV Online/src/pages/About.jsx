import { Avatar, Box, Chip, Typography } from '@mui/material';
import { hobbies, profile } from '../data/profile';
import SectionTitle from '../components/SectionBits';
import PageShell from '../components/PageShell';
import Footer from '../components/Footer';

export default function About() {
  return (
    <PageShell>
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 3.5,
        }}
      >
        <Avatar
          src="/Foto_Profil.jpg"
          alt={profile.name}
          sx={{
            width: 110,
            height: 110,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        />
        <Box>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {profile.name}
          </Typography>
          <Typography
            color="text.secondary"
            textTransform="uppercase"
            letterSpacing={1.5}
            fontSize="0.85rem"
          >
            {profile.title}
          </Typography>
        </Box>
      </Box>

      <SectionTitle>Tentang Saya</SectionTitle>
      <Typography color="text.secondary" paragraph sx={{ lineHeight: 1.85, mb: 2 }}>
        {profile.bio}
      </Typography>
      <Typography color="text.secondary" sx={{ lineHeight: 1.85, mb: 4 }}>
        Berasal dari {profile.origin}, saya aktif di bidang game development, Web AR, AI,
        serta kewirausahaan digital melalui Mufty Digital.
      </Typography>

      <Box sx={{ textAlign: 'center' }}>
        <SectionTitle align="center">Hobi & Minat</SectionTitle>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2, justifyContent: 'center' }}>
          {hobbies.map((item) => (
            <Chip
              key={item}
              label={item}
              sx={{
                bgcolor: 'primary.main',
                color: '#111',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            />
          ))}
        </Box>
      </Box>

      <Footer />
    </PageShell>
  );
}
