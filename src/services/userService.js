import { doc, getDoc, setDoc, updateDoc, arrayUnion,increment } from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Revisa si un usuario existe en Firestore y, si no, lo crea.
 * Ahora acepta 'additionalData' para el registro con email.
 * @param {object} userAuth - El objeto 'user' que devuelve Firebase Auth.
 * @param {object} additionalData - Datos extra (ej. { userName: 'dante' })
 */
export const getOrCreateUserDocument = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    // Si no existe, lo crea
    const { email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        uid: userAuth.uid,
        email,
        // AQUÍ LA MAGIA:
        // 1. Usa el 'userName' del formulario (si existe)
        // 2. Si no, usa el 'displayName' de Google (si existe)
        // 3. Si no, usa la parte local del email
        displayName: additionalData.userName || userAuth.displayName || email.split("@")[0],
        profileImageUrl: photoURL || null,
        role: "user",
        likedSongs: [],
        followedArtists: [],
        createdAt,
      });
      console.log("Nuevo usuario (email/pass) creado en Firestore");
    } catch (error) {
      console.error("Error creando el documento del usuario:", error);
    }
  }

  // Devolvemos la información del usuario que está en Firestore
  const finalSnapshot = await getDoc(userRef);
  return finalSnapshot.data();
};

export const logSongPlay = async (userId, songId, artistId) => {
  if (!userId || !songId || !artistId) return;

  const userRef = doc(db, "users", userId);
  const artistCountKey = `artistPlayCounts.${artistId}`;

  try {
    await updateDoc(userRef, {
      // 1. Añade la canción al array de 'recentlyPlayed'
      // Usamos arrayUnion para añadir un objeto con timestamp
      recentlyPlayed: arrayUnion({
        songId: songId,
        artistId: artistId,
        playedAt: new Date(), // Marca de tiempo de Firebase
      }),

      // 2. Incrementa el contador para ese artista
      // Usamos 'increment' para sumar 1 de forma segura
      [artistCountKey]: increment(1),
    });
    console.log("Reproducción registrada:", songId);
  } catch (error) {
    // Esto puede fallar si el documento 'users' no existe,
    // o si el campo 'artistPlayCounts' no es un mapa.
    // Como getOrCreateUserDocument se corre al login, no debería fallar.
    console.error("Error al registrar la reproducción:", error);
  }
};

// --- 2. FUNCIÓN PARA OBTENER CANCIONES ESCUCHADAS ---

export const getRecentlyPlayed = async (userId) => {
  if (!userId) return [];
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists() || !docSnap.data().recentlyPlayed) {
    return [];
  }

  const allPlayed = docSnap.data().recentlyPlayed;

  // Ordenamos por la marca de tiempo (más reciente primero)
  const sorted = allPlayed.sort((a, b) => b.playedAt.toMillis() - a.playedAt.toMillis());

  // Devolvemos solo las últimas 10
  return sorted.slice(0, 10);
};

// --- 3. FUNCIÓN PARA OBTENER ARTISTAS MÁS ESCUCHADOS ---

export const getTopArtists = async (userId) => {
  if (!userId) return [];
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists() || !docSnap.data().artistPlayCounts) {
    return [];
  }

  const countsMap = docSnap.data().artistPlayCounts;

  // Convertimos el mapa { artist1: 10, artist2: 5 } a un array
  const countsArray = Object.entries(countsMap); // [['artist1', 10], ['artist2', 5]]

  // Ordenamos por el contador (más alto primero)
  const sorted = countsArray.sort(([, countA], [, countB]) => countB - countA);

  // Devolvemos solo los 5 primeros (mapeados a un objeto)
  return sorted.slice(0, 5).map(([artistId, count]) => ({
    artistId,
    count,
  }));
};