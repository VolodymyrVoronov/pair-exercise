import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps, useLayoutEffect, useState } from "react";

import shuffleArray from "../../helpers/shuffleArray";

import Answer from "../Answer/Answer";
import CorrectAnswer from "../CorrectAnswer/CorrectAnswer";
import Finish from "../Finish/Finish";
import Question from "../Question/Question";

import styles from "./PairExercise.module.css";

type IPair = {
  id: string;
  pairId: number;
  question: string;
  answer: string;
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
  const [counter, setCounter] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const [questionPairs] = useState<IPair[]>(() =>
    shuffleArray(pairs.map((p) => p[0]))
  );
  const [answerPairs, setAnswerPairs] = useState<Exclude<IPair[], "question">>(
    () => shuffleArray(pairs.map((p) => p[1]))
  );

  const [displayedQuestion, setDisplayedQuestion] = useState<Exclude<
    IPair,
    "answer"
  > | null>();
  const [selectedAnswer, setSelectedAnswer] = useState<Omit<
    IPair,
    "question"
  > | null>(null);

  const onAnswerClick = (answer: Omit<IPair, "question">): void => {
    if (displayedQuestion?.pairId !== answer.pairId) {
      setSelectedAnswer(answer);
      setWrongAnswer(true);

      const timerId = setTimeout(() => {
        setWrongAnswer(false);

        clearTimeout(timerId);
      }, 1000);
    }

    if (displayedQuestion?.pairId === answer.pairId) {
      setSelectedAnswer(answer);
      setCorrectAnswer(true);

      const correctAnswerIndex = answerPairs.findIndex(
        (pair) => pair.id === answer.id
      );

      setAnswerPairs((prev) => {
        const newAnswerPairs = [...prev];

        newAnswerPairs.splice(correctAnswerIndex, 1);

        return newAnswerPairs;
      });

      const timerNextQuestion = setTimeout(() => {
        setCounter(counter + 1);
        setCorrectAnswer(false);

        clearTimeout(timerNextQuestion);
      }, 2000);
    }
  };

  const onResetButtonClick = (): void => {
    window.location.reload();
  };

  useLayoutEffect(() => {
    setDisplayedQuestion(questionPairs[counter]);
  }, [counter, questionPairs]);

  useLayoutEffect(() => {
    if (counter === questionPairs.length) {
      setExerciseCompleted(true);
    }
  }, [counter, questionPairs.length]);

  return (
    <div className={cn(styles.root, className)} {...props}>
      <AnimatePresence mode="wait" key={String(exerciseCompleted)}>
        {exerciseCompleted ? (
          <motion.div
            className={styles.finish}
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            <Finish pairs={pairs} />

            <button
              onClick={onResetButtonClick}
              className={styles.button}
              type="button"
            >
              Reset
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            <div className={styles.question}>
              <AnimatePresence mode="wait" key={displayedQuestion?.id}>
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.75,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    transition: {
                      duration: 0.5,
                    },
                  }}
                >
                  <Question
                    questionData={displayedQuestion}
                    className={cn({
                      [styles["correct-answer-selected"]]: correctAnswer,
                    })}
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {correctAnswer && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.75,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  >
                    <CorrectAnswer correctAnswerData={selectedAnswer} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.answers}>
              <AnimatePresence>
                {answerPairs.map((pair) => {
                  return (
                    <motion.div
                      key={pair.id}
                      className={styles.answer}
                      initial={{
                        opacity: 0,
                        scale: 0.75,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          delay: 0.05,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.05,
                        },
                      }}
                    >
                      <Answer
                        answerData={pair}
                        onAnswerClick={onAnswerClick}
                        className={cn({
                          [styles["answer-correct"]]:
                            correctAnswer && pair.id === selectedAnswer?.id,
                          [styles["answer-wrong"]]:
                            wrongAnswer && pair.id === selectedAnswer?.id,
                        })}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PairExercise;
