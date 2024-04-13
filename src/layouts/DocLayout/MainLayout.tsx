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
import Icon3d from '../../icons/Icon3d';
import styles from './MainLayout.module.less';
import SubMenu from './SubMenu';

const { Header, Content, Footer, Sider } = Layout;

const IconDot = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
  >
    <path
      d="M658.285714 512c0 80.566857-65.718857 146.285714-146.285714 146.285714s-146.285714-65.718857-146.285714-146.285714 65.718857-146.285714 146.285714-146.285714 146.285714 65.718857 146.285714 146.285714z m-146.285714-310.857143c-171.446857 0-310.857143 139.446857-310.857143 310.857143s139.446857 310.857143 310.857143 310.857143 310.857143-139.446857 310.857143-310.857143-139.446857-310.857143-310.857143-310.857143zM950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z"
      fill=""
    ></path>
  </svg>
);

const Main: React.FC = () => {
  const { pathname } = useLocation();
  const siderbar = useFullSidebarData();
  const nav = useNavData();
  const outlet = useOutlet();
  const { themeConfig } = useSiteData();

  const menu = useMemo(() => {
    // console.log(siderbar);
    return nav.map((item) => {
      const submenus: any[] = [];
      for (const key in siderbar) {
        if (!key.includes(item.link!) || key === '/index') {
          continue;
        }
        const subItems = siderbar[key]; // title 为undefined 的是未分组的页面

        subItems.sort((a, b) => b.order - a.order);
        subItems.forEach((subItem) => {
          if (!subItem.title) {
            submenus.push(
              ...(subItem?.children.map((subItem) => ({
                label: subItem.title,
                key: subItem.link,
              })) || []),
            );
            return;
          }
          submenus.push({
            label: subItem.title,
            order: subItem.order,
            key: key.substring(0, key.length - 2),
            children: subItem?.children.map((subItem) => ({
              label: subItem.title,
              key: subItem.link,
            })),
          });
        });
      }
      return {
        label: item.title,
        key: item.link,
        icon: item.icon ? (
          <img src={item.icon} className={styles.navIcon} />
        ) : (
          <IconDot />
        ),
        submenus,
      };
    }) as any[];
  }, [siderbar, nav]);

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
          <div className={styles.logoRight}>
            <div>{themeConfig.name}</div>
            {!!themeConfig.subName && (
              <div className={styles.logoSubName}>{themeConfig.subName}</div>
            )}
          </div>
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
            <div className={styles.headerIcon}>
              <Icon3d />
              <strong>{currentItem.label}</strong>
            </div>
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
