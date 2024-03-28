import { useSiteData } from 'dumi';
import DumiHeroTitle from 'dumi/theme-default/slots/HeroTitle';
import React from 'react';

const HeroTitle: typeof DumiHeroTitle = (props) => {
  const { themeConfig } = useSiteData();

  return (
    <>
      <DumiHeroTitle {...props} />
      <sup>{themeConfig.hello}</sup>
    </>
  );
};

export default HeroTitle;
