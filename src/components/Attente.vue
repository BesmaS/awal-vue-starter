<template>
  <section class="relative min-h-screen flex items-center justify-center text-center text-beige overflow-hidden">

    <!-- IMAGE DE FOND -->
    <img
      src="../assets/images/HeroAwal.jpeg"
      alt="background"
      class="absolute top-0 left-0 w-full h-full object-cover z-0"
    />

    <!-- OVERLAY -->
    <div class="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

    <!-- CONTENU -->
    <div class="z-20 px-6">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
        On arrive bientôt 👀
      </h1>

      <p class="text-lg md:text-xl opacity-80 mb-6">
        Le site est en cours de création... restez connectés !
      </p>

      <!-- bouton optionnel -->
      <a
        href="mailto:contact@tonsite.com"
        class="inline-block border border-beige px-6 py-2 rounded-full hover:bg-beige hover:text-black transition"
      >
        Nous contacter
      </a>
    </div>

  </section>
</template>