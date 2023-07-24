import HTMLReactParser from "html-react-parser";
export const ShowHtml = ({ htmlText }) => {
  const changeHtmlData = () => {
    return HTMLReactParser(htmlText, {
      replace: (node) => {
        // console.log(node.name)
        if (node.name == "table") {
          node.attribs.class +=
            " table table-bordered table-hover table-striped ";
          return node;
        }
        return node;
      },
    });
  };
  return <div>{changeHtmlData(htmlText)}</div>;
};
