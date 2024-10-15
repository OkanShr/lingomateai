from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Initialize the FastAPI router
router = APIRouter()

# Load the model and tokenizer globally
model_name = "microsoft/Phi-3-mini-4k-instruct" 

# Load the model on GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = AutoModelForCausalLM.from_pretrained(model_name).to(device)
tokenizer = AutoTokenizer.from_pretrained(model_name)

class PhiRequest(BaseModel):
    text: str
    question: str

class PhiResponse(BaseModel):
    answer: str

@router.post("/ask-about", response_model=PhiResponse)
def query_phi3(request: PhiRequest):
    try:
        # Prepare the input for the model
        input_text = f"{request.question} {request.text}"
        inputs = tokenizer(input_text, return_tensors="pt").to(device)

        # Generate a response from the model
        outputs = model.generate(**inputs, max_length=800)
        answer = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
