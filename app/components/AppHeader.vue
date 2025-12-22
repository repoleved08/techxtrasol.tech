<script setup lang="ts">
const route = useRoute();

const items = computed(() => [
  {
    label: "Docs",
    to: "/docs",
    active: route.path.startsWith("/docs"),
  },
  {
    label: "Pricing",
    to: "/pricing",
  },
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Changelog",
    to: "/changelog",
  },
]);
</script>

<template>
  <UHeader>
    <!-- LEFT -->
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-3">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <TemplateMenu />
    </template>

    <!-- CENTER -->
    <UNavigationMenu :items="items" variant="link" />

    <!-- RIGHT -->
    <template #right>
      <UColorModeButton />

      <ClientOnly>
        <SignedOut>
          <SignInButton mode="modal">
            <UButton
              label="Sign in"
              color="neutral"
              variant="outline"
              class="hidden lg:inline-flex"
            />
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </ClientOnly>
    </template>

    <!-- MOBILE DRAWER -->
    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      <USeparator class="my-6" />

      <ClientOnly>
        <SignedOut>
          <SignInButton mode="modal">
            <UButton
              label="Sign in"
              color="neutral"
              variant="outline"
              block
              class="mb-3 lg:hidden"
            />
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div class="flex justify-center">
            <UserButton />
          </div>
        </SignedIn>
      </ClientOnly>
    </template>
  </UHeader>
</template>
