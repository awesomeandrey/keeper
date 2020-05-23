import CredentialProxy from "./CredentialProxy";
import CredentialFieldNames from "./credential-field-names";

import {FieldTypes} from "../../../../constants"

const TEST_CUSTOM_FIELD_NAME = "custom-field-123";

const SAMPLE_CREDENTIAL = {
    [CredentialFieldNames.ID]: "super-unique-record-id-123",
    [CredentialFieldNames.NAME]: "Test Record",
    [TEST_CUSTOM_FIELD_NAME]: {
        label: "Custom Field Label",
        name: TEST_CUSTOM_FIELD_NAME,
        value: "Custom Field Value",
        type: FieldTypes.CUSTOM
    }
};

describe("'CredentialProxy'", () => {
    test("Default field sets", () => {
        const parser = new CredentialProxy(SAMPLE_CREDENTIAL);
        expect(parser.fieldsForView).toBeInstanceOf(Array);
        expect(parser.fieldsForView.length).toBeTruthy();
        expect(parser.fieldsForEdit).toBeInstanceOf(Array);
        expect(parser.fieldsForEdit.length).toBeTruthy();
        expect(parser.fieldsForCreate).toBeInstanceOf(Array);
        expect(parser.fieldsForCreate.length).toBeTruthy();
    });
    test("castToViewFields()", () => {
        const credentialParser = new CredentialProxy(SAMPLE_CREDENTIAL);
        const inputFields = credentialParser.toViewFields();
        expect(inputFields.some(_ => _.type === FieldTypes.CUSTOM)).toBeTruthy();
        expect(credentialParser.fieldsForCreate.length < inputFields.length).toBeTruthy();
    });
    test("toRecord()", () => {
        const credService = new CredentialProxy(SAMPLE_CREDENTIAL);
        const inputFields = credService.toEditFields();
        const resultObject = credService.toRecord(inputFields);
        expect(resultObject[CredentialFieldNames.ID]).toBe(SAMPLE_CREDENTIAL[CredentialFieldNames.ID]);
        expect(resultObject[CredentialFieldNames.NAME]).toBe(SAMPLE_CREDENTIAL[CredentialFieldNames.NAME]);
        expect(resultObject[TEST_CUSTOM_FIELD_NAME].value).toBe(SAMPLE_CREDENTIAL[TEST_CUSTOM_FIELD_NAME].value);
    });
});