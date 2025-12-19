export function getImageUrl(url: string) {
  // Se a URL já começa com /images/, retorna como está
  if (url.startsWith('/images/')) {
    return url
  }
  // Se a URL começa com ../assets/images/ ou ./assets/images/, converte para /images/
  if (url.includes('assets/images/')) {
    return url.replace(/^(\.\.\/|\.\/)?assets\/images\//, '/images/')
  }
  // Caso contrário, retorna a URL original
  return url
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

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
