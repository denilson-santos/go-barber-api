type TemplateVariables = {
  [key: string]: string | number;
};

export type ParseMailTemplateDTO = {
  filePath: string;
  variables: TemplateVariables;
};
