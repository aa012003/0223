<template>
  <h2>這是購物車列表</h2>
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->

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
          <tr v-for="product in products" :key="product.key">
            <td style="width: 200px">
              <div
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
                style="height: 150px; background-size: cover; background-position: center"
              ></div>
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <div class="h5" v-if="product.price === product.origin_price">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
            </td>

            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary" @click="openModal(product)">
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addCart(product.id)"
                  :disabled="product.id === status.addCartLoading"
                >
                  <i class="fas fa-spinner fa-pulse" v-if="product.id === status.addCartLoading">
                  </i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 購物車列表 -->
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button" @click="removeAllCart()">
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts.carts" :key="cart.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(cart.id)"
              >
                <i class="fas fa-spinner fa-pulse" v-if="cart.id === status.removeLoading"></i>
                <div v-else>x</div>
              </button>
            </td>
            <td>
              {{ cart.product.title }}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="
                      cart.qty--;
                      changeCartQty(cart, cart.qty);
                    "
                    :disabled="cart.qty === 1"
                    v-if="cart.qty > 1"
                  >
                    -
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="removeCartItem(cart.id)"
                    v-else
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0
                        0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0
                         1 .5.5v6a.5.5 0 0
                         1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                      />
                      <path
                        d="M14.5 3a1 1 0 0 1-1
                        1H13v9a2 2 0 0 1-2 2H5a2 2 0 0
                        1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1
                        0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0
                        1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4
                         4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                      />
                    </svg>
                  </button>

                  <input
                    min="1"
                    type="number"
                    class="form-control text-end"
                    v-model="cart.qty"
                    :disabled="cart.id === status.cartQtyLoading"
                    readonly
                  />

                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="
                      cart.qty++;
                      changeCartQty(cart, cart.qty);
                    "
                  >
                    +
                  </button>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
              {{ cart.total }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ carts.total }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ carts.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      defineComponent: '',
      products: [],
      tempProduct: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      status: {
        addCartLoading: '',
        cartQtyLoading: '',
        removeLoading: '',
      },
      carts: {},
    };
  },
  methods: {
    getProducts() {
      axios.get(`${VITE_URL}/api/${VITE_PATH}/products/all`).then((res) => {
        // console.log(res);
        this.products = res.data.products;
      });
    },
    openModal(product) {
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
    changeCartQty(item, qty = 1) {
      const order = {
        productId: item.productId,
        qty,
      };
      this.status.cartQtyLoading = item.id;
      axios
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`, { data: order })
        .then(() => {
          this.status.cartQtyLoading = '';
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    removeCartItem(id) {
      this.status.removeLoading = id;
      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.status.removeLoading = '';
          this.getCart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeAllCart() {
      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    createOrder() {
      const order = this.form;
      axios
        .post(`${VITE_URL}/api/${VITE_PATH}/order`, { data: order })
        .then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getCart() {
      axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`).then((res) => {
        this.carts = res.data.data;
      });
    },
  },
  components: {
    // userModal,
    // VForm: VeeValidate.Form,
    // VField: VeeValidate.Field,
    // ErrorMessage: VeeValidate.ErrorMessage,
  },
  mounted() {
    // this.getProducts(), this.getCart();
  },
};
</script>
