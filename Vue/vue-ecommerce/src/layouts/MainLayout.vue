<template>
  <div>
    <Topbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "MainLayout",
  components: {
    Topbar,
    Footer,
  },
};
</script>

<style scoped></style>
