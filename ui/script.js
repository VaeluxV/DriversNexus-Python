document.addEventListener('DOMContentLoaded', () => {
    const themePath = 'themes/';
    const themeSelect = document.getElementById('theme-select');
    const systemThemeToggle = document.getElementById('system-theme-toggle');

    function applyTheme(file) {
        const themeHref = themePath + file;
        let link = document.getElementById('theme-css');

        if (link) {
            link.href = themeHref;
        } else {
            link = document.createElement('link');
            link.id = 'theme-css';
            link.rel = 'stylesheet';
            link.href = themeHref;
            document.head.appendChild(link);
        }

        // Sync select dropdown if available
        if (themeSelect) themeSelect.value = file;
    }

    function applySystemTheme() {
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = darkMode ? 'dark.css' : 'light.css';
        applyTheme(systemTheme);

        if (themeSelect) {
            themeSelect.value = systemTheme;
            themeSelect.disabled = true;
        }
    }

    async function loadThemes() {
        try {
            const response = await fetch(themePath + 'themes.json');
            const themes = await response.json();

            if (themeSelect) {
                themeSelect.innerHTML = ''; // Clear old options
                themes.forEach(theme => {
                    const option = document.createElement('option');
                    option.value = theme.file;
                    option.textContent = theme.name;
                    themeSelect.appendChild(option);
                });
            }

            const followSystem = localStorage.getItem('followSystemTheme');
            if (followSystem === null) {
                localStorage.setItem('followSystemTheme', 'true');
            }

            const isSystem = localStorage.getItem('followSystemTheme') === 'true';

            if (systemThemeToggle) {
                systemThemeToggle.checked = isSystem;
            }

            if (isSystem) {
                applySystemTheme();
            } else {
                const savedTheme = localStorage.getItem('theme') || 'dark.css';
                applyTheme(savedTheme);
                if (themeSelect) themeSelect.disabled = false;
            }

            // Event listeners
            if (themeSelect) {
                themeSelect.addEventListener('change', () => {
                    const selected = themeSelect.value;
                    localStorage.setItem('theme', selected);
                    applyTheme(selected);
                });
            }

            if (systemThemeToggle) {
                systemThemeToggle.addEventListener('change', () => {
                    const enabled = systemThemeToggle.checked;
                    localStorage.setItem('followSystemTheme', enabled);

                    if (enabled) {
                        applySystemTheme();
                    } else {
                        themeSelect.disabled = false;
                        const savedTheme = localStorage.getItem('theme') || 'dark.css';
                        applyTheme(savedTheme);
                    }
                });
            }

            // Auto update if OS theme changes
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                    if (localStorage.getItem('followSystemTheme') === 'true') {
                        applySystemTheme();
                    }
                });
            }
        } catch (err) {
            console.error('Failed to load themes:', err);
            applySystemTheme(); // fallback
        }
    }

    // Navigation
    if (window.page === 'home') {
        document.getElementById('btn-settings')?.addEventListener('click', () => {
            window.location.href = 'settings.html';
        });
    }

    if (window.page === 'settings') {
        document.getElementById('btn-home')?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    document.getElementById('btn-new-window')?.addEventListener('click', () => {
        if (window.pywebview) {
            window.pywebview.api.open_new_window();
        } else {
            alert('pywebview not available');
        }
    });

    // Always load theme settings globally
    loadThemes();
});