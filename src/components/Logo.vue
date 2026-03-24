<template>
  <div class="relative overflow-hidden bg-black py-12 w-full">
    
    <h3 class="text-3xl font-bold mb-12 text-center text-white">
      Ils nous ont fait confiance ...
    </h3>

    <!-- fade gauche -->
    <div class="fade-left"></div>

    <!-- fade droite -->
    <div class="fade-right"></div>

    <div class="flex marquee">
      <img
        v-for="(src, index) in [...logoList, ...logoList]"
        :key="index"
        :src="src"
        alt="logo marque"
        class="logo-style"
      />
    </div>

  </div>
</template>

<script setup>
const getImageUrl = (name) => {
  return new URL(`../assets/logos/${name}`, import.meta.url).href
}

const logoNames = [
  'logo-owari.png',
  'logo-100crousti.png',
  'logo-adidas.png',
  'logo-bonduelle.png',
  'logo-kingsleague.jpg',
  'logo-partenaires.png',
  'Red-Bull-Logo.png',
  'logo-snipes.png',
  'Parions-sport_logo.png',
  'logo-clique.png',
  'logoligue1.png'
]

const logoList = logoNames.map(name => getImageUrl(name))
</script>

<style scoped>
.marquee {
  display: flex;
  width: max-content;
  animation: scroll 25s linear infinite;
  will-change: transform;
}

/* pause au hover */
.marquee:hover {
  animation-play-state: paused;
}

.logo-style {
  height: 3rem;
  width: auto;
  margin: 0 2rem;
  flex-shrink: 0;

  /* effet noir & blanc */
  filter: grayscale(100%);
  opacity: 0.6;

  transition: all 0.4s ease;
}

/* au hover → couleur + effet premium */
.logo-style:hover {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.15);
}

/* animation */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* fade effet premium */
.fade-left,
.fade-right {
  position: absolute;
  top: 0;
  height: 100%;
  width: 80px;
  z-index: 10;
  pointer-events: none;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, black, transparent);
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, black, transparent);
}
</style>