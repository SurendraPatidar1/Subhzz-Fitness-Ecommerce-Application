import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product-detail'
import { demoProducts, getProduct } from '@/lib/demo-store'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return demoProducts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug)
  if (!product) return { title: 'Product not found | SHUBZZ FITNESS' }
  return { title: product.seoTitle, description: product.seoDescription, alternates: { canonical: `/product/${product.slug}` }, openGraph: { title: product.seoTitle, description: product.seoDescription, images: product.images } }
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
