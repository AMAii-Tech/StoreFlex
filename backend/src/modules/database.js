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
        if (sort) query += ` ORDER BY ${sort}`;
        query += ` LIMIT ${start}, ${limit}`;
        const promisePool = this._pool.promise();
        const [rows] = await promisePool.query(
            query,
            this._whereValuesArray
        );
        return { rows };
    }

    /**
     * The function saves a record by executing an insert statement and returns a success status along
     * with an error message if applicable.
     * @returns The function `saveRecord` returns an object. If the `ResultSetHeader.affectedRows` is
     * greater than 0, it returns `{ success: true }`. Otherwise, it returns `{ success: false, error
     * }`, where `error` is a variable that is not defined in the code snippet provided.
     */
    async insertData({ source, ...values }) {
        let query = this._getInsertStatement({ source, values });
        const promisePool = this._pool.promise();
        const [ResultSetHeader] = await promisePool.query(query);
        if (ResultSetHeader.affectedRows > 0) {
            return { success: true }
        } else {
            return { success: false, error };
        }
    }

    /**
     * The function `deleteData` deletes data from a source based on the provided id and idProperty,
     * and returns a success status.
     * @returns an object with two properties: "success" and "error". If the "affectedRows" property of
     * the ResultSetHeader is greater than 0, the "success" property will be set to true. Otherwise,
     * the "success" property will be set to false and the "error" property will be included in the
     * returned object.
     */
    async deleteData({ source, id, idProperty }) {
        let query = this._getDeleteStatement({ source, id, idProperty });
        const promisePool = this._pool.promise();
        const [ResultSetHeader] = await promisePool.query(query);
        if (ResultSetHeader.affectedRows > 0) {
            return { success: true }
        } else {
            return { success: false, error };
        }
    }

    /**
     * The function `updateData` updates data in a database table based on the provided source,
     * idProperty, and values, and returns a success status.
     * @returns The function `updateData` returns an object. If the `ResultSetHeader.affectedRows` is
     * greater than 0, it returns an object with the property `success` set to `true`. Otherwise, it
     * returns an object with the properties `success` set to `false` and `error` (which is not defined
     * in the code snippet).
     */
    async updateData({ source, idProperty, ...values }) {
        let query = this._getUpdateStatement({ source, idProperty, values });
        const promisePool = this._pool.promise();
        const [ResultSetHeader] = await promisePool.query(query);
        if (ResultSetHeader.affectedRows > 0) {
            return { success: true }
        } else {
            return { success: false, error };
        }
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
     * The function returns an SQL INSERT statement based on the provided source table and values.
     * @returns an SQL INSERT statement.
     */
    _getInsertStatement({ source, values }) {
        return "INSERT INTO " + source + ` (${Object.keys(values).map(ele => ele).join()}) VALUES (${Object.values(values).map(ele => `"${ele}"`).join()})`;
    }

    /**
     * The function returns a SQL update statement to mark a record as deleted in a given table.
     * @returns an SQL statement that updates a table named "source" by setting the "is_deleted" column
     * to 1 for the row where the "idProperty" column matches the provided "id" value.
     */
    _getDeleteStatement({ source, id, idProperty }) {
        return "UPDATE " + source + " SET is_deleted = 1 WHERE " + idProperty + ` = ${id}`;
    }

    /**
     * The function generates an SQL update statement based on the provided source, idProperty, and
     * values.
     * @returns an SQL update statement.
     */
    _getUpdateStatement({ source, idProperty, values }) {
        const updateArr = Object.entries(values)
            .filter(([key]) => key !== idProperty)
            .map(([key, value]) => `${key} = "${value}"`);

        const updateQuery = `UPDATE ${source} SET ${updateArr.join(', ')} WHERE ${idProperty} = "${values[idProperty]}";`;
        return updateQuery;
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
