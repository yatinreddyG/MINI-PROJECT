import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score
from preprocessor import (
    preprocess_heart,
    preprocess_brain,
    preprocess_kidney,
    preprocess_diabetes
)

def get_models():
    return {
        'dt': DecisionTreeClassifier(random_state=42, class_weight='balanced'),
        'rf': RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced'),
        'lr': LogisticRegression(max_iter=1000, random_state=42, class_weight='balanced')
    }

def train_disease(name, df, preprocess_fn):
    print(f"Training {name} models...")
    X, y, scaler, le_dict, columns = preprocess_fn(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    models = get_models()
    result = {
        'scaler':  scaler,
        'le_dict': le_dict,
        'columns': columns
    }
    for key, model in models.items():
        model.fit(X_train, y_train)
        pred = model.predict(X_test)
        acc  = round(accuracy_score(y_test, pred) * 100, 2)
        f1   = round(f1_score(y_test, pred, average='weighted') * 100, 2)
        result[key] = {
            'model':    model,
            'accuracy': acc,
            'f1':       f1
        }
    print(f"{name} → DT: {result['dt']['accuracy']}%  RF: {result['rf']['accuracy']}%  LR: {result['lr']['accuracy']}%")
    return result

def train_all_models():
    models_store = {}
    models_store['heart']    = train_disease('Heart',    pd.read_csv('data/heart.csv'),    preprocess_heart)
    models_store['brain']    = train_disease('Brain',    pd.read_csv('data/brain.csv'),    preprocess_brain)
    models_store['kidney']   = train_disease('Kidney',   pd.read_csv('data/kidney.csv'),   preprocess_kidney)
    models_store['diabetes'] = train_disease('Diabetes', pd.read_csv('data/diabetes.csv'), preprocess_diabetes)
    print("\n✅ All 12 models trained successfully")
    return models_store