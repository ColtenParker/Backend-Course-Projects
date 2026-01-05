//apply 10% off coupon
//remove any over $20
//Sum up cost and calculate avg

const products = [
  { name: "laptop charger", price: 25 },
  { name: "keyboard", price: 22 },
  { name: "mouse", price: 18 },
  { name: "monitor", price: 30 },
  { name: "cable", price: 5 },
];

const discounted = products.map((product) => ({
  name: product.name,
  price: product.price * 0.9,
}));
console.log(discounted);

const cheap = discounted.filter((product) => product.price <= 20);
console.log(cheap);

const total = cheap.reduce((prev, current) => {
  prev += current.price;
  return prev;
}, 0);

console.log(total);
console.log("average:", total / cheap.length);
