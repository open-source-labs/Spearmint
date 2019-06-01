import React, { useContext } from "react";
import { UrlContext, ToggleContext } from "../../App";

const TestView = () => {
  const url = useContext(UrlContext);
  const toggleView = useContext(ToggleContext);

  return <div>{url && toggleView && <webview src={url} />}</div>;
};

export default TestView;
