<template>
  <section data-aos="fade-up" id="equipe" class="py-20 px-4 bg-black">
    <div class="max-w-6xl mx-auto">
      <h3 class="text-3xl font-bold mb-12 text-center text-beige">Notre équipe</h3>

      <!-- Onglets -->
      <div class="flex justify-center gap-4 mb-10">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border',
            activeTab === tab.id
              ? 'bg-beige text-black border-beige'
              : 'bg-transparent text-beige border-beige/40 hover:border-beige'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Contenu -->
      <transition name="fade" mode="out-in">
        <div
          :key="activeTab"
          class="flex flex-col md:flex-row items-center gap-10"
        >
          <!-- Image à gauche -->
          <div class="w-full md:w-1/2 relative">
            <img
              :src="currentMember.image"
              :alt="currentMember.name"
              class="w-full h-[480px] object-cover rounded-2xl shadow-2xl"
              style="object-position: center top;"
            />
            <!-- fondu bas -->
            <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent rounded-b-2xl"></div>
          </div>

          <!-- Texte à droite -->
          <div class="w-full md:w-1/2 text-beige">
            <p class="text-xs uppercase tracking-widest text-beige/50 mb-2">{{ currentMember.role }}</p>
            <h4 class="text-4xl font-extrabold mb-6 leading-tight">{{ currentMember.name }}</h4>

            <p class="text-beige/80 text-lg leading-relaxed mb-6">
              {{ currentMember.bio }}
            </p>

            <ul class="space-y-2">
              <li
                v-for="skill in currentMember.skills"
                :key="skill"
                class="flex items-center gap-2 text-beige/70 text-sm"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-beige inline-block"></span>
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

import equipeImg from '../assets/images/equipe.jpeg'
import abdoulImg from '../assets/images/abdoul.jpeg'
import sabriImg from '../assets/images/sabri.JPG'

const tabs = [
  { id: 'equipe', label: 'Notre équipe' },
  { id: 'abdallah', label: 'Abdallah' },
  { id: 'sabri', label: 'Sabri' },
]

const activeTab = ref('equipe')

const members = {
  equipe: {
    name: 'Awal Production',
    role: 'L\'équipe',
    // 💡 Remplace par une photo des deux ensemble quand tu l'as
    image: equipeImg,
    bio: 'Awal Production, c\'est une équipe passionnée par l\'image et le son. Ensemble, Abdallah et Sabri mettent leur expertise au service de vos projets pour créer des contenus vidéo percutants et mémorables.',
    skills: [
      'Réalisation & direction artistique',
      'Montage & post-production',
      'Tournage & captation',
    ]
  },
  abdallah: {
    name: 'Abdallah',
    role: 'Réalisateur',
    image: abdoulImg,
    bio: 'Abdallah est le réalisateur et directeur artistique d\'Awal Production. Avec son œil affûté et sa maîtrise technique, il donne vie à chaque projet avec une vision créative unique.',
    skills: [
      'Direction de plateau',
      'Cadrage & lumière',
      'Direction artistique',
    ]
  },
  sabri: {
    name: 'Sabri',
    role: 'Monteur',
    image: sabriImg,
    bio: 'Sabri est le monteur et coloriste d\'Awal Production. Expert en post-production, il transforme les rushes bruts en contenus finaux soignés et impactants.',
    skills: [
      'Montage vidéo',
      'Étalonnage & colorimétrie',
      'Motion design',
    ]
  }
}

const currentMember = computed(() => members[activeTab.value])
</script>

<style scoped>
.text-beige {
  color: #F4ECD8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>