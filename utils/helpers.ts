export const cleanText = (text: string = "") => {
  return text
    .replace(/^[\n\r]+/, "") // remove leading \n \r
    .replace(/[\n\r]+$/, ""); // remove trailing \n \r
};
