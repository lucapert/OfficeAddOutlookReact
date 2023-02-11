import { Icon, PrimaryButton } from "@fluentui/react";
import * as React from "react";
import * as Models from "../../models";
export interface IAttachmentsProps {
    attachments: Models.MailAttachment[];
    removeAttachment: (e) => void; 
    restoreAttachments: () => void;
}

const Attachments: React.FunctionComponent<IAttachmentsProps> = (props: IAttachmentsProps) => {
    return (
    <div className="attachments">
        <ul>
        {
            props.attachments.map((attachment, i) => {
                return <li key={ i }>{ attachment.Name } <Icon className="cancelIcon" onClick={ () => { props.removeAttachment(attachment.Id); } } iconName="Cancel" /></li>;
            })
        }
        </ul>
        <PrimaryButton onClick={() => { props.restoreAttachments(); }}/>
    </div>);
}

export default Attachments;