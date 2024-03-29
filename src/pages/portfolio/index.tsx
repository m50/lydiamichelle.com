import React, { useState } from 'react';
import { Image } from 'components/Image';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getInstagramData } from 'lib/instagram';
import { cl } from 'lib/helpers';
import { getAllSeries } from 'lib/node-only/api';
import { Paths, Series } from 'collections/series/Series';

interface Props {
  published: Series[];
}

const anchorStyles = cl`
  group text-theme-gray flex flex-col py-2 px-5 my-20
  md:flex-row justify-start items-center content-center relative
  transform transition-transform ease-in-out duration-300
  hover:translate-x-10 hover:translate-y-1 focus:translate-x-10 focus:translate-y-1
`;
const nbspDivStyles = cl`
  hidden lg:block absolute top-0 left-0 w-full h-full bg-theme-pink skew-x-12
  transform transition-transform ease-in-out duration-300 origin-left scale-x-0
  group-hover:scale-x-100
`;

export const Portfolio: React.FC<Props> = ({ published }) => {
  const [bg, setBg] = useState<Paths>({ original: '', full: '', half: '' });
  const [bgActive, setBgActive] = useState(false);

  return (
    <div className="w-full py-16 flex justify-center bg-no-repeat bg-cover bg-center">
      <Head>
        <title>Portfolio | Lydia Michelle Art</title>
        <meta property="og:image" content="https://lydiamichelle.art/imgs/logo.webp" />
      </Head>
      <div className={cl`
        z-0 absolute inset-0 transition-opacity ease-in-out duration-150
        ${bgActive ? 'opacity-25' : 'opacity-0'}
      `}
      >
        <Image className="w-full h-full object-cover object-center" paths={bg} alt="" />
      </div>
      <section className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        {published.map((series) => {
          const idx = Math.floor(Math.random() * series.images.length);
          const image = series.images[idx];
          const onMouseEnter = () => {
            if (image && image.image) {
              setBgActive(true);
              setBg(image.image);
            }
          };
          return (
            <Link href={`portfolio/${series.slug}`} key={series.slug}>
              <a className={anchorStyles} onMouseEnter={onMouseEnter} onMouseLeave={() => setBgActive(false)}>
                <Head>
                  <link rel="preload" as="image" href={image.image.half} />
                  <link rel="preload" as="image" href={image.image.full} />
                </Head>
                <div className={nbspDivStyles}>&nbsp;</div>
                <h2 className="relative tracking-widest uppercase inline-block text-4xl lg:text-5xl font-serif">
                  {series.title}
                </h2>
                <div className="relative md:ml-10 text-center md:text-left">
                  <p className="text-xs md:text-sm">{series.excerpt}</p>
                  <cite className="text-xs md:text-sm opacity-75">{new Date(series.date_published).getFullYear()}</cite>
                </div>
              </a>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{ props: Props }> => {
  const series = (await getAllSeries()).filter((s) => s.published);
  const instagram = await getInstagramData();
  const published = [instagram, ...series];

  return { props: { published } };
};

export default Portfolio;
