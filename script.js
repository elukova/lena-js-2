class ApiMock {
    constructor() {

    }

    fetch() {
        return [
            { title: 'Spa tour', img: 'img/spa.jpg', price: 150 },
            { title: 'Mountain tour', img: 'img/sunset.jpg', price: 50 },
            { title: 'Ecotour', img: 'img/village.jpg', price: 350 },
            { title: 'Seaside', img: 'img/seaside.jpg', price: 250 },
            { title: 'Altai', img: 'img/altai.jpg', price: 250 },
        ];
    }
}

class GoodsItem {
    constructor(title, img, price) {
        this.title = title;
        this.img = img;
        this.price = price;
    }

    getHTML() {
        return `<div class="goods-item"><h3>${this.title}</h3><img class="card-image" src=${this.img} alt="picture ${this.title}"><p>${this.price}</p></div>`;
    };
}

class GoodsList {
    constructor() {
        this.api = new ApiMock();
        this.$goodsList = document.querySelector('.goods-list');
        this.goods = [];
    }

    fetchGoods() {
        this.goods = this.api.fetch().map(({ title, img, price }) => new GoodsItem(title, img, price));
    }

    render() {
        this.$goodsList.textContent = '';
        this.goods.forEach((good) => {
            this.$goodsList.insertAdjacentHTML('beforeend', good.getHTML());
        })
    }
}

class Cart extends GoodsList {
    constructor(title, price, quantity) {
        super(title, price)
    }
}

class CartItem extends GoodsItem {
    constructor(title, price, quantity) {
        super(title, price);
        this.quantity = quantity;
    }
    summ() {
        return this.quantity * this.price;
    }
    // getHTML() {
    //     return `<div class="goods-list"><h3>${title}</h3><p>${price}</p></div>`;
    // }
}

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();