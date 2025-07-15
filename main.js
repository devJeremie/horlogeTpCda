// Fonction de mise à jour de l'horloge
// Appelle la fonction setClock toutes les 1000 millisecondes (soit 1 seconde)
setInterval(setClock, 1000);

// Fonction qui met à jour l'heure de l'horloge analogique
function setClock() {
    // Valeur en degrés d'une unité de temps sur une horloge (360° / 60 = 6°)
    const deg = 6;
    // Création de la date actuelle
    const now = new Date();
    // Récupération des heures, minutes et secondes de l'heure actuelle
    const hr = now.getHours();    // Heure actuelle
    const mn = now.getMinutes();  // Minutes actuelles
    const sc = now.getSeconds();  // Secondes actuelles
    // Calcul et application de la rotation de l'aiguille des heures :
    // Chaque heure vaut 30° (360° / 12), et on ajoute l'influence des minutes (0.5° par minute)
    document.getElementById('hr').style.transform = `rotate(${(hr % 12) * 30 + mn / 2}deg)`;
    // Calcul de la rotation de l'aiguille des minutes (6° par minute)
    document.getElementById('mn').style.transform = `rotate(${mn * deg}deg)`;
    // Calcul de la rotation de l'aiguille des secondes (6° par seconde)
    document.getElementById('sc').style.transform = `rotate(${sc * deg}deg)`;
    // Appel d'une fonction pour vérifier si une alarme doit être déclenchée
    checkAlarm(hr, mn);
}

    // --- ALARME ---
    let alarmHour = null;
    let alarmMinute = null;
    let alarmMessage = "";
    let alarmArmed = false;

    function setAlarm() {
    const alarmInput = document.getElementById('alarmTime').value;
    const messageInput = document.getElementById('alarmMessage').value;

    // Vérification de la présence d'une heure
    if (!alarmInput) {
        alert("Veuillez sélectionner une heure d'alarme.");
    return;
    }

    const [hour, minute] = alarmInput.split(":").map(Number);

    alarmHour = hour;
    alarmMinute = minute;
    alarmMessage = messageInput || "C'est l'heure de l'alarme !";
    alarmArmed = true;
    alert(`⏰ Alarme réglée à ${alarmHour}:${alarmMinute.toString().padStart(2, '0')}`);
}

    let alarmAlreadyTriggered = false;

    function checkAlarm(currentHour, currentMinute) {
    if (
    alarmArmed &&
    alarmHour !== null &&
    alarmMinute !== null &&
    currentHour === alarmHour &&
    currentMinute === alarmMinute &&
    !alarmAlreadyTriggered
    ) {
        alarmAlreadyTriggered = true;
    playAlarm();
    alert("🔔 Alarme : " + alarmMessage);
    }

    // Réarmer pour pouvoir déclencher à nouveau si l'alarme est réinitialisée
    if (
    alarmAlreadyTriggered &&
    (currentHour !== alarmHour || currentMinute !== alarmMinute)
    ) {
        alarmAlreadyTriggered = false;
    }
}

    // --- JOUER LE SON ---
    function playAlarm() {
    const sound = document.getElementById('alarmSound');
    if (sound) {
        sound.currentTime = 0;
    sound.play();
    }
}
/*--- HORLOGE DIGITALE ---*/
// Horloge digitale
// Fonction qui met à jour l'affichage de l'horloge
function updateClock() {
    // Création d'un objet Date pour obtenir l'heure actuelle
    const now = new Date();
    // Récupération de l'heure, et conversion en chaîne avec 2 chiffres (ex: "08" au lieu de "8")
    let hour = now.getHours().toString().padStart(2, "0");
    // Récupération des minutes, avec format à deux chiffres
    let minute = now.getMinutes().toString().padStart(2, "0");
    // Récupération des secondes, également en deux chiffres
    let second = now.getSeconds().toString().padStart(2, "0");
    // Mise à jour du contenu texte de l'élément HTML avec l'ID "digital-clock"
    document.getElementById("digital-clock").textContent = `${hour}:${minute}:${second}`;
    // Appel d'une fonction pour vérifier si une alarme doit se déclencher (fonction à définir ailleurs)
    checkAlarm(hour, minute, second);
}
// Appelle la fonction updateClock toutes les 1000 millisecondes (1 seconde)
setInterval(updateClock, 1000);
// Appelle immédiatement updateClock dès le chargement de la page pour afficher l'heure sans attendre 1 seconde
updateClock();

// // Alarme
// let alarmHour = null;
// let alarmMinute = null;
// let alarmMessage = "";
// let alarmArmed = false;
// let alarmAlreadyTriggered = false;

// function setAlarm() {
//     const alarmInput = document.getElementById("alarmTime").value;
//     const messageInput = document.getElementById("alarmMessage").value;

//     if (!alarmInput || !alarmInput.includes(":")) {
//         alert("Veuillez sélectionner une heure d'alarme.");
//         return;
//     }
//     const [hour, minute] = alarmInput.split(":").map(Number);

//     if (isNaN(hour) || isNaN(minute)) {
//         alert("Heure invalide.");
//         return;
//     }

//     alarmHour = hour;
//     alarmMinute = minute;
//     alarmMessage = messageInput || "C'est l'heure de l'alarme !";
//     alarmArmed = true;
//     alarmAlreadyTriggered = false;
//     alert(`⏰ Alarme réglée à ${alarmHour.toString().padStart(2, '0')}:${alarmMinute.toString().padStart(2, '0')}`);
// }

// function checkAlarm(currentHour, currentMinute, currentSecond) {
//     if (
//         alarmArmed &&
//         Number(currentHour) === alarmHour &&
//         Number(currentMinute) === alarmMinute &&
//         Number(currentSecond) === 0 &&
//         !alarmAlreadyTriggered
//     ) {
//         alarmAlreadyTriggered = true;
//         playAlarm();
//         alert("🔔 Alarme : " + alarmMessage);
//     }
//     // reset pour l'alarme future
//     if (
//         alarmAlreadyTriggered &&
//         (Number(currentHour) !== alarmHour || Number(currentMinute) !== alarmMinute)
//     ) {
//         alarmAlreadyTriggered = false;
//     }
// }

// function playAlarm() {
//     const sound = document.getElementById('alarmSound');
//     if (sound) {
//         sound.currentTime = 0;
//         sound.play();
//     }
// }


