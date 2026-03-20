<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <Card class="w-full max-w-md shadow-2xl">
      <template #title>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-white">Login</h1>
          <p class="mt-2 text-white">Welcome back! Please login to your account</p>
        </div>
      </template>

      <template #content>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Input -->
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-white">
              Email Address
            </label>
            <InputText
              id="email"
              v-model="loginForm.email"
              type="email"
              placeholder="Enter your email"
              class="w-full"
              :class="{ 'ng-invalid ng-dirty': errors.email }"
              required
            />
            <small v-if="errors.email" class="mt-1 block text-red-600">
              {{ errors.email }}
            </small>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="mb-2 block text-sm font-medium text-white">
              Password
            </label>
            <Password
              id="password"
              v-model="loginForm.password"
              placeholder="Enter your password"
              :feedback="false"
              toggle-mask
              class="w-full"
              input-class="w-full"
              :class="{ 'ng-invalid ng-dirty': errors.password }"
              required
            />
            <small v-if="errors.password" class="mt-1 block text-red-600">
              {{ errors.password }}
            </small>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Checkbox v-model="rememberMe" input-id="remember" binary />
              <label for="remember" class="ml-2 text-sm text-white">Remember me</label>
            </div>
            <RouterLink to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </RouterLink>
          </div>

          <!-- Loading State -->
          <Message v-if="successMessage" severity="success" :text="successMessage" />
          <Message v-if="errorMessage" severity="error" :text="errorMessage" />

          <!-- Login Button -->
          <Button
            label="Login"
            type="submit"
            class="w-full"
            :loading="isLoading"
            :disabled="isLoading"
          />
        </form>
      </template>

      <template #footer>
        <div class="border-t border-gray-200 pt-4 text-center">
          <p class="text-sm text-white">
            Don't have an account?
            <RouterLink to="/signup" class="font-semibold text-blue-600 hover:text-blue-800">
              Sign up here
            </RouterLink>
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import { RouterLink } from 'vue-router'
import { authService } from '@/services/authService'

const router = useRouter()

const loginForm = reactive({
  email: '',
  password: '',
})

const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const errors = reactive({
  email: '',
  password: '',
})

const validateForm = () => {
  errors.email = ''
  errors.password = ''

  if (!loginForm.email) {
    errors.email = 'Email is required'
  } else if (!loginForm.email.includes('@')) {
    errors.email = 'Please enter a valid email'
  }

  if (!loginForm.password) {
    errors.password = 'Password is required'
  } else if (loginForm.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return !errors.email && !errors.password
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await authService.login({
      email: loginForm.email,
      password: loginForm.password,
    })

    if (response.success) {
      successMessage.value = 'Login successful! Redirecting...'
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      errorMessage.value = response.message || 'Login failed'
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'An error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
:deep(.p-card) {
  border-radius: 1rem;
  border: none;
}

:deep(.p-card-content) {
  padding: 2rem;
}

:deep(.p-card-title) {
  padding: 1.5rem 2rem;
}

:deep(.p-card-footer) {
  padding: 1rem 2rem 1.5rem;
}
</style>

