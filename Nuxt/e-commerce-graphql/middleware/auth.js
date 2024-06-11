export default async function ({ store, redirect, app }) {
  const access_token = app.$cookies.get("access_token");
  const refresh_token = app.$cookies.get("refresh_token");
  const user = app.$cookies.get("user");

  // console.log(access_token);
  // console.log(refresh_token);
  // console.log(user);

  // if (user && access_token) {
  //   store.commit("SET_ACCESS_TOKEN", access_token);
  //   store.commit("SET_REFRESH_TOKEN", refresh_token);
  //   store.commit("SET_USER", user);
  // } else if (access_token && !user) {
  //   try {
  //     await store.dispatch("userProfile", { token: access_token, app });
  //   } catch (error) {
  //     console.error("Error fetching user profile:", error);
  //     return redirect("/");
  //   }
  // }
}
