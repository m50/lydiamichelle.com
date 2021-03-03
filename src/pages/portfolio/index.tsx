import { Image } from 'components/Image';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { getAllSeries } from '../../lib/api';
import { Series } from '../../types/Series';

interface Props {
  published: Series[];
}

const anchorStyles = `
  group text-theme-gray flex flex-col py-2 px-5 my-20
  md:flex-row justify-start items-center content-center relative
  transform transition-transform ease-in-out duration-300
  hover:translate-x-10 hover:translate-y-1 focus:translate-x-10 focus:translate-y-1
`;
const nbspDivStyles = `
  hidden lg:block absolute top-0 left-0 w-full h-full bg-theme-pink skew-x-12
  transform transition-transform ease-in-out duration-300 origin-left scale-x-0
  group-hover:scale-x-100
`;

export const Portfolio: React.FC<Props> = ({ published }) => {
  const [bg, setBg] = useState('');
  const [bgActive, setBgActive] = useState(false);
  const bgImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bgImg && bgImg.current) {
      bgImg.current.src = bg;
    }
  }, [bg, bgImg]);

  return (
    <div className="w-full py-16 flex justify-center bg-no-repeat bg-cover bg-center">
      <Head>
        <title>Portfolio | Lydia Michelle Art</title>
      </Head>
      <div className={
        `z-0 absolute inset-0 transition-opacity ease-in-out duration-150 ${bgActive ? 'opacity-25' : 'opacity-0'}`
      }>
        <Image className="w-full h-full object-cover object-center" ref={bgImg} src="" alt="" />
      </div>
      <section className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        {published.map((series) => {
          const image = series.images[0];
          const onMouseEnter = () => {
            if (image && image.image) {
              setBgActive(true);
              setBg(image.image);
            }
          }
          return (
            <Link href={`portfolio/${series.slug}`} key={series.slug}>
              <a className={anchorStyles}
                onMouseEnter={onMouseEnter} onMouseLeave={() => setBgActive(false)}
              >
                <div className={nbspDivStyles}>&nbsp;</div>
                <h2 className="relative tracking-widest uppercase inline-block text-4xl lg:text-5xl font-serif">
                  {series.title}
                </h2>
                <div className="relative md:ml-10 text-center md:text-left">
                  <p className="text-xs md:text-sm">{series.excerpt}</p>
                  <cite className="text-xs md:text-sm opacity-75">{series.date_published}</cite>
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
  const published = getAllSeries().filter(series => series.published);

  return { props: { published } };
}

export default Portfolio;
