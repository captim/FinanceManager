export interface Account {
    id: number;
    name: string;
    currency: string;
    personalMoney: number;
    creditLimit: number | null;
}

export const entityAccountDefinition = {
        name: "Account",
        properties: [
            {
                displayedName: "Name",
                name: "name",
                type: "string",
                required: true,
                defaultValue: "",
                editable: true,
            },
            {
                displayedName: "Currency",
                name: "currency",
                type: "options",
                required: true,
                defaultValue: "",
                options: ["EUR", "USD", "HRN"],
                editable: false,
            },
            {
                displayedName: "Personal money",
                name: "personalMoney",
                type: "float",
                required: true,
                defaultValue: "",
                editable: true,
            },
            {
                displayedName: "Credit limit",
                name: "creditLimit",
                type: "float",
                required: false,
                defaultValue: "",
                editable: true,
            }
        ]
    };