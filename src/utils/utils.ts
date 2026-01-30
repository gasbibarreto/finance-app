export function getImagePath(path: string): string {
  if (path.startsWith('/images/')) {
    return import.meta.env.BASE_URL + path.slice(1)
  }
  return path
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(amount: number) {
  return `${(amount).toFixed(2)}`;
}


export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateOrdinal(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()

  let suffix: string

  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st'
  } else if (day === 2 || day === 22) {
    suffix = 'nd'
  } else if (day === 3 || day === 23) {
    suffix = 'rd'
  } else {
    suffix = 'th'
  }

  return `Monthly-${day}${suffix}`
}
