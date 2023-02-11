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
            <TextField title='Title' value={ props.formData.Title } onChange={_onChange}/>
            <TextField title='Sender' value={ props.formData.Sender }/>
            <TextField title='CustomerName' value={ props.formData.CustomerName }/>
            <TextField title='CustomerCode' value={ props.formData.CustomerCode }/>
            <DatePicker title='ExpirationDate' value={ props.formData.ExpirationDate }/>
        </>
    );
};

export default Form;