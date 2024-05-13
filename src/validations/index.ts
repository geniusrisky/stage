import { schemas } from "./validationSchema";

export const validation = (schemaName: keyof typeof schemas, data: any) => {
    const { error } = schemas[schemaName].validate(data);
    if (error) return new Error(error.details[0].message);

    return null;
};
