<template>
  <section class="relative min-h-screen flex items-center justify-center text-center px-6 pt-24 bg-black text-[#F4ECD8] overflow-hidden">

    <video
      :src="videoSrc"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      class="absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-[.3]"
    ></video>

    <h2 class="text-5xl sm:text-6xl md:text-7xl font-zain font-bold leading-tight z-10">
      Votre vision,<br class="hidden sm:block" /> notre réalisation
    </h2>

  </section>
</template>

<script setup>
const videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4"
</script>