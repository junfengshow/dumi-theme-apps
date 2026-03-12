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
      {/* <Grainient
        color1="#e3d6ff"
        color2="#b3ccff"
        color3="#cccfff"
        timeSpeed={0.5}
        colorBalance={0}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      /> */}
      <div className={styles.content}>
        <div className={styles.blur}></div>
        <a href={nav[0]?.link || '/'}>点击进入</a>
      </div>
    </div>
  );
};
export default Home;
