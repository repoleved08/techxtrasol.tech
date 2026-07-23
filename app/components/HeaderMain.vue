<script setup>

const props = defineProps(['settings'])

</script>

<template>

  <!-- Header -->
  <header class="wrapper bg-loop font-semibold">

    <!-- Wrapper -->
    <div class="bs-container py-6 flex justify-between items-center">

      <!-- Logo -->
      <a class="flex xl:min-w-32 group" href="/" :aria-label="settings.title + ' - Home'">

        <Icon
          name="bs-icon:logo"
          class="group-hover:-rotate-180 group-hover:scale-80 transition-transform ease-bs-spring duration-1000"
          size="48"
        />
      </a>

      <!-- Nav -->
      <nav class="hidden col-span-6 md:flex mx-auto self-stretch lg:gap-2">

        <!-- Links -->
        <a v-for="item in settings.nav" :key="item.link"
          class="bs-btn !bg-transparent before:translate-y-full hover:before:translate-y-0" :href="item.link">

          {{ item.title }}

        </a>

      </nav>

      <!-- CTA -->
      <button type="button" class="min-w-32 bs-btn" @click="useDialogOpen">

        {{ settings.demo.title }}

      </button>

    </div>

  </header>

</template>
