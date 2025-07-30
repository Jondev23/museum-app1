// Next.js app wrapper - provides global context and styles
import '../styles/globals.css';
import { AppProvider } from '../context/AppContext';

// Main app component that wraps all pages
export default function App({ Component, pageProps }) {
  return (
    // Provide global app context to all components
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
