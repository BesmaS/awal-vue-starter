<template>
  <section id="equipe" class="py-20 px-4 bg-black">
    <div class="max-w-6xl mx-auto">
      <h3 class="text-3xl font-bold mb-12 text-center text-beige">Notre équipe</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <div class="bg-dark p-6 rounded shadow text-center">
          <img
            src="/src/assets/images/ppinconnu.png"
            class="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
            alt="Nom Prénom"
          />
          <h4 class="text-xl font-semibold">Nom Prénom</h4>
          <p class="text-gray-400">Réalisateur</p>
        </div>

        <div class="bg-dark p-6 rounded shadow text-center">
          <img
            src="/src/assets/images/ppinconnu.png"
            class="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
            alt="Nom Prénom"
          />
          <h4 class="text-xl font-semibold">Nom Prénom</h4>
          <p class="text-gray-400">Monteur</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// pas de logique JS ici pour l'instant, mais le bloc est requis pour éviter l'erreur
</script>
