import { GetStaticProps } from 'next';
import Head from 'next/head'
import { LatestSeries } from '../components/LatestSeries'
import { getAllSeries } from '../lib/api';
import { ImageInfo, Series } from '../types/Series';

interface Props {
  latestSeries: Series;
  image: ImageInfo;
}

export const Home: React.FC<Props> = (props) => {
  return (
    <div>
      <Head>
        <title>Lydia Michelle Art</title>
        <meta property="og:image" content="https://lydiamichelle.art/imgs/logo.png" />
      </Head>
      <section className="bg-theme-gray flex flex-col-reverse lg:flex-row" aria-label="Latest Series section">
        <LatestSeries {...props} />
      </section>

      <section className="bg-theme-pink px-5 py-16 md:py-32 relative select-text" aria-label="About section">
        <div className="md:mx-auto w-full md:w-2/3 lg:w-1/2 relative">
          <h2 className="uppercase text-4xl font-serif font-thin tracking-wider">All about me</h2>
          <p className="font-serif text-2xl italic my-10">Let's move forward</p>
          <p className="font-light text-xl leading-loose">
            Hi, my name is Lydia. I am a self-taught artist from Texas.
            I work in many different mediums, including pen and ink, oil, acrylics,
            clay sculpture and ceramics. My ambitions include going to university to get
            a degree in the fine arts and education. I hope to one day become a professor
            where I can give others the reigns to the artistic experience. I also wish
            to use the arts as a way to give relief and therapy for others whom have
            suffered great trauma such as domestic and sexual abuse survivors.
            My current projects are my illustrative art series Greenly, and an upcoming
            novel intended as art therapy for sexual assault survivors.
          </p>
        </div>
      </section>

      <section className="bg-white sm:pt-40 lg:py-40 relative select-text" aria-label="A favourite quote section">
        <img className="absolute opacity-25 top-0 left-0 w-full h-full object-cover object-center select-none"
          src="/imgs/grunge-paper-texture.jpg" alt="Section paper texture" unselectable="on" />
        <div className="w-full md:w-2/3 2xl:w-1/2 mx-auto flex items-center content-center flex-col-reverse lg:flex-row relative z-10">
          <blockquote className="md:w-1/2 lg:mr-24 my-24 lg:my-auto text-center lg:text-left px-5 sm:px-0">
            <p className="mb-12 text-2xl font-serif">
              "I think it would be well, and proper, and obedient, and pure,
              to grasp your one necessity and not let it go, to dangle from it
              limp wherever it takes you."
            </p>
            <cite className="italic font-hairline font-serif">Annie Dillard</cite>
          </blockquote>
          <img className="h-88 sm:h-auto lg:h-88 w-auto shadow-xl"
            src="/imgs/levi_graphite-and-ink.webp" height={300}
            alt="Levi - Graphite and ink" />
        </div>
      </section>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: Props }> => {
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
    }
  }

  return { props: { latestSeries, image } };
}

export default Home;
