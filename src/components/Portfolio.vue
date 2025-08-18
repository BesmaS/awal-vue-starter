<template>
  <section id="portfolio" class="py-20 px-4 bg-black">
    <div class="max-w-6xl mx-auto">
      <h3 class="text-3xl font-bold mb-12 text-center text-beige">Nos Réalisations</h3>

      <Swiper
        :modules="[Navigation, Pagination, Autoplay, EffectCoverflow]"
        effect="coverflow"
        :coverflowEffect="{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false
        }"
        :loop="true"
        :centeredSlides="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }"
        :spaceBetween="20"
        :slidesPerView="1.2"
        navigation
        pagination
        class="mySwiper"
      >
        <SwiperSlide v-for="(video, index) in videos" :key="index">
          <a
            :href="video.link"
            target="_blank"
            class="relative h-64 w-full rounded overflow-hidden group"
          >
            <img
              :src="video.thumbnail"
              alt="Miniature vidéo"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition"
            >
              {{ video.title }}
            </div>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const videos = ref([])

const fetchVideos = async () => {
  const res = await fetch('http://localhost/portfolio-backend/api.php')
  const data = await res.json()
  videos.value = data.map(video => {
    const id = video.youtube_id
    return {
      title: video.title || 'Vidéo sans titre',
      link: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    }
  })
}

onMounted(fetchVideos)
</script>

<style scoped>
.mySwiper {
  position: relative;
}

.mySwiper :deep(.swiper-button-prev),
.mySwiper :deep(.swiper-button-next) {
  opacity: 0;
  color: #F4ECD8;
  transition: opacity 0.3s ease;
}

.mySwiper:hover :deep(.swiper-button-prev),
.mySwiper:hover :deep(.swiper-button-next),
.mySwiper :deep(.swiper-button-prev:hover),
.mySwiper :deep(.swiper-button-next:hover) {
  opacity: 1;
}
</style>
