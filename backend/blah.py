from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Hello Word"}


"""
I'm going to implement the home page first. This is what should happen when a user visits the homepage:

1. There is no election going on
    a. The page has the app title at the top ("MoviElection")
    b. A button that says "Host Election"

2. There is an election going on
    a. The page has the app title at the top ("MoviElection")
    b. A timer is on the page and it displays how much time is left until the election is over
    c. A list of movies (4 or 5) is on the page in the form of an unordered list
    d. A button that is disabled and says "Vote"
    e. A user chooses a movie by clicking on the title
    f. When the user has chosen their movie, they click the "Vote" button and the vote is transmitted to the
       server which then redirects the user to a page that displays how long until the election is over.
"""
