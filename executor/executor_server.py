import json
from flask import Flask
app = Flask(__name__)
from flask import jsonify
from flask import request
import executor_utils as eu


@app.route('/')

def hello():
    return 'hello world'

@app.route('/result', methods=['POST'])

def result():
    data = request.get_json()
    if 'code' not in or 'lang' not in data:
        return 'You Should Provide code and language.'
    code = data['code']
    lang = data['lang']
    print("API get called with code: %s in %s" % (code, lang))
    # return jsonify('build':'build jajajaja', 'run':'run from sdf');
    result = eu.build_and_run(code, lang)
    return jsonify(result)



if __name__ == '__main__':
    eu.load_image()
    app.run(debug=True)
