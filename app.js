document.addEventListener("DOMContentLoaded", function () {
    // Constante de las Actividades 
    const ACTIVITY_CALORIES = {
        correr: 150,
        bicicleta: 120,
        nadar: 180,
        bailar: 130,
        Gym: 140,
        otro: 60,
    };

    // Mensaje de Toastify 
    const showToast = (message, type) => {
        Toastify({
            text: message,
            duration: 5000,
            gravity: "top",
            position: 'right',
            backgroundColor: type === 'success' ? '#4CAF50' : '#FF5722',
        }).showToast();
    };

    // Funcion para la informacion Calorica 
    const updateCalorieInfo = (calories) => {
        const calorieInfo = document.getElementById("calorie-info");
        calorieInfo.textContent = `Tu necesidad calórica diaria es: ${calories.toFixed(2)} kcal`;

        // Calculo para el Bulk y el Cut 
        const bulkingCalories = calories + 500; 
        const cuttingCalories = calories - 500; 

        const calorieRecommendation = document.getElementById("calorie-recommendation");
        calorieRecommendation.innerHTML = `Para ganar peso (bulking): ${bulkingCalories.toFixed(2)} kcal al día<br>`;
        calorieRecommendation.innerHTML += `Para perder peso (cutting): ${cuttingCalories.toFixed(2)} kcal al día`;
    };

    // Funcion para resetear la informacion 
    const resetCalorieInfo = () => {
        const calorieInfo = document.getElementById("calorie-info");
        calorieInfo.textContent = '';

        const calorieRecommendation = document.getElementById("calorie-recommendation");
        calorieRecommendation.textContent = '';
    };

    // Funcion para mostrar los entrenamientos
    const displayWorkouts = () => {
        const workoutList = document.getElementById("workoutList");
        workoutList.innerHTML = ""; // Limpiar la lista previa de entrenamientos

        workoutHistory.forEach((workout, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Workout ${index + 1}: ${workout.exerciseType}, Duración: ${workout.duration} minutos, Calorías Quemadas: ${workout.caloriesBurned}`;
            workoutList.appendChild(listItem);
        });
    };

    // Funcion para calcular calorias 
    const calcularCalorias = () => {
        const edad = parseFloat(document.getElementById("edad").value);
        const peso = parseFloat(document.getElementById("peso").value);
        const altura = parseFloat(document.getElementById("altura").value);
        const sexo = document.getElementById("sexo").value;
        const nivelActividad = document.getElementById("nivelActividad").value;
        const actividadFisica = document.getElementById("actividadFisica").value;
        let calorias = 0;
        if (sexo === "masculino") {
            calorias = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * edad;
        } else if (sexo === "femenino") {
            calorias = 447.593 + 9.247 * peso + 3.098 * altura - 4.330 * edad;
        }
        const activityMultiplier = {
            sedentario: 1.2,
            ligero: 1.375,
            moderado: 1.55,
            activo: 1.725,
            muyActivo: 1.9,
        }[nivelActividad] || 1;

        calorias *= activityMultiplier;

        // Ajuste en base al tipo de actividad realizado
        if (actividadFisica !== "") {
            calorias += ACTIVITY_CALORIES[actividadFisica] || 0;
        }
        updateCalorieInfo(calorias);

        // Guardado de data en Json 
        const userData = {
            edad,
            peso,
            altura,
            sexo,
            nivelActividad,
            actividadFisica,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        // Mensaje de Toastify 
        showToast("Necesidad calórica calculada correctamente.", "success");
    };

    // Funcion para objetivos 
    const establecerMetas = () => {
        const metaPeso = parseFloat(document.getElementById("metaPeso").value);
        const metaActividad = document.getElementById("metaActividad").value;
        const meta = {
            peso: metaPeso,
            actividad: metaActividad,
        };
        const listaMetas = document.getElementById("listaMetas");
        const listItem = document.createElement("li");
        listItem.textContent = `Meta de peso: ${meta.peso} kg, Meta de actividad: ${meta.actividad}`;
        listaMetas.appendChild(listItem);

        // Guardado de data en Json 
        const goalsData = {
            metaPeso,
            metaActividad,
        };
        localStorage.setItem("goalsData", JSON.stringify(goalsData));
        // Mensaje de Sweet Alert
        Swal.fire({
            title: 'Metas Establecidas',
            text: 'Tus metas de masa muscular han sido establecidas correctamente.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    // Listener de Buttons 
    document.getElementById("calcularCalorias").addEventListener("click", calcularCalorias);
    document.getElementById("establecerMetas").addEventListener("click", establecerMetas);

    document.getElementById("logWorkout").addEventListener("click", () => {
        const exerciseType = document.getElementById("exerciseType").value.trim();
        const duration = parseInt(document.getElementById("duration").value);
        const caloriesBurned = parseInt(document.getElementById("caloriesBurned").value);
        if (exerciseType === "" || isNaN(duration) || duration <= 0 || isNaN(caloriesBurned) || caloriesBurned <= 0) {
            alert("Please enter valid workout information.");
            return;
        }
        const workout = {
            exerciseType,
            duration,
            caloriesBurned,
        };
        workoutHistory.push(workout);
        document.getElementById("exerciseType").value = "";
        document.getElementById("duration").value = "";
        document.getElementById("caloriesBurned").value = "";
        displayWorkouts();
    });

    // Funcion para buscar y mostrar los datos guardados 
    const retrieveCaloriesData = () => {
        const userDataJSON = localStorage.getItem("userData");
        if (userDataJSON) {
            const userData = JSON.parse(userDataJSON);
            alert("Datos de usuario recuperados: " + JSON.stringify(userData));
        } else {
            alert("No se encontraron datos almacenados para Calculadora de Calorias.");
        }
    };

    const retrieveFitnessData = () => {
        const goalsDataJSON = localStorage.getItem("goalsData");
        if (goalsDataJSON) {
            const goalsData = JSON.parse(goalsDataJSON);
            alert("Datos de metas recuperados: " + JSON.stringify(goalsData));
        } else {
            alert("No se encontraron datos almacenados para Fitness Tracker.");
        }
    };

    document.getElementById("retrieveCaloriesData").addEventListener("click", retrieveCaloriesData);
    document.getElementById("retrieveFitnessData").addEventListener("click", retrieveFitnessData);
});
