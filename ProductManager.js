class ProductManager {
    static quantity = 0;
    static #products = [];

    create(data) {
    const product = {
        id: ProductManager.quantity === 0 ? 1 : ProductManager.#products[ProductManager.quantity - 1].id + 1,
        title: data.title,
            photo: data.photo,
            category: data.category,
            price: data.price || 0,
            stock: data.stock || 0
     }
     if (!product.title || !product.price || !product.stock) {
        console.log("Faltan propiedades obligatorias para crear el producto.");
        return;
    }
    ProductManager.#products.push(product) 
    ProductManager.quantity++;
      
    }
    read() {
        return ProductManager.#products;
    }
}

const product = new ProductManager();
product.create({ title: "remera", photo: "camisa.jpg", category: "Ropa", price: 20, stock: 50 });
product.create({ title: "Pantalón", photo: "pantalon.jpg", category: "Ropa", price: 30, stock: 40 });
product.create({ title: "", photo: "zapatos.jpg", category: "Calzado", price: 50, stock: 20 });
product.create({ title: "Bufanda", photo: "bufanda.jpg", category: "Accesorios", price: 15, stock: 60 });
product.create({ title: "Sombrero", photo: "sombrero.jpg", category: "Accesorios", price: 25, stock: 30 });


console.log(product.read());