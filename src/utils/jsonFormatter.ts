export default ({ jsonObj, width = 4 }: { jsonObj: any; width?: number }) =>
  JSON.stringify(JSON.parse(JSON.stringify(jsonObj)), undefined, width);
