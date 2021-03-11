import React from 'react';
import { captureException } from '@sentry/react';
import NextError from 'next/error';
import { NextPage } from 'next';

interface ErrorProps {
  statusCode: number;
  err: Error;
}

const MyError: NextPage<ErrorProps> = ({ statusCode, err }) => {
  if (err) {
    captureException(err);
  }

  return <NextError statusCode={statusCode} />
}

MyError.getInitialProps = ({ res, err }) => {
  const statusCode = (res ? res.statusCode : (err ? err.statusCode : 500));

  return { statusCode, err } as ErrorProps;
}

export default MyError;
