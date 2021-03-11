import React from 'react';

const Broken = () => {
  const onClick = () => {
    throw new Error('Example');
  }

  return <button onClick={onClick}>Click me for error!</button>;
}

export default Broken;
