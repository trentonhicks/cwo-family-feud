import QuestionAndAnswers from "../types/QuestionAndAnswers";

const questionsAndAnswers : QuestionAndAnswers[] = [
    {
        question: {
            text: 'Name a popular breakfast food.'
        },
        answers: [
            {
                text: 'Pancakes',
                revealed: false,
            },
            {
                text: 'Eggs',
                revealed: false,
            },
            {
                text: 'Cereal',
                revealed: false,
            },
            {
                text: 'Toast',
                revealed: false,
            },
            {
                text: 'Bacon',
                revealed: false,
            },
            {
                text: 'Bagels',
                revealed: false,
            },
        ]
    },
    {
        question: {
            text: 'Name a famous superhero.'
        },
        answers: [
            {
                text: 'Superman',
                revealed: false,
            },
            {
                text: 'Batman',
                revealed: false,
            },
            {
                text: 'Spider-Man',
                revealed: false,
            },
            {
                text: 'Wonder Woman',
                revealed: false,
            },
            {
                text: 'Captain America',
                revealed: false,
            },
            {
                text: 'Iron Man',
                revealed: false,
            },
        ]
    },
]

export default questionsAndAnswers;