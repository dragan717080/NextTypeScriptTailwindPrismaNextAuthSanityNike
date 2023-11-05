export interface Expandable {
  title: string;
  content: string;
}

export default interface ExpandableProps extends Expandable {
  index: number;
}
