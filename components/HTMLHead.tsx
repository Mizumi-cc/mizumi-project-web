import { NextSeo } from "next-seo"
import { MetaTag } from "next-seo/lib/types"
import Head from "next/head"

interface HTMLHeadProps {
  title?: string
  description?: string
  meta?: ReadonlyArray<MetaTag>
  socialShareImage?: string
  socialShareUrl?: string
  addDefaultMeta?: boolean
}

const HTMLHead = ({
  title = '',
  description = '',
  meta = [],
  socialShareImage = '',
  socialShareUrl = '',
  addDefaultMeta = true,
}: HTMLHeadProps) => {
  const metaTitle = title ? title : 'Mizumi Inc.'
  const metaDescription = description ? description : 'Mizumi is a decentralised exchange for stable-coin and national currency swaps. We are building a bridge between the crypto and traditional financial worlds.'
  const metaSocialShareImage = socialShareImage ? socialShareImage : 'https://mizumi.cc/img/mizumi-text.png'
  const metaTwitter = 'https://twitter.com/MizumiInc'
  const metaSocialShareUrl = socialShareUrl ? socialShareUrl : metaTwitter

  const defaultMeta: ReadonlyArray<MetaTag> = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: metaTitle,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:image',
      content: metaSocialShareImage,
    },
    {
      property: 'og:url',
      content: metaSocialShareUrl,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      content: metaSocialShareImage,
    },
    {
      name: 'twitter:title',
      content: metaTitle,
    },
    {
      name: 'twitter:site',
      content: metaTwitter,
    },
    {
      name: 'twitter:url',
      content: metaSocialShareUrl,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'msapplication-TileColor',
      content: '#ffffff',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
    {
      name: 'keywords',
      content: 'Mizumi, Inc., Mizumi, Mizumi Inc, Mizumi Inc., Mizumi Inc, Mizumi Inc., stablecoin - fiat swaps, decentralized, crypto, Solana, Solana blockchain, Africa'
    },

    ...meta
  ]

  return (
    <>
      <NextSeo 
        {...(addDefaultMeta && { metaTitle })}
        titleTemplate={`%s | ${metaTitle}`}
        additionalMetaTags={addDefaultMeta ? defaultMeta : meta}
      />
      <Head>
        <title>{metaTitle}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
    </>
  )
}

export default HTMLHead
