import "../src/index.css";
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize();

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
  },
  loaders: [mswLoader],
};

export default preview;
