import {EntityDefinitionProperty} from "../../entityDescriptions/entityDescription";

export const validateProperty = (property: EntityDefinitionProperty, value: string) => {
    if (property.required && value === "") {
        return `${property.displayedName} is required`;
    }
    else if (property.type === "integer" && !validateByType(property.type, value)) {
        return `${property.displayedName} should be integer`;
    }
    else if (property.type === "float" && !validateByType(property.type, value)) {
        return `${property.displayedName} should be float`;
    }
    return "";
}
export const validateByType = (type: string, value: string) => {
    switch (type) {
        case "integer":
            return Number.isInteger(Number(value));
        case "float":
            return !isNaN(Number(value));
        default:
            return "";
    }
}

export const getTypeOfInputByType = (type: string) => {
    switch (type) {
        case "string":
        case "integer":
        case "float":
            return "text";
        case "date":
            return "date";
        case "boolean":
            return "checkbox";
        case "options":
            return "options";
        default:
            return "text";
    }
}