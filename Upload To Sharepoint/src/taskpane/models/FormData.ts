import { MailAttachment } from "./MailAttachment";

export class FormData {
    public Title: string = "";
    public Sender: string = "";
    public CustomerCode: string = "";
    public CustomerName: string = "";
    public ExpirationDate: any = null;
    public Attachments: MailAttachment[] = [];
}