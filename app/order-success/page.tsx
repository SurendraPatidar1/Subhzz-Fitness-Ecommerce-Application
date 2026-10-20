'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { formatPrice, getDemoOrder } from '@/lib/demo-store'

type Order = ReturnType<typeof getDemoOrder>

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order>(null)

  useEffect(() => setOrder(getDemoOrder()), [])

  return (
    <main className="min-h-screen bg-[#dcebb6] px-5 py-12 text-[#141614] sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-black uppercase tracking-widest text-[#536f0e]">SHUBZZ FITNESS demo order</p>
        <h1 className="mt-5 text-5xl font-black tracking-[-0.08em] sm:text-6xl">You&apos;re all set.</h1>
        <p className="mt-5 max-w-lg text-black/60">This is a demonstration and no real order has been fulfilled.</p>

        <section className="mt-10 space-y-6 bg-white p-5 sm:p-8" aria-label="Order details">
          <div className="grid gap-4 border-b border-black/10 pb-6 sm:grid-cols-2">
            <div><p className="text-[10px] font-black uppercase tracking-widest text-black/45">Order ID</p><p className="mt-2 font-bold">{order?.id || 'SHZ-DEMO-PREVIEW'}</p></div>
            <div><p className="text-[10px] font-black uppercase tracking-widest text-black/45">Payment status</p><p className="mt-2 font-bold text-[#536f0e]">Demo successful</p></div>
            <div><p className="text-[10px] font-black uppercase tracking-widest text-black/45">Transaction ID</p><p className="mt-2 font-bold">{order?.transactionId || 'DEMO-TXN-PREVIEW'}</p></div>
          </div>

          <div className="grid gap-6 border-b border-black/10 pb-6 sm:grid-cols-2">
            <div><p className="text-[10px] font-black uppercase tracking-widest text-black/45">Customer</p><p className="mt-2 font-bold">{order?.checkout?.name || 'Preview customer'}</p><p className="mt-1 text-sm text-black/60">{order?.checkout?.email || 'preview@example.com'}{order?.checkout?.phone ? ` · ${order.checkout.phone}` : ''}</p></div>
            <div><p className="text-[10px] font-black uppercase tracking-widest text-black/45">Delivery address</p><p className="mt-2 text-sm leading-6">{order?.checkout?.address || 'Preview address'}<br />{order?.checkout?.city || 'Bengaluru'}, {order?.checkout?.state || 'Karnataka'}<br />PIN {order?.checkout?.pin || '560001'}</p></div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/45">Products</p>
            <div className="mt-3 divide-y divide-black/10">{order?.items?.map((item: any) => <div key={item.id} className="flex justify-between gap-4 py-3 text-sm"><span>{item.name} × {item.quantity}</span><span className="font-bold">{formatPrice(item.price * item.quantity)}</span></div>)}</div>
          </div>

          <div className="border-t border-black/10 pt-4 text-sm"><p className="flex justify-between"><span>Subtotal</span><span>{order ? formatPrice(order.subtotal) : 'Preview'}</span></p><p className="mt-2 flex justify-between"><span>Shipping</span><span>{order ? formatPrice(order.shipping) : 'Preview'}</span></p><p className="mt-2 flex justify-between"><span>Discount</span><span>{order ? formatPrice(order.discount) : '₹0'}</span></p><p className="mt-4 flex justify-between text-base font-black"><span>Total</span><span>{order ? formatPrice(order.total) : 'Preview'}</span></p></div>
        </section>

        <Link href="/#shop" className="mt-8 inline-block bg-[#141614] px-6 py-4 text-xs font-black uppercase tracking-widest text-white">Continue shopping</Link>
      </div>
    </main>
  )
}
