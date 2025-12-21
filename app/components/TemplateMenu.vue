<script setup>
// Define the menu items as a consistent server-side state
const menuItems = useState('template-menu-items', () => [
  {
    label: 'Starter',
    to: 'https://starter-template.nuxt.dev/',
    color: 'primary',
    checked: true,
    type: 'checkbox'
  },
  {
    label: 'Landing',
    to: 'https://landing-template.nuxt.dev/'
  },
  {
    label: 'Docs',
    to: 'https://docs-template.nuxt.dev/'
  },
  {
    label: 'SaaS',
    to: 'https://saas-template.nuxt.dev/'
  },
  {
    label: 'Dashboard',
    to: 'https://dashboard-template.nuxt.dev/'
  },
  {
    label: 'Chat',
    to: 'https://chat-template.nuxt.dev/'
  },
  {
    label: 'Portfolio',
    to: 'https://portfolio-template.nuxt.dev/'
  },
  {
    label: 'Changelog',
    to: 'https://changelog-template.nuxt.dev/'
  }
])
</script>

<template>
  <ClientOnly>
    <template #default>
      <UDropdownMenu
        v-slot="{ open }"
        :modal="false"
        :items="menuItems"
        :content="{ align: 'start' }"
        :ui="{ content: 'min-w-fit' }"
        size="xs"
      >
        <UButton
          label="Starter"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          size="xs"
          class="-mb-[6px] font-semibold rounded-full truncate"
          :class="[open && 'bg-primary/15']"
          :ui="{
            trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
          }"
        />
      </UDropdownMenu>
    </template>
    <template #fallback>
      <div class="h-6 w-20 bg-gray-100 rounded animate-pulse"></div>
    </template>
  </ClientOnly>
</template>
