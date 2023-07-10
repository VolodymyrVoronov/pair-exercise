import cn from "classnames";
import { ComponentProps } from "react";

import styles from "./Answer.module.css";

interface IAnswer {
  id: string;
  pairId: number;
  answer: string;
}

interface IAnswerProps extends ComponentProps<"button"> {
  answerData: IAnswer;

  className?: string;

  onAnswerClick: (answer: IAnswer) => void;
}

const Answer = ({
  answerData,
  className,
  onAnswerClick,
  ...props
}: IAnswerProps): JSX.Element => {
  const { id, pairId, answer } = answerData;

  const onAnswerButtonClick = () => {
    onAnswerClick({
      id,
      pairId,
      answer,
    });
  };

  return (
    <button
      className={cn(styles.root, className)}
      type="button"
      onClick={onAnswerButtonClick}
      {...props}
    >
      {answer}
    </button>
  );
};

export default Answer;
