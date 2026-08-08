import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import { profile } from '../data/profile';
import SectionTitle, { PageHeading } from '../components/SectionBits';
import PageShell from '../components/PageShell';
import Footer from '../components/Footer';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Nama wajib diisi';
    if (!form.email.trim()) next.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Format email tidak valid';
    if (!form.message.trim()) next.message = 'Pesan wajib diisi';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setOpen(true);
    setForm(initialForm);
  };

  return (
    <PageShell>
      <PageHeading
        title="Contact"
        subtitle="Hubungi saya melalui informasi di bawah atau kirim pesan singkat."
      />

      <SectionTitle>Informasi Kontak</SectionTitle>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, mb: 4.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <EmailIcon color="primary" fontSize="small" />
          <Link href={`mailto:${profile.email}`} color="inherit" underline="hover">
            {profile.email}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PhoneIcon color="primary" fontSize="small" />
          <Typography>{profile.phone}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <PlaceIcon color="primary" fontSize="small" sx={{ mt: 0.3 }} />
          <Typography>{profile.address}</Typography>
        </Box>
      </Box>

      <SectionTitle>Kirim Pesan</SectionTitle>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Nama"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          label="Pesan"
          name="message"
          value={form.message}
          onChange={handleChange}
          error={Boolean(errors.message)}
          helperText={errors.message}
          fullWidth
          multiline
          minRows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, px: 4 }}
        >
          Kirim
        </Button>
      </Box>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity="success" variant="filled" onClose={() => setOpen(false)}>
          Terima kasih! Pesan Anda sudah dicatat.
        </Alert>
      </Snackbar>

      <Footer />
    </PageShell>
  );
}
