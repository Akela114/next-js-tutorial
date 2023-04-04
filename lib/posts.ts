import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postDirectory = path.join(process.cwd(), 'posts')

interface IPostData {
  title: string
  date: string
}

interface IPostDataWithId extends IPostData {
  id: string
}

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postDirectory)
  const allPostsData: IPostDataWithId[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    const matterResultData = matterResult.data as IPostData

    return {
      id,
      ...matterResultData,
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postDirectory)
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }))
}

export const getPostData = async (id: string) => {
  const fullPath = path.join(postDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  const matterResultData = matterResult.data as IPostData
  const matterResultProcessedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = matterResultProcessedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResultData,
  }
}
