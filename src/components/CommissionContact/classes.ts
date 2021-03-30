import { cl } from 'lib/helpers';

export const formClasses = cl`
  w-full mx-auto relative z-10 pb-20 pt-5
  flex items-center content-center flex-col
  md:w-2/3 2xl:w-1/2
`;

const sharedClasses = cl`
  border rounded-lg w-full mt-5 p-3 bg-opacity-10
  lg:w-1/2
`;
export const errorClasses = cl`
  text-red-500 border-red-500 bg-red-400
  ${sharedClasses}
`;
export const successClasses = cl`
  text-theme-green border-theme-green bg-theme-green-light
  ${sharedClasses}
`;
