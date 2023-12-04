import { Dispatch, SetStateAction } from "react";
import { DecalTabType } from "../types";

export default interface FilePickerProps {
  file: File | string;
  setFile: Dispatch<SetStateAction<string>>;
  readFile: (type: DecalTabType | undefined) => void;
}
