export default interface CircleItemProps {
  imgAlt: string;
  imgSrc: string;
  title: string;
  content: string;
  // Content for when the media width is small
  minifiedContent: string;
}

export interface CircleItemComponentProps extends CircleItemProps {
  index: number;
}
