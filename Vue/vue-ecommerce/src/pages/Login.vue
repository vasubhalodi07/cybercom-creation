<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          v-model="formData.email"
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          v-model="formData.password"
        />
        <button type="submit" class="submit-button" v-bind:disabled="loading">
          {{ loading ? "Loading..." : "Login" }}
        </button>
      </form>
      <div class="login-footer">
        <router-link to="/register"
          >Don't have an account? Register</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from "../components/FormInput.vue";

export default {
  name: "Login",
  components: {
    FormInput,
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      let body = {
        email: this.formData.email,
        password: this.formData.password,
      };

      this.$store.dispatch("login", {
        body: body,
        router: this.$router,
      });
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f0f0f5;
  padding: 20px;
}

.login-container {
  background: white;
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 2em;
}

form {
  display: flex;
  flex-direction: column;
}

.login-button {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background-color: #4685c9;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #3b55c9;
}

.login-footer {
  text-align: center;
  margin-top: 5px;
  font-size: 0.9em;
}

.login-footer a {
  color: #4685c9;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
