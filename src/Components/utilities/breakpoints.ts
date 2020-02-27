// For instances where we have to do responsive css in tsx, we use this common breakpoints file
// instead of referencing the values directly.
//
// This should be kept in parallel with _breakpoints.scss!

const breakpoints = {
  mobileMaxWidth: 767,
  tabletMinWidth: 768,
  tabletMaxWidth: 1024,
  desktopMinWidth: 1025
};

export default breakpoints;
