// plugins/toast.js
import Vue from "vue";
import Toast from "~/components/Toast.vue";

const ToastConstructor = Vue.extend(Toast);

function showToast({ message, type, duration }) {
  const toastInstance = new ToastConstructor();
  toastInstance.$mount();
  document.body.appendChild(toastInstance.$el);
  toastInstance.show(message, type, duration);
}

Vue.prototype.$toast = showToast;
