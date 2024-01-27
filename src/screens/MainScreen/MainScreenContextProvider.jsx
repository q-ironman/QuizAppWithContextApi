import { ConfigProvider, Empty, message, theme } from "antd";
import { createContext, useMemo, useState } from "react";

const MainScreenContext = createContext({});

export const MainScreenContextProvider = (props) => {
    const { darkAlgorithm, defaultAlgorithm } = theme
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [isHomeOpen, setIsHomeOpen] = useState(true);
    const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);
    const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(undefined)
    const [preparedQuestionsState, setPreparedQuestionsState] = useState(undefined)
    const [correctAnswersState, setCorrectAnswersState] = useState(undefined)
    const [isRadioGroupDisabled, setIsRadioGroupDisabled] = useState(undefined);
    const [resultsState, setResultsState] = useState(undefined)
    const [selected, setSelected] = useState(undefined);
    const [countDown, setCountDown] = useState(undefined);
    const [answers, setAnswers] = useState({});

    const handleStartQuizButtonOnClick = async () => {
        setIsLoading(true)
        fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
            response.json().then((result) => {
                if (result == null || result == undefined) {
                    message.error('Empty Questions')
                }
                else {
                    prepareQuiz(result);
                }
            }).catch(() => {
                message.error('Error')
                setIsLoading(false)
            })
            setIsLoading(false)
        }).catch(() => {
            message.error('Error')
            setIsLoading(false)
        })
    }

    const prepareQuiz = (questions) => {
        const shuffledArray = questions.slice().sort(() => Math.random() - 0.5);
        const preparedQuestions = shuffledArray?.slice(0, 10)?.map((element) => {
            const optionsArray = JSON.stringify(element.body).split('\\')
            return {
                id: element.id,
                question: element.title,
                A: optionsArray[0]?.replace('\\', ''),
                B: optionsArray[1]?.replace('\\', ''),
                C: optionsArray[2]?.replace('\\', ''),
                D: optionsArray[3]?.replace('\\', ''),
            }
        })
        let correctAnswers = {};
        preparedQuestions?.forEach(element => {
            const random = Math.floor(Math.random() * 4) + 1;
            let trueKey;
            switch (random) {
                case 1:
                    trueKey = 'A';
                    break;
                case 2:
                    trueKey = 'B';
                    break;
                case 3:
                    trueKey = 'C';
                    break;
                case 4:
                    trueKey = 'D';
                    break;
                default:
                    break;
            }
            correctAnswers[element.id] = trueKey;
        });
        setCorrectAnswersState(correctAnswers);
        setPreparedQuestionsState(preparedQuestions);
        setCurrentQuestion(preparedQuestions[0]);
        setIsHomeOpen(false);
        setIsQuestionsOpen(true);
        setIsRadioGroupDisabled(true)
    }

    const saveAndMoveNextQuestion = (answer, questionId) => {
        setIsRadioGroupDisabled(true)
        const currentIndex = preparedQuestionsState.findIndex(e => e.id === questionId)
        if (currentIndex !== preparedQuestionsState?.length - 1) {
            let newAnswers = { ...answers, [questionId]: answer }
            setAnswers(newAnswers);
            setCurrentQuestion(preparedQuestionsState[currentIndex + 1])
        }
        else {
            let results = { correctCount: 0, falseCount: 0, resultList: [] };
            preparedQuestionsState?.forEach((element, index) => {
                if (answers[element.id] === correctAnswersState[element.id]) {
                    results.correctCount += 1;
                    results.resultList[index] = {
                        number: index + 1,
                        correctAnswer: correctAnswersState[element.id],
                        yourAnswer: answers[element.id],
                        isCorrect: true
                    }
                }
                else {
                    results.falseCount += 1;
                    results.resultList[index] = {
                        number: index + 1,
                        correctAnswer: correctAnswersState[element.id],
                        yourAnswer: answers[element.id],
                        isCorrect: false
                    }
                }
            })
            setResultsState(results)
            setIsQuestionsOpen(false)
            setIsHomeOpen(false)
            setIsScoreboardOpen(true)
        }
    }
    const clear = () => {
        setIsHomeOpen(true)
        setIsQuestionsOpen(false)
        setIsScoreboardOpen(false)
        setCurrentQuestion(undefined)
        setIsRadioGroupDisabled(undefined)
        setSelected(undefined)
        setCountDown(undefined)
        setResultsState(undefined)
        setCorrectAnswersState(undefined);
        setPreparedQuestionsState(undefined);
        setCurrentQuestion(undefined)
    }
    const defaultContext = useMemo(() => ({
        isDarkTheme,
        setIsDarkTheme,
        isHomeOpen,
        setIsHomeOpen,
        isLoading,
        setIsLoading,
        handleStartQuizButtonOnClick,
        isQuestionsOpen,
        setIsQuestionsOpen,
        isScoreboardOpen,
        setIsScoreboardOpen,
        currentQuestion,
        setCurrentQuestion,
        saveAndMoveNextQuestion,
        isRadioGroupDisabled,
        setIsRadioGroupDisabled,
        selected,
        setSelected,
        countDown,
        setCountDown,
        resultsState,
        setResultsState,
        clear
    }), [
        isDarkTheme,
        isHomeOpen,
        isLoading,
        handleStartQuizButtonOnClick,
        isQuestionsOpen,
        isScoreboardOpen,
        currentQuestion,
        saveAndMoveNextQuestion,
        isRadioGroupDisabled,
        selected,
        countDown,
        resultsState,
        clear
    ])

    return (
        <MainScreenContext.Provider value={defaultContext}>
            <ConfigProvider
                theme={{
                    algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm
                }}>
                {props.children}
            </ConfigProvider>
        </MainScreenContext.Provider>
    )
}

export default MainScreenContext