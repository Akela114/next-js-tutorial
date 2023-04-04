// import Script from 'next/script'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '@/components/layout'

const FirstPost = () => (
  <Layout>
    <Head>
      <title>First Post</title>
    </Head>
    {/* <Script 
        src="https://connect.facebook.net/en_US/sdk.js" 
        strategy='lazyOnload'
        onLoad={() => console.log('FB script loaded correctly')}
        onError={() => console.log('FB script doesn\'t loaded correctly')}
      /> */}
    <h1>First Post</h1>
    <h2>
      <Link href="/">Back to home</Link>
    </h2>
  </Layout>
);

export default FirstPost;