# ─────────────────────────────────────────
# REQUIRED FIELDS PER DISEASE
# ─────────────────────────────────────────
REQUIRED = {
    'heart':    ['age','sex','cp','trestbps','chol','fbs','thalach','exang'],
    'brain':    ['age','gender','hypertension','heart_disease','avg_glucose_level','bmi','smoking_status','work_type'],
    'kidney':   ['age','blood_pressure','blood_sugar','hypertension','diabetes','appetite','swelling','anaemia'],
    'diabetes': ['age','pregnancies','glucose','blood_pressure','bmi','pedigree','skin_thickness','insulin']
}

# ─────────────────────────────────────────
# VALID RANGES FOR NUMERIC FIELDS
# ─────────────────────────────────────────
RANGES = {
    'heart':    {'age':(1,120), 'trestbps':(50,250), 'chol':(50,700), 'thalach':(50,250)},
    'brain':    {'age':(1,120), 'avg_glucose_level':(0,400), 'bmi':(5,70)},
    'kidney':   {'age':(1,120), 'blood_pressure':(50,200), 'blood_sugar':(50,500)},
    'diabetes': {'age':(1,120), 'pregnancies':(0,20), 'glucose':(0,300), 'blood_pressure':(0,150), 'bmi':(5,70)}
}

# ─────────────────────────────────────────
# VALID OPTIONS FOR CATEGORICAL FIELDS
# ─────────────────────────────────────────
OPTIONS = {
    'heart':  {'sex':[0,1], 'cp':[0,1,2,3], 'fbs':[0,1], 'exang':[0,1]},
    'brain':  {'gender':['Male','Female','Other'], 'hypertension':[0,1], 'heart_disease':[0,1],
               'smoking_status':['never smoked','formerly smoked','smokes','Unknown'],
               'work_type':['Private','Self-employed','Govt_job','children','Never_worked']},
    'kidney': {'hypertension':['yes','no'], 'diabetes':['yes','no'],
               'appetite':['good','poor'], 'swelling':['yes','no'], 'anaemia':['yes','no']},
    'diabetes': {}
}

# ─────────────────────────────────────────
# MAIN VALIDATE FUNCTION
# ─────────────────────────────────────────
def validate(disease, data):
    if not data:
        return "No input data received"

    # Check all required fields present
    for field in REQUIRED[disease]:
        if field not in data or data[field] is None or data[field] == '':
            return f"Missing or empty field: {field}"

    # Check numeric ranges
    for field, (mn, mx) in RANGES[disease].items():
        try:
            val = float(data[field])
            if val < mn or val > mx:
                return f"{field} must be between {mn} and {mx}"
        except (ValueError, TypeError):
            return f"{field} must be a valid number"

    # Check categorical options
    for field, options in OPTIONS[disease].items():
        if field in data and data[field] not in options:
            return f"{field} must be one of: {options}"

    return None
# ```

# ---

# ## What Changed
# ```
# Before → 3 separate blocks, more lines
# After  → same logic, cleaner structure
#          REQUIRED, RANGES, OPTIONS clearly separated
#          one validate() function handles all 4 diseases
#          easier to read and explain in viva