'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { brandConfig, formatIndianPrice, getProductWhatsAppUrl } from '@/lib/brand-config'

const catalog = {
  'premium-weight-loss-formula': { name: 'Premium Weight Loss Formula', category: 'Weight Management', price: 899, size: '210 g · 30 servings', image: '/products/weight-loss.png' },
  'premium-weight-gainer': { name: 'Premium Weight Gainer', category: 'Weight Gainers', price: 999, size: '300 g · 30 servings', image: '/products/weight-gainer.png' },
  'premium-creatine-monohydrate-pro': { name: 'Premium Creatine Monohydrate Pro', category: 'Protein & Recovery', price: 1199, size: '120 g', image: '/products/creatine.png' },
  'premium-pre-workout': { name: 'Premium Pre Workout', category: 'Protein & Recovery', price: 1299, size: '300 g · 30 servings', image: '/products/pre-workout.png' },
} as const

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [quantity, setQuantity] = useState(1)
  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)
  const [slug, setSlug] = useState('premium-weight-loss-formula')
  useMemo(() => { params.then(({ slug: value }) => setSlug(value)) }, [params])
  const product = catalog[slug as keyof typeof catalog] || catalog['premium-weight-loss-formula']
  const addToCart = () => { localStorage.setItem('demoCart', JSON.stringify([{ ...product, quantity }])); setAdded(true) }
  return <main className="min-h-screen bg-[#f7f7f2] text-[#141614]"><header className="border-b border-black/10 px-5 py-5"><Link href="/" className="text-xs font-black uppercase tracking-widest">← Back to SHUBZZ FITNESS</Link></header><div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 lg:grid-cols-2"><div className="aspect-square bg-white p-5"><img src={product.image} alt={`${product.name} product`} className="h-full w-full object-contain" /></div><section className="flex flex-col justify-center"><p className="text-xs font-black uppercase tracking-widest text-[#789f16]">{product.category}</p><h1 className="mt-4 text-5xl font-black tracking-[-0.07em]">{product.name}</h1><p className="mt-5 text-3xl font-black">₹{product.price.toLocaleString('en-IN')} <span className="text-sm font-normal text-black/50">demo price</span></p><p className="mt-5 text-sm text-black/60">{product.size}. Formulation details, ingredients, directions and safety information are to be confirmed by the SHUBZZ FITNESS team before launch.</p><div className="mt-8 flex items-center gap-3"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="border p-3"><Minus size={16}/></button><span className="w-8 text-center font-bold">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="border p-3"><Plus size={16}/></button></div><div className="mt-5 flex gap-3"><button onClick={addToCart} className="flex flex-1 items-center justify-center gap-3 bg-[#141614] px-6 py-4 text-xs font-black uppercase tracking-widest text-white"><ShoppingBag size={16}/> {added ? 'Added to demo cart' : 'Add to cart'}</button><a href={getProductWhatsAppUrl(product.name, quantity, product.price, product.size)} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-[#25D366] px-4 text-xs font-black uppercase tracking-widest text-white">WhatsApp</a><button onClick={() => setSaved(!saved)} aria-label="Wishlist" className={`border px-5 ${saved ? 'text-red-600' : ''}`}><Heart fill={saved ? 'currentColor' : 'none'} /></button></div><div className="mt-10 border-t border-black/15 pt-6 text-sm leading-7 text-black/60"><p><strong className="text-black">Safety:</strong> Demo content only. Review the final label and consult a qualified professional for suitability.</p><p className="mt-3"><strong className="text-black">Shipping:</strong> Demo shipping estimate shown at checkout. No real order is fulfilled.</p></div></section></div></main>
}
