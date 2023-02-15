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
            <TextField label='Titolo' className='field' title='Title' value={ props.formData.Title } onChange={_onChange}/>
            <TextField label='Mittente'className='field' title='Sender' value={ props.formData.Sender }/>
            <TextField label='Nome cliente'className='field' title='CustomerName' value={ props.formData.CustomerName }/>
            <TextField label='Codice cliente'className='field' title='CustomerCode' value={ props.formData.CustomerCode }/>
            <DatePicker label='Scadenza' className='field' title='ExpirationDate' value={ props.formData.ExpirationDate }/>
        </>
    );
};

export default Form;