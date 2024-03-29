/**
 * main layout
 */
import {
  Helmet,
  useIntl,
  useLocation,
  useRouteMeta,
  useSidebarData,
  useSiteData,
} from 'dumi';
import React from 'react';
import Home from './Home';
import MainLayout from './MainLayout';

const Main: React.FC = () => {
  const intl = useIntl();
  const { hostname } = useSiteData();
  const { pathname } = useLocation();
  const siderbar = useSidebarData();
  const { frontmatter: fm } = useRouteMeta();

  return (
    <>
      <Helmet>
        <html lang={intl.locale.replace(/-.+$/, '')} />
        {fm.title && <title>{fm.title}</title>}
        {fm.title && <meta property="og:title" content={fm.title} />}
        {fm.description && <meta name="description" content={fm.description} />}
        {fm.description && (
          <meta property="og:description" content={fm.description} />
        )}
        {fm.keywords && (
          <meta name="keywords" content={fm.keywords.join(',')} />
        )}
        {fm.keywords &&
          fm.keywords.map((keyword) => (
            <meta key={keyword} property="article:tag" content={keyword}></meta>
          ))}
        {hostname && <link rel="canonical" href={hostname + pathname} />}
      </Helmet>
      {siderbar ? <MainLayout /> : <Home />}
    </>
  );
};
export default Main;
