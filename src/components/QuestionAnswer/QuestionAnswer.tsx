import cn from "classnames";
import { ComponentProps } from "react";

import styles from "./QuestionAnswer.module.css";

type IPair = {
  id: string;
  pairId: number;
  question: string;
  answer: string;
};

interface IQuestionAnswerProps extends ComponentProps<"div"> {
  pairs: IPair[];

  className?: string;
}

const QuestionAnswer = ({
  pairs,

  className,
  ...props
}: IQuestionAnswerProps): JSX.Element => {
  const { question } = pairs[0];
  const { answer } = pairs[1];

  return (
    <div className={cn(styles.root, className)} {...props}>
      <div className={cn(styles.item, styles.question)}>{question}</div>
      <div className={cn(styles.item, styles.answer)}>{answer}</div>
    </div>
  );
};

export default QuestionAnswer;
