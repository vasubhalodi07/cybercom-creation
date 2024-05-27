<template>
  <div class="navbar">
    <div class="navbar-section">
      <div class="navbar-logo">Shop</div>
    </div>
    <div class="navbar-section">
      <div class="navbar-link">
        <router-link to="/">Home</router-link>
      </div>
      <div class="navbar-link">
        <router-link to="/product">Product</router-link>
      </div>
      <div class="navbar-link" v-if="isLoggedInWithRoleAdmin">
        <router-link to="/add-product">Add Product</router-link>
      </div>
      <div class="navbar-link">
        <router-link to="/contact">Contact</router-link>
      </div>
    </div>
    <div class="navbar-icon-section">
      <!-- <i class="fa-solid fa-heart" v-if="isLoggedIn"></i> -->
      <router-link to="/cart" v-if="isLoggedIn">
        <i class="fa-solid fa-cart-shopping"></i>
      </router-link>

      <div
        class="user-icon-container"
        v-if="isLoggedIn"
        @click="toggleUserMenu"
      >
        <i class="fa-solid fa-user"></i>
        <span class="username">{{ this.$store.state.user.name }}</span>
        <div class="user-menu" v-show="isUserMenuVisible" @click.stop="">
          <div @click="goToProfile">Profile</div>
          <div @click="logout">Logout</div>
        </div>
      </div>

      <div class="navbar-link-login" v-else>
        <router-link to="/login" class="login-text">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
      isUserMenuVisible: false,
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.user.id;
    },
    isLoggedInWithRoleAdmin() {
      return this.$store.state.user.id && this.$store.state.user.role == "admin";
    },
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuVisible = !this.isUserMenuVisible;
    },
    goToProfile() {
      this.$router.push("/profile");
      this.isUserMenuVisible = false;
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 15px 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-icon-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar-logo {
  font-size: 1.5em;
  font-weight: bold;
}

.navbar-link {
  margin: 0 15px;
  cursor: pointer;
}

.navbar-link a {
  text-decoration: none;
  color: rgb(83, 79, 79);
  font-weight: 500;
}

.navbar-link-login a {
  text-decoration: none;
  color: rgb(83, 79, 79);
  font-weight: 500;
}

.navbar-link a:hover {
  color: black;
}

i {
  cursor: pointer;
  color: rgb(83, 79, 79);
}

i:hover {
  color: rgb(0, 0, 0);
}

.user-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-weight: 500;
  color: rgb(83, 79, 79);
}

.user-menu {
  position: absolute;
  right: 0;
  top: 35px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100px;
  text-align: center;
}

.user-menu div {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.user-menu div:last-child {
  border-bottom: none;
}

.user-menu div:hover {
  background-color: #f1f1f1;
}

.login-text {
  cursor: pointer;
  color: rgb(83, 79, 79);
  font-weight: 500;
}

.login-text:hover {
  color: black;
}
</style>
