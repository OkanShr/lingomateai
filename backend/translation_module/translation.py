import torch
from transformers import MarianMTModel, MarianTokenizer

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def load_translation_model(source_lang, target_lang):
    model_name = f'Helsinki-NLP/opus-mt-{source_lang}-{target_lang}'
    model = MarianMTModel.from_pretrained(model_name).to(device)
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    return model, tokenizer

def translate(text, source_lang, target_lang):
    model, tokenizer = load_translation_model(source_lang, target_lang)
    paragraphs = text.split('\n')

    translated_paragraphs = []
    for paragraph in paragraphs:
        if paragraph.strip(): 
            inputs = tokenizer([paragraph], return_tensors="pt", padding=True, truncation=True).to(device)
            translated = model.generate(**inputs, max_length=1500, temperature=0.2)
            tgt_text = [tokenizer.decode(t, skip_special_tokens=True) for t in translated]
            translated_paragraphs.append(tgt_text[0])
        else:
            translated_paragraphs.append('')

    return '\n'.join(translated_paragraphs)
