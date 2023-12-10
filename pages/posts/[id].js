import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import UtilStyles from '../../styles/utils.module.css'
import Head from 'next/head'

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false, // 404ページを表示するかどうか
  };
}

export async function getStaticProps({ params }) {
  // params.idを使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={UtilStyles.headingXl}>{postData.title}</h1>
        <div className={UtilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHtml }} />
      </article>
    </Layout>
  );
}