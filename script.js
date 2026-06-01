// FitTrack - Fitness Tracker Application
// Data Management

class FitnessTracker {
    constructor() {
        this.data = {
            steps: [],
            calories: [],
            sleep: [],
            water: [],
            heartRate: [],
            weight: [],
            workouts: [],
            meals: [],
            goals: []
        };
        this.loadFromStorage();
    }

    // Local Storage Management
    loadFromStorage() {
        const stored = localStorage.getItem('fitnessData');
        if (stored) {
            this.data = JSON.parse(stored);
        }
    }

    saveToStorage() {
        localStorage.setItem('fitnessData', JSON.stringify(this.data));
    }

    // Add Data Methods
    addSteps(steps) {
        this.data.steps.push({
            value: parseInt(steps),
            date: new Date().toISOString()
        });
        this.saveToStorage();
        this.updateDisplay();
    }

    addCalories(calories) {
        this.data.calories.push({
            value: parseInt(calories),
            date: new Date().toISOString()
        });
        this.saveToStorage();
        this.updateDisplay();
    }

    addSleep(hours) {
        this.data.sleep.push({
            value: parseFloat(hours),
            date: new Date().toISOString()
        });
        this.saveToStorage();
        this.updateDisplay();
    }

    addWater(glasses) {
        this.data.water.push({
            value: parseInt(glasses),
            date: new Date().toISOString()
        });
        this.saveToStorage();
        this.updateDisplay();
    }

    addHeartRate(bpm) {
        this.data.heartRate.push({
            value: parseInt(bpm),
            date: new Date().toISOString()
        });
        this.saveToStorage();
        this.updateDisplay();
    }

    addWeight(kg) {
        this.data.weight.push({
            value: parseFloat(kg),
            date: new Date().toISOString()
        });
        this.saveToStorage();
        this.updateDisplay();
    }

    addWorkout(name, duration, date) {
        this.data.workouts.push({
            name: name,
            duration: parseInt(duration),
            date: date || new Date().toISOString(),
            id: Date.now()
        });
        this.saveToStorage();
        this.renderWorkouts();
    }

    addMeal(name, calories, date) {
        this.data.meals.push({
            name: name,
            calories: parseInt(calories),
            date: date || new Date().toISOString(),
            id: Date.now()
        });
        this.saveToStorage();
        this.renderMeals();
    }

    addGoal(name, target, deadline) {
        this.data.goals.push({
            name: name,
            target: parseInt(target),
            current: 0,
            deadline: deadline,
            id: Date.now(),
            completed: false
        });
        this.saveToStorage();
        this.renderGoals();
    }

    // Delete Methods
    deleteWorkout(id) {
        this.data.workouts = this.data.workouts.filter(w => w.id !== id);
        this.saveToStorage();
        this.renderWorkouts();
    }

    deleteMeal(id) {
        this.data.meals = this.data.meals.filter(m => m.id !== id);
        this.saveToStorage();
        this.renderMeals();
    }

    deleteGoal(id) {
        this.data.goals = this.data.goals.filter(g => g.id !== id);
        this.saveToStorage();
        this.renderGoals();
    }

    completeGoal(id) {
        const goal = this.data.goals.find(g => g.id === id);
        if (goal) {
            goal.completed = true;
            this.saveToStorage();
            this.renderGoals();
        }
    }

    // Get Totals
    getTodaySteps() {
        return this.getDataFromToday('steps');
    }

    getTodayCalories() {
        return this.getDataFromToday('calories');
    }

    getTodaySleep() {
        return this.getDataFromToday('sleep');
    }

    getTodayWater() {
        return this.getDataFromToday('water');
    }

    getLatestHeartRate() {
        if (this.data.heartRate.length > 0) {
            return this.data.heartRate[this.data.heartRate.length - 1].value;
        }
        return 0;
    }

    getLatestWeight() {
        if (this.data.weight.length > 0) {
            return this.data.weight[this.data.weight.length - 1].value;
        }
        return 0;
    }

