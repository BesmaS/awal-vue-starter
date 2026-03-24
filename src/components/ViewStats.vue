<template>
  <section
    data-aos="fade-up"
    ref="sectionRef"
    class="py-20 bg-black text-[#F4ECD8] overflow-hidden"
  >
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center relative">
      
      <!-- 🖼️ Image (décalée à gauche) -->
      <div class="w-full md:w-[70%] relative">
        <img
          :src="imageSrc"
          alt="illustration"
          class="w-full rounded-xl shadow-xl object-cover"
        />

        <!-- fondu à droite -->
        <div class="absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-black to-transparent"></div>
      </div>

      <!-- 📊 Compteur (superposé dans le fondu) -->
      <div class="absolute md:right-10 right-1/2 translate-x-1/2 md:translate-x-0 text-center">
        
        <span class="text-7xl md:text-9xl font-extrabold leading-tight">
          {{ formattedCount }}
        </span>

        <p class="font-zain text-2xl md:text-3xl mt-4 text-[#d8cfc0]">
          vues cumulées
        </p>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const sectionRef = ref(null)

/* image */
const imageSrc = new URL('../assets/images/TRIPOST FULL.jpg', import.meta.url).href

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
  intervalId = setInterval(fetchViewsLive, 5000)
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