from sqlalchemy import Column, Integer,String
from backend.app.database import Base
from backend.app.database import engine

class DataModel:
    def __init__(self, data):
        self.data = data

    def process(self):
        return self.data.upper()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

User.metadata.create_all(bind=engine)