import { Box, Chip, LinearProgress, Typography } from '@mui/material';
import { hobbies, skills } from '../data/profile';
import SectionTitle, { PageHeading } from '../components/SectionBits';
import PageShell from '../components/PageShell';
import Footer from '../components/Footer';

export default function Skills() {
  return (
    <PageShell>
      <PageHeading
        title="Skills & Minat"
        subtitle="Keahlian teknis dan minat yang mendukung pengembangan project."
      />

      <SectionTitle>Keahlian Teknis</SectionTitle>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.75, mb: 5 }}>
        {skills.map((skill) => (
          <Box key={skill.name}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.9 }}>
              <Typography fontWeight={500} fontSize="0.95rem">
                {skill.name}
              </Typography>
              <Typography color="primary.main" variant="body2" fontWeight={600}>
                {skill.level}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={skill.level}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: 'rgba(255,255,255,0.08)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  bgcolor: 'primary.main',
                },
              }}
            />
          </Box>
        ))}
      </Box>

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
              }}
            />
          ))}
        </Box>
      </Box>

      <Footer />
    </PageShell>
  );
}
