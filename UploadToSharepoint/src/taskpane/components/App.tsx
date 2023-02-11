import * as React from "react";
import { Spinner } from "@fluentui/react";
import Header from "./Header/Header";
import { useEffect, useState } from "react";
import * as Models from "../models";
import Form from "./Form/Form";
import Buttons from "./Buttons/Buttons";

export interface IAppProps {
  title: string;
}

 const App:React.FunctionComponent<IAppProps> = (props: IAppProps) => {
  const [isOfficeInitialized, setIsOfficeInitialized] = useState<boolean>(false);
  const [formData, setFormData] = useState<Models.FormData>(new Models.FormData());
  
  useEffect(() => {
    Office.initialize =  () => {
      // Get the current item from the item that is displayed in the reading pane.
      var item = Office.context.mailbox.item;
      var attachments = item.attachments;
      
      // Check if the item has attachments.
      if (attachments.length > 0) {
        // Loop through the attachments.
        for (var i = 0; i < attachments.length; i++) {
          // Get the attachment at the current index.
          var attachment = attachments[i];
          
          Office.context.mailbox.item.getAttachmentContentAsync(attachment.id, (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
                var content = result.value.content;
                setFormData(prevState => ({ ...prevState, attachments: [...prevState.attachments, { base64: content, name: attachment.name, type: attachment.attachmentType }] }));
            }
            else {
                console.error(result.error.message);
            }
        });
        }
      }
      setIsOfficeInitialized(true);
    };
  });

  const _updateFormData = (fieldName: string, newValue: string) => {
    setFormData(prevState => ({ ...prevState, [fieldName]: newValue }));
  };
  
  const _uploadToSharepoint = () => {

  };
  
  return (
    <>
      {
        !isOfficeInitialized &&
          <Spinner />
      }
      <div className="ms-welcome">
        <Header title={props.title} />
        <Form formData={ formData } updateForm={ _updateFormData }  />
        <Buttons uploadToSharepoint={ _uploadToSharepoint } />
      </div>
    </>
  );
}

export default App;
