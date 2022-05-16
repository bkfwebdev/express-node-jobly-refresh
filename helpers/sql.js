const { BadRequestError } = require("../expressError");

/* 
sqlForPartialUpdate(dataToUpdate,jsToSql)
dataToUpdate is an object... e.g {field1:newVal,field2:newVal...}
jsToSsql maps field names to column names in table...
e.g. {firstNmae:"first_name",age:"age"...}
function returns an object with set sqlSetCols & dataToUpdate
e.g. {setCols:'"first_mame"=$1,"age"=$2',values['Aliya,32]}
*/

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
