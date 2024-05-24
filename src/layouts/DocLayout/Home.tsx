import { useSiteData } from 'dumi';
import React, { useRef } from 'react';
import styles from './Home.module.less';

const defaultImage = 'https://upload.junfengshow.com/docs/images/bg.jpeg';
const Home = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { themeConfig } = useSiteData();
  const imageUrl = themeConfig.bgImageUrl || defaultImage;
  const imageSmallUrl =
    themeConfig.bgImageUrlSmall ||
    themeConfig.bgImageUrl ||
    `${defaultImage}?imageView2/2/w/200`;

  // 第一层应用
  const nav = (themeConfig.nav || []) as any[];

  return (
    <div className={styles.wrap}>
      <img
        ref={imageRef}
        src={imageSmallUrl}
        alt=""
        className={styles.image}
        onLoad={() => {
          if (imageRef.current && imageRef.current?.src !== imageUrl) {
            imageRef.current.src = imageUrl;
          }
        }}
      />
      <div className={styles.content}>
        <div className={styles.blur}></div>
        <a href={nav[0]?.link || '/'}>点击进入</a>
      </div>
    </div>
  );
};
export default Home;
