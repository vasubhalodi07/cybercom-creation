<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div>
      Else
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    if (this.isLoggedIn && !this.user.data) {
      this.fetchUsers();
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      user: state => state.user,
      loading: state => state.user.loading
    })
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch("userProfile", {
        token: this.$store.state.access_token,
        app: this.$nuxt
      })
    }
  }
}
</script>
