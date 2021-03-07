import React from 'react';
import { WorkSize } from 'types/Commission';

export const WorkSizeView: React.FC<WorkSize> = ({ title, prices }) => (
  <section className="w-full">
    <header className="w-full text-center uppercase text-xl border-t-2 border-b-2 border-black">
      {title}
    </header>
    <section className="w-full py-2">
      {prices.map((price, idx) => (
        <div key={idx} className="w-full flex justify-between px-2">
          <p>{price.title}</p>
          <p>{price.value}</p>
        </div>
      ))}
    </section>
  </section>
);

export default WorkSizeView;
