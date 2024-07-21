import classNames from 'classnames';
import React from 'react';
import styles from './MenuCard.module.less';

const defaultImage = 'https://upload.junfengshow.com/docs/images/bg.jpeg';
const MenuCard = ({
  menu,
  selectedKey,
  onSelect,
}: {
  menu: any[];
  selectedKey: string;
  onSelect: (params: any) => void;
}) => {
  return (
    <div className={styles.cardWrap}>
      {menu.map((item, idx) => (
        <>
          {idx !== 0 && <div className={styles.divide} />}
          <div
            className={classNames(styles.cardItem, {
              [styles.cardItemActive]: selectedKey === item.key,
            })}
            key={item.key}
            onClick={() => {
              onSelect(item);
            }}
          >
            <div className={styles.cover}>
              <img src={item.icon || defaultImage} alt="" />
            </div>
            <div className={styles.label}>{item.label}</div>
          </div>
        </>
      ))}
    </div>
  );
};
export default MenuCard;
