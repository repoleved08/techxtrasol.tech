<script setup>

const props = defineProps(['title', 'team'])

</script>

<template>

  <section class="bs-container bs-mt-lg" id="team">

    <h2 v-if="title" class="bs-h2 text-center md:text-left">{{ title }}</h2>

    <div class="bs-mt-md grid md:grid-cols-3 gap-6">

      <article
        v-for="(member, idx) in team"
        :key="idx"
        class="group p-6 md:p-10 rounded-xl bg-bs-surface-2 border border-bs-surface-3 flex flex-col gap-4 items-center text-center hover:bg-bs-surface-3 hover:border-transparent transition-all duration-300"
      >

        <!-- Avatar -->
        <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-bs-surface-3 group-hover:border-bs-foreground-dark/30 transition-colors duration-300">
          <img
            :src="member.image"
            :alt="member.name + ' — ' + member.role"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            width="96"
            height="96"
            loading="lazy"
          />
        </div>

        <!-- Name -->
        <h3 class="bs-h3 group-hover:text-bs-foreground-light transition-colors duration-300">
          {{ member.name }}
        </h3>

        <!-- Role -->
        <span class="text-xs uppercase tracking-widest font-semibold text-bs-foreground-dark">
          {{ member.role }}
        </span>

        <!-- Bio -->
        <p class="text-sm text-bs-foreground-dark leading-relaxed">
          {{ member.bio }}
        </p>

      </article>

    </div>

  </section>

</template>
