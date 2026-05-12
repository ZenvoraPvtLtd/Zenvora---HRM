import re
from typing import List, Optional

NUMBER_WORDS = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,
    "eleven": 11,
    "twelve": 12,
    "thirteen": 13,
    "fourteen": 14,
    "fifteen": 15,
    "sixteen": 16,
    "seventeen": 17,
    "eighteen": 18,
    "nineteen": 19,
    "twenty": 20,
    "thirty": 30,
    "forty": 40,
    "fifty": 50,
}

EXPERIENCE_KEYWORDS = [
    "experience",
    "worked",
    "developer",
    "engineer",
    "employment",
    "internship",
    "software",
    "backend",
    "frontend",
    "role",
    "professional",
]

WORD_NUMBER_REGEX = (
    r"(?:"
    + r"|".join(re.escape(word) for word in NUMBER_WORDS.keys())
    + r")"
)

YEAR_PATTERN = r"(?:years?|yrs?|y)"
MONTH_PATTERN = r"(?:months?|mos?)"

EXPERIENCE_PATTERNS = [
    re.compile(
        rf"(\d+(?:\.\d+)?)\s*(?:\+|plus)?\s*{YEAR_PATTERN}"
        rf"(?:\s*(?:and|&|\+)?\s*(\d+(?:\.\d+)?)\s*{MONTH_PATTERN})?",
        re.IGNORECASE,
    ),

    re.compile(
        rf"({WORD_NUMBER_REGEX})\s*{YEAR_PATTERN}"
        rf"(?:\s*(?:and|&|\+)?\s*({WORD_NUMBER_REGEX})\s*{MONTH_PATTERN})?",
        re.IGNORECASE,
    ),

    re.compile(
        rf"(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(\d+(?:\.\d+)?)\s*{YEAR_PATTERN}",
        re.IGNORECASE,
    ),

    re.compile(
        rf"(\d+(?:\.\d+)?)\s*{MONTH_PATTERN}",
        re.IGNORECASE,
    ),
]


def parse_number(value: str) -> Optional[float]:

    if not value:
        return None

    value = value.lower().strip()

    try:
        return float(value)

    except ValueError:
        return float(NUMBER_WORDS.get(value, 0))


def has_experience_context(
    text: str,
    start_index: int,
    window: int = 100
) -> bool:

    start = max(0, start_index - window)

    context = text[start:start_index].lower()

    return any(
        keyword in context
        for keyword in EXPERIENCE_KEYWORDS
    )


def normalize_experience(
    years: Optional[float] = None,
    months: Optional[float] = None
) -> Optional[float]:

    if years is None and months is None:
        return None

    total = (years or 0.0) + ((months or 0.0) / 12)

    return round(total, 2)


def extract_experience_values(text: str) -> List[float]:

    text = text.lower()

    detected_values = []

    for index, pattern in enumerate(EXPERIENCE_PATTERNS):

        for match in pattern.finditer(text):

            if not has_experience_context(text, match.start()):
                continue

            groups = match.groups()

            # Numeric years
            if index == 0:

                years = parse_number(groups[0])

                months = (
                    parse_number(groups[1])
                    if len(groups) > 1 and groups[1]
                    else None
                )

                value = normalize_experience(
                    years,
                    months
                )

                if value:
                    detected_values.append(value)

            # Word-based years
            elif index == 1:

                years = parse_number(groups[0])

                months = (
                    parse_number(groups[1])
                    if len(groups) > 1 and groups[1]
                    else None
                )

                value = normalize_experience(
                    years,
                    months
                )

                if value:
                    detected_values.append(value)

            # Range values
            elif index == 2:

                start_year = parse_number(groups[0])
                end_year = parse_number(groups[1])

                if start_year and end_year:

                    average = round(
                        (start_year + end_year) / 2,
                        2
                    )

                    detected_values.append(average)

            # Months only
            elif index == 3:

                months = parse_number(groups[0])

                value = normalize_experience(
                    months=months
                )

                if value:
                    detected_values.append(value)

    return sorted(set(detected_values), reverse=True)


def extract_experience(text: str) -> List[str]:

    values = extract_experience_values(text)

    return [
        f"{value:g} years"
        for value in values
    ]


def best_experience(text: str) -> Optional[float]:

    values = extract_experience_values(text)

    return values[0] if values else None


# Quick test
if __name__ == "__main__":
    test_text = """
    Worked as Python Developer with 3 years experience.
    Previously managed team for 1.5 years.
    Internship 8 months.
    """

    print("Detected experience:", extract_experience(test_text))
    print("Best experience:", best_experience(test_text))