import UserProxy from "./UserProxy";
import UserFieldNames from "./user-field-names";

const SAMPLE_USER_INFO = {
    [UserFieldNames.ID]: "super-unique-record-id-123",
    [UserFieldNames.NAME]: "John Doe"
};

describe("'UserService'", () => {
    test("Default field sets", () => {
        const parser = new UserProxy(SAMPLE_USER_INFO);
        expect(parser.fieldsForView).toBeInstanceOf(Array);
        expect(parser.fieldsForView.length).toBeTruthy();
        expect(parser.fieldsForEdit).toBeInstanceOf(Array);
        expect(parser.fieldsForEdit.length).toBeTruthy();
        expect(parser.fieldsForCreate).toBeInstanceOf(Array);
        expect(parser.fieldsForCreate.length).toBeTruthy();
    });
    test("castToRecord()", () => {
        const userParser = new UserProxy(SAMPLE_USER_INFO);
        const inputFields = userParser.castToEditFields();
        const resultObject = userParser.castToRecord(inputFields);
        expect(resultObject[UserFieldNames.ID]).toBe(SAMPLE_USER_INFO[UserFieldNames.ID]);
        expect(resultObject[UserFieldNames.NAME]).toBe(SAMPLE_USER_INFO[UserFieldNames.NAME]);
    });
});