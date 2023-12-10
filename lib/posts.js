import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, ""); // ファイル名(id) ※mdを削除

      // マークダウンファイルを文字列として読み取る
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      // idとデータを返す
      return {
        id,
        ...matterResult.data,
      };
    });
    return allPostsData;
}

// getStaticPathsでreturnで使うpathを取得する
export function getAllPostIds(){
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });

  // example
  /**
   * [
   *  {
   *    params: {
   *      id: "ssg-ssr"
   *    }
   *  },{
   *    params:{
   *      id: "next-react"
   *    }
   * },{
   *   params:{
   *    id: "pre-rendering"
   *    } 
   *  }
   * ]
   */
}

// idを使って、記事のデータを取得する
export async function getPostData(id){
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matterを使って、メタデータを解析する
  const matterResult = matter(fileContents);

  const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

  const blogContentHtml = blogContent.toString();

  // idとデータを返す
  return {
    id,
    blogContentHtml,
    ...matterResult.data,
  };
}