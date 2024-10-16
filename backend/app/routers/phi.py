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

        input_text = (
            f"Given the following text, respond to the question below concisely:\n"
            f"---\n"
            f"Text: {request.text}\n"
            f"---\n"
            f"Question: {request.question}\n"
            "Provide an answer in 20-30 words."
        )
        
        inputs = tokenizer(input_text, return_tensors="pt").to(device)

        outputs = model.generate(**inputs, max_new_tokens=50)
        
        answer = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
        
        
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
