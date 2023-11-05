import InputFieldsProps from "@/app/interfaces/props/InputFieldsProps";

const AuthInputFields = [
    { id: 'name', label: 'Name', type: 'text', showOnRegister: true },
    { id: 'email', label: 'Email address', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' }
];

export default AuthInputFields;
