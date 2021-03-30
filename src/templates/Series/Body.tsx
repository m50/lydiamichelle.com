import React from 'react';
import { Remark } from 'react-remark';
import remarkGemoji from 'remark-gemoji';

export const Body: React.FC<{ content: string }> = ({ content }) => (
  <div className="bg-theme-pink px-5 py-12">
    <section className="mx-auto w-full md:w-2/3 lg:w-1/2 prose xl:prose-xl max-w-none">
      <Remark remarkPlugins={[remarkGemoji]}>{content}</Remark>
    </section>
  </div>
);

export default Body;
