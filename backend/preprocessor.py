import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder

# ─────────────────────────────────────────
# HEART
# ─────────────────────────────────────────
def preprocess_heart(df):
    df = df.copy()
    df.fillna(df.median(numeric_only=True), inplace=True)
    X = df.drop('target', axis=1)
    y = df['target']
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, y, scaler, None, X.columns.tolist()

def preprocess_heart_input(user_input, scaler, columns):
    df = pd.DataFrame([user_input], columns=columns)
    df.fillna(0, inplace=True)
    return scaler.transform(df)

# ─────────────────────────────────────────
# BRAIN
# ─────────────────────────────────────────
def preprocess_brain(df):
    df = df.copy()
    cat_cols = ['gender', 'smoking_status', 'work_type']
    le_dict = {}
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = df[col].astype(str).str.strip()
        df[col] = le.fit_transform(df[col])
        le_dict[col] = le
    df.fillna(df.median(numeric_only=True), inplace=True)
    X = df.drop('target', axis=1)
    y = df['target']
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, y, scaler, le_dict, X.columns.tolist()

def preprocess_brain_input(user_input, scaler, le_dict, columns):
    df = pd.DataFrame([user_input], columns=columns)
    cat_cols = ['gender', 'smoking_status', 'work_type']
    for col in cat_cols:
        df[col] = df[col].astype(str).str.strip()
        df[col] = le_dict[col].transform(df[col])
    df.fillna(0, inplace=True)
    return scaler.transform(df)

# ─────────────────────────────────────────
# KIDNEY
# ─────────────────────────────────────────
def preprocess_kidney(df):
    df = df.copy()
    cat_cols = ['hypertension', 'diabetes', 'appetite', 'swelling', 'anaemia']
    le_dict = {}
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = df[col].astype(str).str.strip()
        df[col] = le.fit_transform(df[col])
        le_dict[col] = le
    df.fillna(df.median(numeric_only=True), inplace=True)
    X = df.drop('target', axis=1)
    y = df['target'].astype(str).str.strip()
    target_le = LabelEncoder()
    y = target_le.fit_transform(y)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, y, scaler, le_dict, X.columns.tolist()

def preprocess_kidney_input(user_input, scaler, le_dict, columns):
    df = pd.DataFrame([user_input], columns=columns)
    cat_cols = ['hypertension', 'diabetes', 'appetite', 'swelling', 'anaemia']
    for col in cat_cols:
        df[col] = df[col].astype(str).str.strip()
        df[col] = le_dict[col].transform(df[col])
    df.fillna(0, inplace=True)
    return scaler.transform(df)

# ─────────────────────────────────────────
# DIABETES
# ─────────────────────────────────────────
def preprocess_diabetes(df):
    df = df.copy()
    df.fillna(df.median(numeric_only=True), inplace=True)
    X = df.drop('target', axis=1)
    y = df['target']
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, y, scaler, None, X.columns.tolist()

def preprocess_diabetes_input(user_input, scaler, columns):
    df = pd.DataFrame([user_input], columns=columns)
    df.fillna(0, inplace=True)
    return scaler.transform(df)