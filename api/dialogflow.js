// api/dialogflow.js
import dialogflow from '@google-cloud/dialogflow';

const credentials = {
  client_email: process.env.GCP_CLIENT_EMAIL,
  private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
};
const projectId = process.env.GCP_PROJECT_ID;

const sessionClient = new dialogflow.SessionsClient({
  projectId,
  credentials,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  try {
    const { query, sessionId } = req.body;
    if (!query || !sessionId) {
      return res.status(400).send({ error: 'Query and sessionId are required.' });
    }

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    const request = {
      session: sessionPath,
      queryInput: { text: { text: query, languageCode: 'en-US' } },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    let responseText = result.fulfillmentText;
    let suggestions = [];

    if (result.fulfillmentMessages) {
      result.fulfillmentMessages.forEach(msg => {
        if (msg.platform === 'GOOGLE_ASSISTANT' && msg.suggestions) {
          suggestions = msg.suggestions.suggestions.map(s => s.title);
        }
      });
    }

    res.status(200).json({ text: responseText, suggestions: suggestions });

  } catch (error) {
    console.error('ERROR CALLING DIALOGFLOW API:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}