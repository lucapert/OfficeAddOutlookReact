import * as React from "react";

export interface IHeaderProps {
  title: string;
} 

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  const { title } = props;
  return (
    <div className="header">{ title }</div>
  );
}

export default Header;
