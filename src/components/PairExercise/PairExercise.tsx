import cn from "classnames";
import { ComponentProps, useState } from "react";

import styles from "./PairExercise.module.css";

type IPair = {
  id: string;
  pairId: number;
  question?: string;
  answer?: string;
};

interface IPairExerciseProps extends ComponentProps<"div"> {
  pairs: IPair[][];

  className?: string;
}

const PairExercise = ({
  pairs,

  className,
  ...props
}: IPairExerciseProps): JSX.Element => {
  const [questionPairs, setQuestionPairs] = useState<IPair[]>(() =>
    pairs.map((p) => p[0])
  );
  const [answerPairs, setAnswerPairs] = useState<IPair[]>(() =>
    pairs.map((p) => p[1])
  );

  console.log("questionPairs", questionPairs);
  console.log("answerPairs", answerPairs);

  const onAnswerClick = (answer: IPair): void => {
    console.log("answer", answer);
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      PairExercise
    </div>
  );
};

export default PairExercise;
