<template>
  <header class="fixed top-0 w-full text-[#F4ECD8] z-50">
    <nav class="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
      <img src="/src/assets/images/logo-awal-sansbg.png" alt="AWAL Logo" class="h-14">

      <!-- Desktop -->
      <ul class="hidden md:flex items-center gap-3 font-zain">
        <li v-for="item in items" :key="item.href">
          <a
            :href="item.href"
            class="inline-flex items-center justify-center text-center px-4 py-2 rounded-full 
                   transition-all duration-200
                   hover:bg-[#F4ECD8]/25 
                   focus:outline-none focus:ring-2 focus:ring-[#F4ECD8]/70"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Burger -->
      <button @click="toggleMenu" class="md:hidden text-3xl leading-none">☰</button>
    </nav>

    <!-- Mobile -->
    <div v-if="mobileMenu" class="md:hidden flex flex-col gap-2 px-4 pb-4 font-zain bg-black/90">
      <a
        v-for="item in items" :key="item.href" :href="item.href" @click="mobileMenu=false"
        class="px-4 py-3 rounded-full text-center transition-all duration-200
               hover:text-black hover:bg-[#F4ECD8]/25 hover:ring-2 hover:ring-[#F4ECD8]/60"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenu = ref(false)
const toggleMenu = () => (mobileMenu.value = !mobileMenu.value)

const items = [
  { href: '#services',   label: 'Services' },
  { href: '#portfolio',  label: 'Réalisations' },
  { href: '#equipe',     label: 'Équipe' },
  { href: '#contact',    label: 'Contact' }
]
</script>