    getDataFromToday(key) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.data[key]
            .filter(item => {
                const itemDate = new Date(item.date);
                itemDate.setHours(0, 0, 0, 0);
                return itemDate.getTime() === today.getTime();
            })
            .reduce((sum, item) => sum + item.value, 0);
    }

    // Get Averages
    getAverageStepsLastWeek() {
        const week = this.getDataFromLastNDays('steps', 7);
        return week.length > 0 ? Math.round(week.reduce((a, b) => a + b, 0) / week.length) : 0;
    }

    getAverageSleepLastWeek() {
        const week = this.getDataFromLastNDays('sleep', 7);
        return week.length > 0 ? (week.reduce((a, b) => a + b, 0) / week.length).toFixed(1) : 0;
    }

    getTotalCaloriesLastWeek() {
        return this.getDataFromLastNDays('calories', 7).reduce((a, b) => a + b, 0);
    }

    getDataFromLastNDays(key, days) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0);

        return this.data[key]
            .filter(item => new Date(item.date) >= startDate)
            .map(item => item.value);
    }

    // Render Methods
    updateDisplay() {
        document.getElementById('stepsDisplay').textContent = this.getTodaySteps();
        document.getElementById('caloriesDisplay').textContent = this.getTodayCalories();
        document.getElementById('sleepDisplay').textContent = this.getTodaySleep() + 'h';
        document.getElementById('waterDisplay').textContent = this.getTodayWater();
        document.getElementById('heartRateDisplay').textContent = this.getLatestHeartRate();
        document.getElementById('weightDisplay').textContent = this.getLatestWeight();

        // Update analytics
        document.getElementById('avgSteps').textContent = this.getAverageStepsLastWeek();
        document.getElementById('totalCalories').textContent = this.getTotalCaloriesLastWeek();
        document.getElementById('avgSleep').textContent = this.getAverageSleepLastWeek() + 'h';
    }

    renderWorkouts() {
        const workoutList = document.getElementById('workoutList');
        
        if (this.data.workouts.length === 0) {
            workoutList.innerHTML = '<p class="empty-state">No workouts logged yet. Start your fitness journey today!</p>';
            return;
        }

        workoutList.innerHTML = this.data.workouts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(workout => `
                <div class="workout-item">
                    <div class="workout-info">
                        <h4>🏃 ${workout.name}</h4>
                        <p>Duration: ${workout.duration} minutes</p>
                        <p>Date: ${new Date(workout.date).toLocaleDateString()}</p>
                    </div>
                    <button class="delete-btn" onclick="tracker.deleteWorkout(${workout.id})">Delete</button>
                </div>
            `).join('');
    }

    renderMeals() {
        const mealList = document.getElementById('mealList');
        
        if (this.data.meals.length === 0) {
            mealList.innerHTML = '<p class="empty-state">No meals logged yet.</p>';
            return;
        }

        mealList.innerHTML = this.data.meals
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(meal => `
                <div class="meal-item">
                    <div class="meal-info">
                        <h4>🍽️ ${meal.name}</h4>
                        <p>Calories: ${meal.calories} kcal</p>
                        <p>Date: ${new Date(meal.date).toLocaleDateString()}</p>
                    </div>
                    <button class="delete-btn" onclick="tracker.deleteMeal(${meal.id})">Delete</button>
                </div>
            `).join('');
    }

    renderGoals() {
        const goalsList = document.getElementById('goalsList');
        
        if (this.data.goals.length === 0) {
            goalsList.innerHTML = '<p class="empty-state">No goals set yet. Create your first goal!</p>';
            return;
        }

        goalsList.innerHTML = this.data.goals
            .map(goal => `
                <div class="goal-item">
                    <div class="goal-info">
                        <h4>${goal.completed ? '✅' : '🎯'} ${goal.name}</h4>
                        <p>Target: ${goal.target} | Current: ${goal.current}</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min((goal.current / goal.target) * 100, 100)}%"></div>
                        </div>
                        <p>Deadline: ${new Date(goal.deadline).toLocaleDateString()}</p>
                    </div>
                    <div>
                        ${!goal.completed ? `<button class="complete-btn" onclick="tracker.completeGoal(${goal.id})">Complete</button>` : ''}
                        <button class="delete-btn" onclick="tracker.deleteGoal(${goal.id})">Delete</button>
                    </div>
                </div>
            `).join('');
    }

    // Export and Clear
    clearAllData() {
        if (confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
            this.data = {
                steps: [],
                calories: [],
                sleep: [],
                water: [],
                heartRate: [],
                weight: [],
                workouts: [],
                meals: [],
                goals: []
            };
            this.saveToStorage();
            this.updateDisplay();
            this.renderWorkouts();
            this.renderMeals();
            this.renderGoals();
            alert('All data has been cleared!');
        }
    }

    downloadData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fitness-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Initialize tracker
