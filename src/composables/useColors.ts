import { computed, onMounted, ref } from 'vue'

/**
 * Composable para gerenciar cores do sistema
 * Lê as cores diretamente das CSS custom properties definidas no styles.less
 * Mantém uma única fonte de verdade no LESS
 */
export function useColors() {
  const colorsLoaded = ref(false)

  // Mapeamento dos nomes das cores (como definidos no LESS)
  const colorNames = [
    'green',
    'yellow',
    'cyan',
    'navy',
    'red',
    'purple',
    'purple-other',
    'tourquise',
    'brown',
    'magenta',
    'blue',
    'navy-grey',
    'army-green',
    'gold',
    'orange',
    'white',
  ] as const

  /**
   * Obtém o valor de uma cor das CSS custom properties
   */
  function getColorValue(colorName: string): string {
    if (typeof document === 'undefined') return ''
    const cssVar = `--color-${colorName}`
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
  }

  /**
   * Formata o nome da cor para exibição
   */
  function formatColorName(colorKey: string): string {
    return colorKey
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  /**
   * Normaliza uma cor hex para minúsculas para que todas as cores do data.json consigam dar match com o que tem no arquivo less
   */
  function normalizeColor(color: string): string {
    if (color.startsWith('#')) {
      return color.toLowerCase()
    }
    return color
  }

  /**
   * Lista de cores disponíveis formatada para uso em selects
   * Lê diretamente das CSS custom properties
   */
  const colorOptions = computed(() => {
    return colorNames.map((name) => {
      const value = getColorValue(name)
      return {
        name, // Nome original (igual ao LESS)
        displayName: formatColorName(name), // Nome formatado para exibição
        value: value || '', // Valor hex da cor
      }
    })
  })

  /**
   * Obtém todas as cores como objeto (similar ao appColors anterior)
   */
  const appColors = computed(() => {
    const colors: Record<string, string> = {}
    colorNames.forEach((name) => {
      const value = getColorValue(name)
      if (value) {
        colors[name] = normalizeColor(value)
      }
    })
    return colors
  })

  onMounted(() => {
    colorsLoaded.value = true
  })

  return {
    appColors,
    colorOptions,
    formatColorName,
    normalizeColor,
    getColorValue,
  }
}
