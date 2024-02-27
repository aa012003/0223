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

  <div type="text/x-template" id="userProductModal">
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{}}</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <!-- <img class="img-fluid" :src="" alt=""> -->
              </div>
              <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill">{{}}</span>
                <p>商品描述：{{}}</p>
                <p>商品內容：{{}}</p>
                <div class="h5">{{}} 元</div>
                <del class="h6">原價 {{}} 元</del>
                <div class="h5">現在只要 {{}} 元</div>
                <div>
                  <div class="input-group">
                    <input type="number" class="form-control" min="1" />
                    <button type="button" class="btn btn-primary">加入購物車</button>
                  </div>
                </div>
              </div>
              <!-- col-sm-6 end -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { Modal } from 'bootstrap';

const { VITE_URL, VITE_PATH } = import.meta.env;

const userModal = {
  props: ['tempProduct', 'addCart'],
  data() {
    return {
      productModal: null,
      qty: 1,
    };
  },
  template: '#userProductModal',
  methods: {
    open() {
      this.$nextTick(() => {
        if (this.productModal) {
          this.productModal.show();
        }
      });
    },
    close() {
      this.$nextTick(() => {
        if (this.productModal) {
          this.productModal.hide();
        }
      });
    },
  },
  watch: {
    tempProduct() {
      this.qty = 1;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.productModal = new Modal(this.$refs.modal);
      console.log('Modal initialized:', this.productModal);
    });
  },
};

export default {
  components: {
    userModal,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      carts: {},
    };
  },
  methods: {
    getProducts(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
    },
    addCart(productId, qty = 1) {
      const order = {
        productId,
        qty,
      };
      this.status.addCartLoading = productId;
      axios.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: order }).then((res) => {
        console.log(res);
        alert(res.data.message);
        this.status.addCartLoading = '';
        this.$refs.userModal.close();
        this.getCart();
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
