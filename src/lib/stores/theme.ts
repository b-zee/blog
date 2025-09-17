import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light' | 'system';

// Return saved preference, else return 'system'.
function loadTheme(): Theme {
	let saved;
	try {
		saved = localStorage.getItem('theme');
	} catch {
		return 'system';
	}

	if (saved === 'dark' || saved === 'light') {
		return saved;
	}
	return 'system';
}

// Resolve possible 'system' value to preferred color scheme.
function resolveTheme(theme: Theme): 'dark' | 'light' {
	if (theme === 'system') {
		if (browser) {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return 'dark'; // Default to dark for SSR
	}
	// If theme is explicitly 'light' or 'dark', return it as-is
	return theme;
}

function createThemeStore() {
	const initialTheme = loadTheme();
	const { subscribe, set, update } = writable<Theme>(initialTheme);

	// Apply initial theme to document
	if (browser) {
		updateDocument(initialTheme);

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', () => {
			const currentTheme = localStorage.getItem('theme');
			if (currentTheme === 'system' || !currentTheme) {
				updateDocument('system');
			}
		});
	}

	return {
		subscribe,
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				updateDocument(theme);
			}
			set(theme);
		},
		toggle: () => {
			update((current) => {
				const resolved = resolveTheme(current);
				const newTheme = resolved === 'dark' ? 'light' : 'dark';
				if (browser) {
					localStorage.setItem('theme', newTheme);
					updateDocument(newTheme);
				}
				return newTheme;
			});
		}
	};
}

function updateDocument(theme: Theme) {
	const resolved = resolveTheme(theme);
	if (resolved === 'dark') {
		document.documentElement.classList.add('dark');
		document.documentElement.classList.remove('light');
	} else {
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.add('light');
	}
}

export const theme = createThemeStore();
