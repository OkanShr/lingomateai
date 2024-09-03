from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import get_user_by_username, create_user
from app.schemas import UserCreate
from app.dependencies import get_db

router = APIRouter()

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db=db, user=user)
