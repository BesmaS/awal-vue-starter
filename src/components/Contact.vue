<template>
  <section id="contact" class="py-20 px-4">
    <div data-aos="fade-up" class="max-w-xl mx-auto">
      <h3 class="text-3xl font-bold mb-12 text-center text-beige">Contact</h3>

      <form @submit.prevent="submitForm" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Votre nom"
          class="w-full bg-dark text-beige border border-[#333] p-3 rounded"
          required
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Votre email"
          class="w-full bg-dark text-beige border border-[#333] p-3 rounded"
          required
        />

        <textarea
          v-model="form.message"
          placeholder="Votre message"
          class="w-full bg-dark text-beige border border-[#333] p-3 rounded"
          rows="5"
          required
        ></textarea>

        <label class="block text-sm text-beige">
          <input type="checkbox" v-model="form.devis" class="mr-2" />
          Je souhaite faire une demande de devis
        </label>

        <button
          type="submit"
          class="bg-beige text-black px-6 py-3 rounded hover:bg-white transition"
        >
          Envoyer
        </button>

        <!-- Messages -->
        <p v-if="success" class="text-green-500 mt-2">✅ Message envoyé !</p>
        <p v-if="error" class="text-red-500 mt-2">❌ Erreur lors de l'envoi.</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
  devis: false
})

const success = ref(false)
const error = ref(false)

const submitForm = async () => {
  success.value = false
  error.value = false

  try {
    const res = await fetch('http://localhost/portfolio-backend/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    const data = await res.json()
    if (data.success) {
      success.value = true
      form.value = { name: '', email: '', message: '', devis: false }
    } else {
      error.value = true
    }
  } catch (err) {
    error.value = true
  }
}
</script>
