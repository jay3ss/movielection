import random

import httpx
from fastapi import FastAPI, HTTPException
from sqlmodel import create_engine, select

from app.models import Movie
