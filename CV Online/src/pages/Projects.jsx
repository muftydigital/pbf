import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { localProjects, profile } from '../data/profile';
import { useGithubRepos } from '../hooks/useExternalApi';
import SectionTitle, { PageHeading } from '../components/SectionBits';
import PageShell from '../components/PageShell';
import Footer from '../components/Footer';

export default function Projects() {
  const [username, setUsername] = useState(profile.githubUsername);
  const [query, setQuery] = useState(profile.githubUsername);
  const { repos, loading, error } = useGithubRepos(query);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(username.trim());
  };

  return (
    <PageShell>
      <PageHeading
        title="Projects"
        subtitle="Kumpulan project unggulan dan repository publik dari GitHub."
      />

      <SectionTitle>Project Unggulan</SectionTitle>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mb: 5,
        }}
      >
        {localProjects.map((project) => (
          <Card key={project.name} variant="outlined">
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
                {project.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.7, minHeight: { sm: 72 } }}
              >
                {project.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {project.tech.map((t) => (
                  <Chip key={t} label={t} size="small" variant="outlined" color="primary" />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <SectionTitle>GitHub Repositories</SectionTitle>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
        Data repository diambil secara live dari GitHub API.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <TextField
          size="small"
          label="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ minWidth: 220, flex: 1 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Ambil Repo
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && repos.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Tidak ada repository publik untuk username tersebut.
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {repos.map((repo) => (
          <Card key={repo.id} variant="outlined">
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                  {repo.name}
                </Typography>
                {repo.html_url && (
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    underline="hover"
                    color="primary"
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: '0.9rem' }}
                  >
                    Buka <OpenInNewIcon sx={{ fontSize: 16 }} />
                  </Link>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>
                {repo.description || 'Tidak ada deskripsi.'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1.75, flexWrap: 'wrap' }}>
                {repo.language && <Chip label={repo.language} size="small" color="primary" />}
                <Chip label={`★ ${repo.stargazers_count}`} size="small" variant="outlined" />
                <Chip label={`Fork ${repo.forks_count}`} size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Footer />
    </PageShell>
  );
}
