try {
  if (localStorage.getItem('hevent-theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  }
} catch (error) {
  // Keep the default light theme when browser storage is unavailable.
}