const tracker = new FitnessTracker();

// Event Handlers
function addSteps() {
    const input = document.getElementById('stepsInput');
    if (input.value) {
        tracker.addSteps(input.value);
        input.value = '';
        input.focus();
    } else {
        alert('Please enter a valid number of steps');
    }
}

function addCalories() {
    const input = document.getElementById('caloriesInput');
    if (input.value) {
        tracker.addCalories(input.value);
        input.value = '';
        input.focus();
    } else {
        alert('Please enter a valid number of calories');
    }
}

function addSleep() {
    const input = document.getElementById('sleepInput');
    if (input.value) {
        tracker.addSleep(input.value);
        input.value = '';
        input.focus();
    } else {
        alert('Please enter valid hours of sleep');
    }
}

function addWater() {
    const input = document.getElementById('waterInput');
    if (input.value) {
        tracker.addWater(input.value);
        input.value = '';
        input.focus();
    } else {
        alert('Please enter a valid number of glasses');
    }
}

function addHeartRate() {
    const input = document.getElementById('heartRateInput');
    if (input.value) {
        tracker.addHeartRate(input.value);
        input.value = '';
        input.focus();
    } else {
        alert('Please enter a valid heart rate');
    }
}

function addWeight() {
    const input = document.getElementById('weightInput');
    if (input.value) {
        tracker.addWeight(input.value);
        input.value = '';
        input.focus();
    } else {
        alert('Please enter a valid weight');
    }
}

function addWorkout() {
    const name = document.getElementById('workoutName');
    const duration = document.getElementById('workoutDuration');
    const date = document.getElementById('workoutDate');

    if (name.value && duration.value) {
        tracker.addWorkout(name.value, duration.value, date.value || null);
        name.value = '';
        duration.value = '';
        date.value = '';
        name.focus();
    } else {
        alert('Please enter workout name and duration');
    }
}

function addMeal() {
    const name = document.getElementById('mealName');
    const calories = document.getElementById('mealCalories');
    const date = document.getElementById('mealDate');

    if (name.value && calories.value) {
        tracker.addMeal(name.value, calories.value, date.value || null);
        name.value = '';
        calories.value = '';
        date.value = '';
        name.focus();
    } else {
        alert('Please enter meal name and calories');
    }
}

function addGoal() {
    const name = document.getElementById('goalName');
    const target = document.getElementById('goalTarget');
    const deadline = document.getElementById('goalDeadline');

    if (name.value && target.value && deadline.value) {
        tracker.addGoal(name.value, target.value, deadline.value);
        name.value = '';
        target.value = '';
        deadline.value = '';
        name.focus();
    } else {
        alert('Please fill in all goal fields');
    }
}

function clearAllData() {
    tracker.clearAllData();
}

function downloadData() {
    tracker.downloadData();
}

// Initialize display on page load
document.addEventListener('DOMContentLoaded', () => {
    tracker.updateDisplay();
    tracker.renderWorkouts();
    tracker.renderMeals();
    tracker.renderGoals();
    
    // Set today's date as default in date inputs
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('workoutDate').value = today;
    document.getElementById('mealDate').value = today;
});

// Add keyboard support
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        
        if (activeElement.id === 'stepsInput') addSteps();
        else if (activeElement.id === 'caloriesInput') addCalories();
        else if (activeElement.id === 'sleepInput') addSleep();
        else if (activeElement.id === 'waterInput') addWater();
        else if (activeElement.id === 'heartRateInput') addHeartRate();
        else if (activeElement.id === 'weightInput') addWeight();
        else if (activeElement.id === 'workoutName' || activeElement.id === 'workoutDuration') addWorkout();
        else if (activeElement.id === 'mealName' || activeElement.id === 'mealCalories') addMeal();
        else if (activeElement.id === 'goalName' || activeElement.id === 'goalTarget') addGoal();
    }
});
