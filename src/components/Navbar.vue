<template>
  <header class="fixed top-0 w-full bg-black text-[#F4ECD8] shadow z-50">
    <nav class="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">
      <img src="/src/assets/images/logo-awal.png" alt="AWAL Logo" class="h-16">
      <ul class="hidden md:flex gap-6 uppercase tracking-wide text-sm">
        <li><a href="#services" class="hover:text-white">Services</a></li>
        <li><a href="#portfolio" class="hover:text-white">Réalisations</a></li>
        <li><a href="#equipe" class="hover:text-white">Équipe</a></li>
        <li><a href="#contact" class="hover:text-white">Contact</a></li>
      </ul>
      <button @click="toggleMenu" class="md:hidden text-3xl">&#9776;</button>
    </nav>
    <div v-if="mobileMenu" class="md:hidden flex flex-col gap-4 px-6 py-4 bg-black text-[#F4ECD8]">
      <a href="#services">Services</a>
      <a href="#portfolio">Réalisations</a>
      <a href="#equipe">Équipe</a>
      <a href="#contact">Contact</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const mobileMenu = ref(false)
const toggleMenu = () => mobileMenu.value = !mobileMenu.value
</script>