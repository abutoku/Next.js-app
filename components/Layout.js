import Head from 'next/head'
import styles from './layout.module.css'
import UtilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'tanuki neko'
export const siteTitle = 'enginyaaa blog'

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className={styles.header}>
        { home ? (
          <>
            <img src="/images/take.png"  
              className={`${UtilStyles.borderCircle}`}/>
            <h1 className={UtilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img src="/images/take.png"  
                className={`${UtilStyles.borderCircle} ${styles.headerHomeImage}`}/>
            <h1 className={UtilStyles.heading2Xl}>{name}</h1>
          </>
        ) }
      </header>

      <main>{children}</main>
      { !home && (
        <div className={styles.backToHome}>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      ) }
    </div>
  );
}

export default Layout;