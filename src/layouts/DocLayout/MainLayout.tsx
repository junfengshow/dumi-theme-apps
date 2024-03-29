/**
 * main layout
 */
import { Layout, Menu } from 'antd';
import {
  history,
  useFullSidebarData,
  useLocation,
  useNavData,
  useOutlet,
  useSiteData,
} from 'dumi';
import DumiContent from 'dumi/theme-default/slots/Content';
import React, { useMemo } from 'react';
import styles from './MainLayout.module.less';
import SubMenu from './SubMenu';

const { Header, Content, Footer, Sider } = Layout;

const Main: React.FC = () => {
  const { pathname } = useLocation();
  const siderbar = useFullSidebarData();
  const nav = useNavData();
  const outlet = useOutlet();
  const { themeConfig } = useSiteData();

  const menu = useMemo(() => {
    return nav.map((item) => {
      const submenus = [];
      for (const key in siderbar) {
        if (
          !key.includes(item.link!) ||
          key === '/index' ||
          nav.some((it) => it.link === key)
        ) {
          continue;
        }
        const subItem = siderbar[key][0];
        submenus.push({
          label: subItem.title,
          key: key.substring(0, key.length - 2),
          children: subItem?.children.map((subItem) => ({
            label: subItem.title,
            key: subItem.link,
          })),
        });
      }
      return {
        label: item.title,
        key: item.link,
        icon: item.icon ? (
          <img src={item.icon} className={styles.navIcon} />
        ) : undefined,
        submenus,
      };
    }) as any[];
  }, [siderbar, nav, pathname]);

  const currentItem =
    pathname === '/'
      ? menu[0]
      : menu.find(
          (item) => item.key !== '/' && pathname.indexOf(item.key) !== -1,
        );

  return (
    <Layout className={styles.pageWrap}>
      <Sider
        collapsedWidth="50"
        className={styles.sider}
        width={132}
        collapsed={false}
      >
        <div className={styles.logo}>
          {!!themeConfig.logo && <img src={themeConfig.logo} alt="" />}
          <strong>{themeConfig.name}</strong>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentItem?.key || '/']}
          items={menu}
          onSelect={({ key }) => {
            const item = menu.find((it) => it.key === key);
            const first = item.submenus[0];
            let _key = first.key || key;
            if (first.children?.length) {
              _key = first.children[0].key;
            }

            history.push(_key);
          }}
          className={styles.pageMenu}
        />
      </Sider>
      <Layout className={styles.mainContent}>
        <Header className={styles.mainHeader}>
          <div className={styles.headerLeft}>
            {!!currentItem?.icon && (
              <div className={styles.headerIcon}>{currentItem?.icon}</div>
            )}
            {currentItem?.label}
          </div>
        </Header>
        <Content className={styles.pageContentWrap}>
          {!!currentItem?.submenus && (
            <SubMenu menu={currentItem?.submenus} currentItem={currentItem} />
          )}
          <div className={styles.contentWrap}>
            <DumiContent>{outlet}</DumiContent>
            <Footer className={styles.footer}>恭喜发财</Footer>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;
