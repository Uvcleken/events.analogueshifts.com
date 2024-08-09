export const toggleSection = (section: any, setOpenSection: any) => {
  setOpenSection((prevSection: any) =>
    prevSection === section ? section : section
  );
};

export const handleClickOutside = (event: any, setOpenSection: any) => {
  if (event.target.className && typeof event.target.className === "string") {
    if (event.target.className.includes("unclose")) {
      return;
    }
  }
  if (!event.target.closest(".section")) {
    setOpenSection(null);
  }
};
