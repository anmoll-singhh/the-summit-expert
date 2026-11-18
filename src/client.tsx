/**
 * Client entry.
 *
 * Pages are rendered by React on the server (see src/wp). In the browser the
 * site's own front-end runtime (Elementor widgets, sliders, menus, forms…)
 * takes over the server HTML exactly as on the original site and immediately
 * mutates it (adds helper nodes to <body>, wraps sliders…). Hydrating React
 * on top of that DOM would fail and re-render the page, dropping every widget
 * listener, and there is no React-managed interactivity to hydrate. So the
 * client intentionally does not hydrate; navigation is regular page loads,
 * just like the original site.
 */
export {};
