<template>
  <div class="overflow-hidden bg-black py-12 w-full">
     <h3 class="text-3xl font-bold mb-12 text-center">Ils nous font confiance ...</h3>

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
  'logo-clique.png'
]

const logoList = logoNames.map(name => getImageUrl(name))
</script>

<style scoped>
.marquee {
  display: flex;
  width: max-content;
  animation: scroll 25s linear infinite;
}

.logo-style {
  height: 3rem; /* h-12 */
  width: auto;
  margin-left: 2rem; /* mx-8 */
  margin-right: 2rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  /* FORCE LE LOGO EN BLANC : 
     brightness(0) le rend noir, invert(1) transforme le noir en blanc */
  filter: brightness(0) invert(1);
  opacity: 0.7;
}

.logo-style:hover {
  /* REVIENT À LA COULEUR ORIGINALE */
  filter: brightness(1) invert(0);
  opacity: 1;
  transform: scale(1.1); /* Petit effet de zoom sympa */
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

</style>