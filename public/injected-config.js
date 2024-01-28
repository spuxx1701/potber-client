// Embroider expects this file to be here since it's being referenced in `index.html`.
// Config injection only happens on staging and production environments, however.
console.debug(
  'DEBUG: Config injection is working! On staging and production environments, this file will be replaced with the injected config and you should not be able to see this message.',
);
