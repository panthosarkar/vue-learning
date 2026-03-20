import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(authService.getUser())
  const token = ref(authService.getToken())
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.login({ email, password })
      if (response.success && response.user && response.token) {
        user.value = response.user
        token.value = response.token
        return response
      } else {
        error.value = response.message || 'Login failed'
        return response
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const signUp = async (fullName: string, email: string, password: string, confirmPassword: string) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.signUp({
        fullName,
        email,
        password,
        confirmPassword,
      })
      if (response.success && response.user && response.token) {
        user.value = response.user
        token.value = response.token
        return response
      } else {
        error.value = response.message || 'Sign up failed'
        return response
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await authService.logout()
      user.value = null
      token.value = null
      error.value = null
    } finally {
      isLoading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    signUp,
    logout,
    clearError,
  }
})

