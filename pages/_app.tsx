import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../comps/Layout';
import Navbar from '../comps/Navbar';
import Sidebar from '../comps/Sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}
