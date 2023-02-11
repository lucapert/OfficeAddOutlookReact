import { MailAttachment } from "./MailAttachment";

export class FormData {
    public titolo: string = null;
    public mittente: string = null;
    public codiceCliente: string = null;
    public nomeCliente: string = null;
    public dataScadenza: Date = null;
    public attachments: MailAttachment[] = [];
}