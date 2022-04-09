import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import PaperSection from 'components/styled/PaperSection';
import { LatestSeries } from '../components/LatestSeries';
import { getAllSeries } from '../lib/node-only/api';
import { ImageInfo, Series } from '../collections/series/Series';

interface Props {
  latestSeries: Series;
  image: ImageInfo;
}

export const Home: React.FC<Props> = (props) => (
  <div>
    <Head>
      <title>Lydia Michelle Art</title>
      <meta property="og:image" content="https://lydiamichelle.art/imgs/logo.webp" />
    </Head>
    <section className="bg-theme-gray flex flex-col-reverse lg:flex-row" aria-label="Latest Series section">
      <LatestSeries {...props} />
    </section>

    <section className="bg-theme-pink px-5 py-16 md:py-32 relative select-text" aria-label="About section">
      <div className="md:mx-auto w-full md:w-2/3 relative flex gap-24 justify-center items-center">
        <div className="hidden md:flex border-white border-4 rounded-xl shadow-xl">
          <Image
            src="/imgs/headshot.jpg" alt="Picture of Lydia"
            height={367} width={270} layout="fixed"
            className="rounded-xl"
          />
        </div>
        <div>
          <h2 id="about" className="uppercase text-4xl font-serif font-thin tracking-wider">All about me</h2>
          <p className="font-serif text-2xl italic my-10">Let's move forward</p>
          <p className="font-light text-xl leading-loose">
            Hi, my name is Lydia. I am a self-taught artist from Texas traveling and working as a narrative surrealist painter. I work in oil
            clay, and digital mediums. I am continuously searching for new subjects and ideas to expand upon, and I find inspiration from unbridled imaginings.
          </p>
        </div>
      </div>
    </section>

    <PaperSection className="sm:pt-40 lg:py-40 select-text" aria-label="A favourite quote section">
      <div className={'w-full md:w-2/3 2xl:w-1/2 mx-auto flex items-center'
        + ' content-center flex-col-reverse lg:flex-row relative z-10'}
      >
        <blockquote className="md:w-1/2 lg:mr-24 my-24 lg:my-auto text-center lg:text-left px-5 sm:px-0">
          <p className="mb-12 text-2xl font-serif">
            "I think it would be well, and proper, and obedient, and pure,
            to grasp your one necessity and not let it go, to dangle from it
            limp wherever it takes you."
          </p>
          <cite className="italic font-hairline font-serif">Annie Dillard</cite>
        </blockquote>
        <img
          className="h-88 sm:h-auto lg:h-88 w-auto shadow-xl rounded-xl border-white border-4"
          src="/imgs/levi_graphite-and-ink.webp" height={300}
          alt="Levi - Graphite and ink"
        />
      </div>
    </PaperSection>
  </div>
);

export const getStaticProps: GetStaticProps = async (): Promise<{ props: Props }> => {
  const published = (await getAllSeries()).filter((series) => series.published);
  const latestSeries = published[0];
  let image = latestSeries.images[0];

  if (!image) {
    image = {
      title: '',
      medium: '',
      wip: false,
      image: {
        original: '',
        full: '',
        half: '',
      },
    };
  }

  return { props: { latestSeries, image } };
};

export default Home;
