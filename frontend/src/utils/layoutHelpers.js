const isDesktop = window.innerWidth > 1023;

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default isDesktop;
