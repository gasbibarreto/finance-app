export function getImageUrl(url: string) {
    return new URL(url, import.meta.url).href
}