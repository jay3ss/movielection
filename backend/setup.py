from setuptools import find_packages, setup

setup(
    name="movielection",  # Your app's name
    version="0.1",  # Your app's version
    packages=find_packages(),  # Automatically finds all packages
    install_requires=[  # List of dependencies your project requires
        "sqlalchemy",  # Example: Add necessary libraries for your app
        "sqlmodel",
        "fastapi",
        "alembic",
    ],
    include_package_data=True,  # To include non-Python files specified in MANIFEST.in (optional)
)
