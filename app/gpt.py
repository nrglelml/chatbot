import requests
OPENAI_API_KEY = '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'
OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/gpt')
def gpt():
    prompt = request.args.get('prompt', '') # 'prompt' parametresini istekten alıyoruz.
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {OPENAI_API_KEY}'
    }
    data = {
        'prompt': prompt,
        'max_tokens': 100
    }
    response = requests.post(OPENAI_API_URL, headers=headers, json=data)
    response_data = response.json()
    if 'choices' in response_data and len(response_data['choices']) > 0:
        return response_data['choices'][0]['text']
    else:
        return 'No response from GPT-3.5'
