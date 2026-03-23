<template>
  <div class="overflow-hidden bg-white py-8">
    <div class="flex marquee">
      <div
        v-for="(logo, index) in logos.concat(logos)"
        :key="index"
        class="flex items-center justify-center mx-8"
      >
        <img
          :src="logo"
          alt="logo marque"
          class="h-12 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const logos = [
  "../assets/logos/logo-adidas.png",
  "../assets/logos/logo-bonduelle.png",
  "../assets/logos/logo_owari.png",
  "../assets/logos/logo-partenaires.png",
  "../assets/logos/Parions-sport_logo.png",
  "../assets/logos/logo-redbull.png",
  "../assets/logos/logo-kingsleague.jpg",
  "../assets/logos/logo-100crousti.png"
]
</script>

<style scoped>
.marquee {
  width: max-content;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
