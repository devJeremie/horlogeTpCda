// Fonction de mise à jour de l'horloge
// Appelle la fonction setClock toutes les 1000 millisecondes (soit 1 seconde)
// setInterval(setClock, 1000);

// // Fonction qui met à jour l'heure de l'horloge analogique
// function setClock() {
//     // Valeur en degrés d'une unité de temps sur une horloge (360° / 60 = 6°)
//     const deg = 6;
//     // Création de la date actuelle
//     const now = new Date();
//     // Récupération des heures, minutes et secondes de l'heure actuelle
//     const hr = now.getHours();    // Heure actuelle
//     const mn = now.getMinutes();  // Minutes actuelles
//     const sc = now.getSeconds();  // Secondes actuelles
//     // Calcul et application de la rotation de l'aiguille des heures :
//     // Chaque heure vaut 30° (360° / 12), et on ajoute l'influence des minutes (0.5° par minute)
//     document.getElementById('hr').style.transform = `rotate(${(hr % 12) * 30 + mn / 2}deg)`;
//     // Calcul de la rotation de l'aiguille des minutes (6° par minute)
//     document.getElementById('mn').style.transform = `rotate(${mn * deg}deg)`;
//     // Calcul de la rotation de l'aiguille des secondes (6° par seconde)
//     document.getElementById('sc').style.transform = `rotate(${sc * deg}deg)`;
//     // Appel d'une fonction pour vérifier si une alarme doit être déclenchée
//     checkAlarm(hr, mn);
// }

//     // --- ALARME ---
//     let alarmHour = null;
//     let alarmMinute = null;
//     let alarmMessage = "";
//     let alarmArmed = false;

//     function setAlarm() {
//     const alarmInput = document.getElementById('alarmTime').value;
//     const messageInput = document.getElementById('alarmMessage').value;

//     // Vérification de la présence d'une heure
//     if (!alarmInput) {
//         alert("Veuillez sélectionner une heure d'alarme.");
//     return;
//     }

//     const [hour, minute] = alarmInput.split(":").map(Number);

//     alarmHour = hour;
//     alarmMinute = minute;
//     alarmMessage = messageInput || "C'est l'heure de l'alarme !";
//     alarmArmed = true;
//     alert(`⏰ Alarme réglée à ${alarmHour}:${alarmMinute.toString().padStart(2, '0')}`);
// }

//     let alarmAlreadyTriggered = false;

//     function checkAlarm(currentHour, currentMinute) {
//         const currentSecond = new Date().getSeconds(); // Ajoute les secondes
//     if (
//     alarmArmed &&
//     alarmHour !== null &&
//     alarmMinute !== null &&
//     currentHour === alarmHour &&
//     currentMinute === alarmMinute &&
//     currentSecond === 0 && // Ne déclenche que à la toute première 
//     !alarmAlreadyTriggered
//     ) {
//         alarmAlreadyTriggered = true;
//     playAlarm();
//     alert("🔔 Alarme : " + alarmMessage);
//     }

//     // Réarmer pour pouvoir déclencher à nouveau si l'alarme est réinitialisée
//     if (
//     alarmAlreadyTriggered &&
//     (currentHour !== alarmHour || currentMinute !== alarmMinute)
//     ) {
//         alarmAlreadyTriggered = false;
//     }
// }

//     // --- JOUER LE SON ---
//     function playAlarm() {
//     const sound = document.getElementById('alarmSound');
//     if (sound) {
//         sound.currentTime = 0;
//     sound.play();
//     }
// }
/*--- HORLOGE DIGITALE ---*/
// Horloge digitale
// Fonction qui met à jour l'affichage de l'horloge
// Récupère l'élément de l'horloge et du son de l'alarme depuis le HTML
const clock = document.getElementById("digital-clock");
const alarmSound = document.getElementById("alarmSound");
// Variables pour stocker l'heure de l'alarme, le message texte, et un indicateur si elle a déjà sonné
let alarmTime = "";
let alarmMsg = "";
let alarmTriggered = false;
// Fonction pour mettre à jour l'heure affichée et déclencher l'alarme si nécessaire
function updateClock() {
    const now = new Date(); // Récupère la date et l'heure actuelle
    // Formate les heures, minutes et secondes avec un zéro devant si nécessaire (ex. 09 au lieu de 9)
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    // Affiche l'heure actuelle dans l'élément HTML
    clock.textContent = `${h}:${m}:${s}`;
    // Vérifie si l'heure actuelle correspond à celle de l'alarme ET si c'est le début d'une minute (secondes === "00")
    if (`${h}:${m}` === alarmTime && s === "00" && !alarmTriggered) {
        alarmTriggered = true; // Marque que l'alarme a été déclenchée (évite qu'elle sonne plusieurs fois dans la même minute)
        alarmSound.play(); // Joue le son de l'alarme
        alert("🔔 Alarme : " + (alarmMsg || "C'est l'heure !")); // Affiche le message d'alarme personnalisé ou un message par défaut
    }
    // Si on est sorti de l'heure de l'alarme, on réarme l'alarme pour pouvoir sonner à nouveau la prochaine fois
    if (`${h}:${m}` !== alarmTime) {
        alarmTriggered = false;
    }
}
// Fonction appelée lorsqu'on clique sur "Régler l'alarme"
function setAlarm() {
    const t = document.getElementById("alarmTime").value; // Récupère l'heure choisie dans le champ input de type "time"
    alarmMsg = document.getElementById("alarmMessage").value; // Récupère le message tapé dans le champ de texte

    if (!t) return alert("⏰ Choisissez une heure !"); // Avertit si aucune heure n'a été sélectionnée

    alarmTime = t; // Enregistre l'heure de l'alarme
    alarmTriggered = false; // Réinitialise l'état de déclenchement
    alert(`✅ Alarme réglée à ${t}`); // Confirmation à l'utilisateur
}
// Fonction pour arrêter le son de l'alarme manuellement
function stopAlarm() {
    alarmSound.pause(); // Met en pause le son
    alarmSound.currentTime = 0; // Remet le son au début pour un prochain déclenchement
    alert("🔕 Alarme stoppée."); // Message de confirmation
}
// Actualise l'horloge toutes les secondes (1000 millisecondes)
setInterval(updateClock, 1000);

// Appelle immédiatement updateClock au chargement de la page pour afficher l'heure sans attendre 1 seconde
updateClock();

