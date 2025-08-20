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
        <span class="font-zain text-4xl font-medium mt-4 text-[#d8cfc0]">vues cumulées</span>
      </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const sectionRef = ref(null)
const videoRef = ref(null)
const videoSrc = new URL('../assets/videos/AnimationAwal.mp4', import.meta.url).href

const count = ref(0)
const targetCount = ref(0)
const hasTriggered = ref(false) // évite les déclenchements multiples
let rafId = null

const formattedCount = computed(() => count.value.toLocaleString())

// Easing pour un déroulé plus "smooth"
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

function animateCount(to, duration = 1200) {
  cancelAnimationFrame(rafId)
  const from = 0
  const start = performance.now()

  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration)
    const eased = easeOutCubic(progress)
    count.value = Math.round(from + (to - from) * eased)
    if (progress < 1) rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
}

async function fetchViewsAndAnimate() {
  try {
    // ✅ Mets ici ton endpoint de prod si différent
    const base = import.meta.env.VITE_API_BASE || 'http://localhost/portfolio-backend'
    const res = await fetch(`${base}/api-total-views.php`, { cache: 'no-store' })
    const data = await res.json()
    targetCount.value = Number(data.totalViews) || 0
    animateCount(targetCount.value)
  } catch (e) {
    // Fallback si l’API est KO : on n’empêche pas l’UI de tourner
    console.error('Erreur compteur:', e)
    targetCount.value = 0
    animateCount(0, 600)
  }
}

function playPreview(seconds = 6) {
  const vid = videoRef.value
  if (!vid) return
  vid.currentTime = 0
  vid.play().catch(() => {})
  const stopAt = vid.currentTime + seconds
  const intId = setInterval(() => {
    if (vid.currentTime >= stopAt || vid.ended) {
      vid.pause()
      clearInterval(intId)
    }
  }, 100)
}

function observeOnce() {
  const el = sectionRef.value
  if (!el || hasTriggered.value) return

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasTriggered.value) {
        hasTriggered.value = true
        playPreview(6)
        fetchViewsAndAnimate()
        io.unobserve(el)
        io.disconnect()
      }
    })
  }, { threshold: 0.35 })

  io.observe(el)
}

onMounted(() => {
  observeOnce()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})
</script>