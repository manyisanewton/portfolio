// api/dialogflow.js
import dialogflow from '@google-cloud/dialogflow';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  try {
    const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;
    if (!GCP_CLIENT_EMAIL || !GCP_PRIVATE_KEY || !GCP_PROJECT_ID) {
      console.error('Missing Dialogflow environment variables.');
      return res.status(500).send({ error: 'Server configuration error.' });
    }

    const credentials = {
      client_email: GCP_CLIENT_EMAIL,
      private_key: GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    const sessionClient = new dialogflow.SessionsClient({
      projectId: GCP_PROJECT_ID,
      credentials,
    });

    const { query, sessionId } = req.body;
    if (!query || !sessionId) {
      return res.status(400).send({ error: 'Query and sessionId are required.' });
    }

    const sessionPath = sessionClient.projectAgentSessionPath(GCP_PROJECT_ID, sessionId);
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
