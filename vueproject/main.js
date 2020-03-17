
Vue.component('product',{
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">

        <div class="product-image">
            <img v-bind:src="image">
        </div>

        <div class="product-info">
        
          
            
            <h1>Product</h1>
            <h2>{{ brand }} {{ product }}</h2>

            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            
            <p>Shipping: {{ shipping }}</p>

            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>

            <h4>Color</h4>

            <div v-for="(variant,index) in variants"
                 :key="variant.variantId"
                 class="color-box"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)">
            </div>

            <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{disabledButton: !inStock}">Add to Cart</button>

        </div>

    </div>
    `,
    data() {
        return {
            brand:'Vue Mastery',
            product:'T-shirt',
            selectedVariant: 0,
            //image:'tshırt.jpg',
            //inventory: 10,
            //inStock: true,
            details:["80% cotton","20% polyester","Unisex"],
            variants:[
                {
                    variantId: 2234,
                    variantColor:"green",
                    variantImage:'greentshırt.png',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: 'blueetshirt.jpg',
                    variantQuantity: 0
                }]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        image() {
          return this.variants[this.selectedVariant].variantImage
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium:true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})