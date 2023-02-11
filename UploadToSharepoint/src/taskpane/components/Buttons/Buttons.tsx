import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';

export interface IButtonsProps {
    uploadToSharepoint: () => void;
};

const Buttons: React.FunctionComponent<IButtonsProps> = (props: IButtonsProps) => {
    return (
        <PrimaryButton onClick={() => { props.uploadToSharepoint(); }}>Carica allegati su sharepoint</PrimaryButton>
    );
};

export default Buttons;