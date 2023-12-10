import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout'

import Link from 'next/link'
import UtilStyles from '../styles/utils.module.css'
import { getPostsData } from '../lib/posts'

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnailを取得

  return {
    props: {
      allPostsData,
    },
  };
}

// SSRの場合
// export async function getServerSideProps(context) {

//   return {
//     props: {
//       // コンポーネントで渡すためのprops
//     },
//   };
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* childrenの部分を書く */}
      <section className={UtilStyles.headingMd}>
        <p>たぬきねこです。</p>
      </section>

      <section className={UtilStyles.headingMd}>
        <h2>📝えんじにゃーのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage}/>
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={UtilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={UtilStyles.lightText}>{date}</small>
            </article>
            )
          )}
          
        </div>
      </section>

      
    </Layout>
  )
}
