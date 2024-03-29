import { useOutlet } from 'dumi';
import Content from 'dumi/theme-default/slots/Content';
import ContentFooter from 'dumi/theme-default/slots/ContentFooter';
import Features from 'dumi/theme-default/slots/Features';
import Footer from 'dumi/theme-default/slots/Footer';
import Header from 'dumi/theme-default/slots/Header';
import Hero from 'dumi/theme-default/slots/Hero';
import React from 'react';

const Home = () => {
  const outlet = useOutlet();
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <div>
        <Content>
          <article>{outlet}</article>
          <ContentFooter />
          <Footer />
        </Content>
      </div>
    </div>
  );
};
export default Home;
