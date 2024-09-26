import torch
from transformers import MarianMTModel, MarianTokenizer

def load_translation_model(source_lang, target_lang):
    model_name = f'Helsinki-NLP/opus-mt-{source_lang}-{target_lang}'
    model = MarianMTModel.from_pretrained(model_name).to('cuda' if torch.cuda.is_available() else 'cpu')
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    return model, tokenizer

def translate(text, source_lang, target_lang):
    model, tokenizer = load_translation_model(source_lang, target_lang)
    batch = tokenizer([text], return_tensors="pt", padding=True, truncation=True).to('cuda' if torch.cuda.is_available() else 'cpu')
    translated = model.generate(**batch, max_length=512)
    tgt_text = [tokenizer.decode(t, skip_special_tokens=True) for t in translated]
    return tgt_text[0]
