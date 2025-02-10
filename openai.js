export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    
    const apiKey = process.env.OPENAI_API_KEY;

    
    const { query } = req.body;

    try {
        
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: query,
                max_tokens: 100
            })
        });

        
        if (!response.ok) {
            throw new Error(`OpenAI API 요청 실패: ${response.statusText}`);
        }

        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
}