const configObect = {
    USERS: {
        source: "users",
        defaultSort: "name DESC",
        primaryKey: "user_id",
    },
    STORES: {
        source: "stores",
        defaultSort: "storeName DESC",
        primaryKey: "store_id",
    },
    PRODUCTS: {
        source: "products",
        defaultSort: "productName DESC",
        primaryKey: "product_id",
    },
};

module.exports = configObect;
