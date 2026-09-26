const obj = {
  items: [1, 2, 3],
  multiplier: 10,
  getMultiplied: function() {
    return this.items.map((item) => {
      return item * this.multiplier; // Bug, because this.multiplier reference 
    });
  }
};
console.log(obj.getMultiplied());