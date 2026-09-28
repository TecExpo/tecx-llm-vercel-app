import torch
import torch.nn as nn

# 1. Define your model architecture exactly as it was
class SimpleLLM(nn.Module):
    def __init__(self, vocab_size=1000, embed_dim=64):
        super(SimpleLLM, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.fc = nn.Linear(embed_dim, vocab_size)
        
    def forward(self, x):
        x = self.embedding(x)
        x = self.fc(x.mean(dim=1))
        return x

# 2. Instantiate and load your existing weights
model = SimpleLLM()
model.load_state_dict(torch.load("api/model.pth", map_location="cpu"))
model.eval()

# 3. Create dummy input matching your model's expected shape
# (Example: Batch size 1, sequence length 10)
dummy_input = torch.randint(0, 1000, (1, 10), dtype=torch.long)

# 4. Export to ONNX
torch.onnx.export(
    model, 
    dummy_input, 
    "api/model.onnx", # This will save 'model.onnx' in your api folder
    input_names=['input'], 
    output_names=['output'],
    dynamic_axes={'input': {0: 'batch_size', 1: 'sequence_length'}} # Allows flexible input sizes
)
print("Conversion complete! Please add api/model.onnx to your repository.")
