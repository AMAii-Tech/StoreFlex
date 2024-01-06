const mysql = require("mysql2");
class Database {
    _pool;
    _whereValuesArray = [];
    /**
     * The function connects to a MySQL database using a connection object.
     * @param connectionObject - The connectionObject is an object that contains the necessary
     * information to establish a connection to a MySQL database. It typically includes properties such
     * as host, user, password, database, and port.
     */
    connect(connectionObject) {
        this._pool = mysql.createPool(connectionObject);
    }
    /**
     * The function `listData` retrieves data from a specified source based on given conditions and
     * returns the result as an object containing rows and fields.
     * @returns an object with two properties: "rows" and "fields".
     */
    async listData({ source, where, sort, start, limit }) {
        let query = this._getSelectStatement(source);
        if (where?.length === 0) query += this._addWhereStatement(where);
        const promisePool = this._pool.promise();
        const [rows, fields] = await promisePool.query(
            query,
            this._whereValuesArray
        );
        return { rows, fields };
    }

    /**
     * The function returns a SELECT statement that selects all columns from a given source.
     * @param source - The source parameter is a string that represents the name of the table or data
     * source from which you want to retrieve data.
     * @returns a SQL SELECT statement that selects all columns from the specified source table.
     */
    _getSelectStatement(source) {
        return "SELECT * FROM " + source;
    }

    /**
     * The function `_addWhereStatement` generates a WHERE statement for a SQL query based on an input
     * array of conditions.
     * @param where - The `where` parameter is an array of objects. Each object represents a condition
     * in the WHERE clause of a SQL query. Each object has three properties:
     * @returns a string representing the WHERE statement in a SQL query.
     */
    _addWhereStatement(where) {
        let whereStatement = " WHERE";
        Array.from(where).forEach((item, index) => {
            const { field, compare, value } = item;
            if (index > 0) whereStatement += "AND";
            switch (compare) {
                case "equal":
                    whereStatement += ` ${field} = ${mysql.escape(value)} `;
                    break;
                case "not equal":
                    whereStatement += ` ${field} <> ${mysql.escape(value)} `;
                    break;
                case "in":
                    whereStatement += ` ${field} IN (?)} `;
                    this._whereValuesArray.push(value);
                    break;
                default:
                    break;
            }
        });
        return whereStatement;
    }
}

module.exports = new Database();
