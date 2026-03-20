// Auth API Service
interface LoginPayload {
  email: string
  password: string
}

interface SignUpPayload {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

interface AuthResponse {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    fullName: string
  }
  token?: string
}

// Simulate API calls - replace with actual API endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      // Simulate API call with delay
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock authentication
          if (payload.email && payload.password) {
            const token = 'mock_token_' + Date.now()
            localStorage.setItem('authToken', token)
            localStorage.setItem(
              'user',
              JSON.stringify({
                id: '1',
                email: payload.email,
                fullName: payload.email.split('@')[0],
              })
            )
            resolve({
              success: true,
              message: 'Login successful',
              user: {
                id: '1',
                email: payload.email,
                fullName: payload.email.split('@')[0],
              },
              token,
            })
          } else {
            resolve({
              success: false,
              message: 'Invalid credentials',
            })
          }
        }, 1000)
      })

      // Uncomment for real API integration:
      // const response = await fetch(`${API_BASE_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // })
      // return await response.json()
    } catch (error) {
      return {
        success: false,
        message: 'Login failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
      }
    }
  },

  async signUp(payload: SignUpPayload): Promise<AuthResponse> {
    try {
      // Validate passwords match
      if (payload.password !== payload.confirmPassword) {
        return {
          success: false,
          message: 'Passwords do not match',
        }
      }

      // Simulate API call with delay
      return new Promise((resolve) => {
        setTimeout(() => {
          if (payload.email && payload.password && payload.fullName) {
            const token = 'mock_token_' + Date.now()
            localStorage.setItem('authToken', token)
            localStorage.setItem(
              'user',
              JSON.stringify({
                id: '1',
                email: payload.email,
                fullName: payload.fullName,
              })
            )
            resolve({
              success: true,
              message: 'Sign up successful',
              user: {
                id: '1',
                email: payload.email,
                fullName: payload.fullName,
              },
              token,
            })
          } else {
            resolve({
              success: false,
              message: 'Invalid input',
            })
          }
        }, 1000)
      })

      // Uncomment for real API integration:
      // const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // })
      // return await response.json()
    } catch (error) {
      return {
        success: false,
        message: 'Sign up failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
      }
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  getToken(): string | null {
    return localStorage.getItem('authToken')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken')
  },
}

