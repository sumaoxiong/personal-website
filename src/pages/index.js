import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className={styles.badge}>Frontend Developer Portfolio & Notes</p>

        <Heading as="h1" className={styles.heroTitle}>
          哈囉，我是蘇茂雄
        </Heading>

        <p className={styles.heroSubtitle}>
          目前專注於前端開發，持續整理 React、Vue、Next.js 與實作筆記，
          也在這裡展示我的作品與學習歷程。
        </p>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            查看技術筆記
          </Link>

          {/* <Link
            className="button button--outline button--lg"
            to="/blog">
            前往部落格
          </Link> */}
        </div>
      </div>
    </header>
  );
}

function SkillSection() {
  const skills = [
    'React',
    'Vue 3',
    'JavaScript',
    'Bootstrap 5',
    'Node.js',
    'Express',
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>我的技術方向</h2>
          <p>以實作為主，持續累積前端與全端開發能力。</p>
        </div>

        <div className={styles.skillList}>
          {skills.map((skill) => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotesSection() {
  const notes = [
    {
      title: 'React 筆記',
      desc: '從基礎語法、Hooks、元件化，到 API 串接與實戰整理。',
      link: '/docs/React/class_1/install/',
    },
    {
      title: 'Vue 筆記',
      desc: '整理 Vue 3、Composition API 與前端開發常用觀念。',
      link: '/docs',
    },
    /* {
      title: 'Next.js 筆記',
      desc: '記錄 App Router、fetch、middleware 與專案實作理解。',
      link: '/docs/intro',
    }, */
  ];

  return (
    <section className={styles.sectionAlt}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>技術筆記</h2>
          <p>把學習內容整理成可重複查閱的知識資產。</p>
        </div>

        <div className="row">
          {notes.map((item) => (
            <div key={item.title} className="col col--4 margin-bottom--lg">
              <div className={styles.card}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Link to={item.link} className={styles.cardLink}>
                  前往閱讀 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectSection() {
  const projects = [
    {
      title: 'TripEasy 旅遊電商平台',
      desc: '以 Vue 3、Node.js、PostgreSQL 規劃與實作的旅遊電商 side project。',
      link: 'https://github.com/tripEasyCompany/frontend/tree/feature/asu',
    },
    {
      title: 'Collect Master',
      desc: '整合多平台收藏內容的個人專案，目前規劃以 Next.js 重構中。',
      link: 'https://github.com/sumaoxiong/collect-master-mvp',
    },
    {
      title: 'Vue3 TodoList',
      desc: '使用 Vue 3 搭配 API 串接，完成 TodoList CRUD 練習。',
      link: 'https://github.com/sumaoxiong/vue3-Todolist-API',
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>作品集</h2>
          <p>透過實際專案累積 UI、資料串接與系統規劃經驗。</p>
        </div>

        <div className="row">
          {projects.map((project) => (
            <div key={project.title} className="col col--4 margin-bottom--lg">
              <div className={styles.card}>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}>
                  查看專案 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className={styles.sectionAlt}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>更多連結</h2>
          <p>歡迎透過 GitHub 與我的技術筆記了解我目前的學習與作品。</p>
        </div>

        <div className={styles.buttons}>
          <a
            className="button button--primary button--lg"
            href="https://github.com/sumaoxiong"
            target="_blank"
            rel="noopener noreferrer">
            GitHub
          </a>

          <Link className="button button--secondary button--lg" to="/docs">
            技術筆記首頁
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`首頁 | ${siteConfig.title}`}
      description="蘇冠仰的個人網站，整理技術筆記、作品集與學習歷程。">
      <HomepageHeader />
      <main>
        <SkillSection />
        <NotesSection />
        <ProjectSection />
        <ContactSection />
      </main>
    </Layout>
  );
}