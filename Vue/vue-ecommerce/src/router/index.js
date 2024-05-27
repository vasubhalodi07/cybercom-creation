import MainLayout from "@/layouts/MainLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Product from "@/pages/Product.vue";
import Contact from "@/pages/Contact.vue";
import Cart from "@/pages/Cart.vue";
import ProductDetail from "@/pages/ProductDetail.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

import AddProduct from "@/pages/AddProduct.vue";

import store from "../store/index";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/product",
        name: "Product",
        component: Product,
      },
      {
        path: "/product/:id",
        name: "ProductDetail",
        component: ProductDetail,
      },
      {
        path: "/contact",
        name: "Contact",
        component: Contact,
      },
      {
        path: "/cart",
        name: "Cart",
        component: Cart,
        meta: { requiresAuth: true },
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { guestOnly: true },
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { guestOnly: true },
      },
      {
        path: "/add-product",
        name: "AddProduct",
        component: AddProduct,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = store.state.user.id;
  const role = store.state.user.role;

  // Check guest-only routes
  if (to.matched.some((record) => record.meta.guestOnly) && isAuth) {
    return next({ name: "Home" });
  }

  // Check requiresAuth routes
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuth) {
    return next({ name: "Home" });
  }

  // Check requiresAdmin routes
  if (
    to.matched.some((record) => record.meta.requiresAdmin) &&
    role !== "admin"
  ) {
    return next({ name: "Home" });
  }

  next();
});

export default router;
