import re
from typing import List, Dict, Optional

NUMBER_WORDS = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
}

WORD_NUMBER_REGEX = r'(?:' + r'|'.join(re.escape(word) for word in NUMBER_WORDS) + r')(?:[-\s](?:one|two|three|four|five|six|seven|eight|nine))?'

EXPERIENCE_PATTERNS = [
    re.compile(
        rf'(?P<years>\d+(?:\.\d+)?)\s*(?:\+|plus)?\s*(?:years?|yrs?|y)\b(?:\s*(?:and|&)?\s*(?P<months>\d+)\s*(?:months?|mos?|m)\b)?',
        re.IGNORECASE,
    ),
    re.compile(
        rf'(?P<years_word>{WORD_NUMBER_REGEX})\s*(?:years?|yrs?|y)\b(?:\s*(?:and|&)?\s*(?P<months_word>{WORD_NUMBER_REGEX})\s*(?:months?|mos?|m)\b)?',
        re.IGNORECASE,
    ),
    re.compile(
        rf'(?P<years1>\d+(?:\.\d+)?)\s*[-–to]{1,3}\s*(?P<years2>\d+(?:\.\d+)?)\s*(?:years?|yrs?|y)\b',
        re.IGNORECASE,
    ),
    re.compile(r'(?P<months>\d+)\s*(?:months?|mos?|m)\b', re.IGNORECASE),
]


def _word_to_number(word: str) -> Optional[float]:
    if not word:
        return None

    normalized = word.lower().replace('-', ' ').strip()
    if normalized in NUMBER_WORDS:
        return float(NUMBER_WORDS[normalized])

    parts = normalized.split()
    total = 0
    for part in parts:
        if part in NUMBER_WORDS:
            total += NUMBER_WORDS[part]
        else:
            return None

    return float(total)


def _parse_number(text: str) -> Optional[float]:
    if not text:
        return None

    try:
        return float(text)
    except ValueError:
        return _word_to_number(text)


def _normalize_experience(years: Optional[float], months: Optional[float] = 0.0) -> Optional[float]:
    if years is None and months is None:
        return None

    years_value = years or 0.0
    months_value = months or 0.0
    total_years = years_value + months_value / 12.0
    return round(total_years, 2)


def extract_experience(text: str) -> List[str]:
    """Extract normalized experience values from resume text."""
    normalized_values = _extract_normalized_experience_values(text)
    return [f'{value:g} years' for value in normalized_values]


def _extract_normalized_experience_values(text: str) -> List[float]:
    text = text.lower()
    detected_values: List[float] = []

    for pattern in EXPERIENCE_PATTERNS:
        for match in pattern.finditer(text):
            group_data = match.groupdict()
            years = _parse_number(group_data.get('years') or '')
            months = _parse_number(group_data.get('months') or '')
            years_word = _parse_number(group_data.get('years_word') or '')
            months_word = _parse_number(group_data.get('months_word') or '')
            years1 = _parse_number(group_data.get('years1') or '')
            years2 = _parse_number(group_data.get('years2') or '')

            if years1 is not None and years2 is not None:
                average_years = round((years1 + years2) / 2.0, 2)
                detected_values.append(average_years)
                continue

            if years is not None or years_word is not None:
                detected_years = years if years is not None else years_word
                detected_months = months if months is not None else months_word
                normalized = _normalize_experience(detected_years, detected_months)
                if normalized is not None:
                    detected_values.append(normalized)
                continue

            if months is not None and years is None and years_word is None:
                normalized = _normalize_experience(0.0, months)
                if normalized is not None:
                    detected_values.append(normalized)

    return sorted(set(detected_values), reverse=True)


def best_experience(text: str) -> Optional[float]:
    """Return the strongest experience match from resume text."""
    values = _extract_normalized_experience_values(text)
    return values[0] if values else None


if __name__ == '__main__':
    sample_text = """
    Worked as Python Developer with 3 years experience in backend systems.
    Previously managed a team for one year and six months.
    Supported projects for 2-3 years and another contract for 10 months.
    """

    print('Detected experience:', extract_experience(sample_text))
    print('Best experience:', best_experience(sample_text))
