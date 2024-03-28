import { Menu } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { history, useLocation } from 'umi';
import styles from './SubMenu.module.less';

const PageSubMenu: React.FC<any> = ({ menu, currentItem }) => {
  const { pathname } = useLocation();
  const [openKeys, setOpenkeys] = useState(() =>
    menu.map((item: any) => item.key),
  );
  useEffect(() => {
    setOpenkeys(menu.map((item: any) => item.key));
  }, [currentItem]);
  return (
    <div className={classNames('scrollbar-hidden', styles.menuWrap)}>
      <Menu
        mode="inline"
        className={styles.pageSubMenu}
        onSelect={({ key }) => {
          history.push(key);
        }}
        selectedKeys={[pathname]}
        items={menu}
        openKeys={openKeys}
        onOpenChange={(openKeys) => {
          setOpenkeys(openKeys);
        }}
      />
    </div>
  );
};
export default PageSubMenu;
