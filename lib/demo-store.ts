export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

export type DemoProduct = {
  id: number
  slug: string
  name: string
  category: string
  images: string[]
  netWeight: string
  flavour?: string
  description: string
  ingredients?: string
  usageInstructions?: string
  price: number
  compareAtPrice?: number
  currency: 'INR'
  stockStatus: StockStatus
  shippingInformation: string
  seoTitle: string
  seoDescription: string
}

export const demoProducts: DemoProduct[] = [
  {
    id: 1,
    slug: 'premium-weight-loss-formula',
    name: 'Premium Weight Loss Formula',
    category: 'Weight Management',
    images: ['/products/weight-loss.png'],
    netWeight: '210 g',
    flavour: 'Orange',
    description: 'A SHUBZZ FITNESS weight-management supplement presentation for customers building a considered daily routine. Final formulation details and claims are to be confirmed by the brand.',
    ingredients: 'Full ingredient information to be confirmed by the brand.',
    usageInstructions: 'Please follow the directions on the product label.',
    price: 899,
    currency: 'INR',
    stockStatus: 'in-stock',
    shippingInformation: 'Estimated delivery: 4–5 days, subject to serviceability. Shipping policy is illustrative for this demo store.',
    seoTitle: 'Premium Weight Loss Formula | SHUBZZ FITNESS',
    seoDescription: 'Explore the SHUBZZ FITNESS Premium Weight Loss Formula, 210 g, Orange flavour. Demo product information subject to brand confirmation.',
  },
  {
    id: 2,
    slug: 'premium-weight-gainer',
    name: 'Premium Weight Gainer',
    category: 'Weight Gainers',
    images: ['/products/weight-gainer.png'],
    netWeight: '300 g',
    flavour: 'Orange',
    description: 'A SHUBZZ FITNESS weight-gainer supplement presentation for customers building a consistent training routine. Final formulation details and claims are to be confirmed by the brand.',
    ingredients: 'Full ingredient information to be confirmed by the brand.',
    usageInstructions: 'Please follow the directions on the product label.',
    price: 999,
    currency: 'INR',
    stockStatus: 'in-stock',
    shippingInformation: 'Estimated delivery: 4–5 days, subject to serviceability. Shipping policy is illustrative for this demo store.',
    seoTitle: 'Premium Weight Gainer | SHUBZZ FITNESS',
    seoDescription: 'Explore the SHUBZZ FITNESS Premium Weight Gainer, 300 g, Orange flavour. Demo product information subject to brand confirmation.',
  },
  {
    id: 3,
    slug: 'creatine-monohydrate-pro',
    name: 'Premium Creatine Monohydrate Pro',
    category: 'Protein & Recovery',
    images: ['/products/creatine.png'],
    netWeight: '120 g',
    description: 'A premium creatine product presentation designed for a focused training routine. Final formulation details and claims are to be confirmed by the brand.',
    ingredients: 'Full ingredient information to be confirmed by the brand.',
    usageInstructions: 'Please follow the directions on the product label.',
    price: 1199,
    currency: 'INR',
    stockStatus: 'low-stock',
    shippingInformation: 'Estimated delivery: 4–5 days, subject to serviceability. Shipping policy is illustrative for this demo store.',
    seoTitle: 'Premium Creatine Monohydrate Pro | SHUBZZ FITNESS',
    seoDescription: 'Explore the SHUBZZ FITNESS Premium Creatine Monohydrate Pro, 120 g. Demo product information subject to brand confirmation.',
  },
  {
    id: 4,
    slug: 'pre-workout',
    name: 'Premium Pre Workout',
    category: 'Protein & Recovery',
    images: ['/products/pre-workout.png'],
    netWeight: '300 g',
    description: 'A SHUBZZ FITNESS pre-workout product presentation for customers preparing for their training routine. Final formulation details and claims are to be confirmed by the brand.',
    ingredients: 'Full ingredient information to be confirmed by the brand.',
    usageInstructions: 'Please follow the directions on the product label.',
    price: 1299,
    currency: 'INR',
    stockStatus: 'in-stock',
    shippingInformation: 'Estimated delivery: 4–5 days, subject to serviceability. Shipping policy is illustrative for this demo store.',
    seoTitle: 'Premium Pre Workout | SHUBZZ FITNESS',
    seoDescription: 'Explore the SHUBZZ FITNESS Premium Pre Workout, 300 g. Demo product information subject to brand confirmation.',
  },
]

export const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`
export const getProduct = (slug: string) => demoProducts.find((product) => product.slug === slug)
export const getCart = (): Record<number, number> => {
  try { return JSON.parse(localStorage.getItem('shubzz-cart') || '{}') } catch { return {} }
}
export const saveCart = (cart: Record<number, number>) => localStorage.setItem('shubzz-cart', JSON.stringify(cart))
export const saveDemoOrder = (checkout: Record<string, string>, cart: Record<number, number>, failed = false) => {
  const items = demoProducts.filter((p) => cart[p.id]).map((p) => ({ ...p, quantity: cart[p.id] }))
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const order = { id: `SHZ-DEMO-${Date.now().toString().slice(-6)}`, transactionId: `DEMO-TXN-${Date.now().toString().slice(-8)}`, checkout, items, subtotal, shipping: subtotal >= 1499 ? 0 : 99, discount: 0, total: subtotal + (subtotal >= 1499 ? 0 : 99), failed }
  localStorage.setItem('shubzz-order', JSON.stringify(order)); return order
}
export const getDemoOrder = () => { try { return JSON.parse(localStorage.getItem('shubzz-order') || 'null') } catch { return null } }
