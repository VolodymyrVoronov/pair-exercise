import "@fontsource/poppins";
import { nanoid } from "nanoid";
import "reset-css";

import PairExercise from "./components/PairExercise/PairExercise";

import "./styles/global.css";

import styles from "./App.module.css";

const pairs = [
  [
    {
      id: nanoid(),
      pairId: 1,
      question: "a",
    },
    {
      id: nanoid(),
      pairId: 1,
      answer: "a",
    },
  ],
  [
    {
      id: nanoid(),
      pairId: 2,
      question: "b",
    },
    {
      id: nanoid(),
      pairId: 2,
      answer: "b",
    },
  ],
  [
    {
      id: nanoid(),
      pairId: 3,
      question: "c",
    },
    {
      id: nanoid(),
      pairId: 3,
      answer: "c",
    },
  ],
];

const App = (): JSX.Element => {
  return (
    <div className={styles.root}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <PairExercise pairs={pairs} />
    </div>
  );
};

export default App;

