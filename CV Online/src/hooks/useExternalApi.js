import { useState, useEffect } from 'react';

export function useRandomQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchQuote() {
      try {
        setLoading(true);
        setError(null);

        let content;
        let author;

        try {
          const res = await fetch('https://dummyjson.com/quotes/random');
          if (!res.ok) throw new Error('dummyjson failed');
          const data = await res.json();
          content = data.quote;
          author = data.author;
        } catch {
          const res = await fetch('https://api.quotable.io/random');
          if (!res.ok) throw new Error('Gagal memuat quote');
          const data = await res.json();
          content = data.content;
          author = data.author;
        }

        if (!cancelled) setQuote({ content, author });
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setQuote({
            content:
              'Kesuksesan adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan.',
            author: 'Colin Powell',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchQuote();
    return () => {
      cancelled = true;
    };
  }, []);

  return { quote, loading, error };
}

export function useGithubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return undefined;

    let cancelled = false;

    async function fetchRepos() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );
        if (!res.ok) {
          if (res.status === 404) throw new Error('Username GitHub tidak ditemukan');
          throw new Error('Gagal mengambil data GitHub');
        }
        const data = await res.json();
        if (!cancelled) setRepos(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setRepos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading, error };
}
