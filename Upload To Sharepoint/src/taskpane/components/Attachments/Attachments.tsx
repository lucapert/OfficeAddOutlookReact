import { Icon, Label, PrimaryButton } from "@fluentui/react";
import * as React from "react";
import * as Models from "../../models";
export interface IAttachmentsProps {
    attachments: Models.MailAttachment[];
    removeAttachment: (e: any) => void; 
    restoreAttachments: () => void;
}

const Attachments: React.FunctionComponent<IAttachmentsProps> = (props: IAttachmentsProps) => {
    return (
        <>
            <Label>Allegati</Label>
            <div className="attachmentsContainer">
                <ul className="attachments">
                {
                    props.attachments.map((attachment, i) => {
                        return <li key={ i }>{ attachment.Name } <Icon className="cancelIcon" onClick={ () => { props.removeAttachment(attachment.Id); } } iconName="Cancel" /></li>;
                    })
                }
                </ul>
                <PrimaryButton onClick={() => { props.restoreAttachments(); }}>Ripristina</PrimaryButton>
            </div>
        </>
    );
}

export default Attachments;