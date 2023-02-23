from flask import Flask, request, abort
from flask_cors import CORS

from PIL import Image
import json

import torch
import torch.nn.functional as F
from torchvision import transforms
from model import MnistModel

tfs = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((28, 28)),
    transforms.ToTensor(),
    transforms.Normalize([0.1307], [0.3081])
])

model = MnistModel()
if torch.cuda.is_available():
    model.load_state_dict(torch.load('./models/mnist.pt'))
else:
    model.load_state_dict(torch.load('./models/mnist.pt', map_location=torch.device('cpu')))
model.eval()

app = Flask(__name__)
CORS(app)

@app.post('/predict')
def predict():
    f = request.files.get('image')
    if not f:
        return abort(400, 'no image provided')
    img = Image.open(f.stream)
    
    img_tensor = tfs(img)
    out = model(img_tensor.unsqueeze(0))
    out = F.softmax(out, dim=1)
    out = out.squeeze()
    
    return json.dumps(out.tolist()) 

if __name__ == '__main__':
    from waitress import serve
    serve(app, listen='*:5000')
