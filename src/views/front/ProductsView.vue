<!-- eslint-disable camelcase -->
<template>
  <user-Modal :temp-product="tempProduct" :add-cart="addCart" ref="userModal"></user-Modal>

  <div class="container">
    <div class="mt-4">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
                style="height: 160px; background-size: cover; background-position: center"
              ></div>
            </td>
            <td>{{ product.title }}</td>
            <td>
              <div class="h5">{{ product.price }} 元</div>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary" @click="openModal(product)">
                  <i class="fas fa-spinner fa-pulse"></i>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger" @click="addCart(product.id)">
                  <i class="fas fa-spinner fa-pulse"></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import userModal from '../../components/UserModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    userModal,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      carts: {},
      status: {
        addCartLoading: '',
      },
    };
  },
  methods: {
    getProducts() {
      axios.get(`${VITE_URL}/api/${VITE_PATH}/products/all`).then((res) => {
        // console.log(res);
        this.products = res.data.products;
      });
    },
    // eslint-disable-next-line camelcase
    addCart(product_id, qty = 1) {
      const order = {
        // eslint-disable-next-line camelcase
        product_id,
        qty,
      };
      // eslint-disable-next-line camelcase
      this.status.addCartLoading = product_id;
      axios.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: order }).then((res) => {
        console.log(res);
        alert(res.data.message);
        this.status.addCartLoading = '';
        this.$refs.userModal.close();
      });
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
