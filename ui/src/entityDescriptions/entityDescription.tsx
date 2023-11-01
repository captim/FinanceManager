export interface EntityDefinitionProperty {
    displayedName: string;
    name: string;
    type: string;
    required?: boolean;
    defaultValue?: string;
    description?: string;
    options?: string[];
    editable: boolean;
}
export interface EntityDefinition {
    name: string;
    properties: EntityDefinitionProperty[];
}