export const handleSCroll = (setPosition: any) => {
  if (window.scrollY >= 27) {
    setPosition(-70);
  } else {
    setPosition(0);
  }
};
