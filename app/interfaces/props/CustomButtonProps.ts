export default interface CustomButtonProps {
  type: string;
  title: string;
  handleClick?: () => void;
  customStyles?: string;
}
