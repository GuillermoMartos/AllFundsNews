export interface UserInputFieldProps {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validator: (value: string) => boolean;
  errorMessage: string;
}
