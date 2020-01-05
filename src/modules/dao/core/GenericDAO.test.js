import fs from "fs";
import GenericDAO from "./GenericDAO";
import CommonFields from "../proxies/common/common-fields";

import {initLowDbConnection} from "./../core/LowDbInitializer";

const ID = CommonFields.ID;
const FILE_PATH = "jest-testing.json";
const TABLE_NAME = "fruits";
const SAMPLE_RECORD = {
    name: "apple"
};

describe("'GenericDAO'", () => {
    beforeAll(() => {
        // Instantiate DATA file;
        fs.writeFileSync(FILE_PATH, "");
    });
    afterAll(() => {
        // Delete test file;
        fs.unlinkSync(FILE_PATH);
    });
    test("Integration unit test", () => {
        // Initialize LowBD connection;
        const lowDb = initLowDbConnection({sourceFilePath: FILE_PATH});
        lowDb.defaults({[TABLE_NAME]: []}).write();

        const genericDAO = new GenericDAO(lowDb);
        const createdRecord = genericDAO.save({tableName: TABLE_NAME, record: SAMPLE_RECORD});
        const retrievedRecord = genericDAO.selectById({tableName: TABLE_NAME, id: createdRecord[ID]});

        // Record creation;
        const recordId = createdRecord[ID];
        expect(recordId).not.toBeNull();
        expect(retrievedRecord[ID]).not.toBeUndefined();
        expect(recordId).toBe(retrievedRecord[ID]);

        // Record update;
        const prevName = createdRecord.name, newName = SAMPLE_RECORD.name + "_updated";
        const recordToUpdate = {...createdRecord, name: newName}; // derive record ID;
        expect(recordToUpdate.name).not.toBeNull();
        const updatedRecord = genericDAO.save({tableName: TABLE_NAME, record: recordToUpdate});
        expect(updatedRecord[ID]).toBe(recordId);
        expect(updatedRecord.name).not.toBeNull();
        expect(updatedRecord.name).toBe(newName);
        expect(updatedRecord.name).not.toBe(prevName);

        // Records amount;
        const allRecords = genericDAO.selectAll({tableName: TABLE_NAME});
        expect(allRecords).toBeInstanceOf(Array);
        expect(allRecords.some(_ => _[ID] === recordId)).toBeTruthy();
        expect(allRecords.length).toBe(1);
    });
});