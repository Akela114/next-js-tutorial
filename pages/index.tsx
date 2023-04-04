import Head from 'next/head'

import Layout, { SITE_TITLE } from '@/components/layout'

import utilStyles from '@/styles/utils.module.css'

const Home = () => (
  <Layout home>
    <Head>
      <title>{SITE_TITLE}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>Hello, I&apos;m Oleg</p>
      <p>
        (This is a sample website - you’ll be building a site like this on{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </p>
    </section>
  </Layout>
)

export default Home
