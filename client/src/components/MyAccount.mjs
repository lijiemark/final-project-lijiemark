import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.mjs';
import './MyAccount.css';

function MyAccount() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [height, setHeight] = useState(user.height || '');
  const [weight, setWeight] = useState(user.weight || '');
  const [age, setAge] = useState(user.age || '');
  const [activityLevel, setActivityLevel] = useState(1.2);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://lijie-fit-journal.herokuapp.com/user/update/${user.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, height, weight, age }),
      });
      const updatedUser = await response.json();
      setUser(updatedUser);
      alert('User information updated successfully');
    } catch (error) {
      console.error('Failed to update user information:', error);
      alert('Failed to update user information');
    }
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };
  const getWeightStatusAndRecommendations = () => {
    const minHealthyCalories = 1350;
    const maxHealthyCalories = 3500;

    const bmi = parseFloat(calculateBMI());
    let status = '';
    let calorieAdjustment = '';
    let exerciseLevel = '';
    let dailyCalorieBurn = '';

    if (bmi < 18.5) {
      status = 'Underweight';
      calorieAdjustment = 'Increase your calorie intake by 300-500 calories per day.';
      exerciseLevel = 'Light exercise (e.g., walking) 3-4 times a week.';
      dailyCalorieBurn = 'Aim to burn approximately 200-300 calories per day through exercise.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      status = 'Normal weight';
      calorieAdjustment = 'Maintain your current calorie intake.';
      exerciseLevel = 'Moderate exercise (e.g., jogging, swimming) 4-5 times a week.';
      dailyCalorieBurn = 'Aim to burn approximately 300-400 calories per day through exercise.';
    } else {
      status = 'Overweight';
      calorieAdjustment = 'Decrease your calorie intake by 300-500 calories per day.';
      exerciseLevel = 'Intense exercise (e.g., running, HIIT) 5-6 times a week.';
      dailyCalorieBurn = 'Aim to burn approximately 500-700 calories per day through exercise.';
    }

    // Calculate TDEE (Total Daily Energy Expenditure) using Mifflin-St Jeor Equation
    const tdee = (10 * weight + 6.25 * height - 5 * age + 5) * activityLevel;
    const bulkCalories = Math.round(tdee + 500);
    const cutCalories = Math.round(tdee - 500);

    let cutWarning = '';
    if (cutCalories < minHealthyCalories) {
      cutWarning = `It's not suggested to intake below ${minHealthyCalories} calories per day. Consult a nutritionist for a personalized plan.`;
    }

    let bulkWarning = '';
    if (bulkCalories > maxHealthyCalories) {
      bulkWarning = `It's not suggested to intake above ${maxHealthyCalories} calories per day. Consult a nutritionist for a personalized plan.`;
    }
    return {
      status, calorieAdjustment, exerciseLevel, dailyCalorieBurn, bulkCalories, cutCalories, bulkWarning,
      cutWarning,
    };
  };

  const { status, calorieAdjustment, exerciseLevel, dailyCalorieBurn, bulkCalories, cutCalories, bulkWarning,
    cutWarning, } = getWeightStatusAndRecommendations();

  return (
    <div className="account-container">
      <h1>My Status</h1>
      <form>
        <div className="form-group">
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Age: <input
              type="number"
              value={age}
              placeholder={user.age || 'Enter age'}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

        </div>
        <div className="form-group">
          <label>
            Height (cm):
            <input type="number" value={height} placeholder={user.height || 'Enter height'} onChange={(e) => setHeight(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Weight (kg):
            <input type="number" value={weight} placeholder={user.weight || 'Enter weight'} onChange={(e) => setWeight(e.target.value)} />
          </label>
        </div>
        <button type="button" class="update-button" onClick={handleUpdate}>
          Update and Save
        </button>
        <div className="form-group">
          <br></br>

          <p>
            Your BMI is: {calculateBMI()}
          </p>
        </div>
        <div className="form-group">
          <label>
            Weight status:
          </label>
          <p>{status}</p>
        </div>
        <div className="form-group">
          <label>
            Calorie adjustment:
          </label>
          <p>{calorieAdjustment}</p>
        </div>
        <div className="form-group">
          <label>
            Suggested exercise level:
          </label>
          <p>{exerciseLevel}</p>
        </div>
        <div className="form-group">
          <label>
            Daily calorie burn target:
          </label>
          <p>{dailyCalorieBurn}</p>
        </div>
        <div className="form-group">
          <label>
            Activity level:
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
              <option value="1.2">Sedentary (little or no exercise)</option>
              <option value="1.375">Lightly active (light exercise or sports 1-3 days a week)</option>
              <option value="1.55">Moderately active (moderate exercise or sports 3-5 days a week)</option>
              <option value="1.725">Very active (hard exercise or sports 6-7 days a week)</option>
              <option value="1.9">Extra active (very hard exercise, physical job, or training twice a day)</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Bulk up (about 0.5kg per week):
          </label>
          <p>Increase your daily calorie intake to approximately {bulkCalories} calories.</p>
          {bulkWarning && <p className="warning">{bulkWarning}</p>}

        </div>
        <div className="form-group">
          <label>
            Cut down (about 0.5kg per week):
          </label>
          <p>Decrease your daily calorie intake to approximately {cutCalories} calories.</p>
          {cutWarning && <p className="warning">{cutWarning}</p>}

        </div>
      </form>
    </div>
  );
}

export default MyAccount;