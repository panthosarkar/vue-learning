import { ref } from 'vue'

export function useColorPicker() {
  const selectedColor = ref('#3b82f6')
  const colorText = ref('#3b82f6')
  const errorMessage = ref('')

  const presetColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#111827']

  function isValidHexColor(value: string) {
    return /^#[0-9a-fA-F]{6}$/.test(value)
  }

  function updateFromPicker() {
    colorText.value = selectedColor.value.toUpperCase()
    errorMessage.value = ''
  }

  function updateFromText() {
    const normalized = colorText.value.trim()
    if (!isValidHexColor(normalized)) {
      errorMessage.value = 'Use format #RRGGBB (example: #3B82F6).'
      return
    }

    selectedColor.value = normalized
    colorText.value = normalized.toUpperCase()
    errorMessage.value = ''
  }

  function applyPreset(color: string) {
    selectedColor.value = color
    colorText.value = color.toUpperCase()
    errorMessage.value = ''
  }

  return {
    selectedColor,
    colorText,
    errorMessage,
    presetColors,
    updateFromPicker,
    updateFromText,
    applyPreset,
  }
}

