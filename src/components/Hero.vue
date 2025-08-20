<template>
  <section class="relative min-h-screen flex items-center justify-center text-center px-6 pt-24 text-[#F4ECD8] overflow-hidden">

    <!-- vidéo de fond -->
    <video
      :src="videoSrc"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      class="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-75"
    ></video>

    <!-- overlay noir semi-transparent -->
    <div class="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

    <!-- titre -->
    <h2 class="text-5xl sm:text-6xl md:text-7xl font-zain font-bold leading-tight z-20 relative">
      Votre vision,<br class="hidden sm:block" /> notre réalisation
    </h2>

  </section>
</template>

<script setup>
const videoSrc = new URL('../assets/videos/hero-video.mp4', import.meta.url).href
</script>
