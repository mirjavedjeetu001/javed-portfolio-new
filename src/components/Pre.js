import React from "react";
import usePortfolio from "../hooks/usePortfolio";

function Pre(props) {
  const { data } = usePortfolio();
  const text = data?.siteSettings?.preloader_text || "Loading...";

  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      {props.load && <div className="preloader-text">{text}</div>}
    </div>
  );
}

export default Pre;
