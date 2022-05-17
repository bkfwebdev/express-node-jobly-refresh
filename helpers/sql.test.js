const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function(){
    test("works: 1 item", function(){
        const theResult = sqlForPartialUpdate(
            {field1:"value1"},
            {field1:"field1",jsField2:"field2"});
        expect(theResult).toEqual({
                setCols:"\"field1\"=$1",
                values:["value1"],
            });
    });

    test("works: 2 items",function(){
        const theResult = sqlForPartialUpdate(
            {field1:"value1",jsField2:"value2"},
            {jsField2:"field2"});
        expect(theResult).toEqual({
            setCols:"\"field1\"=$1, \"field2\"=$2",
            values:["value1","value2"],
            });
        });
    });