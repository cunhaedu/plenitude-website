import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='pt-BR'>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

        </body>
      </Html>
    );
  }
}
