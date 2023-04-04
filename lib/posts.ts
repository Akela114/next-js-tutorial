import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'posts')

interface IPostData {
  title: string
  date: Date
}

interface IPostDataWithId extends IPostData {
  id: string
}

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData: IPostDataWithId[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    const matterResultData = matterResult.data as IPostData;

    return {
      id,
      ...matterResultData
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })
}