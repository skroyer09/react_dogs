import Image from "next/image";
import Head from "next/head";
import { object } from "is_js";

export default function Dogs({ data }) {
  const { content } = data;
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <h1>{content.heading}</h1>
      <Image
        src={content.image.src}
        alt={content.image.alt}
        width={content.image.width}
        height={content.image.height}
        sizes="(max-width: 750px) 100vw, 750px"
      ></Image>
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const api = "https://bucolic-bombolone-857476.netlify.app/api/dogs/" + slug;
  const res = await fetch(api);
  console.log(res.status);
  if (res.status != 200) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}

export async function getStaticPaths() {
  const api = "https://bucolic-bombolone-857476.netlify.app/api/dogs/";
  const res = await fetch(api);
  const data = await res.json();

  const paths = data.map((object) => {
    return { params: { slug: object.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}
