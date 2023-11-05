import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export default interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
  disabled?: boolean;
}
