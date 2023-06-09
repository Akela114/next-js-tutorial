import type { AppProps } from 'next/app'

import '@/styles/global.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default App
