// Hamburger       

class Hamburger {
    constructor(builder) {
        this.size = builder.size;
        this.stuffing = builder.stuffing;
        this.toppingList = builder.toppingList;
        this.price = builder.price;
        this.calories = builder.calories;
    }
    getToppings = () => console.log(this.toppingList).join(', ');
    getSize = () => console.log(this.size);
    getStuffing = () => console.log(this.stuffing);
    calculatePrice = () => console.log(this.price);
    calculateCalories = () => console.log(this.calories);
}

const small = {
    price: 50,
    calories: 20
};

const big = {
    price: 100,
    calories: 40
};

const cheeseStuffing = {
    price: 10,
    calories: 20
};

const saladStuffing = {
    price: 20,
    calories: 5
};


const potatoStuffing = {
    price: 15,
    calories: 10
};

const spiceTopping = {
    name: 'spice',
    price: 15,
    calories: 0
};

const mayonnaiseTopping = {
    name: 'mayonnaise',
    price: 15,
    calories: 0
};

class HamburgerMaker {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.price = size.price + stuffing.price;
        this.calories = size.calories + stuffing.calories;
    }
    addTopping(topping) {
        this.toppingList.push(topping.name);
        this.price += topping.price;
        this.calories += topping.calories;
    }
    removeTopping(topping) {
        let deletedIndex = this.toppingList.findIndex(topping.name);
        toppingList.splice(deletedIndex, 1);
        this.price -= topping.price;
        this.calories -= topping.calories;
    }
    getHamburger() {
        return new Hamburger(this);
    }
}

const hamburger1 = (new HamburgerMaker(small, cheeseStuffing))
    .getHamburger();

console.log(hamburger1);
hamburger1.getSize;
hamburger1.getToppings;
hamburger1.getStuffing;
hamburger1.calculateCalories;
hamburger1.calculatePrice;
