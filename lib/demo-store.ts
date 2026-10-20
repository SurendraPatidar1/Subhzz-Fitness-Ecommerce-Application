export type DemoProduct = { id: number; name: string; price: number; image: string }
export const demoProducts: DemoProduct[] = [
  { id: 1, name: 'Premium Weight Loss Formula', price: 899, image: '/products/weight-loss.png' },
  { id: 2, name: 'Premium Weight Gainer', price: 999, image: '/products/weight-gainer.png' },
  { id: 3, name: 'Premium Creatine Monohydrate Pro', price: 1199, image: '/products/creatine.png' },
  { id: 4, name: 'Premium Pre Workout', price: 1299, image: '/products/pre-workout.png' },
]
export const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`
export const getCart = (): Record<number, number> => { try { return JSON.parse(localStorage.getItem('shubzz-cart') || '{}') } catch { return {} } }
export const saveDemoOrder = (checkout: Record<string, string>, cart: Record<number, number>, failed = false) => {
  const items = demoProducts.filter((p) => cart[p.id]).map((p) => ({ ...p, quantity: cart[p.id] }))
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const order = { id: `SHZ-DEMO-${Date.now().toString().slice(-6)}`, transactionId: `DEMO-TXN-${Date.now().toString().slice(-8)}`, checkout, items, subtotal, shipping: subtotal >= 1499 ? 0 : 99, discount: 0, total: subtotal + (subtotal >= 1499 ? 0 : 99), failed }
  localStorage.setItem('shubzz-order', JSON.stringify(order)); return order
}
export const getDemoOrder = () => { try { return JSON.parse(localStorage.getItem('shubzz-order') || 'null') } catch { return null } }
