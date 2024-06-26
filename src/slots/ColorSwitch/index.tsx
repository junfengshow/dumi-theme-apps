import { useSiteData } from 'dumi';
import ColorSwitch from 'dumi/theme-default/slots/ColorSwitch';
import React from 'react';

const MyColorSwitch: typeof ColorSwitch = (props) => {
  const { themeConfig } = useSiteData();
  return (
    <>
      <ColorSwitch {...props} />
      <sup>{themeConfig.hello}</sup>
    </>
  );
};

export default MyColorSwitch;
