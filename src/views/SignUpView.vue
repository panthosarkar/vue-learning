<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
    <Card class="w-full max-w-md shadow-2xl">
      <template #title>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-800">Create Account</h1>
          <p class="mt-2 text-white">Sign up to get started with us</p>
        </div>
      </template>

      <template #content>
        <form @submit.prevent="handleSignUp" class="space-y-4">
          <!-- Full Name Input -->
          <div>
            <label for="fullName" class="mb-2 block text-sm font-medium text-white">
              Full Name
            </label>
            <InputText
              id="fullName"
              v-model="signUpForm.fullName"
              placeholder="Enter your full name"
              class="w-full"
              :class="{ 'ng-invalid ng-dirty': errors.fullName }"
              required
            />
            <small v-if="errors.fullName" class="mt-1 block text-red-600">
              {{ errors.fullName }}
            </small>
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-white">
              Email Address
            </label>
            <InputText
              id="email"
              v-model="signUpForm.email"
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
              v-model="signUpForm.password"
              placeholder="Create a password"
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

          <!-- Confirm Password Input -->
          <div>
            <label for="confirmPassword" class="mb-2 block text-sm font-medium text-white">
              Confirm Password
            </label>
            <Password
              id="confirmPassword"
              v-model="signUpForm.confirmPassword"
              placeholder="Confirm your password"
              :feedback="false"
              toggle-mask
              class="w-full"
              input-class="w-full"
              :class="{ 'ng-invalid ng-dirty': errors.confirmPassword }"
              required
            />
            <small v-if="errors.confirmPassword" class="mt-1 block text-red-600">
              {{ errors.confirmPassword }}
            </small>
          </div>

          <!-- Terms & Conditions -->
          <div class="flex items-start">
            <Checkbox v-model="agreeTerms" input-id="terms" binary />
            <label for="terms" class="ml-2 text-sm text-white">
              I agree to the
              <a href="#" class="text-blue-600 hover:text-blue-800">Terms & Conditions</a>
              and
              <a href="#" class="text-blue-600 hover:text-blue-800">Privacy Policy</a>
            </label>
          </div>
          <small v-if="errors.terms" class="mt-1 block text-red-600">
            {{ errors.terms }}
          </small>

          <!-- Messages -->
          <Message v-if="successMessage" severity="success" :text="successMessage" />
          <Message v-if="errorMessage" severity="error" :text="errorMessage" />

          <!-- Sign Up Button -->
          <Button
            label="Create Account"
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
            Already have an account?
            <RouterLink to="/login" class="font-semibold text-blue-600 hover:text-blue-800">
              Login here
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

const signUpForm = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const agreeTerms = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const errors = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: '',
})

const validateForm = () => {
  errors.fullName = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.terms = ''

  if (!signUpForm.fullName) {
    errors.fullName = 'Full name is required'
  } else if (signUpForm.fullName.length < 3) {
    errors.fullName = 'Full name must be at least 3 characters'
  }

  if (!signUpForm.email) {
    errors.email = 'Email is required'
  } else if (!signUpForm.email.includes('@')) {
    errors.email = 'Please enter a valid email'
  }

  if (!signUpForm.password) {
    errors.password = 'Password is required'
  } else if (signUpForm.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!signUpForm.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (signUpForm.password !== signUpForm.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  if (!agreeTerms.value) {
    errors.terms = 'You must agree to the terms and conditions'
  }

  return (
    !errors.fullName &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    !errors.terms
  )
}

const handleSignUp = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await authService.signUp({
      fullName: signUpForm.fullName,
      email: signUpForm.email,
      password: signUpForm.password,
      confirmPassword: signUpForm.confirmPassword,
    })

    if (response.success) {
      successMessage.value = 'Account created successfully! Redirecting...'
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      errorMessage.value = response.message || 'Sign up failed'
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

