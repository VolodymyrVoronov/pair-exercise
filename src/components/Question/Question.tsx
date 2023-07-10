import { ComponentProps } from "react";
import cn from "classnames";

import styles from "./Question.module.css";

interface IQuestion {
  id: string;
  pairId: number;
  question?: string;
}

interface IQuestionProps extends ComponentProps<"div"> {
  questionData: IQuestion | null | undefined;

  className?: string;
}

const Question = ({
  questionData,
  className,
  ...props
}: IQuestionProps): JSX.Element | null => {
  if (!questionData) return null;

  const { question } = questionData;

  return (
    <div className={cn(styles.root, className)} {...props}>
      <div className={styles.question}>
        <span>{question}</span>
      </div>
    </div>
  );
};

export default Question;
