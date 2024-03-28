import { useFullSidebarData, useLocation, useNavData } from 'dumi';
import React, { useMemo } from 'react';
import styles from './index.module.less';

const SideMenu: React.FC = () => {
  const siderbar = useFullSidebarData();
  const nav = useNavData();
  const { pathname } = useLocation();

  const calcedNav = useMemo(() => {
    const result = [];
    for (const key in siderbar) {
      if (
        !key.includes(pathname) ||
        key === '/index' ||
        nav.some((it) => it.link === key)
      ) {
        continue;
      }
      result.push(siderbar[key][0]);
    }
    return result;
  }, [siderbar, nav, pathname]);
  return (
    <div className={styles.wrap}>
      {calcedNav?.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          {item.children?.map((subItem) => (
            <div key={subItem.title}>
              <div>{subItem.title}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default SideMenu;
