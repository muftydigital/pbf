import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import WelcomeScreen from './components/WelcomeScreen';
import MusicControl from './components/MusicControl';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import DemoVideo from './pages/DemoVideo';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [audio, setAudio] = useState(null);

  const handleEnter = (audioEl) => {
    setAudio(audioEl);
    setEntered(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {!entered && <WelcomeScreen onEnter={handleEnter} />}

        {entered && (
          <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/demo" element={<DemoVideo />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <MusicControl audio={audio} />
          </Box>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}
