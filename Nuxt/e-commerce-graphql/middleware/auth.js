export default async function ({ store, redirect, route }) {
  const isAuthenticated = store.state.isLoggedIn;
  const restrictedRoutes = ["cart", "profile", "categories", "product/create"];

  console.log(isAuthenticated);

  if (!isAuthenticated && restrictedRoutes.includes(route.name)) {
    return redirect("/login");
  }

  // if (isAuthenticated) {
  //   const adminRoutes = ["categories", "product/create"];
  //   const requiresAdminAccess = adminRoutes.includes(route.name);

  //   const customerRoutes = ["cart", "profile"];
  //   const requiresCustomerAccess = customerRoutes.includes(route.name);

  //   if (requiresAdminAccess && store.state.user.role !== "admin") {
  //     return redirect("/");
  //   }

  //   if (requiresCustomerAccess && store.state.user.role !== "customer") {
  //     return redirect("/");
  //   }
  // }
}
