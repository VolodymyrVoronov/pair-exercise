import cn from "classnames";
import { ComponentProps } from "react";

import QuestionAnswer from "../QuestionAnswer/QuestionAnswer";

import styles from "./Finish.module.css";

type IPair = {
  id: string;
  pairId: number;
  question: string;
  answer: string;
};

interface IFinishProps extends ComponentProps<"div"> {
  pairs: IPair[][];

  className?: string;
}

const Finish = ({ pairs, className, ...props }: IFinishProps): JSX.Element => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      <span className={styles.text}>Well done!!!</span>

      <div>
        {pairs.map((p) => (
          <QuestionAnswer pairs={p} key={p[0].id} />
        ))}
      </div>
    </div>
  );
};

export default Finish;
