import { Box } from '@mui/material';
import { experiences, organizations } from '../data/profile';
import SectionTitle, { ExperienceItem, PageHeading } from '../components/SectionBits';
import PageShell from '../components/PageShell';
import Footer from '../components/Footer';

export default function Experience() {
  return (
    <PageShell>
      <PageHeading
        title="Pengalaman"
        subtitle="Ringkasan pengalaman organisasi dan pekerjaan yang pernah dijalani."
      />

      <Box sx={{ mb: 4.5 }}>
        <SectionTitle>Pengalaman Organisasi</SectionTitle>
        {organizations.map((item) => (
          <ExperienceItem key={item.role + item.period} {...item} />
        ))}
      </Box>

      <Box>
        <SectionTitle>Pengalaman Kerja</SectionTitle>
        {experiences.map((item) => (
          <ExperienceItem key={item.role + item.period} {...item} />
        ))}
      </Box>

      <Footer />
    </PageShell>
  );
}
