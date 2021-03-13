
export const formClasses = `
  w-full mx-auto relative z-10 pb-20 pt-5
  flex items-center content-center flex-col
  md:w-2/3 2xl:w-1/2
`;

const sharedClasses = `
  border rounded-lg w-full mt-5 p-3 bg-opacity-10
  lg:w-1/2
`;
export const errorClasses = `
  text-red-500 border-red-500 bg-red-400
  ${sharedClasses}
`;
export const successClasses = `
  text-theme-green border-theme-green bg-theme-green-light
  ${sharedClasses}
`;
