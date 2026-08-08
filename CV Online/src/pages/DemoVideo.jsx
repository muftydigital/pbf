import { Box, Button, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { profile } from '../data/profile';
import { toEmbedUrl } from '../utils/videoEmbed';
import PageShell from '../components/PageShell';
import Footer from '../components/Footer';

export default function DemoVideo() {
  const embedUrl = toEmbedUrl(profile.videoUrl);

  return (
    <PageShell center>
      <PlayCircleOutlineIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1.5 }} />

      <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.55rem', md: '1.85rem' } }}>
        {profile.videoTitle}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
          maxWidth: 500,
          mx: 'auto',
          lineHeight: 1.75,
          fontSize: '0.95rem',
        }}
      >
        Penjelasan implementasi React Hooks, Routing, External API, dan Material UI.
      </Typography>

      {embedUrl ? (
        <Box
          sx={{
            overflow: 'hidden',
            borderRadius: 2,
            border: '1px solid rgba(212,175,55,0.3)',
            bgcolor: '#000',
            boxShadow: '0 14px 40px rgba(0,0,0,0.4)',
            mb: 3,
            textAlign: 'left',
          }}
        >
          <Box sx={{ position: 'relative', pt: '56.25%' }}>
            <Box
              component="iframe"
              src={embedUrl}
              title={profile.videoTitle}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            py: 8,
            px: 2,
            mb: 3,
            borderRadius: 2,
            border: '1px dashed rgba(212,175,55,0.35)',
            bgcolor: 'rgba(255,255,255,0.02)',
          }}
        >
          <Typography color="text.secondary">Video belum tersedia.</Typography>
        </Box>
      )}

      {profile.videoUrl && (
        <Button
          variant="outlined"
          color="primary"
          href={profile.videoUrl}
          target="_blank"
          rel="noreferrer"
          endIcon={<OpenInNewIcon />}
        >
          Buka Video
        </Button>
      )}

      <Footer />
    </PageShell>
  );
}
