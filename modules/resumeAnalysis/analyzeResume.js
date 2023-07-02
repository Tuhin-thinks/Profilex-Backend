const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

OPENAI_COMPLETION_ENDPOINT = 'https://api.openai.com/v1/completions';

/**
 * Analyzes the resume and returns the basic suggestions/feedback as generated from chat gpt
 * @param {String} resumeTextContent - The text content of the resume
 * @returns {Array} - Array of suggestions/feedbacks
 */
const analyzeResume = async (resumeTextContent) => {
    const promptText = `Analyze my resume and suggest Feedbacks for mistakes that I have done in my resume.
    Also give examples for each of the points, static what could be done to improve the resume.
    Please review my resume section wise. And send me each feedback newline separated, so that I can split them and show them in a list.
    My resume content is as follows:\n${resumeTextContent}`;

    const { data } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: promptText,
        max_tokens: 500,
        temperature: 0,
    });

    try {
        if (data.choices.length > 0) {
            const rawText = data.choices[0].text;
            const suggestionsArray = rawText.trim().split('\n');
            return suggestionsArray;
        }
    } catch (err) {
        console.log(err);
    }
    return [];
};

module.exports = {
    analyzeResume,
};