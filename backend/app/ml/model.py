# Example: You can expand this with scikit-learn, etc.
def suggest_priority(title, description, due_date):
    # Dummy logic
    if "urgent" in title.lower():
        return "High"
    return "Medium"
