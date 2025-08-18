<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">🎬 Admin Vidéos</h1>

    <form @submit.prevent="addVideo" class="flex flex-wrap gap-4 mb-6">
      <input
        v-model="rawInput"
        @change="extractYoutubeId"
        class="border p-2 w-full sm:w-1/3"
        placeholder="ID YouTube ou lien complet"
        required
      />
      <input
        v-model="newVideo.title"
        class="border p-2 w-full sm:w-1/3"
        placeholder="Titre (optionnel)"
      />
      <button class="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>
    </form>

    <table class="w-full border text-left">
      <thead >
        <tr>
          <th class="p-2">ID</th>
          <th class="p-2">Titre</th>
          <th class="p-2">YouTube ID</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="video in videos" :key="video.id" class="border-t">
          <td class="p-2">{{ video.id }}</td>
          <td class="p-2">{{ video.title }}</td>
          <td class="p-2">{{ video.youtube_id }}</td>
          <td class="p-2">
            <button @click="deleteVideo(video.id)" class="text-red-600 hover:underline">🗑 Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost/portfolio-backend/api.php' // à adapter selon ton chemin réel

const rawInput = ref('')
const newVideo = ref({ youtube_id: '', title: '' })
const videos = ref([])

const extractYoutubeId = () => {
  const input = rawInput.value.trim()
  let id = ''

  try {
    const url = new URL(input)
    if (url.hostname === 'youtu.be') {
      id = url.pathname.slice(1)
    } else if (url.hostname.includes('youtube.com')) {
      id = url.searchParams.get('v')
    }
  } catch {
    id = input // ce n’est pas une URL, on considère que c’est déjà un ID
  }

  newVideo.value.youtube_id = id
  rawInput.value = id // pour remplacer visuellement dans le champ
}

const fetchVideos = async () => {
  const res = await fetch(API_URL)
  videos.value = await res.json()
}

const addVideo = async () => {
  if (!newVideo.value.youtube_id) return
  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(newVideo.value),
  })
  newVideo.value = { youtube_id: '', title: '' }
  rawInput.value = ''
  fetchVideos()
}

const deleteVideo = async (id) => {
  await fetch(API_URL, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })
  fetchVideos()
}

onMounted(fetchVideos)
</script>

<style scoped>
table th, table td {
  border: 1px solid #ddd;
}
</style>
