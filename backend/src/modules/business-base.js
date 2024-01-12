const database = require("./database");

/**
 * @typedef {Object} BusinessBaseOptions
 * @property {string} source
 * @property {string?} view
 * @property {string} defaultSort
 * @property {string} primaryKey
 */
class BusinessBase {
    /**
     * @param {BusinessBaseOptions} options
     */
    constructor(options) {
        this.options = options;
    }
    /**
     * The function `list` retrieves data from a database based on specified parameters such as where
     * clause, sorting, start index, and limit.
     * @returns the result of calling the `listData` method on the `database` object with the provided
     * parameters `source`, `where`, `sort`, and `limit`.
     */
    list({ where, sort = this.options.defaultSort, start = 0, limit = 50 }) {
        const source = this.options.view
            ? this.options.view
            : this.options.source;
        return database.listData({
            source,
            where,
            sort,
            limit,
        });
    }

    insert({ values }) {
        return database.insertData({ source: this.options.source, values });
    }

    update({ values, where }) {
        return database.updateData({
            source: this.options.source,
            values,
            where,
        });
    }

    delete({ where }) {
        return database.deleteData({ source: this.options.source, where });
    }
}

module.exports = BusinessBase;
