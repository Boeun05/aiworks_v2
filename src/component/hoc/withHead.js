import Head from 'next/head';

function withHead(Component, title, description) {
  const C = (props) => {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <Component {...props} />
      </>
    );
  };

  return C;
}

export default withHead;
