<template>
  <section
    data-aos="fade-up"
    ref="sectionRef"
    class="py-16 px-2 md:px-1 bg-black text-[#F4ECD8]"
  >
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:pl-6 md:pr-4">
      
      <!-- 🎥 Vidéo -->
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

      <!-- 📊 Compteur -->
      <div class="w-full md:w-[42%] flex flex-col items-center justify-center mt-8 md:mt-20">
        <span class="text-9xl font-extrabold leading-tight">
          {{ formattedCount }}
        </span>
        <span class="font-zain text-4xl font-medium mt-4 text-[#d8cfc0]">
          vues cumulées
        </span>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

/* refs */
const sectionRef = ref(null)
const videoRef = ref(null)

/* vidéo */
const videoSrc = new URL('../assets/videos/AnimationAwal.mp4', import.meta.url).href

/* compteur */
const count = ref(0)
let rafId = null
let intervalId = null
const hasTriggered = ref(false)

/* format */
const formattedCount = computed(() =>
  count.value.toLocaleString()
)

/* easing */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

/* animation */
function animateCount(from, to, duration = 800) {
  cancelAnimationFrame(rafId)
  const start = performance.now()

  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration)
    const eased = easeOutCubic(progress)
    count.value = Math.round(from + (to - from) * eased)
    if (progress < 1) rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
}

/* fetch LIVE */
async function fetchViewsLive() {
  try {
    const base =
      import.meta.env.VITE_API_BASE ||
      'http://localhost/portfolio-backend'

    const res = await fetch(`${base}/api-total-views.php`, {
      cache: 'no-store',
    })

    const data = await res.json()
    const newTotal = Number(data.totalViews) || 0

    if (newTotal !== count.value) {
      animateCount(count.value, newTotal)
    }
  } catch (e) {
    console.error('Erreur compteur vues :', e)
  }
}

/* lancement live */
function startLiveUpdates() {
  fetchViewsLive()
  intervalId = setInterval(fetchViewsLive, 5000) // toutes les 5s
}

/* preview vidéo */
function playPreview(seconds = 6) {
  const vid = videoRef.value
  if (!vid) return

  vid.currentTime = 0
  vid.play().catch(() => {})

  const stopAt = seconds
  const timer = setInterval(() => {
    if (vid.currentTime >= stopAt || vid.ended) {
      vid.pause()
      clearInterval(timer)
    }
  }, 100)
}

/* observer */
function observeOnce() {
  const el = sectionRef.value
  if (!el || hasTriggered.value) return

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTriggered.value) {
          hasTriggered.value = true
          playPreview(6)
          startLiveUpdates()
          io.unobserve(el)
          io.disconnect()
        }
      })
    },
    { threshold: 0.35 }
  )

  io.observe(el)
}

/* lifecycle */
onMounted(() => {
  observeOnce()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  clearInterval(intervalId)
})
</script>
