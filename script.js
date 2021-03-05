const goods = [
    { title: 'Spa tour', img: 'spa.jpg', price: 150 },
    { title: 'Mountain tour', img: 'sunset.jpg', price: 50 },
    { title: 'Ecotour', img: 'village.jpg', price: 350 },
    { title: 'Seaside', img: 'seaside.jpg', price: 250 },
    { title: 'Altai', img: 'none.jpg', price: 250 },
];

// <img id="spa" src="img\small\spa.jpg" alt="spa picture" onclick="f()">

const $goodsList = document.querySelector('.goods-list');

const renderGoodsItem = ({ title, img, price }) => {
    return `<div class="goods-item"><h3>${title}</h3><img class="card-image" src="${img}" alt="picture ${title}"><p>${price}</p></div>`;
};

const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
        item => renderGoodsItem(item)
    ).join('\n');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}

renderGoodsList();