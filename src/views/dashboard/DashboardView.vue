<template>
  <h2>這是後台</h2>
  <nav>
    <RouterLink to="/admin/product">商品列表</RouterLink>|
    <RouterLink to="/admin/order">訂單列表</RouterLink>| <RouterLink to="/">回到前台</RouterLink>|
  </nav>
  <RouterView> </RouterView>
</template>

<script>
import axios from 'axios';

const { VITE_URL } = import.meta.env;

export default {
  methods: {
    checkAdmin() {
      axios
        .post(`${VITE_URL}/api/user/check`)
        .then(() => {
          console.log('成功');
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)joyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
};
</script>
