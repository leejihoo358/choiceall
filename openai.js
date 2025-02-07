// api/openai.js

export default async function handler(req, res) {
    // 요청 방식이 POST가 아닌 경우 405 에러 반환
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 환경 변수에서 API 키 가져오기
    const apiKey = process.env.OPENAI_API_KEY;
    const { query } = req.body;

    try {
        // OpenAI API 호출
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
            throw new Error('OpenAI API 요청 실패');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
