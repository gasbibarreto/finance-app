export function getImageUrl(url: string) {
  return new URL(url, import.meta.url).href
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(amount: number): number {
  return Number(
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(amount),
  )
}
