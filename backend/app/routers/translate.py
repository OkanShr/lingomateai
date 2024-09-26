from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from translation_module.translation import translate

router = APIRouter()

class TranslationRequest(BaseModel):
    source_lang: str
    target_lang: str
    text: str

class TranslationResponse(BaseModel):
    translated_text: str

@router.post("/translate", response_model=TranslationResponse)
def translate_text(request: TranslationRequest):
    try:
        # Use the translation function to translate the text
        translated_text = translate(request.text, request.source_lang, request.target_lang)
        return {"translated_text": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
