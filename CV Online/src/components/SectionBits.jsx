import { Box, Typography } from '@mui/material';

export default function SectionTitle({ children, align = 'left' }) {
  return (
    <Box sx={{ textAlign: align, mb: 2.5, mt: 0.5 }}>
      <Typography
        variant="h5"
        sx={{
          display: 'inline-block',
          borderBottom: '1px solid',
          borderColor: 'divider',
          pb: 0.75,
          mb: 0,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

export function ExperienceItem({ role, period, description }) {
  return (
    <Box
      sx={{
        mb: 2.5,
        pb: 2,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        '&:last-child': { borderBottom: 'none', mb: 0, pb: 0 },
      }}
    >
      <Typography fontWeight={600} sx={{ mb: 0.4 }}>
        {role}
      </Typography>
      <Typography variant="caption" color="primary.main" sx={{ display: 'block', mb: 0.8 }}>
        {period}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {description}
      </Typography>
    </Box>
  );
}

export function InfoCard({ label, value }) {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(255,255,255,0.03)',
        p: 2.25,
        borderRadius: 2,
        borderLeft: '3px solid',
        borderColor: 'primary.main',
        height: '100%',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(212,175,55,0.06)',
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: 'primary.main', mb: 0.6, fontWeight: 600, letterSpacing: 0.3 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
        {value}
      </Typography>
    </Box>
  );
}

export function PageHeading({ title, subtitle }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: subtitle ? 1 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 560 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
