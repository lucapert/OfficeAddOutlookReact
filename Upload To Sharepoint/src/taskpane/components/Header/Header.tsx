import * as React from "react";

export interface IHeaderProps {
  title: string;
} 

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const { title } = props;
  return (
    <header className="ms-welcome__header ms-bgColor-neutralLighter header">
      <img width="90" height="90" src="../../assets/logo-filled.png" alt="Contoso" title="Contoso" />
      <h1 className="ms-font-su">Carica Allegati</h1>
    </header> 
  );
}

export default Header;
