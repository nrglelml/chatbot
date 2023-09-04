from flask import Flask, redirect, url_for, request, render_template, jsonify

import openai

openai.api_key = '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'

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    return render_template('home.html')
messages = []
sys_msg = {"role": "system", "content": "You are a helpful coding assistant"}
messages.append(sys_msg)

@app.route('/gpt', methods=['GET', 'POST'])
def gpt():
    global messages

    if request.method == 'POST':
        usr_content = request.form.get('user_input')
        if usr_content is not None and usr_content.strip():
            usr_msg = {"role": "user", "content": usr_content}
            messages.append(usr_msg)
            response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
            reply = response["choices"][0]["message"]["content"]
            assistant_msg = {"role": "assistant", "content": reply}
            #print(assistant_msg)
            messages.append(assistant_msg)

            for key, value in assistant_msg.items():
                print(key, value)

            for i in messages:
                print(i, end=" ")

            print(assistant_msg["content"])

            print(messages)

            #return jsonify(assistant_msg)  # Return the assistant's reply as JSON90*

    return render_template('gpt3.html', messages=messages)

    #return jsonify({"role": "system", "content": "Chat session started."})

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form.get("username")



@app.route('/hello/<name>')
def hello(name):
    if name.lower() == "admin":
        return redirect(url_for('helloAdmin'))
    return render_template('hello.html', username=name)


@app.route('/result', methods=['POST'])
def result():
    Data ={
       ' name': request.form.get("name"),
        'physics': request.form.get("physics"),
        'chemistry ': request.form.get("chemistry"),
        'math': request.form.get("math"),
    }
    return render_template('student_result.html', **Data)

@app.route('/calculate', methods=['GET','POST'])
def hesapla():
    a = request.form.get("a")
    b = request.form.get("b")
    operation = str(request.form.get("operation"))



    return render_template('calculator.html', prediction_text=str(result))


