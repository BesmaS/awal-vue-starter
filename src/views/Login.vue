<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow">
      <h1 class="text-xl font-bold mb-4">Connexion</h1>
      <form @submit.prevent="login">
        <input v-model="loginValue" placeholder="Login" class="border p-2 mb-4 w-full" />
        <input v-model="password" type="password" placeholder="Mot de passe" class="border p-2 mb-4 w-full" />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Se connecter</button>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loginValue = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  const res = await fetch('http:///bes.alwaysdata.net/login.php', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      login: loginValue.value,
      password: password.value
    })
  })

  const data = await res.json()
  if (data.status === 'ok') {
    router.push('/admin')
  } else {
    error.value = 'Identifiants incorrects'
  }
}
</script>
