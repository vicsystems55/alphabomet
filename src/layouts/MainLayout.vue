<template>
  <div class="min-h-screen bg-dark text-ivory font-body overflow-x-hidden">
    <!-- Blended background -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_#7d1118_0%,_#1a1a1a_38%,_#050505_100%)]"></div>
      <div class="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,_rgba(214,177,106,0.18),_transparent_40%,_rgba(125,17,24,0.25))]"></div>
    </div>

    <!-- Header -->
    <header class="fixed top-0 left-0 z-50 w-full border-b border-secondary/10 bg-dark/55 backdrop-blur-xl">
      <div class="mx-auto flex max-w-container items-center justify-between px-6 py-5">
        <RouterLink to="/" class="flex items-center">
          <img
            src="../assets/images/logo.png"
            alt="Alphabomet Holdings logo"
            class="h-15 w-auto object-contain"
          />
        </RouterLink>

       <nav class="hidden items-center gap-8 lg:flex">
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/businesses" class="nav-link">What We Build</RouterLink>
        <RouterLink to="/impact" class="nav-link">Impact</RouterLink>
        <RouterLink to="/partnerships" class="nav-link">Partnerships</RouterLink>
        <RouterLink to="/insights" class="nav-link">Insights</RouterLink>
        <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
      </nav>

        <RouterLink
          to="/partnerships"
          class="hidden rounded-button bg-secondary px-6 py-3 text-sm font-semibold text-dark transition hover:bg-secondary-light lg:inline-flex"
        >
          Partner With Us
        </RouterLink>
      </div>
    </header>

    <!-- Main page content -->
    <main class="relative pt-24">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="relative border-t bg-[#0A0A0A] border-secondary/10 px-6 py-12">
      <div class="mx-auto flex max-w-container flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="font-heading text-2xl text-ivory">Alphabomet Holdings</p>
          <p class="mt-2 text-sm text-text-muted">
            Building enterprises that power economies.
          </p>
        </div>

        <p class="text-sm text-text-muted">
          © {{ new Date().getFullYear() }} Alphabomet Holdings. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>