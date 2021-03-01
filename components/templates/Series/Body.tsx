import React from 'react';
import { Remark } from 'react-remark';
import remarkGemoji from 'remark-gemoji';

export const Body: React.FC<{ content: string }> = ({ content }) => (
  <section className="mx-auto bg-theme-pink p-5">
      <summary className="mx-auto w-full md:w-2/3 lg:w-1/2 markdown">
        <Remark remarkPlugins={[remarkGemoji]}>{content}</Remark>
      </summary>
    </section>
);

export default Body;
