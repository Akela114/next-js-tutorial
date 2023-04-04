import Head from 'next/head'
import Link from 'next/link'

import Date from '@/components/date'
import Layout, { SITE_TITLE } from '@/components/layout'
import { getSortedPostsData } from '@/lib/posts'

import utilStyles from '@/styles/utils.module.css'

interface IHomeProps {
  allPostsData: ReturnType<typeof getSortedPostsData>
}

const Home: React.FC<IHomeProps> = ({ allPostsData }) => (
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
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
)

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

// can pass context
// export const getServerSideProps = async () => {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData,
//     },
//   }
// }

export default Home
