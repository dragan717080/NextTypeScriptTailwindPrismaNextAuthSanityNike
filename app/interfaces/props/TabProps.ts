import { StaticImageData } from "next/image";

export interface EditorTab {
  name: string; 
  icon: StaticImageData;
}

export default interface TabProps {
  tab: EditorTab;
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
}
