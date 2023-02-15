import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';

export interface IButtonsProps {
    uploadToSharepoint: () => void;
};

const Buttons: React.FunctionComponent<IButtonsProps> = (props: IButtonsProps) => {
    return (
        <div className='buttonsContainer'>
            <PrimaryButton onClick={() => { props.uploadToSharepoint(); }}>Carica allegati su sharepoint</PrimaryButton>
        </div>
    );
};

export default Buttons;