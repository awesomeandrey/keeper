import FolderProxy from "./FolderProxy";
import FolderFieldNames from "./folder-field-names";

const SAMPLE_FOLDER = {
    [FolderFieldNames.ID]: "super-unique-record-id-123",
    [FolderFieldNames.NAME]: "keeper-folder"
};

describe("'FolderProxy'", () => {
    test("Default field sets", () => {
        const parser = new FolderProxy(SAMPLE_FOLDER);
        expect(parser.fieldsForView).toBeInstanceOf(Array);
        expect(parser.fieldsForView.length).toBeTruthy();
        expect(parser.fieldsForEdit).toBeInstanceOf(Array);
        expect(parser.fieldsForEdit.length).toBeTruthy();
        expect(parser.fieldsForCreate).toBeInstanceOf(Array);
        expect(parser.fieldsForCreate.length).toBeTruthy();
    });
});