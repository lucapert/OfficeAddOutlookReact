import { MailAttachment } from "./MailAttachment";

export class FormData {
    public Title: string = null;
    public Sender: string = null;
    public CustomerCode: string = null;
    public CustomerName: string = null;
    public ExpirationDate: Date = null;
    public Attachments: MailAttachment[] = [];
}