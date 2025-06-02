import { FormProps } from "@/Interface/CustomerFormProps";

const fieldLimits: { [key in keyof FormProps]?: number } = {
    first_name: 50,
    last_name: 100,
    address: 60,
    complement: 30,
    social_network: 100,
    department: 20,
    email: 50,
    sales_notes: 255,
  };

export { fieldLimits }
