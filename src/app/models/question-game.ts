import { Anwser } from "./anwser";
import { Question } from "./question";

export enum GameState {
    INIT_GAME,
    AWAIT_REPLY,
    REPLIED,
    RESULT
}

export class QuestionGame {

    public score = 0;
    public currentQuestionIndex = -1;
    public currentQuestion?: Question;
    public questions = Array<Question>();

    public state = GameState.INIT_GAME;

    public constructor() { }

    /**
     * Tester l'etat du jeu
     * @param _state 
     * @returns 
     */
    public isState(_state : GameState) : boolean {
        return (this.state == _state);
    }
    
    /**
     * Modifier l'etat du jeu
     * @param _newState 
     */
    public setState(_newState : GameState){
        this.state = _newState;

    }
    /**
     * Naviguer à la question suivante
     */
    public nextQuestion() {
        // Si je peux continuer
        if (this.currentQuestionIndex < this.questions.length - 1) {
            // incrementer 
            this.currentQuestionIndex++;
            // mettre la question actuelle
            this.currentQuestion = this.questions[this.currentQuestionIndex];
        
            // STATE : Attend une réponse
            this.setState(GameState.AWAIT_REPLY);
        }
    }

    /**
     * Relancer le jeu
     */
    public restart() {
        // reset
        this.score = 0;
        this.currentQuestionIndex = -1;

        this.startGame(this.questions);
    }

    /**
     * Lancer le jeu
     * @param _questions 
     */
    public startGame(_questions: Array<Question>) {
        this.setState(GameState.INIT_GAME);

        this.questions = _questions;

        // La premiere fois que j'appel le next, mon index va être 0 car par défaut c'est -1
        this.nextQuestion();
    }

    /**
     * Tester la validité d'une réponse
     * @param answer 
     * @returns 
     */
    public isCorrectAnwser(answer: Anwser): boolean {
        return (answer == this.currentQuestion!.correct_answer)
    }

    /**
     * Si bonne réponse je gagne un point
     * @param answer 
     */
    public checkAnwser(answer: Anwser): boolean {
        const success = this.isCorrectAnwser(answer);
        if (success) {
            this.score++;
        }
        // STATE : J'ai repondu
        this.setState(GameState.REPLIED);

        return success;
    }

    /**
     * Je notifie que j'ai finis le jeu
     */
    public finishGame(){
        this.setState(GameState.RESULT);
    }

    /**
     * Je teste si le jeu est finis
     * @returns 
     */
    public gameIsFinish(): boolean {
        return (this.currentQuestionIndex >= this.questions.length - 1);
    }

}