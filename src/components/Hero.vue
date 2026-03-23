<template>
  <section class="relative min-h-screen flex items-center justify-center text-center px-6 pt-24 text-[#F4ECD8] overflow-hidden">

<img
  :src="imageSrc"
  alt="background"
  class="absolute top-0 left-0 w-full h-full object-cover object-[center_30%] z-0"
/>

<div class="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>

  </section>
</template>

<script setup>
const imageSrc = new URL('../assets/images/HeroAwal.jpeg', import.meta.url).href
</script>