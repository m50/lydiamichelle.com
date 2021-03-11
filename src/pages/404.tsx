import Error from 'next/error';
import React from 'react';

const NotFound: React.FC = () => <Error statusCode={404} />;
export default NotFound;
