'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, Minus, Plus, ShoppingBag } from 'lucide-react'
import { brandConfig, formatIndianPrice, getProductWhatsAppUrl } from '@/lib/brand-config'
import { demoProducts, formatPrice, saveCart, type DemoProduct } from '@/lib/demo-store'

export function ProductDetail({ product }: { product: DemoProduct }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [openPanel, setOpenPanel] = useState('overview')
  const [added, setAdded] = useState(false)

  const addToCart = (buyNow = false) => {
    const current = (() => { try { return JSON.parse(localStorage.getItem('shubzz-cart') || '{}') } catch { return {} } })()
    current[product.id] = (current[product.id] || 0) + quantity
    saveCart(current)
    if (buyNow) window.location.href = '/checkout'
    else setAdded(true)
  }

  const related = demoProducts.filter((item) => item.id !== product.id)
  const stockLabel = product.stockStatus === 'low-stock' ? 'Limited demo stock' : product.stockStatus === 'in-stock' ? 'In stock' : 'Currently unavailable'
  const panels = [
    ['overview', 'Product overview', product.description],
    ['ingredients', 'Ingredients & composition', product.ingredients || 'Full ingredient information to be confirmed by the brand.'],
    ['usage', 'How to use', product.usageInstructions || 'Please follow the directions on the product label.'],
    ['information', 'Product information', `${product.netWeight}${product.flavour ? ` · ${product.flavour} flavour` : ''}. Packaging and manufacturer details are to be confirmed by the brand.`],
    ['shipping', 'Shipping & returns', product.shippingInformation + ' Return policy is to be confirmed by the brand.'],
    ['safety', 'Safety information', 'Supplements are not substitutes for a balanced diet. Read the product label and consult a qualified healthcare professional if you have a medical condition, take medication, or are unsure whether this product is suitable for you.'],
  ]

  return <main className="min-h-screen bg-[#111311] text-[#f7f7f2]">
    <header className="border-b border-white/10 px-5 py-5"><div className="mx-auto flex max-w-7xl items-center justify-between"><Link href="/" className="text-xs font-black uppercase tracking-[0.16em]">SHUBZZ FITNESS<span className="text-[#b8f229]">.</span></Link><Link href="/#shop" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white">Back to shop</Link></div></header>
    <div className="mx-auto max-w-7xl px-5 py-8 sm:py-12"><p className="mb-8 text-[10px] font-bold uppercase tracking-[0.16em] text-[#b8f229]"><Link href="/">Home</Link> / <Link href="/#shop">Shop</Link> / {product.name}</p>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><div className="aspect-square overflow-hidden bg-white p-4 sm:p-8"><img src={product.images[activeImage]} alt={`${product.name}, ${product.netWeight}${product.flavour ? `, ${product.flavour} flavour` : ''}`} className="h-full w-full object-contain" /></div>{product.images.length > 1 && <div className="mt-3 flex gap-3">{product.images.map((image, index) => <button key={image} onClick={() => setActiveImage(index)} className={`h-20 w-20 bg-white p-2 ${activeImage === index ? 'ring-2 ring-[#b8f229]' : 'opacity-60'}`}><img src={image} alt="" className="h-full w-full object-contain" /></button>)}</div>}</div>
        <section className="flex flex-col justify-center"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b8f229]">{product.category}</p><h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">{product.name}</h1><p className="mt-5 text-sm text-white/60">{product.netWeight}{product.flavour ? ` · ${product.flavour} flavour` : ''}</p><div className="mt-7 flex flex-wrap items-center gap-3"><span className="text-3xl font-black">{formatPrice(product.price)}</span><span className="border border-[#b8f229]/40 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#b8f229]">Demo price</span></div><p className="mt-6 max-w-xl text-sm leading-7 text-white/65">{product.description}</p><p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#b8f229]">{stockLabel}</p><div className="mt-7 flex items-center gap-3"><div className="flex items-center border border-white/20"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-white/10"><Minus size={15} /></button><span className="w-10 text-center text-sm font-bold">{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-white/10"><Plus size={15} /></button></div><button onClick={() => addToCart()} disabled={product.stockStatus === 'out-of-stock'} className="flex flex-1 items-center justify-center gap-3 bg-[#b8f229] px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[#111311] disabled:opacity-40"><ShoppingBag size={16} />{added ? 'Added to cart' : 'Add to cart'}</button></div><div className="mt-3 grid gap-3 sm:grid-cols-2"><button onClick={() => addToCart(true)} className="border border-white/30 px-4 py-4 text-[10px] font-black uppercase tracking-widest hover:border-[#b8f229]">Buy now</button><a href={getProductWhatsAppUrl(product.name, quantity, product.price, `${product.netWeight}${product.flavour ? ` · ${product.flavour}` : ''}`)} target="_blank" rel="noreferrer" className="bg-[#25D366] px-4 py-4 text-center text-[10px] font-black uppercase tracking-widest text-white">WhatsApp order</a></div><p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-white/50">{product.shippingInformation}<br />All prices and stock shown here are illustrative demo-store values.</p></section></div>
      <section className="mt-16 border-y border-white/10">{panels.map(([id, title, content]) => <div key={id} className="border-b border-white/10 last:border-b-0"><button className="flex w-full items-center justify-between py-5 text-left text-sm font-bold" onClick={() => setOpenPanel(openPanel === id ? '' : id)}><span>{title}</span><ChevronDown size={17} className={`transition ${openPanel === id ? 'rotate-180 text-[#b8f229]' : ''}`} /></button>{openPanel === id && <p className="max-w-3xl pb-5 text-sm leading-7 text-white/60">{content}</p>}</div>)}</section>
      <section className="mt-16"><p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#b8f229]">Keep exploring</p><h2 className="text-4xl font-black tracking-[-0.06em]">You may also like.</h2><div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-3">{related.map((item) => <article key={item.id} className="bg-[#1b1e1b] p-3 sm:p-5"><Link href={`/product/${item.slug}`}><div className="aspect-square bg-white p-3"><img src={item.images[0]} alt={item.name} className="h-full w-full object-contain" /></div><h3 className="mt-4 text-sm font-bold leading-tight">{item.name}</h3></Link><p className="mt-2 text-xs text-white/50">{item.netWeight} · <span className="text-[#b8f229]">{formatIndianPrice(item.price)} demo</span></p><div className="mt-4 flex gap-2"><Link href={`/product/${item.slug}`} className="flex-1 border border-white/20 px-2 py-3 text-center text-[9px] font-black uppercase tracking-widest">Details</Link><button onClick={() => { const current = (() => { try { return JSON.parse(localStorage.getItem('shubzz-cart') || '{}') } catch { return {} } })(); current[item.id] = (current[item.id] || 0) + 1; saveCart(current) }} className="border border-[#b8f229] px-3 py-3 text-[9px] font-black uppercase tracking-widest text-[#b8f229]">Add</button></div></article>)}</div></section>
    </div>
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#111311]/95 p-3 backdrop-blur lg:hidden"><button onClick={() => addToCart()} className="w-full bg-[#b8f229] py-4 text-[10px] font-black uppercase tracking-widest text-[#111311]">Add {quantity} to cart · {formatIndianPrice(product.price * quantity)}</button></div>
  </main>
}
