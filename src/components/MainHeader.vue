<script setup lang="ts">
import { Cloud } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

</script>
<!-- TODO: Criar as páginas para todos os links das rotas -->
<template>
  <header class="bg-sky-500 text-white">
    <div class="container mx-auto px-4 py-6 flex justify-between items-center">
      <RouterLink to="/" class="flex items-center">
        <Cloud :size="32" />
      </RouterLink>
      <nav>
        <ul class="hidden md:flex">
          <li>
            <RouterLink to="/" class="hover:underline mr-4">
              Sobre
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="hover:underline mr-4">
              Previsão
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="hover:underline mr-4">
              Mapas
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="hover:underline mr-4">
              Notícias
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>