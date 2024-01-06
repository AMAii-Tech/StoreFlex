const configObect = {
    USERS: {
        source: "users",
        defaultSort: "name DESC",
        idProperty: "user_id"
    },
    STORES: {
        source: "stores",
        defaultSort: "storeName DESC",
        idProperty: "store_id"
    },
    PRODUCTS: {
        source: "products",
        defaultSort: "productName DESC",
        idProperty: "product_id"
    }
}

module.exports = configObect;