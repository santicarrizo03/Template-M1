class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
    this.nextId = 1; // Para mantener un id único para cada actividad.
    this.loadFromLocalStorage(); // Cargar actividades al iniciar
  }

  // Validar que los campos no estén vacíos
  static validateActivityData(title, description, imgUrl) {
    return title && description && imgUrl;
  }

  // Agregar una nueva actividad con validación de datos
  addActivity({ title, description, imgUrl }) {
    if (!Repository.validateActivityData(title, description, imgUrl)) {
      throw new Error("All fields (title, description, imgUrl) are required");
    }
    const newActivity = new Activity(this.nextId++, title, description, imgUrl);
    this.activities.push(newActivity);
    this.saveToLocalStorage(); // Guardar después de agregar
  }

  // Remover una actividad por su ID
  removeActivity(id) {
    const index = this.activities.findIndex(activity => activity.id === id);
    if (index === -1) {
      throw new Error(`Activity with id ${id} not found`);
    }
    this.activities.splice(index, 1); // Eliminar la actividad
    this.saveToLocalStorage(); // Guardar después de eliminar
  }

  // Actualizar una actividad existente por su ID
  updateActivity(id, newData) {
    const activity = this.getActivityById(id);
    if (!activity) {
      throw new Error(`Activity with id ${id} not found`);
    }
    activity.title = newData.title || activity.title;
    activity.description = newData.description || activity.description;
    activity.imgUrl = newData.imgUrl || activity.imgUrl;
    this.saveToLocalStorage(); // Guardar después de actualizar
  }

  // Obtener todas las actividades
  getActivities() {
    return this.activities;
  }

  // Obtener una actividad por su ID
  getActivityById(id) {
    return this.activities.find(activity => activity.id === id);
  }

  // Obtener una actividad por su título (búsqueda case-insensitive)
  getActivityByTitle(title) {
    return this.activities.find(activity => activity.title.toLowerCase() === title.toLowerCase());
  }

  // Guardar actividades en localStorage
  saveToLocalStorage() {
    localStorage.setItem('activities', JSON.stringify(this.activities));
  }

  // Cargar actividades de localStorage
  loadFromLocalStorage() {
    const activities = JSON.parse(localStorage.getItem('activities'));
    if (activities) {
      this.activities = activities.map(
        act => new Activity(act.id, act.title, act.description, act.imgUrl)
      );
      this.nextId = this.activities.length ? Math.max(...this.activities.map(a => a.id)) + 1 : 1;
    }
  }
}

// Instancia global del repositorio
const repo = new Repository();

// Función para mostrar las actividades en la página
function renderActivities() {
  const activityList = document.getElementById('activity-list');
  activityList.innerHTML = ''; // Limpiar lista antes de volver a mostrarla

  const activities = repo.getActivities();
  activities.forEach(activity => {
    const activityDiv = document.createElement('div');
    activityDiv.innerHTML = `
      <h4>${activity.title}</h4>
      <p>${activity.description}</p>
      <img src="${activity.imgUrl}" alt="${activity.title}" width="100">
      <button onclick="removeActivity(${activity.id})">Eliminar</button>
    `;
    activityList.appendChild(activityDiv);
  });
}

// Función para agregar una nueva actividad
function addActivity() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const imgUrl = document.getElementById('imgUrl').value;

  try {
    repo.addActivity({ title, description, imgUrl });
    renderActivities();
  } catch (error) {
    alert(error.message); // Manejar el error de validación
  }
}

// Función para eliminar una actividad
function removeActivity(id) {
  repo.removeActivity(id);
  renderActivities();
}

// Agregar el evento al botón "Agregar Actividad"
document.getElementById('add-activity').addEventListener('click', addActivity);

// Renderizar las actividades al cargar la página
renderActivities();
