from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import torch
import time
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
    verbose: bool = False  # Optional flag for verbose mode
    timings: bool = False  # Optional flag to track execution times

class PhiResponse(BaseModel):
    answer: str

@router.post("/ask-about", response_model=PhiResponse)
def query_phi3(request: PhiRequest):
    try:
        # Verbose flag for debugging
        if request.verbose: print("Processing request...")

        # Error handling for empty input
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Input text cannot be empty")

        # Timing execution if the timings flag is enabled
        if request.timings:
            start_time = time.time()

        # Prepare input prompt
        input_text = (
            f"Text: {request.text}\n"
            f"Question: {request.question}\n"
            f"Answer concisely in 20-30 words: "
        )
        
        # Tokenize the input and pass it to the model
        inputs = tokenizer(input_text, return_tensors="pt").to(device)
        if request.verbose: print("Input tokenized")

        # Define generation parameters
        search_options = {
            'do_sample': True,           # Enable sampling
            'max_length': 100,            # Max tokens for generation
            'temperature': 0.7,          # Control randomness
            'top_p': 0.9,                # Nucleus sampling
            'top_k': 50,                 # Top-k sampling
            'repetition_penalty': 1.1    # Penalize repetition
        }

        # Generate output tokens
        outputs = model.generate(**inputs, max_new_tokens=search_options['max_length'], 
                                 do_sample=search_options['do_sample'],
                                 top_k=search_options['top_k'],
                                 top_p=search_options['top_p'],
                                 temperature=search_options['temperature'],
                                 repetition_penalty=search_options['repetition_penalty'])

        if request.verbose: print("Text generation completed")

        # Decode the generated text
        answer = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

        # Extract answer if it contains extra context
        
        answer = answer.split("Answer concisely in 20-30 words:")[-1].strip()
        if "Text" in answer:
            answer = answer.split("Text:")[0]
        # End timing and log if enabled
        if request.timings:
            total_time = time.time() - start_time
            print(f"Time taken for generation: {total_time:.2f} seconds")

        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
