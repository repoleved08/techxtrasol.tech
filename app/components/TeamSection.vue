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

        <!-- Skills -->
        <div v-if="member.skills" class="flex flex-wrap gap-1.5 justify-center mt-auto pt-2">
          <span
            v-for="(skill, sIdx) in member.skills"
            :key="sIdx"
            class="text-[10px] px-2 py-1 rounded-full bg-bs-surface-1 border border-bs-surface-3 text-bs-foreground-dark/70"
          >
            {{ skill }}
          </span>
        </div>

        <!-- Social links -->
        <div v-if="member.linkedin || member.github" class="flex gap-3 mt-2">
          <a
            v-if="member.linkedin"
            :href="member.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-bs-foreground-dark/40 hover:text-bs-accent transition-colors duration-300"
            :aria-label="'Connect with ' + member.name + ' on LinkedIn'"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            v-if="member.github"
            :href="member.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-bs-foreground-dark/40 hover:text-bs-accent transition-colors duration-300"
            :aria-label="`View ${member.name} GitHub profile`"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>

      </article>

    </div>

  </section>

</template>
