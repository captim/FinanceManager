import React from 'react';
import {DialogOpenChangeEventHandler} from "@fluentui/react-dialog";
import {
    Button, Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Input, Label, Select,
    Toast, Toaster, ToastTitle, useId, useToastController
} from "@fluentui/react-components";
import {Add24Regular} from "@fluentui/react-icons/lib/fonts";
import {dialogStyles} from "../dialogStyles";
import {EntityDefinition, EntityDefinitionProperty} from "../../../entityDescriptions/entityDescription";
import {getTypeOfInputByType, validateProperty} from "../dialogUtils";

interface AddNewEntityDialogProps {
    open: boolean;
    onOpenChange: DialogOpenChangeEventHandler;
    entityDefinition: EntityDefinition;
    onSuccess?: () => void;
}

export default function AddNewEntityDialog({open, onOpenChange, entityDefinition, onSuccess}: AddNewEntityDialogProps) {

    const toasterId = useId("toaster");
    const {dispatchToast} = useToastController(toasterId);
    const showErrorToast = (message: string) =>
        dispatchToast(
            <Toast>
                <ToastTitle>{message}</ToastTitle>
            </Toast>,
            {intent: "warning"}
        );

    const validateAndPost = () => {
        let form = document.getElementById(`addNew${entityDefinition.name}Dialog`) as HTMLFormElement;
        let formData = new FormData(form);
        let data: any = {};
        formData.forEach((value, key) => {
            let property = entityDefinition.properties.find(property => property.name === key);
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
        fetch(`/api/${entityDefinition.name.toLowerCase()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (!response.ok) {
                showErrorToast("Server error");
            } else {
                onSuccess && onSuccess();
            }
        });
    }
    const classes = dialogStyles();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Add new {entityDefinition.name}</DialogTitle>
                    <DialogContent >
                        <form id={`addNew${entityDefinition.name}Dialog`}>
                            <table>
                                {entityDefinition.properties?.map((property, index) => {
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