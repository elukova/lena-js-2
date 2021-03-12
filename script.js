class ApiMock {
    constructor() {

    }

    fetch() {
        return [
            { title: 'Spa tour', price: 150 },
            { title: 'Mountain tour', price: 50 },
            { title: 'Ecotour', price: 350 },
            { title: 'Seaside', price: 250 },
            { title: 'Altai', price: 250 },
        ];
    }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    getHTML() {
        return `<div class="goods-list"><h3>${title}</h3><p>${price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.api = new ApiMock();
        this.$goodsList = document.querySelector('.goods-list');
        this.goods = [];
    }

    fetchGoods() {
        this.goods = this.api.fetch().map(({ title, price }) => new GoodsItem(title, price));
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
goodsList.render;