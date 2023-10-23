import React from 'react';
import {DialogOpenChangeEventHandler} from "@fluentui/react-dialog";
import {
    Button, Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Input, Label, Link, Select,
    Text, Toast, Toaster, ToastTitle, useId, useToastController
} from "@fluentui/react-components";
import {Add24Regular} from "@fluentui/react-icons/lib/fonts";
import {addNewEntityDialogStyles} from "./addNewEntityDialogStyles";

interface EntityProperty {
    displayedName: string;
    name: string;
    type: string;
    required?: boolean;
    defaultValue?: string;
    description?: string;
    options?: string[];
}
interface Entity {
    name: string;
    properties: EntityProperty[];
}
interface AddNewEntityDialogProps {
    open: boolean;
    onOpenChange: DialogOpenChangeEventHandler;
    entity: Entity;
    onEntityCreated?: () => void;
}
const getTypeOfInputByType = (type: string) => {
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


export default function AddNewEntityDialog({open, onOpenChange, entity, onEntityCreated}: AddNewEntityDialogProps) {

    const toasterId = useId("toaster");
    const {dispatchToast} = useToastController(toasterId);
    const showErrorToast = (message: string) =>
        dispatchToast(
            <Toast>
                <ToastTitle>{message}</ToastTitle>
            </Toast>,
            {intent: "warning"}
        );

    const validateProperty = (property: EntityProperty, value: string) => {
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
    const validateByType = (type: string, value: string) => {
        switch (type) {
            case "integer":
                return Number.isInteger(Number(value));
            case "float":
                return !isNaN(Number(value));
            default:
                return "";
        }
    }
    const validateAndPost = () => {
        let form = document.getElementById(`addNew${entity.name}Dialog`) as HTMLFormElement;
        let formData = new FormData(form);
        let data: any = {};
        formData.forEach((value, key) => {
            let property = entity.properties.find(property => property.name === key);
            if (property) {
                let validationResult = validateProperty(property, value as string)
                if (validationResult !== "") {
                    showErrorToast(validationResult);
                    return;
                }
            }
            if (property && (property.type === "integer" || property.type === "float")) {
                data[key] = Number(value);
            } else {
                data[key] = value;
            }
        });
        fetch(`/api/${entity.name.toLowerCase()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (!response.ok) {
                showErrorToast("Server error");
            }
            if (onEntityCreated) {
                onEntityCreated();
            }
        });
    }
    const classes = addNewEntityDialogStyles();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Add new {entity.name}</DialogTitle>
                    <DialogContent >
                        <form id={`addNew${entity.name}Dialog`}>
                            <table>
                                {entity.properties?.map((property, index) => {
                                    let typeOfInput = getTypeOfInputByType(property.type);
                                    return (
                                        <tr key={index} className={classes.tableRow}>
                                            <td className={classes.paramName}>
                                                <Label size={"medium"}>{property.displayedName}</Label>
                                            </td>
                                            <td>
                                                {typeOfInput === "options" &&
                                                    <Select name={property.name}>
                                                        {property.options?.map((option, index) => {
                                                            return (
                                                                <option key={index} value={option}>{option}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                }
                                                {typeOfInput === "text" &&
                                                    <Input type={typeOfInput as 'text' | 'date' } name={property.name}/>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </table>
                        </form>
                        <Toaster inline toasterId={toasterId} position="top-end"  />
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button appearance="primary" icon={<Add24Regular/>} onClick={validateAndPost}>Add</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )


}