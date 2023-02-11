import * as React from 'react';
import { DatePicker, TextField } from "@fluentui/react";
import * as Models from "../../models";

interface IFormProps {
    formData: Models.FormData
    updateForm: (fieldName: string, newValue: string) => void;
};


const Form: React.FunctionComponent<IFormProps> = (props: IFormProps) => {
    const _onChange = (e, newValue: string) => {
        const target = (e.target as any as HTMLInputElement);
        props.updateForm(target.title, newValue);
    }
    return (
        <>
            <TextField title='titolo' value={ props.formData.titolo } onChange={_onChange}/>
            <TextField title='mittente' value={ props.formData.mittente }/>
            <TextField title='nomeCliente' value={ props.formData.nomeCliente }/>
            <TextField title='codiceCliente' value={ props.formData.codiceCliente }/>
            <DatePicker title='dataScadenza' value={ props.formData.dataScadenza }/>
        </>
    );
};

export default Form;