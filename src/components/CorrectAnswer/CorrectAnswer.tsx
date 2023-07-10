import cn from "classnames";
import { ComponentProps } from "react";

import styles from "./CorrectAnswer.module.css";

interface ICorrectAnswer {
  id: string;
  pairId: number;
  answer: string;
}

interface ICorrectAnswerProps extends ComponentProps<"div"> {
  correctAnswerData: ICorrectAnswer | null | undefined;

  className?: string;
}

const CorrectAnswer = ({
  correctAnswerData,
  className,
  ...props
}: ICorrectAnswerProps): JSX.Element | null => {
  if (!correctAnswerData) return null;

  const { answer } = correctAnswerData;

  return (
    <div className={cn(styles.root, className)} {...props}>
      <span>{answer}</span>
    </div>
  );
};

export default CorrectAnswer;
