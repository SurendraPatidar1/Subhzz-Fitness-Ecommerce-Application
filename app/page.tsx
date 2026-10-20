'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  size: string
  tag?: string
  image: string
  description: string
}

const products: Product[] = [
  { id: 1, name: 'Ashwagandha Mass', category: 'Weight Gainers', price: 1899, size: '1 kg', tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=85', description: 'A thoughtfully balanced blend for training days and steady nourishment.' },
  { id: 2, name: 'Plant Protein / Vanilla', category: 'Protein & Recovery', price: 2299, size: '500 g', tag: 'Clean fuel', image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=900&q=85', description: 'Smooth, plant-based protein with a clean vanilla finish.' },
  { id: 3, name: 'Turmeric + Black Pepper', category: 'Ayurvedic Wellness', price: 799, size: '60 capsules', tag: 'Daily ritual', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=85', description: 'A simple daily wellness ritual inspired by traditional botanicals.' },
  { id: 4, name: 'Lean Greens', category: 'Weight Management', price: 1499, size: '250 g', tag: 'New', image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=900&q=85', description: 'A fresh greens blend for easy everyday nutrition support.' },
  { id: 5, name: 'Moringa Superleaf', category: 'Herbal Wellness', price: 699, size: '100 g', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=900&q=85', description: 'Earthy moringa leaf powder for smoothies, bowls and daily rituals.' },
  { id: 6, name: 'Creatine Monohydrate', category: 'Protein & Recovery', price: 1199, size: '250 g', tag: 'Training essential', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85', description: 'A straightforward, unflavoured addition to your training routine.' },
  { id: 7, name: 'Saffron Balance Tea', category: 'Weight Management', price: 599, size: '20 sachets', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85', description: 'A fragrant herbal tea blend for mindful pauses throughout the day.' },
  { id: 8, name: 'Shilajit Resin', category: 'Ayurvedic Wellness', price: 1599, size: '20 g', tag: 'Ayurvedic', image: 'https://images.unsplash.com/photo-1608571423539-e951a74d00c4?auto=format&fit=crop&w=900&q=85', description: 'A concentrated botanical resin to add to a considered wellness practice.' },
]

const goals = [
  { title: 'Build strength', eyebrow: 'Power your progress', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Find your balance', eyebrow: 'Everyday wellness', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Recover better', eyebrow: 'Move with intention', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85' },
]

const faqs = [
  ['Are these products suitable for everyone?', 'Our demo catalog is for presentation purposes. Final formulations, ingredients and suitability guidance should be reviewed and approved by your qualified team before launch.'],
  ['How should I choose a product?', 'Start with your goal, then review the product details and ingredients. We recommend speaking with a healthcare professional for personalised guidance.'],
  ['Is checkout live?', 'No. This is a simulated checkout for the client presentation. No payment or order is processed.'],
]

const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState(0)

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory
    const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [activeCategory, query])

  const cartItems = products.filter((product) => cart[product.id])
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0)
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const addToCart = (product: Product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }))
    notify(`${product.name} added to your bag`)
  }

  const toggleWishlist = (id: number) => {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    notify(wishlist.includes(id) ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#141614]">
      <div className="bg-[#b8f229] px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em]">Free shipping on orders above ₹1,499 · Formulated for your everyday</div>

      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f7f7f2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Vitalforge home">
            <span className="flex h-9 w-9 items-center justify-center bg-[#141614] text-[#b8f229]"><Sparkles size={17} /></span>
            <span className="text-lg font-black tracking-[-0.07em]">VITALFORGE<span className="text-[#789f16]">.</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-[11px] font-bold uppercase tracking-[0.14em] lg:flex">
            {['Shop all', 'Weight gainers', 'Weight management', 'Ayurvedic wellness', 'Protein & recovery'].map((item) => <a href="#shop" key={item} className="transition-colors hover:text-[#789f16]">{item}</a>)}
          </nav>
          <div className="flex items-center gap-1">
            <label className="hidden items-center gap-2 border-b border-black/30 px-2 py-2 md:flex"><Search size={16} /><input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="w-20 bg-transparent text-xs outline-none placeholder:text-black/50" /></label>
            <button aria-label="Search products" className="p-3 md:hidden" onClick={() => document.getElementById('shop')?.scrollIntoView()}><Search size={19} /></button>
            <button aria-label="Wishlist" onClick={() => notify(`${wishlist.length} saved item${wishlist.length === 1 ? '' : 's'}`)} className="hidden p-3 sm:block"><Heart size={19} strokeWidth={1.7} /></button>
            <button aria-label="Open shopping bag" onClick={() => setCartOpen(true)} className="relative p-3"><ShoppingBag size={19} strokeWidth={1.7} />{cartCount > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b8f229] px-1 text-[9px] font-black">{cartCount}</span>}</button>
            <button aria-label="Open menu" className="p-3 lg:hidden" onClick={() => setMenuOpen((open) => !open)}><Menu size={20} /></button>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-black/10 bg-[#f7f7f2] px-5 py-4 lg:hidden">{['Shop all', 'Weight gainers', 'Weight management', 'Ayurvedic wellness', 'Protein & recovery'].map((item) => <a href="#shop" onClick={() => setMenuOpen(false)} key={item} className="block border-b border-black/10 py-3 text-xs font-bold uppercase tracking-[0.12em]">{item}</a>)}</nav>}
      </header>

      <section id="top" className="relative overflow-hidden bg-[#171a17] text-[#f7f7f2]">
        <div className="mx-auto grid min-h-[600px] max-w-[1440px] lg:grid-cols-[1fr_1.05fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 py-20 lg:px-16 lg:py-24"><p className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#b8f229]"><span className="h-px w-8 bg-[#b8f229]" />Nutrition, reimagined</p><h1 className="max-w-[680px] text-6xl font-black leading-[0.91] tracking-[-0.075em] sm:text-8xl lg:text-[112px]">Fuel your <span className="text-[#b8f229]">goals.</span><br />Find your <span className="italic">balance.</span></h1><p className="mt-8 max-w-[420px] text-base leading-7 text-white/65">Thoughtful sports nutrition and Ayurvedic wellness for the life you&apos;re building.</p><a href="#shop" className="mt-9 flex w-fit items-center gap-5 bg-[#b8f229] px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#141614] transition-transform hover:translate-x-1">Shop the collection <ArrowRight size={17} /></a></div>
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-0"><img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1400&q=90" alt="Athlete preparing for a workout" className="absolute inset-0 h-full w-full object-cover opacity-80" /><div className="absolute inset-0 bg-gradient-to-r from-[#171a17] via-transparent to-transparent lg:w-1/2" /><div className="absolute bottom-8 right-8 border border-white/30 px-4 py-3 text-[10px] uppercase tracking-[0.15em] text-white/80">Made for the long game</div></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10"><div className="mb-8 flex items-end justify-between"><div><p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#789f16]">Start with your intention</p><h2 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">Shop by goal</h2></div><a href="#shop" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest sm:flex">View all <ArrowRight size={15} /></a></div><div className="grid gap-3 md:grid-cols-3">{goals.map((goal) => <a href="#shop" key={goal.title} className="group relative min-h-[320px] overflow-hidden bg-black text-white"><img src={goal.image} alt={goal.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-6 left-6"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#b8f229]">{goal.eyebrow}</p><h3 className="text-3xl font-black tracking-[-0.05em]">{goal.title}</h3><span className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">Explore <ArrowRight size={14} /></span></div></a>)}</div></section>

      <section id="shop" className="bg-white py-20"><div className="mx-auto max-w-[1440px] px-5 lg:px-10"><div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#789f16]">The essentials</p><h2 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">Good habits, <span className="font-normal italic">better</span> fuel.</h2></div><div className="flex gap-2 overflow-x-auto pb-1">{['All', 'Weight Gainers', 'Weight Management', 'Ayurvedic Wellness', 'Protein & Recovery'].map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeCategory === category ? 'border-[#141614] bg-[#141614] text-white' : 'border-black/20 hover:border-black'}`}>{category}</button>)}</div></div><div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">{visibleProducts.map((product) => <article key={product.id} className="group"><div className="relative aspect-[0.88] overflow-hidden bg-[#e9e9e2]"><img src={product.image} alt={`${product.name} product`} className="h-full w-full object-cover mix-blend-multiply transition duration-700 group-hover:scale-105" /><button aria-label={`Save ${product.name}`} onClick={() => toggleWishlist(product.id)} className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white transition ${wishlist.includes(product.id) ? 'text-red-500' : 'text-black'}`}><Heart size={16} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button>{product.tag && <span className="absolute left-3 top-3 bg-[#b8f229] px-2 py-1 text-[9px] font-black uppercase tracking-wider">{product.tag}</span>}<button onClick={() => addToCart(product)} className="absolute bottom-3 left-3 right-3 translate-y-2 bg-[#141614] py-3 text-[10px] font-black uppercase tracking-widest text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">Add to bag</button></div><div className="pt-4"><div className="flex items-start justify-between gap-2"><div><p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-black/45">{product.category} · {product.size}</p><h3 className="text-sm font-bold">{product.name}</h3></div><p className="text-sm font-bold">{formatPrice(product.price)}</p></div></div></article>)}</div></div></section>

      <section className="bg-[#dcebb6] px-5 py-20 lg:px-10"><div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2"><div><p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#536f0e]">Ancient wisdom. Modern ritual.</p><h2 className="max-w-xl text-5xl font-black leading-[0.93] tracking-[-0.07em] sm:text-7xl">Wellness that meets you <span className="italic font-normal">where you are.</span></h2><p className="mt-7 max-w-md text-sm leading-7 text-black/65">Rooted in considered ingredients and made for real routines. Explore Ayurveda-inspired essentials that fit into the rhythm of your day.</p><a href="#shop" onClick={() => setActiveCategory('Ayurvedic Wellness')} className="mt-8 flex w-fit items-center gap-4 border-b border-black pb-3 text-xs font-black uppercase tracking-widest">Explore Ayurvedic wellness <ArrowRight size={16} /></a></div><div className="relative aspect-[1.15] overflow-hidden bg-[#6c8150]"><img src="https://images.unsplash.com/photo-1611073766445-2c1c4ec2b7f4?auto=format&fit=crop&w=1000&q=85" alt="Botanical ingredients and wellness ritual" className="h-full w-full object-cover mix-blend-multiply opacity-90" /><div className="absolute bottom-5 left-5 bg-[#f7f7f2] px-4 py-3 text-[10px] font-bold uppercase tracking-widest">Botanical / intentional / daily</div></div></div></section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10"><div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#789f16]">The forge notes</p><h2 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">A little knowledge goes a long way.</h2></div><a href="#journal" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest sm:flex">Read the journal <ArrowRight size={15} /></a></div><div className="grid gap-3 md:grid-cols-3">{['How to build a ritual that sticks', 'Protein, explained simply', 'The case for slowing down'].map((title, index) => <a href="#journal" key={title} className="group"><div className="aspect-[1.25] overflow-hidden bg-[#dcebb6]"><img src={['https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=85','https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&w=800&q=85','https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=85'][index]} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div><p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#789f16]">Journal · 04 min read</p><h3 className="mt-2 text-xl font-bold tracking-tight group-hover:underline">{title}</h3></a>)}</div></section>

      <section className="border-t border-black/10 bg-white"><div className="mx-auto grid max-w-[1440px] gap-4 px-5 py-20 md:grid-cols-3 lg:px-10">{[['01', 'Ingredient first', 'We keep the focus on clear, considered ingredients and honest product stories.'], ['02', 'Made for real life', 'Simple formats, thoughtful flavours and rituals that fit your actual day.'], ['03', 'Progress, your way', 'Your goals are personal. Your nutrition should be flexible enough to support them.']].map(([number, title, text]) => <div key={number} className="border-t-2 border-black pt-4"><span className="text-sm font-black text-[#789f16]">{number}</span><h3 className="mt-8 text-2xl font-black tracking-tight">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-black/55">{text}</p></div>)}</div></section>

      <section className="mx-auto max-w-[850px] px-5 py-20"><p className="mb-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#789f16]">Questions, answered</p><h2 className="mb-10 text-center text-4xl font-black tracking-[-0.06em]">Good to know.</h2>{faqs.map(([question, answer], index) => <div key={question} className="border-t border-black/20"><button className="flex w-full items-center justify-between py-5 text-left text-sm font-bold" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{question}<ChevronDown size={17} className={`transition ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-black/60">{answer}</p>}</div>)}</section>

      <footer className="bg-[#141614] px-5 py-14 text-white lg:px-10"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 border-b border-white/15 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1.5fr]"><div><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center bg-[#b8f229] text-[#141614]"><Sparkles size={15} /></span><span className="font-black tracking-[-0.06em]">VITALFORGE.</span></div><p className="mt-5 max-w-xs text-sm leading-6 text-white/50">Nutrition for the life you&apos;re building. A presentation demo — final product information subject to approval.</p></div><div><p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#b8f229]">Explore</p>{['Shop all', 'Our story', 'Journal', 'FAQs'].map((item) => <a href="#top" className="block py-1 text-sm text-white/60 hover:text-white" key={item}>{item}</a>)}</div><div><p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#b8f229]">Support</p>{['Contact us', 'Shipping & returns', 'Privacy policy', 'Terms'].map((item) => <a href="#top" className="block py-1 text-sm text-white/60 hover:text-white" key={item}>{item}</a>)}</div><div><p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#b8f229]">Stay in the loop</p><p className="mb-4 text-sm text-white/50">Notes on nutrition, movement and making progress.</p><div className="flex border-b border-white/30 py-3"><input aria-label="Email address" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40" /><button aria-label="Subscribe" onClick={() => notify('You are on the list')} className="text-[#b8f229]"><ArrowRight size={18} /></button></div></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-widest text-white/40 sm:flex-row"><span>© 2026 Vitalforge Nutrition</span><span>Designed for better days</span></div></div></footer>

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 bg-[#141614] px-5 py-3 text-xs font-bold text-white shadow-xl"><Check size={15} className="text-[#b8f229]" />{toast}</div>}

      {cartOpen && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setCartOpen(false)}><aside className="absolute right-0 top-0 h-full w-full max-w-md bg-[#f7f7f2] p-6 text-[#141614] shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-black/15 pb-5"><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#789f16]">Your selection</p><h2 className="mt-1 text-2xl font-black tracking-tight">Shopping bag <span className="text-black/40">({cartCount})</span></h2></div><button aria-label="Close shopping bag" onClick={() => setCartOpen(false)}><X size={21} /></button></div>{cartItems.length === 0 ? <div className="flex h-[70%] flex-col items-center justify-center text-center"><ShoppingBag size={30} strokeWidth={1} /><p className="mt-4 font-bold">Your bag is waiting.</p><p className="mt-2 text-sm text-black/50">Add something that supports your next move.</p></div> : <><div className="divide-y divide-black/10">{cartItems.map((product) => <div className="flex gap-4 py-5" key={product.id}><img src={product.image} alt="" className="h-20 w-20 object-cover" /><div className="flex-1"><p className="text-sm font-bold">{product.name}</p><p className="mt-1 text-xs text-black/50">{product.size} · {formatPrice(product.price)}</p><div className="mt-3 flex items-center gap-3"><button aria-label="Decrease quantity" onClick={() => setCart((current) => ({ ...current, [product.id]: Math.max(0, current[product.id] - 1) }))} className="border border-black/20 p-1"><Minus size={12} /></button><span className="text-xs font-bold">{cart[product.id]}</span><button aria-label="Increase quantity" onClick={() => addToCart(product)} className="border border-black/20 p-1"><Plus size={12} /></button></div></div><p className="text-sm font-bold">{formatPrice(product.price * cart[product.id])}</p></div>)}</div><div className="absolute bottom-0 left-0 right-0 border-t border-black/15 bg-[#f7f7f2] p-6"><div className="flex justify-between text-lg font-black"><span>Total</span><span>{formatPrice(cartTotal)}</span></div><button onClick={() => notify('Demo checkout ready — no payment processed')} className="mt-5 flex w-full items-center justify-center gap-3 bg-[#141614] py-4 text-xs font-black uppercase tracking-widest text-white">Continue to demo checkout <ArrowRight size={16} /></button><p className="mt-3 text-center text-[10px] text-black/45">Simulated checkout · no payment will be processed</p></div></>}</aside></div>}
    </main>
  )
}
