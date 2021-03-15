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

  return <NextError statusCode={statusCode} />;
};

MyError.getInitialProps = ({ res, err }) => {
  let statusCode = 500;
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode ?? 500;
  }

  return { statusCode, err } as ErrorProps;
};

export default MyError;
