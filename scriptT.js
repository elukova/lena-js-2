const API_URL = '/goods.json';

const vue = new Vue({
    el: "#app",
    data: {
        goods: [],
        filtredGoods: [],
        cart: [],
        search: '',
        isCartOpen: false
    },
    methods: {

        openCartHandler() {
            this.isCartOpen != this.isCartOpen;
        },

        searchHandler() {
            if (this.search === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(this.search, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
        },

        addToCart(e) {
            const index = e.target.dataset.index;
            this.cart.push(this.filtredGoods[index]);
        },

        removeCartHandler(e) {
            const index = e.target.dataset.index;
            this.cart.splice(index - 1, 1);
        },

        fetch(error, success) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        success(JSON.parse(xhr.responseText));
                    } else if (xhr.status > 400) {
                        error('все пропало');
                    }
                }
            }

            xhr.open('GET', API_URL, true);
            xhr.send();
        },

        fetchPromise() {
            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        }
    },
    mounted() {
        this.fetchPromise()
            .then(data => {
                this.goods = data;
                this.filtredGoods = data;
            })
            .catch(err => {
                console.log(err);
            })
    }
})

// class GoodsItem {
//         constructor(title, price) {
//             this.title = title;
//             this.price = price;
//         }

//         getHtml() {
//             return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
//         }
//     }

// class Header {
//         constructor() {
//             this.$container = document.querySelector('header');
//             this.$button = this.$container.querySelector('.cart-button');
//             this.$search = this.$container.querySelector('#search');
//         }

//         setSearchHandler(callback) {
//             this.$search.addEventListener('input', callback);
//         }

//         setButtonHandler(callback) {
//             this.$button.addEventListener('click', callback);
//         }
//     }

// class GoodsList {
//         constructor() {
//             this.api = new Api();
//             this.header = new Header();
//             this.$goodsList = document.querySelector('.goods-list');
//             this.goods = [];
//             this.filteredGoods = [];

//             //this.api.fetch(this.onFetchError.bind(this), this.onFetchSuccess.bind(this));

//             this.header.setSearchHandler((evt) => {
//                 this.search(evt.target.value);
//             })

//             const fetch = this.api.fetchPromise();

//             fetch.then((data) => { this.onFetchSuccess(data) })
//                 .catch((err) => { this.onFetchError(err) });

//             console.log(fetch);
//         }

//         search(str) {
//             if (str === '') {
//                 this.filteredGoods = this.goods;
//             }
//             const regexp = new RegExp(str, 'gi');
//             this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
//             this.render();
//         }

//         onFetchSuccess(data) {
//             this.goods = data.map(({ title, price }) => new GoodsItem(title, price));
//             this.filteredGoods = this.goods;
//             this.render();
//         }

//         onFetchError(err) {
//             this.$goodsList.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`);
//         }

//         render() {
//             this.$goodsList.textContent = '';
//             this.filteredGoods.forEach((good) => {
//                 this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
//             })
//         }
//     }

// function openCart() {
//         console.log('cart');
//     }


// const goodsList = new GoodsList(); 
// })