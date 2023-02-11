import * as React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react";
import Header from "./Header/Header";
import { useEffect, useState } from "react";
import * as Models from "../models";
import Form from "./Form/Form";
import Buttons from "./Buttons/Buttons";
import Attachments from "./Attachments/Attachments";

export interface IAppProps {
  title: string;
}

 const App:React.FunctionComponent<IAppProps> = (props: IAppProps) => {
  const [isShowSpinner, setIsShowSpinner] = useState<boolean>(true);
  const [formData, setFormData] = useState<Models.FormData>(new Models.FormData());
  let [allAttachments, setAllAttachments] = useState<Models.MailAttachment[]>([]);
  
  useEffect(() => {
    Office.initialize =  async () => {
      var item = Office.context.mailbox.item;
      // Get the current item from the item that is displayed in the reading pane.
      var attachments = item.attachments;
      
      // Check if the item has attachments.
      if (attachments.length > 0) {
        // Loop through the attachments.
        for (var i = 0; i < attachments.length; i++) {
          // Get the attachment at the current index.
          var attachment = attachments[i];
          try{
            var attachResult = await _getAttachmentB64(attachment);
            allAttachments.push({ Base64: attachResult, Name: attachment.name, Type: attachment.attachmentType, Id: attachment.id });
          } catch(e) {
            console.log(e);
          }
        }
        setFormData({ ...formData, Attachments: [...allAttachments] });
      }
      setTimeout(() => {
        setIsShowSpinner(false);
      }, 1500);
    };
  }, []);

  const _getAttachmentB64 = async (attachment: Office.AttachmentDetails): Promise<string> => {
    return new Promise((resolve, reject) =>{ 
      Office.context.mailbox.item.getAttachmentContentAsync(attachment.id, (result) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
            var content = result.value.content;
            resolve(content);
        }
        else {
            reject(result.error.message);
        }
    });
    });
  }

  const _updateFormData = (fieldName: string, newValue: string) => {
    setFormData(prevState => ({ ...prevState, [fieldName]: newValue }));
  };

  const _removeAttachment = (Id: string) => {
    const oldAttachments = [...formData.Attachments];
    const newAttachments =  oldAttachments.filter(oldAttachment => {
      return oldAttachment.Id.toLowerCase() !== Id.toLowerCase();
    });
    setFormData({ ...formData, Attachments: [...newAttachments] });
  }

  const _restoreAttachments = () => {
    setFormData({ ...formData, Attachments: [...allAttachments] });
  }
  
  const _uploadToSharepoint = () => {

  };
  
  return (
    <>
      {
        isShowSpinner &&
          <Spinner size={ SpinnerSize.large } />
      }
      {
        !isShowSpinner &&
        <div className="ms-welcome">
          <Header title={props.title} />
          <Form formData={ formData } updateForm={ _updateFormData }  />
          <Attachments restoreAttachments={ _restoreAttachments } attachments={ formData.Attachments } removeAttachment={ _removeAttachment } />
          <Buttons uploadToSharepoint={ _uploadToSharepoint } />
        </div>
      }
    </>
  );
}

export default App;
