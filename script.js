class ApiMock {
    class Api {
    constructor() {
        this.url = '/goods.json';
    }

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

        xhr.open('GET', this.url, true);
        xhr.send();
    }

    fetch() {
        return [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];


        fetchPromise() {
            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        }
    }

    @@ -24, 15 + 46, 41 @@class GoodsItem {
    }
    }

class Header {
    constructor() {
        this.$container = document.querySelector('header');
        this.$button = this.$container.querySelector('.cart-button');
    }

    setButtonHandler(callback) {
        this.$button.addEventListener('click', callback);
    }
}

class GoodsList {
    constructor() {
        this.api = new ApiMock();
        this.api = new Api();
        this.$goodsList = document.querySelector('.goods-list');
        this.goods = [];

        //this.api.fetch(this.onFetchError.bind(this), this.onFetchSuccess.bind(this));

        const fetch = this.api.fetchPromise();

        fetch.then((data) => { this.onFetchSuccess(data) })
            .catch((err) => { this.onFetchError(err) });

        console.log(fetch);
    }


    onFetchSuccess(data) {
        this.goods = data.map(({ title, price }) => new GoodsItem(title, price));
        this.render();
    }

    fetchGoods() {
        this.goods = this.api.fetch().map(({ title, price }) => new GoodsItem(title, price));
        onFetchError(err) {
            this.$goodsList.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`);
        }

        render() {
            @@ -43, 7 + 91, 12 @@class GoodsList {
            }
        }

        const goodsList = new GoodsList();
        function openCart() {
            console.log('cart');
        }

        const header = new Header();

        header.setButtonHandler(cart.openCartHandler);

        goodsList.fetchGoods();
        goodsList.render();
        const goodsList = new GoodsList();