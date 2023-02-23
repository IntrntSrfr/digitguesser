import torch
from torch import nn

class ConvModule(nn.Module):
    def __init__(self, in_features, out_features) -> None:
        super(ConvModule, self).__init__()
        self.conv = nn.Conv2d(in_features, out_features, 5, padding=2)
        self.norm = nn.BatchNorm2d(out_features)

    def forward(self, x) -> torch.Tensor:
        x = self.norm(self.conv(x))
        return torch.relu(x)


class MnistModel(nn.Module):
    def __init__(self):
        super(MnistModel, self).__init__()

        self.features = nn.Sequential(
            ConvModule(1, 32),
            ConvModule(32, 64),
            nn.MaxPool2d(2),  # 28 -> 14
            ConvModule(64, 128),
            ConvModule(128, 256),
            nn.MaxPool2d(2),  # 14 -> 7
        )

        self.classifier = nn.Sequential(
            nn.Linear(256*7*7, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(True),
            nn.Dropout(),
            nn.Linear(512, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(True),
            nn.Dropout(),
            nn.Linear(512, 10),
        )

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x

    def accuracy(self, x, y):
        out = self.predict(x)
        return 1 - torch.count_nonzero(out-y).item() / len(y)

    def predict(self, x):
        out = self(x)
        out = torch.argmax(torch.exp(out), dim=1)
        return out
