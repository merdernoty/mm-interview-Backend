import { Question } from "../../question/model/question.model";

export interface UserInfo {
  favoriteQuestions: Question[];
  completedQuestions: Question[];
  rewards: string[];
}
