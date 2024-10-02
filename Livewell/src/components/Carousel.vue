<template>
  <div class="product-carousel" ref="carousel" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">
    <div class="carousel-container" :style="{ transform: `translateX(${-offset}px)` }">
      <div v-for="product in duplicatedProducts" :key="product.id" class="product-card">
        <div class="product-tag" v-if="product.tag">{{ product.tag }}</div>
        <div class="product-image-container">
          <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image">
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }}</p>
          <ul class="product-features">
            <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
          </ul>
        </div>
        <button class="upgrade-button">Upgrade Entry</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'ProductCarousel',
  setup() {
    const products = [
      {
        id: 1,
        name: 'PHARMAZING TRIAL PACK',
        price: '₱500.00',
        image: 'trial-package.jpg',
        tag: 'NEW',
        features: [
          'Unlimited Direct Referrals',
          'Up to 8th Level Indirect Referrals',
          '30% Discount on PharmaZinc',
          '25% Discount on Wellness Services'
        ]
      },
      {
        id: 2,
        name: 'STARLITE PACKAGE',
        price: '₱1,500.00',
        image: 'starlite-package.png',
        features: [
          'Up to 10th level earnings',
          'Up to 30% discount on wellness services',
          'Next purchase of P1500 = Buy 1 Take 1'
        ]
      },
      {
        id: 3,
        name: 'ELITE PACKAGE',
        price: '₱4,500.00',
        image: 'elite-package.png', // Changed to lowercase extension
        features: [
          'Up to 15th level earnings',
          'Up to 35% discount on wellness services',
          'Next purchase of P1500 = Buy 1 Take 1'
        ]
      },
      {
        id: 4,
        name: 'EXECUTIVE PACKAGE',
        price: '₱10,500.00',
        image: 'executive-package.png', // Changed to lowercase extension
        features: [
          'Up to 20th level earnings',
          'Up to 40% discount on wellness services',
          '7 bottles of PharmaZinc + 2 bottles FREE',
          'P13,500 VALUE FOR MONEY'
        ]
      },
      {
        id: 5,
        name: 'DIRECTOR PACKAGE',
        price: '₱21,000.00',
        image: 'director-package.png', // Changed to lowercase extension
        features: [
          'Up to 25th level earnings',
          'Up to 50% discount on wellness services',
          '15 bottles of PharmaZinc + 5 bottles FREE',
          'P30,000 VALUE FOR MONEY',
          'Exclusive Director Training'
        ]
      },
    ];

    const carousel = ref(null);
    const offset = ref(0);
    const cardWidth = ref(0);
    const isDragging = ref(false);
    const startX = ref(0);
    const startOffset = ref(0);

    const duplicatedProducts = computed(() => [...products, ...products, ...products]);

    const getImageUrl = (imageName) => {
      return new URL(`/src/images/${imageName}`, import.meta.url).href;
    };

    const startDrag = (e) => {
      isDragging.value = true;
      startX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      startOffset.value = offset.value;
      carousel.value.style.cursor = 'grabbing';
    };

    const drag = (e) => {
      if (!isDragging.value) return;
      const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const diff = startX.value - currentX;
      offset.value = startOffset.value + diff;
      checkBoundary();
    };

    const endDrag = () => {
      isDragging.value = false;
      carousel.value.style.cursor = 'grab';
    };

    const checkBoundary = () => {
      const maxOffset = cardWidth.value * products.length;
      if (offset.value < 0) {
        offset.value += maxOffset;
      } else if (offset.value >= maxOffset) {
        offset.value -= maxOffset;
      }
    };

    let animationId;
    const animate = () => {
      offset.value += 0.5;
      checkBoundary();
      animationId = requestAnimationFrame(animate);
    };

    onMounted(() => {
      cardWidth.value = carousel.value.offsetWidth / 3;
      animationId = requestAnimationFrame(animate);
    });

    onUnmounted(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });

    return {
      carousel,
      offset,
      duplicatedProducts,
      startDrag,
      drag,
      endDrag,
      getImageUrl,
    };
  }
};
</script>

<style scoped>
.product-carousel {
  max-width: 90%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  overflow: hidden;
  cursor: grab;
}

.carousel-container {
  display: flex;
  transition: transform 0.1s ease;
}

.product-card {
  flex: 0 0 calc(33.333% - 1rem);
  margin-right: 1rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.product-image-container {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

.product-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #4a0e4e;
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 4px;
}

.product-info {
  padding: 1rem;
  flex-grow: 1;
}

.product-name {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a0e4e;
  margin-bottom: 1rem;
}

.product-features {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 1rem;
}

.product-features li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.product-features li::before {
  content: '✓';
  color: #4a0e4e;
  margin-right: 0.5rem;
}

.upgrade-button {
  background-color: #4a0e4e;
  color: white;
  border: none;
  padding: 0.75rem;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upgrade-button:hover {
  background-color: #3a0b3e;
}
</style> 