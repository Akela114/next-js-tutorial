import Head from 'next/head'

import Date from '@/components/date'
import Layout from '@/components/layout'
import { getAllPostIds, getPostData } from '@/lib/posts'
import utilStyles from '@/styles/utils.module.css'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'

interface IGetStaticPathsParams extends ParsedUrlQuery {
  id: string
}

interface IPostProps {
  postData: Awaited<ReturnType<typeof getPostData>>
}

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<IGetStaticPathsParams> = () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  IPostProps,
  IGetStaticPathsParams
> = async ({ params: { id } }) => {
  const postData = await getPostData(id)
  return {
    props: {
      postData,
    },
  }
}

export default Post
