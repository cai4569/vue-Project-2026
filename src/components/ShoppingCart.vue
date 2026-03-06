<template>
  <div class="cart-page">
    <h1>购物车</h1>
    
    <!-- 空状态提示 -->
    <div v-if="cart.length === 0" class="empty-msg">
      😭 购物车是空的，快去加点商品吧！
      <button @click="resetData" class="btn-reset">重置数据</button>
    </div>

    <!-- 购物车表格 -->
    <table v-else class="cart-table">
      <thead>
        <tr>
          <th>商品名称</th>
          <th>单价 (元)</th>
          <th>数量</th>
          <th>小计 (元)</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button @click="updateCount(item, -1)" :disabled="item.count <= 1">-</button>
            <span class="count-num">{{ item.count }}</span>
            <button @click="updateCount(item, 1)">+</button>
          </td>
          <td class="sub-total">{{ item.price * item.count }}</td>
          <td>
            <button @click="removeItem(item.id)" class="btn-del">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 底部结算栏 -->
    <div v-if="cart.length > 0" class="footer-bar">
      <div class="total-info">
        <span>共 {{ totalCount }} 件商品</span>
        <span class="price-tag">总计: ¥{{ totalPrice }}</span>
      </div>
      <button @click="checkout" class="btn-checkout">立即结算</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 1. 定义数据：初始给几个商品，方便演示
const cart = ref([
  { id: 1, name: 'Vue 教程书', price: 45, count: 1 },
  { id: 2, name: '机械键盘', price: 299, count: 1 },
  { id: 3, name: '咖啡杯', price: 25, count: 2 }
]);

// 2. 方法：增加或减少数量
const updateCount = (item, change) => {
  const newCount = item.count + change;
  if (newCount >= 1) {
    item.count = newCount;
  }
};

// 3. 方法：删除商品
const removeItem = (id) => {
  if(confirm('确定要删除这个商品吗？')) {
    cart.value = cart.value.filter(item => item.id !== id);
  }
};

// 4. 方法：重置数据 (用于空状态测试)
const resetData = () => {
  cart.value = [
    { id: 1, name: 'Vue 教程书', price: 45, count: 1 },
    { id: 2, name: '机械键盘', price: 299, count: 1 },
    { id: 3, name: '咖啡杯', price: 25, count: 2 }
  ];
};

// 5. 方法：结算
const checkout = () => {
  alert(`支付成功！\n您共购买了 ${totalCount.value} 件商品。\n总金额：¥${totalPrice.value}`);
};

// 6. 计算属性：自动算总数和总价
const totalCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.count, 0);
});

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.count), 0);
});
</script>

<style scoped>
/* 简单的样式，让作业看起来整洁漂亮 */
.cart-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

h1 { text-align: center; color: #333; margin-bottom: 30px; }

.empty-msg {
  text-align: center;
  padding: 50px;
  color: #666;
  background: #f9f9f9;
  border-radius: 8px;
}

.btn-reset {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.cart-table th, .cart-table td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.cart-table th { background-color: #f8f8f8; color: #555; }

.count-num { margin: 0 10px; font-weight: bold; }

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
}

button:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-del { background: #ffebee; color: #f44336; }
.btn-del:hover { background: #f44336; color: white; }

.footer-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
}

.total-info { font-size: 18px; color: #333; }
.price-tag { color: #f44336; font-weight: bold; font-size: 22px; margin-left: 20px; }

.btn-checkout {
  background: #42b983;
  color: white;
  font-size: 18px;
  padding: 12px 30px;
}
.btn-checkout:hover { background: #3aa876; }
</style>