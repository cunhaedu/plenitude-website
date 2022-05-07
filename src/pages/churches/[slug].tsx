import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IChurch } from '../../interfaces/IChurch';
import { churches } from './churchs';

type ChurchProps = {
  church: IChurch;
};

type Params = ParsedUrlQuery & {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default function Church({ church }: ChurchProps) {
  return (
    <h1>{church.name}</h1>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;

  console.log(slug);

  const church = churches.find(e => e.identifier === slug);

  if (!church) {
    return {
      redirect: {
        permanent: false,
        destination: "/churches"
      }
    }
  }

  return {
    props: {
      church,
    },
    // revalidate: 60 * 60 * 24, // 24 hours
  };
};
