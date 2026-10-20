export const brandConfig = {
  name: 'SHUBZZ FITNESS',
  instagram: 'https://www.instagram.com/shubham_gardi/',
  instagramHandle: '@shubham_gardi',
  whatsappNumbers: ['918600360712', '917775964681'],
  defaultWhatsappNumber: '918600360712',
  deliveryEstimate: '4–5 days',
  promotion: {
    productId: 3,
    mrp: 2000,
    offerPrice: 1599,
    deliveryLabel: 'All India Free Delivery',
  },
} as const

export const formatIndianPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`

export function getWhatsAppUrl(message: string, phone = brandConfig.defaultWhatsappNumber) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function getProductWhatsAppUrl(productName: string, quantity: number, price: number, variant?: string) {
  const variantLine = variant ? `\nSelected variant: ${variant}` : ''
  return getWhatsAppUrl(
    `Hello ${brandConfig.name}, I would like to enquire about:\nProduct: ${productName}${variantLine}\nQuantity: ${quantity}\nDisplayed demo price: ${formatIndianPrice(price)}\n\nPlease confirm availability and delivery details.`,
  )
}
