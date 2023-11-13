document.addEventListener("alpine:init", () => {
  Alpine.data("product", () => ({
    items: [
      { id: 1, name: "Kaos Polos Putih", img: "polos-putih.jpg", price: 35000 },
      { id: 2, name: "Kaos Polos Hitam", img: "polos-hitam.jpg", price: 35000 },
      {
        id: 3,
        name: "Kaos Polos Kuning",
        img: "polos-kuning.jpg",
        price: 35000,
      },
      { id: 4, name: "Kaos Polos Merah", img: "polos-merah.jpg", price: 35000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          if (item.id != newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      //ambil item yang ingin di remove
      const cartItem = this.items.find((item) => id);

      //jika item lebih dari 1
      if (cartItem.quantity > 1) {
        //telusuri satu per satu
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id != id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id != id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
