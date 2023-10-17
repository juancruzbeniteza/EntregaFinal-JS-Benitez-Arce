document.addEventListener("DOMContentLoaded", function () {
    const ACTIVITY_CALORIES = {
        correr: 150,
        bicicleta: 120,
        nadar: 180,
        bailar: 130,
        Gym: 140,
        otro: 60,
    };

    const showToast = (message, type) => {
        Toastify({
            text: message,
            duration: 5000,
            gravity: "top",
            position: 'right',
            backgroundColor: type === 'success' ? '#4CAF50' : '#FF5722',
        }).showToast();
    };

    const updateCalorieInfo = (calories) => {
        const calorieInfo = document.getElementById("calorie-info");
        calorieInfo.textContent = `Tu necesidad calórica diaria es: ${calories.toFixed(2)} kcal`;

        const bulkingCalories = calories + 500;
        const cuttingCalories = calories - 500;

        const calorieRecommendation = document.getElementById("calorie-recommendation");
        calorieRecommendation.innerHTML = `Para ganar peso (bulking): ${bulkingCalories.toFixed(2)} kcal al día<br>`;
        calorieRecommendation.innerHTML += `Para perder peso (cutting): ${cuttingCalories.toFixed(2)} kcal al día`;
    };

    const resetCalorieInfo = () => {
        const calorieInfo = document.getElementById("calorie-info");
        calorieInfo.textContent = '';

        const calorieRecommendation = document.getElementById("calorie-recommendation");
        calorieRecommendation.textContent = '';
    };

    let workoutHistory = [];

    const displayWorkouts = () => {
        const workoutList = document.getElementById("workoutList");
        workoutList.innerHTML = "";

        workoutHistory.forEach((workout, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>Entrenamiento ${index + 1}:</strong><br>
            Tipo: ${workout.exerciseType}<br>
            Duración: ${workout.duration} minutos<br>
            Calorías Quemadas: ${workout.caloriesBurned} kcal`;
            workoutList.appendChild(listItem);
        });
    };

    // Function to save workout history in local storage
    const saveWorkoutHistory = () => {
        localStorage.setItem("workoutHistory", JSON.stringify(workoutHistory));
    };

    // Function to load workout history from local storage and display it
    const loadWorkoutHistory = () => {
        const historyJSON = localStorage.getItem("workoutHistory");
        if (historyJSON) {
            workoutHistory = JSON.parse(historyJSON);
            displayWorkouts(); // Display the loaded workout history
        }
    };

    // Load workout history when the page loads
    loadWorkoutHistory();

    const calcularCalorias = () => {
        // Existing code for calculating calories

        // Save workout history to local storage
        saveWorkoutHistory();
    };

    const establecerMetas = () => {
        // Existing code for setting goals

        // Save workout history to local storage
        saveWorkoutHistory();
    };

    document.getElementById("calcularCalorias").addEventListener("click", calcularCalorias);
    document.getElementById("establecerMetas").addEventListener("click", establecerMetas);

    const botonBorrarDatos = document.getElementById('borrarDatos');
    botonBorrarDatos.addEventListener('click', function () {
        Swal.fire({
            title: '¿Seguro que quieres reiniciar?',
            text: 'No puedes revertir este paso',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, quiero'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado!',
                    'Has reiniciado todos los datos.',
                    'success'
                );
                document.getElementById("edad").value = "";
                document.getElementById("peso").value = "";
                document.getElementById("altura").value = "";
                document.getElementById("sexo").value = "masculino";
                document.getElementById("nivelActividad").value = "sedentario";
                document.getElementById("metaPeso").value = "";
                document.getElementById("metaActividad").value = "";
                document.getElementById("actividadFisica").value = "";
                document.getElementById("listaMetas").innerHTML = "";
                localStorage.clear();
                workoutHistory = [];
                displayWorkouts();
                resetCalorieInfo();
            }
        })
    });

    const botonNuevoGuardado = document.getElementById("nuevoGuardado");
    botonNuevoGuardado.addEventListener("click", function () {
        Swal.fire({
            title: '¿Deseas crear un nuevo guardado?',
            text: 'Esto creará un nuevo registro en el almacenamiento local.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, crear nuevo guardado'
        }).then((result) => {
            if (result.isConfirmed) {
                const timestamp = new Date().getTime();
                const key = `guardado_${timestamp}`;
                localStorage.setItem(key, 'Some data for your new entry');

                Swal.fire(
                    'Guardado!',
                    'Se ha creado un nuevo guardado.',
                    'success'
                );
            }
        });
    });

    document.getElementById("logWorkout").addEventListener("click", () => {
        const exerciseType = document.getElementById("exerciseType").value.trim();
        const duration = parseInt(document.getElementById("duration").value);
        const caloriesBurned = parseInt(document.getElementById("caloriesBurned").value);

        if (exerciseType === "" || isNaN(duration) || duration <= 0 || isNaN(caloriesBurned) || caloriesBurned <= 0) {
            alert("Por favor, introduce información válida del entrenamiento.");
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

        // Save workout history to local storage
        saveWorkoutHistory();
    });

    const retrieveCaloriesData = () => {
        const userDataJSON = localStorage.getItem("userData");
        if (userDataJSON) {
            const userData = JSON.parse(userDataJSON);
            document.getElementById("edad").value = userData.edad;
            document.getElementById("peso").value = userData.peso;
            document.getElementById("altura").value = userData.altura;
            document.getElementById("sexo").value = userData.sexo;
            document.getElementById("nivelActividad").value = userData.nivelActividad;
            document.getElementById("actividadFisica").value = userData.actividadFisica;
            showToast("Datos de usuario recuperados.", "success");
        } else {
            alert("No se encontraron datos almacenados para la Calculadora de Calorías.");
        }
    };

    const retrieveFitnessData = () => {
        const goalsDataJSON = localStorage.getItem("goalsData");
        if (goalsDataJSON) {
            const goalsData = JSON.parse(goalsDataJSON);
            document.getElementById("metaPeso").value = goalsData.metaPeso;
            document.getElementById("metaActividad").value = goalsData.metaActividad;
            showToast("Datos de metas recuperados.", "success");
        } else {
            alert("No se encontraron datos almacenados para el Fitness Tracker.");
        }
    };

    document.getElementById("retrieveCaloriesData").addEventListener("click", retrieveCaloriesData);
    document.getElementById("retrieveFitnessData").addEventListener("click", retrieveFitnessData);

    retrieveCaloriesData();
    retrieveFitnessData();
});