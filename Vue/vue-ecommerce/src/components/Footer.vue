<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Contact Us</h3>
        <p>1234 E-commerce St.<br />Shop City, SC 12345</p>
        <p>Email: support@shop.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/privacy">Privacy Policy</router-link></li>
          <li><router-link to="/terms">Terms & Conditions</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-linkedin-in"></i>
        </div>
      </div>
      <div class="footer-section">
        <h3>Newsletter</h3>
        <p>Sign up for exclusive offers and news:</p>
        <br />
        <form class="newsletter-form">
          <input type="email" placeholder="Your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Shop. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #f8f8f8;
  padding: 20px 100px;
  color: #333;
  text-align: left;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
}

.footer-section h3 {
  margin-bottom: 15px;
}

.footer-section p,
.footer-section ul,
.footer-section form {
  margin: 0;
  padding: 0;
  font-size: 15px;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 5px;
}

.footer-section ul li a {
  text-decoration: none;
  color: #333;
}

.footer-section ul li a:hover {
  color: #007bff;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icons i {
  color: rgb(83, 79, 79);
  cursor: pointer;
}

.social-icons i:hover {
  color: #007bff;
}

.newsletter-form {
  display: flex;
  gap: 5px;
}

.newsletter-form input {
  padding: 8px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.newsletter-form button {
  padding: 8px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.newsletter-form button:hover {
  background-color: #0056b3;
}

.footer-bottom {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9em;
  color: #666;
}
</style>
