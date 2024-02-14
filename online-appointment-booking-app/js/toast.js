function showToast(message, type) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.innerHTML = `
      <div class='toast-content'>
        <div class="icon">${getIcon(type)}</div>
        <div>${message}</div>
      </div>  
      <div class="close-btn"><i class="fas fa-times"></i></div>
    `;
  toastContainer.appendChild(toast);

  const closeBtn = toast.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    toast.remove();
  });

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

function getIcon(type) {
  switch (type) {
    case "error":
      return '<i class="fas fa-times-circle"></i>';
    case "warning":
      return '<i class="fas fa-exclamation-triangle"></i>';
    case "success":
      return '<i class="fas fa-check-circle"></i>';
    case "info":
      return '<i class="fas fa-info-circle"></i>';
    default:
      return "";
  }
}
