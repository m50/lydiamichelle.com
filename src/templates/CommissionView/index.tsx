import React from 'react';
import { Commission } from 'types/Commission';
import { WorkSizeView } from './WorkSizeView';

interface Props {
  commission: Commission;
  className?: string;
}

export const CommissionView: React.FC<Props> = ({ commission, className }) => (
  <article className={`flex flex-col w-full ${className}`}>
    <header className="flex flex-col justify-center content-center items-center uppercase mb-12">
      <h2 className="text-6xl mb-5 text-center">{commission.title} Comissions</h2>
      <h3 className="text-md">{commission.type}</h3>
    </header>
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 mb-12">
      {commission.workSizes.map((workSize, idx) => <WorkSizeView key={idx} {...workSize} />)}
      <section className="w-full">
        <header className="w-full text-center uppercase text-xl border-t-2 border-b-2 border-black">
          {commission.additionalInfo.title}
        </header>
        <p className="py-2 px-2">{commission.additionalInfo.body}</p>
      </section>
    </div>
    <small className="text-sm">
      <p>
        Any and all work made for a client is the sole intellectual property of the artist
        (Lydia Bullock). No reproduction or use can be used without the artists
        direct knowledge or consent. Under no circumstances may you download,
        reproduce, public or distribute elsewhere, in any medium, any of the images
        for commercial purposes, without proper and prior written permission from the artist.
      </p>
    </small>
  </article>
);

export default CommissionView;
