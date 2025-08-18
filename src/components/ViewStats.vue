<template>
  <section data-aos="fade-up"ref="sectionRef" class="py-16 px-2 md:px-1 bg-black text-[#F4ECD8]">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:pl-6 md:pr-4">
      
      <!-- 🎥 Vidéo à gauche, plus grande -->
      <div class="w-full md:w-[58%]">
        <video
          ref="videoRef"
          :src="videoSrc"
          muted
          playsinline
          preload="auto"
          class="w-full rounded-xl shadow-xl"
        ></video>
      </div>

      <!-- 📊 Texte à droite, plus gros -->
      <div class="w-full md:w-[42%] text-center md:text-left">
        <!-- 📊 Texte à droite, minimaliste -->
      <div class="w-full md:w-[42%] text-center flex flex-col items-center justify-center mt-8 md:mt-20">
        <span class="text-9xl font-extrabold leading-tight">{{ formattedCount }}</span>
        <span class="text-5x1 font-medium mt-2 text-[#d8cfc0]">vues cumulés</span>
      </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'

const count = ref(0)
const videoRef = ref(null)
const sectionRef = ref(null)
const hasPlayed = ref(false)
const videoSrc = new URL('../assets/videos/AnimationAwal.mp4', import.meta.url).href

const formattedCount = computed(() => count.value.toLocaleString() )

// Lecture automatique jusqu'à 6 secondes
const playPreview = () => {
  const video = videoRef.value
  if (!video || hasPlayed.value) return

  hasPlayed.value = true
  video.currentTime = 0
  video.play()

  const stopAt = 6
  const interval = setInterval(() => {
    if (video.currentTime >= stopAt) {
      video.pause()
      clearInterval(interval)
    }
  }, 100)
}

const observeSection = () => {
  const section = sectionRef.value
  if (!section) return

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasPlayed.value) {
          playPreview()
          obs.unobserve(section)
        }
      })
    },
    { threshold: 0.4 }
  )

  observer.observe(section)
}

const fetchViews = async () => {
  const res = await fetch('https://bes.alwaysdata.net/api-total-views.php')
  const data = await res.json()
  animateCount(data.totalViews)
}

const animateCount = (target) => {
  let current = 0
  const step = Math.ceil(target / 100)
  const interval = setInterval(() => {
    current += step
    if (current >= target) {
      current = target
      clearInterval(interval)
    }
    count.value = current
  }, 20)
}

onMounted(() => {
  fetchViews()
  observeSection()
})

onUnmounted(() => {
  hasPlayed.value = false
})
</script>
